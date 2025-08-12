import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobOffer } from '../../services/emploi/joboffer.service';
import { JobOfferService } from '../../services/emploi/joboffer.service';

@Component({
  selector: 'app-emploi-list',
  templateUrl: './emploilist.component.html',
  styleUrls: ['./emploilist.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe]
})
export class EmploiListComponent implements OnInit {
  offers: JobOffer[] = [];
  filteredOffers: JobOffer[] = [];
  isLoading = true;
  error: string | null = null;
  searchTerm = '';
  expandedOfferId: number | null = null;
  maxDescriptionLength = 160;

  // Filtres
  contractTypes: string[] = ['CDI', 'Stage', 'Alternance'];
  selectedContractType = '';

  constructor(
    private jobOfferService: JobOfferService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.isLoading = true;
    this.error = null;
    
    this.jobOfferService.getOffers().subscribe({
      next: (Response) => {
        console.log(Response);
        this.offers = Response;
        this.filteredOffers = Response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des offres. Veuillez réessayer.';
        this.isLoading = false;
        console.error('Error loading job offers:', err);
      }
    });
  }

  toggleDescription(offerId: number): void {
    this.expandedOfferId = this.expandedOfferId === offerId ? null : offerId;
  }

  isExpanded(offerId: number): boolean {
    return this.expandedOfferId === offerId;
  }

  getTruncatedDescription(description: string): string {
    if (!description) return '';
    return description.length > this.maxDescriptionLength 
      ? description.substring(0, this.maxDescriptionLength) + '...' 
      : description;
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy') || '';
  }

  stripHtml(html: string): string {
    return html?.replace(/<[^>]*>/g, '') || '';
  }

 applyFilters(): void {
  this.filteredOffers = this.offers.filter(offer => {
    // Case-insensitive and trimmed contract type comparison
    if (this.selectedContractType) {
      const offerContract = offer.contract_type?.toString().trim().toLowerCase();
      const selectedContract = this.selectedContractType.trim().toLowerCase();
      
      if (offerContract !== selectedContract) {
        return false;
      }
    }
    
    // Text search (unchanged)
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      return (
        offer.title?.toLowerCase().includes(term) ||
        offer.company?.toLowerCase().includes(term) ||
        offer.description?.toLowerCase().includes(term) ||
        offer.requirements?.toLowerCase().includes(term)
      );
    }
    
    return true;
  });
}

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedContractType = '';
    this.filteredOffers = [...this.offers];
  }

  openApplicationLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}