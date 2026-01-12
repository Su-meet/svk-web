import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceCategory } from '../../core/models/service.model';

@Component({
    selector: 'app-category-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink],
    template: `
    <a [routerLink]="['/services', category().slug]" class="category-card">
      <div class="category-card__icon" [style.background-color]="category().color + '15'">
        <span [style.font-size.rem]="2">{{ category().icon }}</span>
      </div>
      <h3 class="category-card__name">{{ category().name }}</h3>
    </a>
  `,
    styles: [`
    @use '../../../styles/variables' as *;
    @use '../../../styles/mixins' as *;

    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $spacing-3;
      padding: $spacing-6 $spacing-4;
      text-align: center;
      text-decoration: none;
      background: white;
      border-radius: $radius-xl;
      border: 1px solid $neutral-100;
      transition: all $transition-base;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: $shadow-lg;
        border-color: transparent;

        .category-card__icon {
          transform: scale(1.1);
        }
      }

      &__icon {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: $radius-2xl;
        transition: transform $transition-base;
      }

      &__name {
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: $neutral-700;
        line-height: 1.4;
        @include line-clamp(2);
      }
    }
  `]
})
export class CategoryCardComponent {
    category = input.required<ServiceCategory>();
}
