import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem, Booking, CustomerInfo, Service } from '../models/service.model';

const CART_STORAGE_KEY = 'svk_cart';
const BOOKINGS_STORAGE_KEY = 'svk_bookings';
const CUSTOMER_STORAGE_KEY = 'svk_customer';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private platformId = inject(PLATFORM_ID);

    private cartItems = signal<CartItem[]>([]);
    private bookings = signal<Booking[]>([]);
    private customerInfo = signal<CustomerInfo | null>(null);

    readonly cart = this.cartItems.asReadonly();
    readonly allBookings = this.bookings.asReadonly();
    readonly customer = this.customerInfo.asReadonly();

    readonly cartCount = computed(() =>
        this.cartItems().reduce((total, item) => total + item.quantity, 0)
    );

    readonly cartTotal = computed(() =>
        this.cartItems().reduce((total, item) => {
            const price = item.service.discountedPrice ?? item.service.price;
            return total + (price * item.quantity);
        }, 0)
    );

    constructor() {
        this.loadFromStorage();
    }

    private loadFromStorage(): void {
        if (!isPlatformBrowser(this.platformId)) return;

        try {
            const cartData = localStorage.getItem(CART_STORAGE_KEY);
            if (cartData) {
                this.cartItems.set(JSON.parse(cartData));
            }

            const bookingsData = localStorage.getItem(BOOKINGS_STORAGE_KEY);
            if (bookingsData) {
                this.bookings.set(JSON.parse(bookingsData));
            }

            const customerData = localStorage.getItem(CUSTOMER_STORAGE_KEY);
            if (customerData) {
                this.customerInfo.set(JSON.parse(customerData));
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
        }
    }

    private saveCart(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems()));
    }

    private saveBookings(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(this.bookings()));
    }

    private saveCustomer(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        if (this.customerInfo()) {
            localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(this.customerInfo()));
        }
    }

    // Cart Operations
    addToCart(service: Service, quantity: number = 1): void {
        const currentCart = this.cartItems();
        const existingIndex = currentCart.findIndex(item => item.service.id === service.id);

        if (existingIndex > -1) {
            const updatedCart = [...currentCart];
            updatedCart[existingIndex] = {
                ...updatedCart[existingIndex],
                quantity: updatedCart[existingIndex].quantity + quantity
            };
            this.cartItems.set(updatedCart);
        } else {
            this.cartItems.set([...currentCart, { service, quantity }]);
        }

        this.saveCart();
    }

    updateCartItemQuantity(serviceId: string, quantity: number): void {
        if (quantity <= 0) {
            this.removeFromCart(serviceId);
            return;
        }

        const updatedCart = this.cartItems().map(item =>
            item.service.id === serviceId ? { ...item, quantity } : item
        );
        this.cartItems.set(updatedCart);
        this.saveCart();
    }

    removeFromCart(serviceId: string): void {
        const updatedCart = this.cartItems().filter(item => item.service.id !== serviceId);
        this.cartItems.set(updatedCart);
        this.saveCart();
    }

    clearCart(): void {
        this.cartItems.set([]);
        this.saveCart();
    }

    isInCart(serviceId: string): boolean {
        return this.cartItems().some(item => item.service.id === serviceId);
    }

    getCartItem(serviceId: string): CartItem | undefined {
        return this.cartItems().find(item => item.service.id === serviceId);
    }

    // Booking Operations
    createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
        const newBooking: Booking = {
            ...booking,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        };

        this.bookings.set([newBooking, ...this.bookings()]);
        this.saveBookings();
        return newBooking;
    }

    getBookingById(id: string): Booking | undefined {
        return this.bookings().find(b => b.id === id);
    }

    updateBookingStatus(id: string, status: Booking['status']): void {
        const updatedBookings = this.bookings().map(b =>
            b.id === id ? { ...b, status } : b
        );
        this.bookings.set(updatedBookings);
        this.saveBookings();
    }

    // Customer Operations
    saveCustomerInfo(info: CustomerInfo): void {
        this.customerInfo.set(info);
        this.saveCustomer();
    }

    // Utility
    private generateId(): string {
        return `SVK${Date.now()}${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    }
}
