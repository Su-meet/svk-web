import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <!-- Cities Section -->
      <section class="footer__cities">
        <div class="footer__container">
          <h3 class="footer__cities-title">Cities We Serve</h3>
          <p class="footer__cities-list">
            Bengaluru | Hyderabad | Mumbai | Delhi NCR | Chennai | Pune | Ahmedabad | 
            Kolkata | Jaipur | Surat | Lucknow | Indore | Coimbatore | Kochi | Nagpur | 
            Vizag | Bhopal | Thiruvananthapuram | Chandigarh | Vadodara | Patna | Kanpur | 
            Nashik | Mysore | Vijayawada | Ludhiana | Madurai | Rajkot | Guntur | Nellore | 
            Warangal | Khammam
          </p>
        </div>
      </section>

      <!-- Main Footer -->
      <div class="footer__main">
        <div class="footer__container">
          <div class="footer__grid">
            <!-- Company Info -->
            <div class="footer__section">
              <div class="footer__logo">
                <span class="footer__logo-icon">🏠</span>
                <div class="footer__logo-text">
                  <span class="footer__logo-name">SVK Experts</span>
                  <span class="footer__logo-tagline">Home Service Experts</span>
                </div>
              </div>
              <p class="footer__description">
                Your trusted partner for all home services. From repairs to beauty, 
                we bring expert solutions right to your doorstep.
              </p>
              <!-- Social Media -->
              <div class="footer__social">
                <a href="https://facebook.com/svkexperts" target="_blank" class="footer__social-link" aria-label="Facebook">
                  <span>📘</span>
                </a>
                <a href="https://instagram.com/svkexperts" target="_blank" class="footer__social-link" aria-label="Instagram">
                  <span>📷</span>
                </a>
                <a href="https://linkedin.com/company/svkexperts" target="_blank" class="footer__social-link" aria-label="LinkedIn">
                  <span>💼</span>
                </a>
                <a href="https://youtube.com/svkexperts" target="_blank" class="footer__social-link" aria-label="YouTube">
                  <span>▶️</span>
                </a>
                <a href="https://wa.me/918920803434" target="_blank" class="footer__social-link" aria-label="WhatsApp">
                  <span>💬</span>
                </a>
              </div>
            </div>

            <!-- Company Links -->
            <div class="footer__section">
              <h4 class="footer__section-title">Company</h4>
              <ul class="footer__links">
                <li><a routerLink="/about">About Us</a></li>
                <li><a routerLink="/terms">Terms & Conditions</a></li>
                <li><a routerLink="/privacy">Privacy Policy</a></li>
                <li><a routerLink="/contact">Contact Us</a></li>
              </ul>
            </div>

            <!-- For Customers -->
            <div class="footer__section">
              <h4 class="footer__section-title">For Customers</h4>
              <ul class="footer__links">
                <li><a routerLink="/services">Services We Offer</a></li>
                <li><a routerLink="/reviews">Reviews</a></li>
                <li><a routerLink="/cart">My Cart</a></li>
                <li><a routerLink="/bookings">My Bookings</a></li>
              </ul>
            </div>

            <!-- For Professionals -->
            <div class="footer__section">
              <h4 class="footer__section-title">For Professionals</h4>
              <ul class="footer__links">
                <li>
                  <a href="https://wa.me/918920803434?text=Hi! I want to join as a Service Partner" target="_blank">
                    Join as Service Partner
                  </a>
                </li>
                <li><a href="#">Partner Benefits</a></li>
                <li><a href="#">Partner Guidelines</a></li>
              </ul>
            </div>

            <!-- Download App -->
            <div class="footer__section">
              <h4 class="footer__section-title">Download App</h4>
              <div class="footer__apps">
                <a href="#" class="footer__app-btn">
                  <span class="footer__app-icon">🍎</span>
                  <div class="footer__app-text">
                    <span class="footer__app-label">Download on the</span>
                    <span class="footer__app-store">App Store</span>
                  </div>
                </a>
                <a href="#" class="footer__app-btn">
                  <span class="footer__app-icon">▶️</span>
                  <div class="footer__app-text">
                    <span class="footer__app-label">GET IT ON</span>
                    <span class="footer__app-store">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer__copyright">
        <div class="footer__container">
          <p>© {{ currentYear }} SVK Experts. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    @use '../../../styles/variables' as *;
    @use '../../../styles/mixins' as *;

    .footer {
      background: $neutral-900;
      color: $neutral-300;

      &__container {
        @include container;
      }

      &__cities {
        padding: $spacing-8 0;
        background: $neutral-800;
        text-align: center;

        &-title {
          font-size: $font-size-lg;
          font-weight: $font-weight-semibold;
          color: white;
          margin-bottom: $spacing-4;
        }

        &-list {
          font-size: $font-size-sm;
          line-height: 1.8;
          color: $neutral-400;
          max-width: 900px;
          margin: 0 auto;
        }
      }

      &__main {
        padding: $spacing-12 0;
      }

      &__grid {
        display: grid;
        gap: $spacing-8;
        grid-template-columns: 1fr;

        @include sm {
          grid-template-columns: repeat(2, 1fr);
        }

        @include lg {
          grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
        }
      }

      &__section {
        &-title {
          font-size: $font-size-base;
          font-weight: $font-weight-semibold;
          color: white;
          margin-bottom: $spacing-4;
        }
      }

      &__logo {
        display: flex;
        align-items: center;
        gap: $spacing-3;
        margin-bottom: $spacing-4;

        &-icon {
          font-size: 2rem;
        }

        &-text {
          display: flex;
          flex-direction: column;
        }

        &-name {
          font-size: $font-size-xl;
          font-weight: $font-weight-bold;
          color: white;
        }

        &-tagline {
          font-size: $font-size-xs;
          color: $neutral-400;
        }
      }

      &__description {
        font-size: $font-size-sm;
        line-height: 1.7;
        color: $neutral-400;
        margin-bottom: $spacing-6;
      }

      &__social {
        display: flex;
        gap: $spacing-3;

        &-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: $neutral-800;
          border-radius: $radius-lg;
          text-decoration: none;
          transition: all $transition-fast;
          font-size: 1.25rem;

          &:hover {
            background: $primary-600;
            transform: translateY(-2px);
          }
        }
      }

      &__links {
        list-style: none;

        li {
          margin-bottom: $spacing-3;
        }

        a {
          font-size: $font-size-sm;
          color: $neutral-400;
          text-decoration: none;
          transition: color $transition-fast;

          &:hover {
            color: white;
          }
        }
      }

      &__apps {
        display: flex;
        flex-direction: column;
        gap: $spacing-3;
      }

      &__app-btn {
        display: flex;
        align-items: center;
        gap: $spacing-3;
        padding: $spacing-3 $spacing-4;
        background: $neutral-800;
        border-radius: $radius-lg;
        text-decoration: none;
        transition: all $transition-fast;

        &:hover {
          background: $neutral-700;
        }
      }

      &__app-icon {
        font-size: 1.5rem;
      }

      &__app-text {
        display: flex;
        flex-direction: column;
      }

      &__app-label {
        font-size: $font-size-xs;
        color: $neutral-400;
      }

      &__app-store {
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        color: white;
      }

      &__copyright {
        padding: $spacing-6 0;
        border-top: 1px solid $neutral-800;
        text-align: center;

        p {
          font-size: $font-size-sm;
          color: $neutral-500;
          margin: 0;
        }
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
