"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { ARC_TESTNET, ARC_TESTNET_CHAIN_ID_HEX } from "./chain";
import { useToast } from "@/components/Toast";
import { buildAuthMessage, type AuthPayload } from "@/lib/auth";

type Eip1193Provider = {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
    coinbaseWalletExtension?: Eip1193Provider;
  }
}

export type WalletKind = "metamask" | "coinbase" | "demo" | null;

type WalletState = {
  address: string | null;
  kind: WalletKind;
  balanceWei: bigint | null;
  chainOk: boolean;
  connecting: boolean;
};

type WalletContextValue = WalletState & {
  connectMetaMask: () => Promise<void>;
  connectCoinbase: () => Promise<void>;
  connectDemo: () => void;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
  getSigner: () => Promise<ethers.Signer>;
  getReadProvider: () => ethers.Provider;
  signAuthPayload: () => Promise<AuthPayload>;
};

const WalletContext = createContext<WalletContextValue | null>(null);

const READ_RPC_URL = ARC_TESTNET.rpcUrls[0];

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const [state, setState] = useState<WalletState>({
    address: null,
    kind: null,
    balanceWei: null,
    chainOk: false,
    connecting: false,
  });
  const activeProviderRef = useRef<Eip1193Provider | null>(null);
  const readProviderRef = useRef<ethers.JsonRpcProvider | null>(null);
  const addressRef = useRef<string | null>(null);
  const kindRef = useRef<WalletKind>(null);
  addressRef.current = state.address;
  kindRef.current = state.kind;

  const getReadProvider = useCallback(() => {
    if (!readProviderRef.current) {
      readProviderRef.current = new ethers.JsonRpcProvider(READ_RPC_URL, {
        chainId: parseInt(ARC_TESTNET_CHAIN_ID_HEX, 16),
        name: "arc-testnet",
      });
    }
    return readProviderRef.current;
  }, []);

  const refreshBalance = useCallback(async () => {
    const address = addressRef.current;
    const kind = kindRef.current;
    if (!address) return;

    if (kind === "demo") {
      // Simulated balance for demo mode — clearly not a real chain read.
      const mock = BigInt(Math.floor((Math.random() * 3000 + 200) * 1e6)) * 1_000_000_000_000n;
      setState((s) => (s.address === address ? { ...s, balanceWei: mock } : s));
      return;
    }

    try {
      const bal = await getReadProvider().getBalance(address);
      setState((s) => (s.address === address ? { ...s, balanceWei: bal } : s));
    } catch {
      /* transient RPC errors are non-fatal — UI keeps last known balance */
    }
  }, [getReadProvider]);

  const onConnected = useCallback(
    (address: string, kind: WalletKind, provider: Eip1193Provider | null) => {
      activeProviderRef.current = provider;
      setState({ address, kind, balanceWei: null, chainOk: true, connecting: false });
    },
    []
  );

  const ensureArcNetwork = useCallback(async (provider: Eip1193Provider) => {
    const currentChainId = (await provider.request({ method: "eth_chainId" })) as string;
    if (currentChainId.toLowerCase() === ARC_TESTNET_CHAIN_ID_HEX.toLowerCase()) return;

    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ARC_TESTNET_CHAIN_ID_HEX }],
      });
    } catch (switchErr: unknown) {
      const code = (switchErr as { code?: number })?.code;
      if (code === 4902 || code === -32603) {
        await provider.request({ method: "wallet_addEthereumChain", params: [ARC_TESTNET] });
        showToast("⛓️", "Arc Testnet added to your wallet!", "success");
      } else {
        throw switchErr;
      }
    }
  }, [showToast]);

  const connectMetaMask = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum?.isMetaMask) {
      showToast("🦊", "MetaMask not found. Install it at metamask.io", "error");
      if (typeof window !== "undefined") setTimeout(() => window.open("https://metamask.io/download/", "_blank"), 600);
      return;
    }
    const provider = window.ethereum;
    setState((s) => ({ ...s, connecting: true }));
    try {
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      if (!accounts?.length) throw new Error("No accounts returned");
      await ensureArcNetwork(provider);
      onConnected(accounts[0], "metamask", provider);
      showToast("🎉", "MetaMask connected!", "success");
    } catch (err: unknown) {
      setState((s) => ({ ...s, connecting: false }));
      const code = (err as { code?: number })?.code;
      const message = (err as { message?: string })?.message;
      if (code === 4001) showToast("❌", "Connection rejected.", "error");
      else if (code === -32002) showToast("⏳", "MetaMask already has a pending request.", "error");
      else showToast("❌", `Error: ${message || "Unknown"}`, "error");
    }
  }, [ensureArcNetwork, onConnected, showToast]);

  const connectCoinbase = useCallback(async () => {
    const provider = typeof window !== "undefined" ? window.coinbaseWalletExtension || window.ethereum : undefined;
    if (!provider) {
      showToast("🔵", "Coinbase Wallet not detected.", "error");
      return;
    }
    setState((s) => ({ ...s, connecting: true }));
    try {
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      await ensureArcNetwork(provider);
      onConnected(accounts[0], "coinbase", provider);
      showToast("🎉", "Coinbase Wallet connected!", "success");
    } catch (err: unknown) {
      setState((s) => ({ ...s, connecting: false }));
      showToast("❌", `Coinbase error: ${(err as { message?: string })?.message || "rejected"}`, "error");
    }
  }, [ensureArcNetwork, onConnected, showToast]);

  const connectDemo = useCallback(() => {
    const addr = "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
    onConnected(addr, "demo", null);
    showToast("⚡", "Demo wallet connected — simulated, no real funds.", "success");
  }, [onConnected, showToast]);

  const disconnect = useCallback(() => {
    activeProviderRef.current = null;
    setState({ address: null, kind: null, balanceWei: null, chainOk: false, connecting: false });
    showToast("👋", "Wallet disconnected.");
  }, [showToast]);

  const getSigner = useCallback(async (): Promise<ethers.Signer> => {
    if (state.kind === "demo" || !activeProviderRef.current) {
      throw new Error("Demo mode is view-only — connect a real wallet (MetaMask) to sign transactions.");
    }
    const browserProvider = new ethers.BrowserProvider(activeProviderRef.current);
    return browserProvider.getSigner();
  }, [state.kind]);

  const authCacheRef = useRef<AuthPayload | null>(null);
  const AUTH_CACHE_TTL_MS = 4 * 60 * 1000; // server allows 5 min; reuse for 4 to stay safely inside that window

  const signAuthPayload = useCallback(async (): Promise<AuthPayload> => {
    if (!state.address) throw new Error("Connect a wallet first");
    if (state.kind === "demo") throw new Error("Demo mode can't sign — connect a real wallet to save changes.");

    const cached = authCacheRef.current;
    if (cached && cached.address === state.address && Date.now() - cached.timestamp < AUTH_CACHE_TTL_MS) {
      return cached;
    }

    const signer = await getSigner();
    const timestamp = Date.now();
    const signature = await signer.signMessage(buildAuthMessage(state.address, timestamp));
    const payload = { address: state.address, signature, timestamp };
    authCacheRef.current = payload;
    return payload;
  }, [state.address, state.kind, getSigner]);

  useEffect(() => {
    if (state.address) refreshBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.address, state.kind]);

  useEffect(() => {
    const provider = typeof window !== "undefined" ? window.ethereum : undefined;
    if (!provider) return;
    const onAccountsChanged = (...args: unknown[]) => {
      const accs = args[0] as string[];
      if (!accs?.length) disconnect();
      else onConnected(accs[0], "metamask", provider);
    };
    const onChainChanged = (...args: unknown[]) => {
      const chainId = args[0] as string;
      if (chainId.toLowerCase() !== ARC_TESTNET_CHAIN_ID_HEX.toLowerCase()) {
        showToast("⚠️", "Please switch back to Arc Testnet in your wallet.", "error");
      }
    };
    provider.on("accountsChanged", onAccountsChanged);
    provider.on("chainChanged", onChainChanged);
    return () => {
      provider.removeListener?.("accountsChanged", onAccountsChanged);
      provider.removeListener?.("chainChanged", onChainChanged);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WalletContext.Provider
      value={{
        ...state,
        connectMetaMask,
        connectCoinbase,
        connectDemo,
        disconnect,
        refreshBalance,
        getSigner,
        getReadProvider,
        signAuthPayload,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
