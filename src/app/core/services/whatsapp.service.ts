import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem, Service } from '../models/service.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class WhatsAppService {
    private platformId = inject(PLATFORM_ID);
    private storageService = inject(StorageService);

    readonly businessNumber = '919370443220';
    readonly businessName = 'SVK Experts';

    generateBookingMessage(
        service: Service,
        customerName: string,
        scheduledDate: string,
        scheduledTime: string,
        address: string,
        notes?: string
    ): string {
        const price = service.discountedPrice ?? service.price;

        let message = `🏠 *New Booking Request - ${this.businessName}*\n\n`;
        message += `📋 *Service Details:*\n`;
        message += `• Service: ${service.name}\n`;
        message += `• Price: ₹${price}\n`;
        message += `• Duration: ${service.duration}\n\n`;
        message += `👤 *Customer Details:*\n`;
        message += `• Name: ${customerName}\n`;
        message += `• Address: ${address}\n\n`;
        message += `📅 *Schedule:*\n`;
        message += `• Date: ${scheduledDate}\n`;
        message += `• Time: ${scheduledTime}\n`;

        if (notes) {
            message += `\n📝 *Notes:* ${notes}`;
        }

        return message;
    }

    generateCartBookingMessage(
        cartItems: CartItem[],
        customerName: string,
        customerPhone: string,
        scheduledDate: string,
        scheduledTime: string,
        address: string,
        notes?: string
    ): string {
        const total = cartItems.reduce((sum, item) => {
            const price = item.service.discountedPrice ?? item.service.price;
            return sum + (price * item.quantity);
        }, 0);

        let message = `🏠 *New Booking Request - ${this.businessName}*\n\n`;
        message += `📋 *Services:*\n`;

        cartItems.forEach((item, index) => {
            const price = item.service.discountedPrice ?? item.service.price;
            message += `${index + 1}. ${item.service.name}\n`;
            message += `   Qty: ${item.quantity} × ₹${price} = ₹${price * item.quantity}\n`;
        });

        message += `\n💰 *Total Amount: ₹${total}*\n\n`;
        message += `👤 *Customer Details:*\n`;
        message += `• Name: ${customerName}\n`;
        message += `• Phone: ${customerPhone}\n`;
        message += `• Address: ${address}\n\n`;
        message += `📅 *Schedule:*\n`;
        message += `• Date: ${scheduledDate}\n`;
        message += `• Time: ${scheduledTime}\n`;

        if (notes) {
            message += `\n📝 *Notes:* ${notes}`;
        }

        return message;
    }

    generateInquiryMessage(service: Service): string {
        return `Hi! I'm interested in booking the "${service.name}" service. Can you please provide more details about pricing and availability?`;
    }

    openWhatsApp(message: string): void {
        if (!isPlatformBrowser(this.platformId)) return;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.businessNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }

    bookService(
        service: Service,
        customerName: string,
        scheduledDate: string,
        scheduledTime: string,
        address: string,
        notes?: string
    ): void {
        const message = this.generateBookingMessage(
            service,
            customerName,
            scheduledDate,
            scheduledTime,
            address,
            notes
        );
        this.openWhatsApp(message);
    }

    bookFromCart(
        customerName: string,
        customerPhone: string,
        scheduledDate: string,
        scheduledTime: string,
        address: string,
        notes?: string
    ): void {
        const cartItems = this.storageService.cart();
        if (cartItems.length === 0) return;

        const message = this.generateCartBookingMessage(
            cartItems,
            customerName,
            customerPhone,
            scheduledDate,
            scheduledTime,
            address,
            notes
        );
        this.openWhatsApp(message);
    }

    inquireAboutService(service: Service): void {
        const message = this.generateInquiryMessage(service);
        this.openWhatsApp(message);
    }
}
