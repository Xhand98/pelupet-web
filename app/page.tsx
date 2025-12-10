'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      })

      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      })

      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })

      gsap.from('.feature-item', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })

      const pawprints = document.querySelectorAll('.pawprint')
      pawprints.forEach((paw, i) => {
        gsap.to(paw, {
          y: -20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white p-2 rounded-full border-2 border-purple-200 group-hover:border-purple-400 transition-colors">
                  <span className="text-2xl">😺</span>
                </div>
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                  PeluPet
                </span>
                <p className="text-xs text-slate-500 -mt-1">Amor Felino 💜</p>
              </div>
            </Link>
            <div className="hidden md:flex gap-6 items-center">
              <a href="#servicios" className="text-slate-600 hover:text-purple-600 transition-colors font-medium text-sm">Servicios</a>
              <a href="#nosotros" className="text-slate-600 hover:text-purple-600 transition-colors font-medium text-sm">Nosotros</a>
              <a href="#galeria" className="text-slate-600 hover:text-purple-600 transition-colors font-medium text-sm">Galería</a>
              <Link href="/login" className="text-slate-600 hover:text-purple-600 transition-colors font-semibold text-sm">
                Iniciar Sesión
              </Link>
              <Link href="/appointments" className="bg-gradient-to-r from-purple-600 to-green-600 text-white px-5 py-2.5 rounded-full hover:from-purple-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-sm font-semibold">
                Agendar Cita 😸
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main ref={heroRef}>
        <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-green-50 opacity-60"></div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full border border-purple-200">
                <span className="text-2xl">😻</span>
                <span className="text-sm font-semibold text-purple-700">Expertos en Cuidado Felino</span>
              </div>

              <h1 className="hero-title text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-slate-900">Tu Gatito</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-green-600 bg-clip-text text-transparent">
                  Merece Lo Mejor
                </span>
              </h1>

              <p className="hero-subtitle text-xl text-slate-600 leading-relaxed max-w-lg">
                Servicios veterinarios y grooming especializados con <span className="font-semibold text-purple-600">amor felino</span>.
                Porque cada ronroneo cuenta 😽
              </p>

              <div className="hero-cta flex flex-wrap gap-4">
                <Link href="/appointments" className="group bg-gradient-to-r from-purple-600 via-violet-600 to-green-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-2">
                  <span>Agendar Cita</span>
                  <span className="text-2xl group-hover:scale-125 transition-transform">😸</span>
                </Link>
                <Link href="/services" className="bg-white text-slate-800 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 border-2 border-slate-200 hover:border-purple-300 transition-all transform hover:scale-105 flex items-center gap-2">
                  <span>Ver Servicios</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center text-xl">😺</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white flex items-center justify-center text-xl">😸</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 border-2 border-white flex items-center justify-center text-xl">😻</div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">+500 Gatitos Felices</p>
                  <p className="text-xs text-slate-500">Nos confían su cuidado</p>
                </div>
              </div>
            </div>

            <div className="relative lg:ml-auto">
              <div className="relative w-full max-w-lg">
                {/* Main image placeholder */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 via-violet-100 to-green-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-9xl mb-4">😺</div>
                      <p className="text-2xl font-bold text-purple-600 mb-2">Tu Gatito Aquí</p>
                      <p className="text-slate-600">Imagen principal de un gato feliz</p>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-purple-100 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">98% Satisfacción</p>
                      <p className="text-xs text-slate-500">Clientes felices</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-purple-100 animate-float animation-delay-2000">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl">
                      😸
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Atención 24/7</p>
                      <p className="text-xs text-slate-500">Siempre disponibles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" ref={servicesRef} className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                Nuestros Servicios
              </span>
              <h2 className="text-5xl font-black text-slate-900 mb-4">
                Cuidado Integral Para Tu <span className="text-purple-600">Michifuz</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Servicios especializados pensados en el bienestar de tu compañero felino
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="service-card group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-200 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  😸
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Grooming Felino</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Baños especializados, cortes y estilismo con técnicas suaves para gatos. Tu minino quedará radiante 🌟
                </p>
                <Link href="/services" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:gap-4 transition-all">
                  Ver más <span>→</span>
                </Link>
              </div>

              <div className="service-card group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-green-200 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🏥
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Veterinaria Especializada</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Atención médica profesional con doctores expertos en felinos. Salud garantizada 💚
                </p>
                <Link href="/appointments" className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-4 transition-all">
                  Agendar <span>→</span>
                </Link>
              </div>

              <div className="service-card group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-violet-200 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  ✨
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Servicios Personalizados</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Tratamientos a medida para las necesidades únicas de tu gatito especial ✨
                </p>
                <Link href="/custom-services" className="inline-flex items-center gap-2 text-violet-600 font-bold hover:gap-4 transition-all">
                  Solicitar <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                Galería
              </span>
              <h2 className="text-5xl font-black text-slate-900 mb-4">
                Gatitos <span className="text-green-600">Felices</span>
              </h2>
              <p className="text-xl text-slate-600">
                Algunos de nuestros clientes satisfechos 😸
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-green-100 hover:shadow-xl transition-all">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl group-hover:scale-125 transition-transform">
                      {i === 4 ? (
                        <video width={200} height={200} controls loop autoPlay muted className="rounded-full">
                          <source src="/images/kitty-4.mp4" type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={`/images/kitty-${i}.webp`}
                          alt={`Gatito ${i}`}
                          width={200}
                          height={200}
                          className="rounded-full"
                        />
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-5xl font-bold text-slate-800 mb-6">¿Por qué elegirnos?</h2>
                <div className="space-y-6">
                  <div className="feature-item flex gap-4">
                    <div className="text-3xl">🎯</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Atención Personalizada</h3>
                      <p className="text-slate-600">Cada mascota recibe cuidado individualizado según sus necesidades</p>
                    </div>
                  </div>
                  <div className="feature-item flex gap-4">
                    <div className="text-3xl">👨‍⚕️</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Profesionales Certificados</h3>
                      <p className="text-slate-600">Equipo de veterinarios y groomer con amplia experiencia</p>
                    </div>
                  </div>
                  <div className="feature-item flex gap-4">
                    <div className="text-3xl">📅</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Sistema de Reservas</h3>
                      <p className="text-slate-600">Agenda tu cita online de manera fácil y rápida</p>
                    </div>
                  </div>
                  <div className="feature-item flex gap-4">
                    <div className="text-3xl">💚</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Amor por los Animales</h3>
                      <p className="text-slate-600">Tratamos a cada mascota con el cariño que se merece</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-12 text-white">
                  <div className="text-8xl mb-6">🐶</div>
                  <h3 className="text-3xl font-bold mb-4">+1000 mascotas felices</h3>
                  <p className="text-emerald-50 text-lg">Confianza y experiencia que nos respaldan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-24 bg-gradient-to-br from-purple-600 via-violet-600 to-green-600 text-white relative overflow-hidden">
          <div className="absolute top-10 right-10 text-8xl opacity-10">😺</div>
          <div className="absolute bottom-10 left-10 text-8xl opacity-10">😻</div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="text-7xl mb-6">😸</div>
            <h2 className="text-5xl font-bold mb-6">¿Listo para mimar a tu minino?</h2>
            <p className="text-xl text-purple-100 mb-12">Agenda tu cita hoy y descubre por qué ronroneamos de felicidad</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments" className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 hover:scale-105 transition-all shadow-lg">
                😺 Agendar Ahora
              </Link>
              <a href="tel:+8295981500" className="bg-purple-700 bg-opacity-50 backdrop-blur text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-70 hover:scale-105 transition-all border-2 border-white border-opacity-30">
                📞 Llamar: +1 829 598 1500
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-3xl">😺</div>
                  <span className="text-2xl font-bold">PeluPet</span>
                </div>
                <p className="text-slate-400">Cuidando a tus michis y peluditos con amor felino desde 2020 😸</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Enlaces</h4>
                <div className="space-y-2">
                  <Link href="/services" className="block text-slate-400 hover:text-white transition-colors">Servicios</Link>
                  <Link href="/appointments" className="block text-slate-400 hover:text-white transition-colors">Agendar Cita</Link>
                  <Link href="/custom-services" className="block text-slate-400 hover:text-white transition-colors">Servicios Custom</Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contacto</h4>
                <div className="space-y-2 text-slate-400">
                  <p>📍 Calle Rogelio Roselle, Bayona</p>
                  <p>📞 +1 829-598-1500</p>
                  <p>✉️ info@pelupet.com</p>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
              <p>&copy; 2025 PeluPet. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
