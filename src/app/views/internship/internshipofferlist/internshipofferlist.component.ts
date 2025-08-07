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

  get filteredOffers(): InternshipOffer[] {
    if (!this.searchTerm) return this.offers;
    const term = this.searchTerm.toLowerCase();
    return this.offers.filter(offer => 
      (offer.title?.toLowerCase().includes(term)) ||
      (offer.company_id?.[1]?.toLowerCase().includes(term))
    );
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'shortDate') || '';
  }

  stripHtml(html: string): string {
    return html?.replace(/<[^>]*>/g, '') || '';
  }
}