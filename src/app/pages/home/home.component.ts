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
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
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
