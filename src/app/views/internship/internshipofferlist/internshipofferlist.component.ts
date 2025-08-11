// internshipofferlist.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InternshipOfferService } from '../../../services/stage/internshipoffer.service';
import { InternshipOffer } from '../../../services/stage/internshipoffer.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-internship-offer-list',
  templateUrl: './internshipofferlist.component.html',
  styleUrls: ['./internshipofferlist.component.scss'],
  providers: [DatePipe]
})
export class InternshipOfferListComponent implements OnInit {
  offers: InternshipOffer[] = [];
  loading = true;
  error: string | null = null;
  searchTerm = '';
  expandedOfferId: number | null = null; // Ajout pour suivre l'offre développée

    searchFields = {
    title: true,
    company: true,
    description: false,
    requirements: false
    };
    advancedSearch = false;

  constructor(
    private offerService: InternshipOfferService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadOffers();
  }


  loadOffers(): void {
    this.loading = true;
    this.error = null;
    
    this.offerService.getOffers().subscribe({
      next: (data) => {
        this.offers = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load internship offers. Please try again later.';
        this.loading = false;
        console.error('Error loading offers:', err);
      }
    });
  }


  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'shortDate') || '';
  }

  stripHtml(html: string): string {
    return html?.replace(/<[^>]*>/g, '') || '';
  }

  openGoogleForm(url: string) {
    window.open(url, '_blank');
  }

  // Nouvelle méthode pour basculer l'affichage de la description complète
  toggleDescription(offerId: number): void {
    this.expandedOfferId = this.expandedOfferId === offerId ? null : offerId;
  }

  // Méthode pour vérifier si une offre est développée
  isExpanded(offerId: number): boolean {
    return this.expandedOfferId === offerId;
  }

    get filteredOffers(): InternshipOffer[] {
    if (!this.searchTerm.trim()) return this.offers;
    
    const term = this.searchTerm.toLowerCase().trim();
    return this.offers.filter(offer => {
      // Recherche basique
      let matches = false;
      
      if (this.searchFields.title && offer.title?.toLowerCase().includes(term)) {
        matches = true;
      }
      
      if (!matches && this.searchFields.company && offer.company?.toLowerCase().includes(term)) {
        matches = true;
      }
      
      if (!matches && this.searchFields.description && 
          offer.description?.toLowerCase().includes(term)) {
        matches = true;
      }
      
      if (!matches && this.searchFields.requirements && 
          offer.requirements?.toLowerCase().includes(term)) {
        matches = true;
      }
      
      return matches;
    });
  }

  toggleAdvancedSearch(): void {
    this.advancedSearch = !this.advancedSearch;
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.searchFields = {
      title: true,
      company: true,
      description: false,
      requirements: false
    };
  }
}
