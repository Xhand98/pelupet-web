export interface User {
  id: number
  name: string
  email: string
  role: 'owner' | 'admin' | 'doctor'
  customer_id?: number
  doctor_id?: number
  phone?: string
  address?: string
  specialty?: string
  customer?: any
  doctor?: any
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  email: string
  password: string
  role?: 'owner' | 'admin' | 'doctor'
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
  phone: string
  address: string
  role?: 'owner' | 'admin' | 'doctor'
  customer_id?: number
  doctor_id?: number
}

export interface AuthResponse {
  message: string
  user: User
  token: string
}
