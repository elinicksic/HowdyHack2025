import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Scroll.ai - Infinite Knowledge Generator',
  description: 'Infinite Knowledge. One Scroll at a Time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>

      {/* We removed the gradient and text classes from here */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}