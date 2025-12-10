'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import gsap from 'gsap'
import Link from 'next/link'
import { servicesAPI, customersAPI, petsAPI, appointmentsAPI } from '@/lib/api'
import { Service, Customer, Pet } from '@/lib/types'

function AppointmentsForm() {
  const searchParams = useSearchParams()
  const preSelectedService = searchParams.get('service')
  
  const [services, setServices] = useState<Service[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [isNewCustomer, setIsNewCustomer] = useState(true)
  const [isNewPet, setIsNewPet] = useState(true)

  const [formData, setFormData] = useState({
    serviceId: preSelectedService || '',
    customerId: '',
    petId: '',
    appointmentDate: '',
    notes: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    petName: '',
    petSpecies: '',
    petBreed: '',
    petAge: '',
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [servicesRes, customersRes, petsRes] = await Promise.all([
        servicesAPI.getAll(),
        customersAPI.getAll(),
        petsAPI.getAll(),
      ])
      setServices(servicesRes.data)
      setCustomers(customersRes.data)
      setPets(petsRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.from('.form-section', {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        })
      }, containerRef)

      return () => ctx.revert()
    }
  }, [loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let customerId = formData.customerId
      let petId = formData.petId

      if (isNewCustomer) {
        const customerRes = await customersAPI.create({
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone,
          address: formData.customerAddress,
        })
        customerId = customerRes.data.id.toString()
      }

      if (isNewPet) {
        const petRes = await petsAPI.create({
          name: formData.petName,
          species: formData.petSpecies,
          breed: formData.petBreed,
          age: parseInt(formData.petAge),
          customer_id: parseInt(customerId),
          doctor_id: 1,
        })
        petId = petRes.data.id.toString()
      }

      const selectedService = services.find(s => s.id === parseInt(formData.serviceId))
      
      await appointmentsAPI.create({
        pet_id: parseInt(petId),
        customer_id: parseInt(customerId),
        service_id: parseInt(formData.serviceId),
        appointment_date: formData.appointmentDate,
        total_price: selectedService?.price || '0',
        notes: formData.notes,
        status: 'scheduled',
      })

      setSuccess(true)
      gsap.to('.success-message', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })

      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    } catch (error) {
      console.error('Error creating appointment:', error)
      alert('Error al crear la cita. Por favor intente nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🐾</div>
          <p className="text-xl text-slate-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="success-message text-center scale-0 opacity-0">
          <div className="text-8xl mb-6">✅</div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">¡Cita Agendada!</h2>
          <p className="text-xl text-slate-600">Tu cita ha sido agendada exitosamente</p>
          <p className="text-slate-500 mt-4">Redirigiendo...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-3xl">🐾</div>
              <span className="text-2xl font-bold text-emerald-600">PeluPet</span>
            </Link>
            <Link href="/" className="text-slate-700 hover:text-emerald-600 transition-colors">
              Volver
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-800 mb-4">Agendar Cita</h1>
            <p className="text-xl text-slate-600">Completa el formulario para agendar tu cita</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="form-section bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">💇</span>
                Seleccionar Servicio
              </h2>
              <select
                required
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none text-lg"
              >
                <option value="">Selecciona un servicio</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price} ({service.duration_minutes} min)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-section bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">👤</span>
                Información del Cliente
              </h2>
              
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setIsNewCustomer(true)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                    isNewCustomer ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Nuevo Cliente
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewCustomer(false)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                    !isNewCustomer ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Cliente Existente
                </button>
              </div>

              {isNewCustomer ? (
                <div className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={formData.customerAddress}
                    onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              ) : (
                <select
                  required
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">Selecciona un cliente</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} - {customer.email}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-section bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🐕</span>
                Información de la Mascota
              </h2>
              
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setIsNewPet(true)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                    isNewPet ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Nueva Mascota
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewPet(false)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                    !isNewPet ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Mascota Existente
                </button>
              </div>

              {isNewPet ? (
                <div className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Nombre de la mascota"
                    value={formData.petName}
                    onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Especie (Perro, Gato, etc.)"
                    value={formData.petSpecies}
                    onChange={(e) => setFormData({ ...formData, petSpecies: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Raza"
                    value={formData.petBreed}
                    onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                  />
                  <input
                    required
                    type="number"
                    placeholder="Edad (años)"
                    value={formData.petAge}
                    onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              ) : (
                <select
                  required
                  value={formData.petId}
                  onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">Selecciona una mascota</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name} - {pet.species} ({pet.age} años)
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-section bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">📅</span>
                Fecha y Hora
              </h2>
              <input
                required
                type="datetime-local"
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none text-lg"
              />
            </div>

            <div className="form-section bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">📝</span>
                Notas Adicionales
              </h2>
              <textarea
                placeholder="Información adicional que debamos saber..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-6 rounded-2xl text-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Agendando...' : 'Agendar Cita'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default function AppointmentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🐾</div>
          <p className="text-xl text-slate-600">Cargando...</p>
        </div>
      </div>
    }>
      <AppointmentsForm />
    </Suspense>
  )
}
