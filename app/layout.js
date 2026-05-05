import "./globals.css";

export const metadata = {
  title: "FinFlow | Web3 Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;700&family=Bricolage+Grotesque:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
