import { Component, inject, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceDataService } from '../../core/services/service-data.service';
import { SeoService } from '../../core/services/seo.service';
import { ServiceCardComponent } from '../../shared/components/service-card.component';
import { CategoryCardComponent } from '../../shared/components/category-card.component';
import { ServiceCategory } from '../../core/models/service.model';

@Component({
    selector: 'app-services',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, ServiceCardComponent, CategoryCardComponent],
    template: `
    <div class="services-page">
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <nav class="breadcrumb">
            <a routerLink="/">Home</a>
            <span>/</span>
            @if (activeCategory()) {
              <a routerLink="/services">Services</a>
              <span>/</span>
              <span>{{ activeCategory()?.name }}</span>
            } @else {
              <span>All Services</span>
            }
          </nav>
          
          <h1 class="page-header__title">
            @if (activeCategory()) {
              {{ activeCategory()?.name }}
            } @else {
              All Services
            }
          </h1>
          
          <p class="page-header__subtitle">
            @if (activeCategory()) {
              {{ activeCategory()?.description }}
            } @else {
              Browse our complete range of professional home services
            }
          </p>
        </div>
      </section>

      <!-- Categories Filter -->
      @if (!activeCategory()) {
        <section class="categories-filter">
          <div class="container">
            <div class="categories-filter__scroll">
              <button 
                class="categories-filter__btn" 
                [class.active]="!activeCategory()"
                (click)="clearCategory()">
                All
              </button>
              @for (category of categories(); track category.id) {
                <a 
                  [routerLink]="['/services', category.slug]" 
                  class="categories-filter__btn">
                  <span>{{ category.icon }}</span>
                  {{ category.name }}
                </a>
              }
            </div>
          </div>
        </section>
      }

      <!-- Services Grid -->
      <section class="services-section">
        <div class="container">
          @if (activeCategory()) {
            <!-- Back Button -->
            <a routerLink="/services" class="back-link">
              ← Back to All Services
            </a>
          }

          <!-- Services Count -->
          <div class="services-section__header">
            <p class="services-section__count">
              {{ filteredServices().length }} services available
            </p>
          </div>

          @if (filteredServices().length > 0) {
            <div class="services-grid">
              @for (service of filteredServices(); track service.id) {
                <app-service-card [service]="service" />
              }
            </div>
          } @else {
            <div class="empty-state">
              <span class="empty-state__icon">🔍</span>
              <h3 class="empty-state__title">No services found</h3>
              <p class="empty-state__text">Try selecting a different category</p>
              <a routerLink="/services" class="empty-state__btn">View All Services</a>
            </div>
          }
        </div>
      </section>

      <!-- Other Categories -->
      @if (activeCategory()) {
        <section class="other-categories">
          <div class="container">
            <h2 class="other-categories__title">Explore Other Categories</h2>
            <div class="categories-grid">
              @for (category of otherCategories(); track category.id) {
                <app-category-card [category]="category" />
              }
            </div>
          </div>
        </section>
      }
    </div>
  `,
    styles: [`
    @use '../../../styles/variables' as *;
    @use '../../../styles/mixins' as *;

    .services-page {
      padding-top: 70px;
    }

    .page-header {
      padding: $spacing-10 0;
      background: linear-gradient(135deg, $primary-50 0%, white 100%);
      border-bottom: 1px solid $neutral-100;

      &__title {
        @include heading-lg;
        margin-bottom: $spacing-2;
      }

      &__subtitle {
        font-size: $font-size-base;
        color: $neutral-500;
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

    .categories-filter {
      background: white;
      border-bottom: 1px solid $neutral-100;
      position: sticky;
      top: 70px;
      z-index: 100;

      &__scroll {
        display: flex;
        gap: $spacing-2;
        padding: $spacing-4 0;
        overflow-x: auto;
        @include custom-scrollbar;

        &::-webkit-scrollbar {
          height: 4px;
        }
      }

      &__btn {
        display: flex;
        align-items: center;
        gap: $spacing-2;
        padding: $spacing-2 $spacing-4;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: $neutral-700;
        background: $neutral-100;
        border: none;
        border-radius: $radius-full;
        cursor: pointer;
        text-decoration: none;
        white-space: nowrap;
        transition: all $transition-fast;

        &:hover, &.active {
          background: $primary-100;
          color: $primary-700;
        }
      }
    }

    .services-section {
      @include section;
      background: $neutral-50;

      &__header {
        margin-bottom: $spacing-6;
      }

      &__count {
        font-size: $font-size-sm;
        color: $neutral-500;
        margin: 0;
      }
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      color: $primary-600;
      text-decoration: none;
      margin-bottom: $spacing-6;

      &:hover {
        text-decoration: underline;
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
        grid-template-columns: repeat(3, 1fr);
      }

      @include xl {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .empty-state {
      text-align: center;
      padding: $spacing-16 $spacing-4;

      &__icon {
        font-size: 4rem;
        margin-bottom: $spacing-4;
      }

      &__title {
        font-size: $font-size-xl;
        font-weight: $font-weight-semibold;
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

    .other-categories {
      @include section;
      background: white;

      &__title {
        @include heading-md;
        margin-bottom: $spacing-8;
        text-align: center;
      }
    }

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
  `]
})
export class ServicesComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private serviceData = inject(ServiceDataService);
    private seo = inject(SeoService);

    categories = this.serviceData.allCategories;
    allServices = this.serviceData.allServices;

    activeCategory = signal<ServiceCategory | null>(null);

    filteredServices = computed(() => {
        const category = this.activeCategory();
        if (category) {
            return this.serviceData.getServicesByCategory(category.id);
        }
        return this.allServices();
    });

    otherCategories = computed(() => {
        const active = this.activeCategory();
        if (!active) return this.categories();
        return this.categories().filter(c => c.id !== active.id);
    });

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const categorySlug = params['category'];
            if (categorySlug) {
                const category = this.serviceData.getCategoryBySlug(categorySlug);
                this.activeCategory.set(category || null);

                if (category) {
                    this.seo.setCategoryPage(category.name, category.description);
                }
            } else {
                this.activeCategory.set(null);
                this.seo.updateSeo({
                    title: 'All Services',
                    description: 'Browse our complete range of professional home services including AC repair, electrician, plumber, beauty, cleaning and more.'
                });
            }
        });
    }

    clearCategory(): void {
        this.activeCategory.set(null);
    }
}
