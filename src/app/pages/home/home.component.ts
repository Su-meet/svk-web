import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ServiceDataService } from '../../core/services/service-data.service';
import { SeoService } from '../../core/services/seo.service';
import { CategoryCardComponent } from '../../shared/components/category-card.component';
import { ServiceCardComponent } from '../../shared/components/service-card.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, CategoryCardComponent, ServiceCardComponent],
    template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__container">
        <div class="hero__content">
          <h1 class="hero__title">
            Home service experts at your 
            <span class="hero__title-accent">doorstep</span>
          </h1>
          <p class="hero__subtitle">
            Book trusted professionals for all your home needs - AC repair, beauty services, 
            cleaning, electrician, plumber and more.
          </p>
          
          <!-- Search Bar -->
          <div class="hero__search">
            <span class="hero__search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search for AC repair, salon, cleaning..."
              class="hero__search-input"
              [(value)]="searchQuery"
              (input)="onSearch($event)"
            />
            <button class="hero__search-btn">Search</button>
          </div>

          <!-- Quick Stats -->
          <div class="hero__stats">
            <div class="hero__stat">
              <span class="hero__stat-value">4.8 ⭐</span>
              <span class="hero__stat-label">Service Rating</span>
            </div>
            <div class="hero__stat">
              <span class="hero__stat-value">{{ statistics.happyCustomers }}</span>
              <span class="hero__stat-label">Happy Customers</span>
            </div>
            <div class="hero__stat">
              <span class="hero__stat-value">{{ statistics.experiencedExperts }}</span>
              <span class="hero__stat-label">Experienced Experts</span>
            </div>
          </div>
        </div>

        <!-- Hero Image/Animation Side -->
        <div class="hero__visual">
          <div class="hero__visual-grid">
            <div class="hero__visual-item hero__visual-item--1">
              <span>🔧</span>
              <span>Repairs</span>
            </div>
            <div class="hero__visual-item hero__visual-item--2">
              <span>💆‍♀️</span>
              <span>Spa</span>
            </div>
            <div class="hero__visual-item hero__visual-item--3">
              <span>🧹</span>
              <span>Cleaning</span>
            </div>
            <div class="hero__visual-item hero__visual-item--4">
              <span>❄️</span>
              <span>AC</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section section--categories">
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">What are you looking for?</h2>
          <p class="section__subtitle">Browse our wide range of professional home services</p>
        </div>
        
        <div class="categories-grid">
          @for (category of categories(); track category.id) {
            <app-category-card [category]="category" />
          }
        </div>
      </div>
    </section>

    <!-- Top Booked Services -->
    <section class="section section--services">
      <div class="container">
        <div class="section__header">
          <div>
            <h2 class="section__title">Top Most Booked Services</h2>
            <p class="section__subtitle">Popular services loved by our customers</p>
          </div>
          <a routerLink="/services" class="section__link">
            View All Services →
          </a>
        </div>
        
        <div class="services-grid">
          @for (service of topServices().slice(0, 8); track service.id) {
            <app-service-card [service]="service" />
          }
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="section section--featured">
      <div class="container">
        <!-- Beauty & Grooming -->
        <div class="featured-category">
          <div class="featured-category__header">
            <div class="featured-category__icon" style="background: #ec489915">💆‍♀️</div>
            <h3 class="featured-category__title">Beauty, Grooming & Wellness</h3>
          </div>
          <div class="featured-category__tags">
            <a routerLink="/services/womens-beauty-spa" class="featured-category__tag">Women's Salon</a>
            <a routerLink="/services/womens-beauty-spa" class="featured-category__tag">Spa</a>
            <a routerLink="/services/womens-beauty-spa" class="featured-category__tag">Bridal & Party Makeup</a>
            <a routerLink="/services/mens-grooming" class="featured-category__tag">Men's Haircut</a>
            <a routerLink="/services/mens-grooming" class="featured-category__tag">Beard Grooming & Styling</a>
          </div>
        </div>

        <!-- AC & Appliance -->
        <div class="featured-category">
          <div class="featured-category__header">
            <div class="featured-category__icon" style="background: #0ea5e915">❄️</div>
            <h3 class="featured-category__title">AC Repair & Appliance Services</h3>
          </div>
          <div class="featured-category__tags">
            <a routerLink="/services/ac-appliance-electronics" class="featured-category__tag">AC</a>
            <a routerLink="/services/ac-appliance-electronics" class="featured-category__tag">Washing Machine</a>
            <a routerLink="/services/ac-appliance-electronics" class="featured-category__tag">Refrigerator / Fridge</a>
            <a routerLink="/services/ac-appliance-electronics" class="featured-category__tag">Air Cooler</a>
            <a routerLink="/services/ac-appliance-electronics" class="featured-category__tag">RO / Water Purifier</a>
          </div>
        </div>

        <!-- Home Cleaning -->
        <div class="featured-category">
          <div class="featured-category__header">
            <div class="featured-category__icon" style="background: #22c55e15">🧹</div>
            <h3 class="featured-category__title">Home Cleaning & Hygiene</h3>
          </div>
          <div class="featured-category__tags">
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Full Home Deep Cleaning</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Bathroom Cleaning</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Kitchen Cleaning</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Sofa Cleaning</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Carpet Cleaning</a>
          </div>
        </div>

        <!-- Electrician -->
        <div class="featured-category">
          <div class="featured-category__header">
            <div class="featured-category__icon" style="background: #f59e0b15">⚡</div>
            <h3 class="featured-category__title">Electrician</h3>
          </div>
          <div class="featured-category__tags">
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Switch Repair</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Fan Installation</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Wiring Work</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Light Installation</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Inverter / UPS Repair</a>
          </div>
        </div>

        <!-- Plumber -->
        <div class="featured-category">
          <div class="featured-category__header">
            <div class="featured-category__icon" style="background: #3b82f615">🔧</div>
            <h3 class="featured-category__title">Plumber</h3>
          </div>
          <div class="featured-category__tags">
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Tap Repair</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Flush Repair</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Pipe Leakage Fix</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Drainage Blockage Removal</a>
            <a routerLink="/services/electrician-plumber-cleaning" class="featured-category__tag">Tile Grouting</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section section--why-us">
      <div class="container">
        <div class="section__header section__header--center">
          <h2 class="section__title">Why Choose SVK Experts?</h2>
          <p class="section__subtitle">We're committed to providing the best service experience</p>
        </div>

        <div class="why-us-grid">
          <div class="why-us-card">
            <div class="why-us-card__icon">✅</div>
            <h3 class="why-us-card__title">Verified Professionals</h3>
            <p class="why-us-card__text">All our service partners are thoroughly verified and trained</p>
          </div>
          <div class="why-us-card">
            <div class="why-us-card__icon">💰</div>
            <h3 class="why-us-card__title">Transparent Pricing</h3>
            <p class="why-us-card__text">No hidden charges. See final price before booking</p>
          </div>
          <div class="why-us-card">
            <div class="why-us-card__icon">🛡️</div>
            <h3 class="why-us-card__title">Service Warranty</h3>
            <p class="why-us-card__text">Up to 30-day warranty on all services</p>
          </div>
          <div class="why-us-card">
            <div class="why-us-card__icon">⚡</div>
            <h3 class="why-us-card__title">Quick Response</h3>
            <p class="why-us-card__text">Book now and get service at your preferred time</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section section--cta">
      <div class="container">
        <div class="cta-card">
          <div class="cta-card__content">
            <h2 class="cta-card__title">Ready to book a service?</h2>
            <p class="cta-card__text">Get expert help at your doorstep. Book now via WhatsApp!</p>
          </div>
          <a href="https://wa.me/919370443220?text=Hi! I want to book a service" 
             target="_blank" 
             class="cta-card__btn">
            <span>💬</span>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  `,
    styles: [`
    @use '../../../styles/variables' as *;
    @use '../../../styles/mixins' as *;

    // Hero Section
    .hero {
      padding: 100px 0 $spacing-16;
      background: linear-gradient(135deg, $primary-50 0%, white 50%, $accent-50 100%);
      overflow: hidden;

      &__container {
        @include container;
        display: grid;
        gap: $spacing-12;
        align-items: center;

        @include lg {
          grid-template-columns: 1fr 1fr;
        }
      }

      &__content {
        text-align: center;

        @include lg {
          text-align: left;
        }
      }

      &__title {
        @include heading-xl;
        margin-bottom: $spacing-6;
        color: $neutral-900;

        &-accent {
          color: $primary-600;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: $accent-300;
            opacity: 0.5;
            z-index: -1;
          }
        }
      }

      &__subtitle {
        font-size: $font-size-lg;
        color: $neutral-600;
        margin-bottom: $spacing-8;
        max-width: 500px;

        @include lg {
          margin-bottom: $spacing-10;
        }
      }

      &__search {
        display: flex;
        align-items: center;
        gap: $spacing-3;
        padding: $spacing-2;
        padding-left: $spacing-4;
        background: white;
        border-radius: $radius-full;
        box-shadow: $shadow-lg;
        max-width: 500px;
        margin: 0 auto $spacing-10;

        @include lg {
          margin: 0 0 $spacing-10;
        }

        &-icon {
          font-size: 1.25rem;
          opacity: 0.5;
        }

        &-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: $font-size-base;
          outline: none;
          min-width: 0;

          &::placeholder {
            color: $neutral-400;
          }
        }

        &-btn {
          padding: $spacing-3 $spacing-6;
          font-size: $font-size-sm;
          font-weight: $font-weight-semibold;
          color: white;
          background: $primary-600;
          border: none;
          border-radius: $radius-full;
          cursor: pointer;
          transition: all $transition-fast;
          white-space: nowrap;

          &:hover {
            background: $primary-700;
          }
        }
      }

      &__stats {
        display: flex;
        gap: $spacing-8;
        justify-content: center;

        @include lg {
          justify-content: flex-start;
        }
      }

      &__stat {
        display: flex;
        flex-direction: column;
        align-items: center;

        @include lg {
          align-items: flex-start;
        }

        &-value {
          font-size: $font-size-xl;
          font-weight: $font-weight-bold;
          color: $neutral-900;
        }

        &-label {
          font-size: $font-size-xs;
          color: $neutral-500;
        }
      }

      &__visual {
        display: none;

        @include lg {
          display: flex;
          justify-content: center;
        }
      }

      &__visual-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: $spacing-4;
        animation: float 6s ease-in-out infinite;
      }

      &__visual-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: $spacing-2;
        padding: $spacing-6;
        background: white;
        border-radius: $radius-xl;
        box-shadow: $shadow-md;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: $neutral-700;

        span:first-child {
          font-size: 2rem;
        }

        &--1 { animation-delay: 0s; }
        &--2 { animation-delay: 0.5s; }
        &--3 { animation-delay: 1s; }
        &--4 { animation-delay: 1.5s; }
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    // Section Styles
    .section {
      @include section;

      &--categories {
        background: white;
      }

      &--services {
        background: $neutral-50;
      }

      &--featured {
        background: white;
      }

      &--why-us {
        background: $neutral-50;
      }

      &--cta {
        background: white;
      }

      &__header {
        @include flex-between;
        flex-wrap: wrap;
        gap: $spacing-4;
        margin-bottom: $spacing-8;

        &--center {
          flex-direction: column;
          text-align: center;
          justify-content: center;
        }
      }

      &__title {
        @include heading-lg;
        margin-bottom: $spacing-2;
      }

      &__subtitle {
        font-size: $font-size-base;
        color: $neutral-500;
        margin: 0;
      }

      &__link {
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: $primary-600;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    // Categories Grid
    .categories-grid {
      display: grid;
      gap: $spacing-4;
      grid-template-columns: repeat(2, 1fr);

      @include sm {
        grid-template-columns: repeat(3, 1fr);
      }

      @include lg {
        grid-template-columns: repeat(4, 1fr);
      }

      @include xl {
        grid-template-columns: repeat(5, 1fr);
      }
    }

    // Services Grid
    .services-grid {
      display: grid;
      gap: $spacing-6;
      grid-template-columns: 1fr;

      @include sm {
        grid-template-columns: repeat(2, 1fr);
      }

      @include lg {
        grid-template-columns: repeat(3, 1fr);
      }

      @include xl {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    // Featured Category
    .featured-category {
      padding: $spacing-6;
      background: $neutral-50;
      border-radius: $radius-xl;
      margin-bottom: $spacing-6;

      &:last-child {
        margin-bottom: 0;
      }

      &__header {
        display: flex;
        align-items: center;
        gap: $spacing-3;
        margin-bottom: $spacing-4;
      }

      &__icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        border-radius: $radius-lg;
      }

      &__title {
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: $neutral-900;
      }

      &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-2;
      }

      &__tag {
        padding: $spacing-2 $spacing-4;
        font-size: $font-size-sm;
        color: $neutral-700;
        background: white;
        border: 1px solid $neutral-200;
        border-radius: $radius-full;
        text-decoration: none;
        transition: all $transition-fast;

        &:hover {
          background: $primary-50;
          border-color: $primary-300;
          color: $primary-700;
        }
      }
    }

    // Why Us Grid
    .why-us-grid {
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

    .why-us-card {
      text-align: center;
      padding: $spacing-8 $spacing-6;
      background: white;
      border-radius: $radius-xl;
      box-shadow: $shadow-sm;

      &__icon {
        font-size: 2.5rem;
        margin-bottom: $spacing-4;
      }

      &__title {
        font-size: $font-size-base;
        font-weight: $font-weight-semibold;
        color: $neutral-900;
        margin-bottom: $spacing-2;
      }

      &__text {
        font-size: $font-size-sm;
        color: $neutral-500;
        margin: 0;
      }
    }

    // CTA Card
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
  `]
})
export class HomeComponent implements OnInit {
    private serviceData = inject(ServiceDataService);
    private seo = inject(SeoService);

    categories = this.serviceData.allCategories;
    topServices = this.serviceData.topBookedServices;
    statistics = this.serviceData.statistics;
    searchQuery = signal('');

    ngOnInit(): void {
        this.seo.setHomePage();
    }

    onSearch(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchQuery.set(value);
        // Could navigate to search results page
    }
}
