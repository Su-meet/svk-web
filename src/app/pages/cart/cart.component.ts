import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
    selector: 'app-cart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, FormsModule],
    template: `
    <div class="cart-page">
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <nav class="breadcrumb">
            <a routerLink="/">Home</a>
            <span>/</span>
            <span>Cart</span>
          </nav>
          <h1 class="page-header__title">Your Cart</h1>
        </div>
      </section>

      <section class="cart-section">
        <div class="container">
          @if (cartItems().length > 0) {
            <div class="cart-grid">
              <!-- Cart Items -->
              <div class="cart-items">
                @for (item of cartItems(); track item.service.id) {
                  <div class="cart-item">
                    <div class="cart-item__image" 
                         [style.background-image]="'url(' + placeholderImage + ')'">
                    </div>
                    
                    <div class="cart-item__info">
                      <a [routerLink]="['/service', item.service.slug]" class="cart-item__name">
                        {{ item.service.name }}
                      </a>
                      <p class="cart-item__description">{{ item.service.shortDescription }}</p>
                      <div class="cart-item__meta">
                        <span class="cart-item__duration">⏱️ {{ item.service.duration }}</span>
                        <span class="cart-item__rating">⭐ {{ item.service.rating }}</span>
                      </div>
                    </div>
                    
                    <div class="cart-item__quantity">
                      <button 
                        class="cart-item__qty-btn" 
                        (click)="updateQuantity(item.service.id, item.quantity - 1)"
                        [disabled]="item.quantity <= 1">
                        −
                      </button>
                      <span class="cart-item__qty-value">{{ item.quantity }}</span>
                      <button 
                        class="cart-item__qty-btn" 
                        (click)="updateQuantity(item.service.id, item.quantity + 1)">
                        +
                      </button>
                    </div>
                    
                    <div class="cart-item__price">
                      @if (item.service.discountedPrice) {
                        <span class="cart-item__price-original">₹{{ item.service.price * item.quantity }}</span>
                        <span class="cart-item__price-current">₹{{ item.service.discountedPrice * item.quantity }}</span>
                      } @else {
                        <span class="cart-item__price-current">₹{{ item.service.price * item.quantity }}</span>
                      }
                    </div>
                    
                    <button class="cart-item__remove" (click)="removeItem(item.service.id)">
                      🗑️
                    </button>
                  </div>
                }
              </div>

              <!-- Order Summary & Booking Form -->
              <div class="cart-sidebar">
                <div class="order-summary">
                  <h3 class="order-summary__title">Order Summary</h3>
                  
                  <div class="order-summary__row">
                    <span>Items ({{ cartCount() }})</span>
                    <span>₹{{ cartTotal() }}</span>
                  </div>
                  
                  <div class="order-summary__divider"></div>
                  
                  <div class="order-summary__row order-summary__row--total">
                    <span>Total</span>
                    <span>₹{{ cartTotal() }}</span>
                  </div>
                </div>

                <!-- Booking Form -->
                <div class="booking-form">
                  <h3 class="booking-form__title">Book Your Service</h3>
                  
                  <div class="booking-form__field">
                    <label for="name">Your Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      [(ngModel)]="customerName" 
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div class="booking-form__field">
                    <label for="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      [(ngModel)]="customerPhone" 
                      placeholder="Enter your phone"
                      required
                    />
                  </div>
                  
                  <div class="booking-form__field">
                    <label for="address">Address *</label>
                    <textarea 
                      id="address" 
                      [(ngModel)]="customerAddress" 
                      placeholder="Enter your full address"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  
                  <div class="booking-form__row">
                    <div class="booking-form__field">
                      <label for="date">Preferred Date *</label>
                      <input 
                        type="date" 
                        id="date" 
                        [(ngModel)]="scheduledDate" 
                        [min]="minDate"
                        required
                      />
                    </div>
                    
                    <div class="booking-form__field">
                      <label for="time">Preferred Time *</label>
                      <select id="time" [(ngModel)]="scheduledTime" required>
                        <option value="">Select time</option>
                        <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                        <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                        <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                        <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="booking-form__field">
                    <label for="notes">Special Instructions (Optional)</label>
                    <textarea 
                      id="notes" 
                      [(ngModel)]="notes" 
                      placeholder="Any special instructions..."
                      rows="2"
                    ></textarea>
                  </div>
                  
                  <button 
                    class="booking-form__submit" 
                    (click)="proceedToBooking()"
                    [disabled]="!isFormValid()">
                    <span>💬</span>
                    Book via WhatsApp
                  </button>
                  
                  <p class="booking-form__note">
                    Clicking this will open WhatsApp with your booking details
                  </p>
                </div>
              </div>
            </div>
          } @else {
            <!-- Empty Cart -->
            <div class="empty-cart">
              <span class="empty-cart__icon">🛒</span>
              <h2 class="empty-cart__title">Your cart is empty</h2>
              <p class="empty-cart__text">Add services to your cart and book them easily</p>
              <a routerLink="/services" class="empty-cart__btn">Browse Services</a>
            </div>
          }
        </div>
      </section>
    </div>
  `,
    styles: [`
    @use '../../../styles/variables' as *;
    @use '../../../styles/mixins' as *;

    .cart-page {
      padding-top: 70px;
    }

    .page-header {
      padding: $spacing-10 0;
      background: $neutral-50;
      border-bottom: 1px solid $neutral-100;

      &__title {
        @include heading-lg;
        margin: 0;
      }
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: $spacing-2;
      font-size: $font-size-sm;
      color: $neutral-500;
      margin-bottom: $spacing-4;

      a {
        color: $primary-600;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .cart-section {
      @include section;
      background: white;
    }

    .cart-grid {
      display: grid;
      gap: $spacing-8;

      @include lg {
        grid-template-columns: 1fr 400px;
      }
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: $spacing-4;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 80px 1fr auto auto;
      gap: $spacing-4;
      padding: $spacing-4;
      background: $neutral-50;
      border-radius: $radius-xl;
      align-items: center;

      @include md {
        grid-template-columns: 100px 1fr auto auto auto auto;
      }

      &__image {
        width: 80px;
        height: 80px;
        background-size: cover;
        background-position: center;
        background-color: $neutral-200;
        border-radius: $radius-lg;

        @include md {
          width: 100px;
          height: 100px;
        }
      }

      &__info {
        min-width: 0;
      }

      &__name {
        font-size: $font-size-base;
        font-weight: $font-weight-semibold;
        color: $neutral-900;
        text-decoration: none;
        @include truncate;

        &:hover {
          color: $primary-600;
        }
      }

      &__description {
        font-size: $font-size-sm;
        color: $neutral-500;
        margin: $spacing-1 0;
        @include truncate;
        display: none;

        @include md {
          display: block;
        }
      }

      &__meta {
        display: flex;
        gap: $spacing-3;
        font-size: $font-size-xs;
        color: $neutral-500;
      }

      &__quantity {
        display: flex;
        align-items: center;
        gap: $spacing-2;
      }

      &__qty-btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: $neutral-700;
        background: white;
        border: 1px solid $neutral-200;
        border-radius: $radius-md;
        cursor: pointer;
        transition: all $transition-fast;

        &:hover:not(:disabled) {
          background: $primary-50;
          border-color: $primary-300;
          color: $primary-700;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      &__qty-value {
        font-size: $font-size-base;
        font-weight: $font-weight-semibold;
        min-width: 24px;
        text-align: center;
      }

      &__price {
        text-align: right;

        &-original {
          display: block;
          font-size: $font-size-sm;
          color: $neutral-400;
          text-decoration: line-through;
        }

        &-current {
          font-size: $font-size-lg;
          font-weight: $font-weight-bold;
          color: $neutral-900;
        }
      }

      &__remove {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        border-radius: $radius-lg;
        transition: all $transition-fast;

        &:hover {
          background: $error-50;
        }
      }
    }

    .cart-sidebar {
      display: flex;
      flex-direction: column;
      gap: $spacing-6;
    }

    .order-summary {
      padding: $spacing-6;
      background: $neutral-50;
      border-radius: $radius-xl;

      &__title {
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: $neutral-900;
        margin-bottom: $spacing-4;
      }

      &__row {
        display: flex;
        justify-content: space-between;
        font-size: $font-size-base;
        color: $neutral-600;
        margin-bottom: $spacing-3;

        &--total {
          font-size: $font-size-lg;
          font-weight: $font-weight-bold;
          color: $neutral-900;
          margin-bottom: 0;
        }
      }

      &__divider {
        height: 1px;
        background: $neutral-200;
        margin: $spacing-4 0;
      }
    }

    .booking-form {
      padding: $spacing-6;
      background: white;
      border: 1px solid $neutral-200;
      border-radius: $radius-xl;

      &__title {
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: $neutral-900;
        margin-bottom: $spacing-4;
      }

      &__field {
        margin-bottom: $spacing-4;

        label {
          display: block;
          font-size: $font-size-sm;
          font-weight: $font-weight-medium;
          color: $neutral-700;
          margin-bottom: $spacing-2;
        }

        input, textarea, select {
          width: 100%;
          padding: $spacing-3 $spacing-4;
          font-size: $font-size-base;
          color: $neutral-800;
          background: $neutral-50;
          border: 1px solid $neutral-200;
          border-radius: $radius-lg;
          outline: none;
          transition: all $transition-fast;

          &:focus {
            background: white;
            border-color: $primary-400;
            box-shadow: 0 0 0 3px $primary-100;
          }
        }

        textarea {
          resize: vertical;
        }

        select {
          cursor: pointer;
        }
      }

      &__row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: $spacing-4;
      }

      &__submit {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: $spacing-2;
        padding: $spacing-4;
        font-size: $font-size-base;
        font-weight: $font-weight-semibold;
        color: white;
        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        border: none;
        border-radius: $radius-lg;
        cursor: pointer;
        transition: all $transition-fast;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: $shadow-lg;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      &__note {
        font-size: $font-size-xs;
        color: $neutral-500;
        text-align: center;
        margin: $spacing-3 0 0;
      }
    }

    .empty-cart {
      text-align: center;
      padding: $spacing-16 $spacing-4;

      &__icon {
        font-size: 5rem;
        margin-bottom: $spacing-6;
        display: block;
      }

      &__title {
        font-size: $font-size-2xl;
        font-weight: $font-weight-bold;
        color: $neutral-800;
        margin-bottom: $spacing-2;
      }

      &__text {
        font-size: $font-size-base;
        color: $neutral-500;
        margin-bottom: $spacing-8;
      }

      &__btn {
        @include button-primary;
        padding: $spacing-4 $spacing-8;
      }
    }
  `]
})
export class CartComponent {
    private storageService = inject(StorageService);
    private whatsappService = inject(WhatsAppService);
    private seo = inject(SeoService);

    cartItems = this.storageService.cart;
    cartCount = this.storageService.cartCount;
    cartTotal = this.storageService.cartTotal;

    readonly placeholderImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop';

    customerName = '';
    customerPhone = '';
    customerAddress = '';
    scheduledDate = '';
    scheduledTime = '';
    notes = '';

    get minDate(): string {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    constructor() {
        this.seo.updateSeo({
            title: 'Cart',
            description: 'Review your selected services and book them easily'
        });
    }

    updateQuantity(serviceId: string, quantity: number): void {
        this.storageService.updateCartItemQuantity(serviceId, quantity);
    }

    removeItem(serviceId: string): void {
        this.storageService.removeFromCart(serviceId);
    }

    isFormValid(): boolean {
        return !!(
            this.customerName.trim() &&
            this.customerPhone.trim() &&
            this.customerAddress.trim() &&
            this.scheduledDate &&
            this.scheduledTime
        );
    }

    proceedToBooking(): void {
        if (!this.isFormValid()) return;

        this.whatsappService.bookFromCart(
            this.customerName,
            this.customerPhone,
            this.scheduledDate,
            this.scheduledTime,
            this.customerAddress,
            this.notes || undefined
        );

        // Clear cart after booking
        this.storageService.clearCart();
    }
}
