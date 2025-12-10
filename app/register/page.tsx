'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import Link from 'next/link'
import { authAPI } from '@/lib/auth'
import { customersAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: '',
    role: 'owner' as const
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.register-container', { scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
      gsap.from('.form-field', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (registerData.password !== registerData.password_confirmation) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (registerData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      // Primero crear el customer
      const customerData = {
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        address: registerData.address
      }
      
      const customerResponse = await customersAPI.create(customerData)
      const customerId = customerResponse.data.id

      // Luego crear el usuario con el customer_id
      const userRegisterData = {
        ...registerData,
        customer_id: customerId
      }

      const response = await authAPI.register(userRegisterData)
      const { user, token } = response.data
      
      authAPI.setCurrentUser(user, token)
      toast.success(`¡Registro exitoso! Bienvenido/a ${user.name}`)
      
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Register error:', error)
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario'
      toast.error(errorMessage)
      
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
      <div className="absolute top-1/3 right-1/4 text-4xl opacity-10">😸</div>
      <div className="absolute bottom-1/3 left-1/3 text-5xl opacity-10">😻</div>
      
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-3xl">😺</div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
            PeluPet
          </span>
        </Link>
      </div>

      <div className="register-container w-full max-w-2xl relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-green-600 p-8 text-white text-center relative">
            <div className="absolute top-4 right-4 text-4xl opacity-30">😻</div>
            <div className="absolute top-4 left-4 text-4xl opacity-30">😺</div>
            <div className="text-6xl mb-4">🐾</div>
            <h1 className="text-3xl font-bold mb-2">¡Únete a PeluPet!</h1>
            <p className="text-purple-100">Crea tu cuenta y empieza a cuidar a tus peluditos</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    placeholder="+52 123 456 7890"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  required
                  value={registerData.address}
                  onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="Calle Principal #123, Ciudad"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    placeholder="••••••••"
                    minLength={6}
                  />
                  <p className="text-xs text-slate-500 mt-1">Mínimo 6 caracteres</p>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirmar contraseña *
                  </label>
                  <input
                    type="password"
                    required
                    value={registerData.password_confirmation}
                    onChange={(e) => setRegisterData({ ...registerData, password_confirmation: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="form-field w-full bg-gradient-to-r from-purple-600 via-violet-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:via-violet-700 hover:to-green-700 transition-all shadow-lg disabled:opacity-50 transform hover:scale-[1.02]"
              >
                {loading ? 'Registrando...' : 'Crear cuenta'}
              </button>

              <div className="form-field text-center text-sm text-slate-600">
                <Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
