// User types
export enum UserRole {
  CLIENT = "client",
  AGENT = "agent",
  ADMIN = "admin"
}

export interface User {
  UserID: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  Passport?: string;
  Phone?: string;
  BirthDate?: Date;
  Photo?: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
  last_login?: Date;
  date_joined: Date;
  updated_at: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Service communication types
export interface ServiceRequest<T = any> {
  service: string;
  action: string;
  data?: T;
  userId?: number;
}

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
} 