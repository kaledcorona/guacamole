import 'styles/globals.css'
import 'styles/pages.css'

export const metadata = {
  title: 'Guacamole',
  description: 'The next generation of maps using blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='h-full'>{children}</body>
    </html>
  )
}
