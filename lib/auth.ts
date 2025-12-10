import { api } from './api'
import type { User, LoginCredentials, RegisterData, AuthResponse } from './auth-types'

export const authAPI = {
  login: (credentials: LoginCredentials) => 
    api.post<AuthResponse>('/login', credentials),
  
  register: (data: RegisterData) => 
    api.post<AuthResponse>('/register', data),
  
  logout: () => 
    api.post('/logout'),
  
  me: () => 
    api.get<User>('/me'),
  
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('pelupet_user')
    return userStr ? JSON.parse(userStr) as User : null
  },
  
  setCurrentUser: (user: User | null, token?: string) => {
    if (typeof window === 'undefined') return
    
    if (user && token) {
      localStorage.setItem('pelupet_user', JSON.stringify(user))
      localStorage.setItem('pelupet_token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      localStorage.removeItem('pelupet_user')
      localStorage.removeItem('pelupet_token')
      delete api.defaults.headers.common['Authorization']
    }
  },
  
  getToken: () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('pelupet_token')
  },
  
  initAuth: () => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('pelupet_token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }
}

// Initialize auth on module load
if (typeof window !== 'undefined') {
  authAPI.initAuth()
}
