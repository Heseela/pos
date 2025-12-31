// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Sidebar from '@/components/layout/Sidebar';
// import Header from '@/components/layout/Header';
// import { getCurrentUser } from '@/lib/auth';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'POS',
//   description: 'POS for restaurant',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   // This will run on the server, so we can't use localStorage directly
//   // The client-side components will handle the authentication

//   return (
//     <html lang="en">
//       <body className={`${inter.className} bg-gray-50`}>
//         <div className="flex min-h-screen">
//           <Sidebar />
//           <div className="flex-1 flex flex-col">
//             <Header />
//             <main className="flex-1 p-6 overflow-auto">
//               {children}
//             </main>
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'POS',
  description: 'POS for restaurant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}