import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <div class="header__container">
        <!-- Logo -->
        <a routerLink="/" class="header__logo">
          <span class="header__logo-icon">🏠</span>
          <span class="header__logo-text">
            <span class="header__logo-name">SVK</span>
            <span class="header__logo-tagline">Experts</span>
          </span>
        </a>

        <!-- Search Bar - Desktop -->
        <div class="header__search">
          <span class="header__search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search for services..."
            class="header__search-input"
            (focus)="onSearchFocus()"
            (input)="onSearchInput($event)"
          />
        </div>

        <!-- Navigation -->
        <nav class="header__nav">
          <a routerLink="/services" class="header__nav-link">
            <span class="header__nav-icon">📍</span>
            <span>Use Current Location</span>
          </a>
          
          <a href="https://wa.me/918920803434?text=Hi! I want to join as a Service Partner" 
             target="_blank" 
             class="header__nav-link header__nav-link--partner">
            <span class="header__nav-icon">🤝</span>
            <span>Join as Partner</span>
          </a>

          <a routerLink="/cart" class="header__cart">
            <span class="header__cart-icon">🛒</span>
            @if (cartCount() > 0) {
              <span class="header__cart-badge">{{ cartCount() }}</span>
            }
          </a>

          <button class="header__menu-btn" (click)="toggleMobileMenu()">
            <span class="header__menu-icon">☰</span>
          </button>
        </nav>
      </div>

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen()) {
        <div class="header__mobile-menu">
          <a routerLink="/" class="header__mobile-link" (click)="closeMobileMenu()">Home</a>
          <a routerLink="/services" class="header__mobile-link" (click)="closeMobileMenu()">Services</a>
          <a routerLink="/cart" class="header__mobile-link" (click)="closeMobileMenu()">
            Cart 
            @if (cartCount() > 0) {
              <span class="badge">({{ cartCount() }})</span>
            }
          </a>
          <a href="https://wa.me/918920803434?text=Hi! I want to join as a Service Partner" 
             target="_blank" 
             class="header__mobile-link">
            Join as Partner
          </a>
        </div>
      }
    </header>
  `,
  styles: [`
    @use '../../../styles/variables' as *;
    @use '../../../styles/mixins' as *;

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: $z-fixed;
      background: white;
      border-bottom: 1px solid $neutral-100;
      transition: all $transition-base;

      &.scrolled {
        box-shadow: $shadow-md;
      }

      &__container {
        @include container;
        @include flex-between;
        height: 70px;
        gap: $spacing-4;
      }

      &__logo {
        display: flex;
        align-items: center;
        gap: $spacing-2;
        text-decoration: none;
        flex-shrink: 0;

        &-icon {
          font-size: 1.75rem;
        }

        &-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        &-name {
          font-size: $font-size-xl;
          font-weight: $font-weight-bold;
          color: $primary-600;
        }

        &-tagline {
          font-size: $font-size-xs;
          color: $neutral-500;
          font-weight: $font-weight-medium;
        }
      }

      &__search {
        flex: 1;
        max-width: 480px;
        display: none;
        align-items: center;
        gap: $spacing-3;
        padding: $spacing-3 $spacing-4;
        background: $neutral-100;
        border-radius: $radius-full;
        transition: all $transition-base;

        @include md {
          display: flex;
        }

        &:focus-within {
          background: white;
          box-shadow: 0 0 0 2px $primary-500;
        }

        &-icon {
          font-size: 1rem;
          opacity: 0.6;
        }

        &-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: $font-size-sm;
          color: $neutral-800;
          outline: none;

          &::placeholder {
            color: $neutral-400;
          }
        }
      }

      &__nav {
        display: flex;
        align-items: center;
        gap: $spacing-2;

        @include md {
          gap: $spacing-4;
        }

        &-link {
          display: none;
          align-items: center;
          gap: $spacing-2;
          padding: $spacing-2 $spacing-3;
          font-size: $font-size-sm;
          font-weight: $font-weight-medium;
          color: $neutral-700;
          text-decoration: none;
          border-radius: $radius-lg;
          transition: all $transition-fast;

          @include lg {
            display: flex;
          }

          &:hover {
            background: $neutral-100;
            color: $primary-600;
          }

          &--partner {
            background: $primary-50;
            color: $primary-700;

            &:hover {
              background: $primary-100;
            }
          }
        }

        &-icon {
          font-size: 1rem;
        }
      }

      &__cart {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: $neutral-100;
        border-radius: $radius-full;
        text-decoration: none;
        transition: all $transition-fast;

        &:hover {
          background: $primary-100;
        }

        &-icon {
          font-size: 1.25rem;
        }

        &-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          min-width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 $spacing-1;
          font-size: $font-size-xs;
          font-weight: $font-weight-bold;
          color: white;
          background: $accent-500;
          border-radius: $radius-full;
        }
      }

      &__menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: transparent;
        border: none;
        cursor: pointer;

        @include lg {
          display: none;
        }

        &:hover {
          background: $neutral-100;
          border-radius: $radius-lg;
        }
      }

      &__menu-icon {
        font-size: 1.5rem;
      }

      &__mobile-menu {
        display: flex;
        flex-direction: column;
        padding: $spacing-4;
        border-top: 1px solid $neutral-100;
        background: white;
        animation: fadeInDown $transition-base;

        @include lg {
          display: none;
        }
      }

      &__mobile-link {
        padding: $spacing-3 $spacing-4;
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $neutral-700;
        text-decoration: none;
        border-radius: $radius-lg;

        &:hover {
          background: $neutral-100;
          color: $primary-600;
        }
      }
    }
  `]
})
export class HeaderComponent {
  private storageService = inject(StorageService);

  cartCount = this.storageService.cartCount;
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  onSearchFocus(): void {
    // Could open search modal or navigate to search page
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    // Handle search
  }
}
