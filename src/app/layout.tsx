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
    <html>
      <body
      >
        <Theme accentColor="violet">
          {children}
        </Theme>
      </body>
    </html>
  )
}
