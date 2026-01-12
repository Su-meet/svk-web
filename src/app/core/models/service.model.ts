// Service Category Model
export interface ServiceCategory {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    image: string;
    color: string;
}

// Individual Service Model
export interface Service {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    discountedPrice?: number;
    duration: string;
    rating: number;
    reviewCount: number;
    image: string;
    tags: string[];
    isPopular: boolean;
    isFeatured: boolean;
}

// Booking Model
export interface Booking {
    id: string;
    serviceId: string;
    serviceName: string;
    categoryName: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    address: string;
    city: string;
    pincode: string;
    scheduledDate: string;
    scheduledTime: string;
    notes?: string;
    status: BookingStatus;
    createdAt: string;
    totalAmount: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

// Cart Item Model
export interface CartItem {
    service: Service;
    quantity: number;
    scheduledDate?: string;
    scheduledTime?: string;
}

// City Model
export interface City {
    id: string;
    name: string;
    state: string;
    isActive: boolean;
}

// Search Result
export interface SearchResult {
    services: Service[];
    categories: ServiceCategory[];
}

// Customer Info for Booking
export interface CustomerInfo {
    name: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    pincode: string;
}

// Statistics for Home Page
export interface Statistics {
    serviceRating: number;
    happyCustomers: string;
    experiencedExperts: string;
}
