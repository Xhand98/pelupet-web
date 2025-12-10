import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata: Metadata = {
  title: 'PeluPet - Veterinaria y Grooming',
  description: 'Servicios veterinarios y grooming personalizados para tu mascota',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-slate-50">
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
