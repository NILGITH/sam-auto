
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  images: string[];
  category: string;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  status: "available" | "sold" | "reserved";
  createdAt: Date;
  updatedAt: Date;
}

export interface SparePart {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  compatibility: string[];
  brand: string;
  partNumber: string;
  condition: "new" | "used" | "refurbished";
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  type: "vehicle" | "spare_part";
  description?: string;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  name: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: "vehicles" | "spare_parts";
}

export interface FormulaEmailData {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAdresse?: string;
  date?: string;
  quantity?: string;
  category?: string;
  productTitle?: string;
  productDescription?: string;
  productPrice?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  vehiclePrice?: number;
  advanceAmount?: number;
  remainingAmount?: number;
  paymentDate?: string;
  sellerName?: string;
  sellerPhone?: string;
  sellerEmail?: string;
}
