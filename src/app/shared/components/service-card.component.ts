import { Component, input, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Service } from '../../core/models/service.model';
import { StorageService } from '../../core/services/storage.service';

@Component({
    selector: 'app-service-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, DecimalPipe],
    template: `
    <article class="service-card" [class.service-card--featured]="service().isFeatured">
      <a [routerLink]="['/service', service().slug]" class="service-card__image-wrapper">
        <div class="service-card__image" [style.background-image]="'url(' + placeholderImage + ')'">
          @if (service().discountedPrice) {
            <span class="service-card__discount-badge">
              {{ discountPercentage }}% OFF
            </span>
          }
          @if (service().isPopular) {
            <span class="service-card__popular-badge">Popular</span>
          }
        </div>
      </a>
      
      <div class="service-card__content">
        <a [routerLink]="['/service', service().slug]" class="service-card__title">
          {{ service().name }}
        </a>
        
        <p class="service-card__description">{{ service().shortDescription }}</p>
        
        <div class="service-card__meta">
          <div class="service-card__rating">
            <span class="service-card__rating-star">⭐</span>
            <span class="service-card__rating-value">{{ service().rating }}</span>
            <span class="service-card__rating-count">({{ service().reviewCount | number }})</span>
          </div>
          <span class="service-card__duration">{{ service().duration }}</span>
        </div>
        
        <div class="service-card__footer">
          <div class="service-card__price">
            @if (service().discountedPrice) {
              <span class="service-card__price-original">₹{{ service().price }}</span>
              <span class="service-card__price-current">₹{{ service().discountedPrice }}</span>
            } @else {
              <span class="service-card__price-current">₹{{ service().price }}</span>
            }
          </div>
          
          @if (isInCart()) {
            <button class="service-card__btn service-card__btn--added" (click)="onRemoveFromCart()">
              <span>✓</span> Added
            </button>
          } @else {
            <button class="service-card__btn" (click)="onAddToCart()">
              <span>+</span> Add
            </button>
          }
        </div>
      </div>
    </article>
  `,
    styles: [`
    @use '../../../styles/variables' as *;
    @use '../../../styles/mixins' as *;

    .service-card {
      @include card;
      overflow: hidden;
      display: flex;
      flex-direction: column;

      &--featured {
        border: 2px solid $primary-200;
      }

      &__image-wrapper {
        display: block;
        text-decoration: none;
      }

      &__image {
        position: relative;
        height: 160px;
        background-size: cover;
        background-position: center;
        background-color: $neutral-100;
      }

      &__discount-badge {
        position: absolute;
        top: $spacing-3;
        left: $spacing-3;
        padding: $spacing-1 $spacing-2;
        font-size: $font-size-xs;
        font-weight: $font-weight-bold;
        color: white;
        background: $accent-500;
        border-radius: $radius-md;
      }

      &__popular-badge {
        position: absolute;
        top: $spacing-3;
        right: $spacing-3;
        padding: $spacing-1 $spacing-2;
        font-size: $font-size-xs;
        font-weight: $font-weight-medium;
        color: $primary-700;
        background: $primary-100;
        border-radius: $radius-md;
      }

      &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: $spacing-4;
      }

      &__title {
        font-size: $font-size-base;
        font-weight: $font-weight-semibold;
        color: $neutral-900;
        text-decoration: none;
        margin-bottom: $spacing-2;
        @include line-clamp(2);

        &:hover {
          color: $primary-600;
        }
      }

      &__description {
        font-size: $font-size-sm;
        color: $neutral-500;
        margin-bottom: $spacing-3;
        @include line-clamp(2);
      }

      &__meta {
        @include flex-between;
        margin-bottom: $spacing-4;
      }

      &__rating {
        display: flex;
        align-items: center;
        gap: $spacing-1;

        &-star {
          font-size: 0.875rem;
        }

        &-value {
          font-size: $font-size-sm;
          font-weight: $font-weight-semibold;
          color: $neutral-800;
        }

        &-count {
          font-size: $font-size-xs;
          color: $neutral-400;
        }
      }

      &__duration {
        font-size: $font-size-xs;
        color: $neutral-500;
        background: $neutral-100;
        padding: $spacing-1 $spacing-2;
        border-radius: $radius-md;
      }

      &__footer {
        @include flex-between;
        margin-top: auto;
        padding-top: $spacing-3;
        border-top: 1px solid $neutral-100;
      }

      &__price {
        display: flex;
        align-items: center;
        gap: $spacing-2;

        &-original {
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

      &__btn {
        display: flex;
        align-items: center;
        gap: $spacing-1;
        padding: $spacing-2 $spacing-4;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: $primary-600;
        background: $primary-50;
        border: 1px solid $primary-200;
        border-radius: $radius-lg;
        cursor: pointer;
        transition: all $transition-fast;

        &:hover {
          background: $primary-100;
        }

        &--added {
          color: $success-600;
          background: $success-50;
          border-color: $success-500;
        }
      }
    }
  `]
})
export class ServiceCardComponent {
    private storageService = inject(StorageService);

    service = input.required<Service>();
    addedToCart = output<Service>();
    removedFromCart = output<Service>();

    readonly placeholderImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop';

    get discountPercentage(): number {
        const svc = this.service();
        if (!svc.discountedPrice) return 0;
        return Math.round(((svc.price - svc.discountedPrice) / svc.price) * 100);
    }

    isInCart(): boolean {
        return this.storageService.isInCart(this.service().id);
    }

    onAddToCart(): void {
        this.storageService.addToCart(this.service());
        this.addedToCart.emit(this.service());
    }

    onRemoveFromCart(): void {
        this.storageService.removeFromCart(this.service().id);
        this.removedFromCart.emit(this.service());
    }
}
