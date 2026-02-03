import { type Metadata } from 'next';
import '@/styles/globalReset.css';
import '@/styles/global.css';
import { inter } from '@/lib/fonts';
import { LOGO_PATH } from '@/lib/consts';

export const metadata: Metadata = {
  title: 'Progressive Web Application (PWA) ',
  icons: {
    icon: LOGO_PATH
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
