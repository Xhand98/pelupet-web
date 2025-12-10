export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  category: 'grooming' | 'veterinary' | 'training' | 'other';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  customer_id: number;
  doctor_id: number;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface GroomingAppointment {
  id: number;
  pet_id: number;
  customer_id: number;
  service_id: number;
  appointment_date: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes: string;
  total_price: string;
  created_at: string;
  updated_at: string;
  pet?: Pet;
  customer?: Customer;
  service?: Service;
}

export interface CustomService {
  id: number;
  customer_id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  customer?: Customer;
}
