'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import Link from 'next/link'
import { authAPI } from '@/lib/auth'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  
  const [loginData, setLoginData] = useState({ email: '', password: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.login-container', { scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
      gsap.from('.form-field', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' })
    }, containerRef)
    return () => ctx.revert()
  }, [isLogin])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await authAPI.login(loginData)
      const { user, token } = response.data
      
      authAPI.setCurrentUser(user, token)
      toast.success(`¡Bienvenido/a ${user.name}!`)
      
      router.push(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (error: any) {
      console.error('Login error:', error)
      console.error('Response data:', error.response?.data)
      console.error('Response status:', error.response?.status)
      
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión'
      toast.error(errorMessage)
      
      // Mostrar errores de validación si existen
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        Object.keys(errors).forEach(key => {
          errors[key].forEach((msg: string) => toast.error(msg))
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-green-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative cats */}
      <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce">🐱</div>
      <div className="absolute bottom-20 left-10 text-5xl opacity-15">😺</div>
      <div className="absolute top-1/3 left-1/4 text-4xl opacity-10">😸</div>
      
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-3xl">😺</div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
            PeluPet
          </span>
        </Link>
      </div>

      <div className="login-container w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-green-600 p-8 text-white text-center relative">
            <div className="absolute top-4 right-4 text-4xl opacity-30">😻</div>
            <div className="text-6xl mb-4">😺</div>
            <h1 className="text-3xl font-bold mb-2">¡Miau! Bienvenido</h1>
            <p className="text-purple-100">Inicia sesión para cuidar de tus peluditos</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-field">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="form-field w-full bg-gradient-to-r from-purple-600 via-violet-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:via-violet-700 hover:to-green-700 transition-all shadow-lg disabled:opacity-50 transform hover:scale-[1.02]"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>

              <div className="form-field text-center text-sm text-slate-600">
                <Link href="/register" className="text-purple-600 hover:text-purple-700 font-semibold">
                  ¿No tienes cuenta? Regístrate aquí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
