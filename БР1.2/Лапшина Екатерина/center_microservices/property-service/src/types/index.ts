// Property types
export interface Building {
  BuildingID: number;
  City: string;
  Street: string;
  Number: string;
  Type?: string;
  Description?: string;
  Photo?: string;
}

export interface Apartment {
  ApartmentID: number;
  Number: number;
  Square: number;
  Description?: string;
  Photo?: string;
  Cost: number;
  Building: Building;
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