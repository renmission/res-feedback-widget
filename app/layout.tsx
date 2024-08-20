import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Header from '@/components/page-header';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
