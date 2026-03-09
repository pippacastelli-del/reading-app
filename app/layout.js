export const metadata = {
  title: "Reading App",
  description: "Practice reading",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
