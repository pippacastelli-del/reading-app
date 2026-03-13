export const metadata = {
  title: "ReadBoost",
  description: "Kids reading practice app"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}