// Contract types
export enum ContractStatus {
  PENDING = "v",
  ACTIVE = "l",
  FINISHED = "f"
}

export interface Contract {
  ContractID: number;
  AgentID: number;
  ClientID: number;
  ApartmentID: number;
  Status: ContractStatus;
  startDate?: Date;
  endDate?: Date;
}

// User types for service communication
export interface User {
  UserID: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

// Property types for service communication
export interface Apartment {
  ApartmentID: number;
  Number: number;
  Square: number;
  Description?: string;
  Photo?: string;
  Cost: number;
  Building: {
    BuildingID: number;
    City: string;
    Street: string;
    Number: string;
  };
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