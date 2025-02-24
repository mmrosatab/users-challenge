import type { Metadata } from 'next'
import './globals.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

export const metadata: Metadata = {
  title: 'Users',
  description: 'Next application to show informations about users',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-screen w-screen'>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className='h-screen w-screen overflow-x-hidden'
      >
        <Theme
          accentColor="violet"
          hasBackground={false}
        >
          {children}
        </Theme>
      </body>
    </html>
  )
}
