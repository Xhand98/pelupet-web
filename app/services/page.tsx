'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { servicesAPI } from '@/lib/api'
import { Service } from '@/lib/types'

gsap.registerPlugin(ScrollTrigger)

const categoryColors = {
  grooming: 'from-emerald-500 to-teal-500',
  veterinary: 'from-cyan-500 to-blue-500',
  training: 'from-purple-500 to-pink-500',
  other: 'from-orange-500 to-red-500',
}

const categoryEmojis = {
  grooming: '💇',
  veterinary: '🏥',
  training: '🎓',
  other: '✨',
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const response = await servicesAPI.getAll()
      setServices(response.data)
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading && services.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.page-title', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })

        gsap.from('.category-filter', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          stagger: 0.1,
          ease: 'power3.out',
        })

        gsap.from('.service-item', {
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
          },
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        })
      }, containerRef)

      return () => ctx.revert()
    }
  }, [loading, services, selectedCategory])

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory)

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))]

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-3xl">🐾</div>
              <span className="text-2xl font-bold text-emerald-600">PeluPet</span>
            </Link>
            <div className="flex gap-4">
              <Link href="/appointments" className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors">
                Agendar Cita
              </Link>
              <Link href="/" className="text-slate-700 hover:text-emerald-600 transition-colors flex items-center">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="page-title text-6xl font-bold text-slate-800 mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-slate-600">
              Servicios profesionales para el cuidado integral de tu mascota
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-filter px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 animate-bounce">🐾</div>
              <p className="text-xl text-slate-600">Cargando servicios...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😿</div>
              <p className="text-xl text-slate-600">No hay servicios disponibles</p>
            </div>
          ) : (
            <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="service-item bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className={`bg-gradient-to-br ${categoryColors[service.category]} p-8 text-white`}>
                    <div className="text-6xl mb-4">
                      {categoryEmojis[service.category]}
                    </div>
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold">
                      {service.category}
                    </span>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-slate-600 mb-6">
                      {service.description || 'Servicio profesional de alta calidad'}
                    </p>

                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-sm text-slate-500">Precio</p>
                        <p className="text-3xl font-bold text-emerald-600">
                          ${service.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Duración</p>
                        <p className="text-lg font-semibold text-slate-700">
                          {service.duration_minutes} min
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/appointments?service=${service.id}`}
                      className="block w-full bg-emerald-600 text-white text-center px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Agendar Ahora
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
              <p className="text-xl text-emerald-50 mb-8">
                Solicita un servicio personalizado adaptado a las necesidades de tu mascota
              </p>
              <Link
                href="/custom-services"
                className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Solicitar Servicio Custom
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
