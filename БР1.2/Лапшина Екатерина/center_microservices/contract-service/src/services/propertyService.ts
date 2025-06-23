import axios from 'axios';

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

export class PropertyService {
  private propertyServiceUrl: string;

  constructor() {
    this.propertyServiceUrl = process.env.PROPERTY_SERVICE_URL || 'http://localhost:3002';
  }

  async getApartmentById(apartmentId: number): Promise<Apartment | null> {
    try {
      const response = await axios.post(`${this.propertyServiceUrl}/api/internal`, {
        service: 'property-service',
        action: 'getApartmentById',
        data: { apartmentId }
      });

      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching apartment:', error);
      return null;
    }
  }
} 