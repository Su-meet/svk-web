import { Component, inject, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ServiceDataService } from '../../core/services/service-data.service';
import { StorageService } from '../../core/services/storage.service';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { SeoService } from '../../core/services/seo.service';
import { ServiceCardComponent } from '../../shared/components/service-card.component';
import { Service, ServiceCategory } from '../../core/models/service.model';

@Component({
    selector: 'app-service-detail',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, ServiceCardComponent, DecimalPipe],
    template: `
    <div class="service-detail-page">
      @if (service()) {
        <!-- Breadcrumb -->
        <section class="page-header">
          <div class="container">
            <nav class="breadcrumb">
              <a routerLink="/">Home</a>
              <span>/</span>
              <a routerLink="/services">Services</a>
              <span>/</span>
              @if (category()) {
                <a [routerLink]="['/services', category()?.slug]">{{ category()?.name }}</a>
                <span>/</span>
              }
              <span>{{ service()?.name }}</span>
            </nav>
          </div>
        </section>

        <!-- Service Detail -->
        <section class="service-detail">
          <div class="container">
            <div class="service-detail__grid">
              <!-- Image -->
              <div class="service-detail__image-section">
                <div class="service-detail__image" [style.background-image]="'url(' + placeholderImage + ')'">
                  @if (service()?.discountedPrice) {
                    <span class="service-detail__discount-badge">
                      {{ discountPercentage() }}% OFF
                    </span>
                  }
                </div>
              </div>

              <!-- Info -->
              <div class="service-detail__info">
                <div class="service-detail__category-badge">
                  {{ category()?.icon }} {{ category()?.name }}
                </div>
                
                <h1 class="service-detail__title">{{ service()?.name }}</h1>
                
                <div class="service-detail__rating">
                  <span class="service-detail__rating-stars">⭐</span>
                  <span class="service-detail__rating-value">{{ service()?.rating }}</span>
                  <span class="service-detail__rating-count">({{ service()?.reviewCount | number }} reviews)</span>
                </div>

                <div class="service-detail__price">
                  @if (service()?.discountedPrice) {
                    <span class="service-detail__price-original">₹{{ service()?.price }}</span>
                    <span class="service-detail__price-current">₹{{ service()?.discountedPrice }}</span>
                    <span class="service-detail__price-save">
                      You save ₹{{ (service()?.price ?? 0) - (service()?.discountedPrice ?? 0) }}
                    </span>
                  } @else {
                    <span class="service-detail__price-current">₹{{ service()?.price }}</span>
                  }
                </div>

                <div class="service-detail__meta">
                  <div class="service-detail__meta-item">
                    <span class="service-detail__meta-icon">⏱️</span>
                    <span>Duration: {{ service()?.duration }}</span>
                  </div>
                </div>

                <p class="service-detail__description">{{ service()?.description }}</p>

                <div class="service-detail__tags">
                  @for (tag of service()?.tags; track tag) {
                    <span class="service-detail__tag">{{ tag }}</span>
                  }
                </div>

                <!-- Actions -->
                <div class="service-detail__actions">
                  @if (isInCart()) {
                    <button class="btn-added" (click)="removeFromCart()">
                      ✓ Added to Cart
                    </button>
                  } @else {
                    <button class="btn-add" (click)="addToCart()">
                      Add to Cart
                    </button>
                  }
                  
                  <button class="btn-book" (click)="bookNow()">
                    <span>💬</span>
                    Book via WhatsApp
                  </button>
                </div>

                <!-- Trust Badges -->
                <div class="service-detail__trust">
                  <div class="service-detail__trust-item">
                    <span>✅</span>
                    <span>Verified Experts</span>
                  </div>
                  <div class="service-detail__trust-item">
                    <span>💰</span>
                    <span>No Hidden Charges</span>
                  </div>
                  <div class="service-detail__trust-item">
                    <span>🛡️</span>
                    <span>Service Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Related Services -->
        @if (relatedServices().length > 0) {
          <section class="related-services">
            <div class="container">
              <h2 class="related-services__title">Related Services</h2>
              <div class="services-grid">
                @for (service of relatedServices(); track service.id) {
                  <app-service-card [service]="service" />
                }
              </div>
            </div>
          </section>
        }

        <!-- CTA -->
        <section class="cta-section">
          <div class="container">
            <div class="cta-card">
              <div class="cta-card__content">
                <h2 class="cta-card__title">Need help choosing?</h2>
                <p class="cta-card__text">Chat with us on WhatsApp for personalized recommendations!</p>
              </div>
              <a href="https://wa.me/919370443220?text=Hi! I need help choosing a service" 
                 target="_blank" 
                 class="cta-card__btn">
                <span>💬</span>
                Chat with Us
              </a>
            </div>
          </div>
        </section>
      } @else {
        <!-- Loading or Not Found -->
        <section class="not-found">
          <div class="container">
            <div class="not-found__content">
              <span class="not-found__icon">🔍</span>
              <h1 class="not-found__title">Service Not Found</h1>
              <p class="not-found__text">The service you're looking for doesn't exist.</p>
              <a routerLink="/services" class="not-found__btn">Browse All Services</a>
            </div>
          </div>
        </section>
      }
    </div>
  `,
    styles: [`
    @use '../../../styles/variables' as *;
    @use '../../../styles/mixins' as *;

    .service-detail-page {
      padding-top: 70px;
    }

    .page-header {
      padding: $spacing-6 0;
      background: $neutral-50;
      border-bottom: 1px solid $neutral-100;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: $spacing-2;
      font-size: $font-size-sm;
      color: $neutral-500;
      flex-wrap: wrap;

      a {
        color: $primary-600;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .service-detail {
      @include section;
      background: white;

      &__grid {
        display: grid;
        gap: $spacing-10;

        @include lg {
          grid-template-columns: 1fr 1fr;
        }
      }

      &__image-section {
        position: relative;
      }

      &__image {
        position: relative;
        height: 300px;
        background-size: cover;
        background-position: center;
        background-color: $neutral-100;
        border-radius: $radius-xl;

        @include md {
          height: 400px;
        }
      }

      &__discount-badge {
        position: absolute;
        top: $spacing-4;
        left: $spacing-4;
        padding: $spacing-2 $spacing-4;
        font-size: $font-size-sm;
        font-weight: $font-weight-bold;
        color: white;
        background: $accent-500;
        border-radius: $radius-lg;
      }

      &__info {
        display: flex;
        flex-direction: column;
        gap: $spacing-4;
      }

      &__category-badge {
        display: inline-flex;
        align-items: center;
        gap: $spacing-2;
        padding: $spacing-2 $spacing-3;
        font-size: $font-size-sm;
        color: $primary-700;
        background: $primary-50;
        border-radius: $radius-lg;
        width: fit-content;
      }

      &__title {
        font-size: $font-size-3xl;
        font-weight: $font-weight-bold;
        color: $neutral-900;
        margin: 0;
      }

      &__rating {
        display: flex;
        align-items: center;
        gap: $spacing-2;

        &-stars {
          font-size: 1rem;
        }

        &-value {
          font-size: $font-size-base;
          font-weight: $font-weight-semibold;
          color: $neutral-800;
        }

        &-count {
          font-size: $font-size-sm;
          color: $neutral-500;
        }
      }

      &__price {
        display: flex;
        align-items: center;
        gap: $spacing-3;

        &-original {
          font-size: $font-size-lg;
          color: $neutral-400;
          text-decoration: line-through;
        }

        &-current {
          font-size: $font-size-3xl;
          font-weight: $font-weight-bold;
          color: $neutral-900;
        }

        &-save {
          padding: $spacing-1 $spacing-3;
          font-size: $font-size-sm;
          font-weight: $font-weight-medium;
          color: $success-700;
          background: $success-50;
          border-radius: $radius-full;
        }
      }

      &__meta {
        display: flex;
        gap: $spacing-6;

        &-item {
          display: flex;
          align-items: center;
          gap: $spacing-2;
          font-size: $font-size-sm;
          color: $neutral-600;
        }

        &-icon {
          font-size: 1.25rem;
        }
      }

      &__description {
        font-size: $font-size-base;
        line-height: 1.7;
        color: $neutral-600;
        margin: 0;
      }

      &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-2;
      }

      &__tag {
        padding: $spacing-1 $spacing-3;
        font-size: $font-size-xs;
        color: $neutral-600;
        background: $neutral-100;
        border-radius: $radius-full;
      }

      &__actions {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-3;
        padding-top: $spacing-4;
      }

      &__trust {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-6;
        padding-top: $spacing-6;
        border-top: 1px solid $neutral-100;

        &-item {
          display: flex;
          align-items: center;
          gap: $spacing-2;
          font-size: $font-size-sm;
          color: $neutral-600;
        }
      }
    }

    .btn-add {
      @include button-primary;
      padding: $spacing-4 $spacing-8;
      font-size: $font-size-base;
    }

    .btn-added {
      @include button-base;
      padding: $spacing-4 $spacing-8;
      font-size: $font-size-base;
      background: $success-50;
      color: $success-700;
      border: 1px solid $success-500;
    }

    .btn-book {
      @include button-accent;
      padding: $spacing-4 $spacing-8;
      font-size: $font-size-base;
    }

    .related-services {
      @include section;
      background: $neutral-50;

      &__title {
        @include heading-md;
        margin-bottom: $spacing-8;
      }
    }

    .services-grid {
      display: grid;
      gap: $spacing-6;
      grid-template-columns: 1fr;

      @include sm {
        grid-template-columns: repeat(2, 1fr);
      }

      @include lg {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .cta-section {
      @include section;
      background: white;
    }

    .cta-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $spacing-6;
      padding: $spacing-10 $spacing-6;
      text-align: center;
      background: linear-gradient(135deg, $primary-600 0%, $primary-800 100%);
      border-radius: $radius-2xl;

      @include md {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
        padding: $spacing-10 $spacing-12;
      }

      &__content {
        color: white;
      }

      &__title {
        font-size: $font-size-2xl;
        font-weight: $font-weight-bold;
        margin-bottom: $spacing-2;
      }

      &__text {
        font-size: $font-size-base;
        opacity: 0.9;
        margin: 0;
      }

      &__btn {
        display: flex;
        align-items: center;
        gap: $spacing-2;
        padding: $spacing-4 $spacing-8;
        font-size: $font-size-base;
        font-weight: $font-weight-semibold;
        color: $primary-700;
        background: white;
        border-radius: $radius-full;
        text-decoration: none;
        transition: all $transition-fast;
        white-space: nowrap;

        &:hover {
          transform: scale(1.05);
          box-shadow: $shadow-lg;
        }
      }
    }

    .not-found {
      padding: $spacing-20 0;
      text-align: center;

      &__content {
        max-width: 400px;
        margin: 0 auto;
      }

      &__icon {
        font-size: 4rem;
        margin-bottom: $spacing-6;
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
        margin-bottom: $spacing-6;
      }

      &__btn {
        @include button-primary;
      }
    }
  `]
})
export class ServiceDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private serviceData = inject(ServiceDataService);
    private storageService = inject(StorageService);
    private whatsappService = inject(WhatsAppService);
    private seo = inject(SeoService);

    service = signal<Service | undefined>(undefined);
    category = signal<ServiceCategory | undefined>(undefined);
    relatedServices = signal<Service[]>([]);

    readonly placeholderImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop';

    discountPercentage = computed(() => {
        const svc = this.service();
        if (!svc?.discountedPrice) return 0;
        return Math.round(((svc.price - svc.discountedPrice) / svc.price) * 100);
    });

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const slug = params['slug'];
            if (slug) {
                const svc = this.serviceData.getServiceBySlug(slug);
                this.service.set(svc);

                if (svc) {
                    const cat = this.serviceData.getCategoryById(svc.categoryId);
                    this.category.set(cat);

                    const related = this.serviceData.getRelatedServices(svc.id, 4);
                    this.relatedServices.set(related);

                    this.seo.setServicePage(svc.name, svc.description);
                }
            }
        });
    }

    isInCart(): boolean {
        const svc = this.service();
        return svc ? this.storageService.isInCart(svc.id) : false;
    }

    addToCart(): void {
        const svc = this.service();
        if (svc) {
            this.storageService.addToCart(svc);
        }
    }

    removeFromCart(): void {
        const svc = this.service();
        if (svc) {
            this.storageService.removeFromCart(svc.id);
        }
    }

    bookNow(): void {
        const svc = this.service();
        if (svc) {
            this.whatsappService.inquireAboutService(svc);
        }
    }
}
