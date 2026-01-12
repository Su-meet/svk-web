import { Injectable, signal, computed } from '@angular/core';
import { ServiceCategory, Service, SearchResult } from '../models/service.model';
import { SERVICE_CATEGORIES, SERVICES, TOP_BOOKED_SERVICE_IDS, CITIES, STATISTICS } from '../data/services.data';

@Injectable({
    providedIn: 'root'
})
export class ServiceDataService {
    private readonly categories = signal<ServiceCategory[]>(SERVICE_CATEGORIES);
    private readonly services = signal<Service[]>(SERVICES);

    readonly allCategories = this.categories.asReadonly();
    readonly allServices = this.services.asReadonly();

    readonly featuredServices = computed(() =>
        this.services().filter(s => s.isFeatured)
    );

    readonly popularServices = computed(() =>
        this.services().filter(s => s.isPopular)
    );

    readonly topBookedServices = computed(() =>
        TOP_BOOKED_SERVICE_IDS
            .map(id => this.services().find(s => s.id === id))
            .filter((s): s is Service => s !== undefined)
    );

    readonly cities = CITIES;
    readonly statistics = STATISTICS;

    getCategoryById(id: string): ServiceCategory | undefined {
        return this.categories().find(c => c.id === id);
    }

    getCategoryBySlug(slug: string): ServiceCategory | undefined {
        return this.categories().find(c => c.slug === slug);
    }

    getServiceById(id: string): Service | undefined {
        return this.services().find(s => s.id === id);
    }

    getServiceBySlug(slug: string): Service | undefined {
        return this.services().find(s => s.slug === slug);
    }

    getServicesByCategory(categoryId: string): Service[] {
        return this.services().filter(s => s.categoryId === categoryId);
    }

    getServicesByCategorySlug(slug: string): Service[] {
        const category = this.getCategoryBySlug(slug);
        if (!category) return [];
        return this.getServicesByCategory(category.id);
    }

    searchServices(query: string): SearchResult {
        const lowercaseQuery = query.toLowerCase().trim();

        if (!lowercaseQuery) {
            return { services: [], categories: [] };
        }

        const matchingServices = this.services().filter(service =>
            service.name.toLowerCase().includes(lowercaseQuery) ||
            service.description.toLowerCase().includes(lowercaseQuery) ||
            service.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );

        const matchingCategories = this.categories().filter(category =>
            category.name.toLowerCase().includes(lowercaseQuery) ||
            category.description.toLowerCase().includes(lowercaseQuery)
        );

        return {
            services: matchingServices.slice(0, 10),
            categories: matchingCategories
        };
    }

    getRelatedServices(serviceId: string, limit: number = 4): Service[] {
        const service = this.getServiceById(serviceId);
        if (!service) return [];

        return this.services()
            .filter(s => s.categoryId === service.categoryId && s.id !== serviceId)
            .slice(0, limit);
    }
}
