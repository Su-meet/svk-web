import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private meta = inject(Meta);
    private title = inject(Title);

    private readonly defaultTitle = 'SVK Experts - Home Service Experts at Your Doorstep';
    private readonly defaultDescription = 'Book trusted home services - AC repair, electrician, plumber, beauty & spa, cleaning, pest control and more. 100K+ happy customers. Book now!';
    private readonly defaultKeywords = 'home services, AC repair, electrician, plumber, beauty services, cleaning, pest control, home maintenance, doorstep services';
    private readonly siteName = 'SVK Experts';
    private readonly siteUrl = 'https://svkexperts.com';

    updateSeo(data: Partial<SeoData>): void {
        const title = data.title ? `${data.title} | ${this.siteName}` : this.defaultTitle;
        const description = data.description || this.defaultDescription;
        const keywords = data.keywords || this.defaultKeywords;
        const image = data.image || '/images/og-image.jpg';
        const url = data.url || this.siteUrl;
        const type = data.type || 'website';

        // Set title
        this.title.setTitle(title);

        // Basic meta tags
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'keywords', content: keywords });
        this.meta.updateTag({ name: 'robots', content: 'index, follow' });

        // Open Graph tags
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: image });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:type', content: type });
        this.meta.updateTag({ property: 'og:site_name', content: this.siteName });

        // Twitter Card tags
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: image });
    }

    setServicePage(serviceName: string, serviceDescription: string): void {
        this.updateSeo({
            title: `${serviceName} - Book Now`,
            description: serviceDescription,
            keywords: `${serviceName}, book ${serviceName}, ${serviceName} at home, ${serviceName} service`,
            type: 'product'
        });
    }

    setCategoryPage(categoryName: string, categoryDescription: string): void {
        this.updateSeo({
            title: `${categoryName} Services`,
            description: categoryDescription,
            keywords: `${categoryName}, ${categoryName} services, book ${categoryName}`
        });
    }

    setHomePage(): void {
        this.updateSeo({
            title: '',
            description: this.defaultDescription,
            keywords: this.defaultKeywords
        });
        this.title.setTitle(this.defaultTitle);
    }
}
