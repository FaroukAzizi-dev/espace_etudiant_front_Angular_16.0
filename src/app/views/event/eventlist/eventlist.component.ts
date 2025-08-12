import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event/event.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Event } from '../../../services/event/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  isLoading = true;
  expandedEventId: number | null = null; // Ajout pour suivre l'événement développé
  maxDescriptionLength = 160; // Longueur maximale avant troncature

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadAllEvents();
  }

  loadAllEvents(): void {
    this.isLoading = true;
    
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        this.events = response.events;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.isLoading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Méthode pour basculer l'affichage de la description complète
  toggleDescription(eventId: number): void {
    this.expandedEventId = this.expandedEventId === eventId ? null : eventId;
  }

  // Méthode pour vérifier si un événement est développé
  isExpanded(eventId: number): boolean {
    return this.expandedEventId === eventId;
  }

  // Méthode pour obtenir la description tronquée
  getTruncatedDescription(description: string): string {
    if (!description) return '';
    return description.length > this.maxDescriptionLength 
      ? description.substring(0, this.maxDescriptionLength) 
      : description;
  }

  hasValidLink(event: Event): boolean {
    return !!event.lien && this.isValidUrl(event.lien);
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  openRegistrationLink(url: string): void {
    if (this.isValidUrl(url)) {
      window.open(url, '_blank');
    }
  }

  getLinkType(link: string | undefined): string {
    return link ? typeof link : 'null/undefined';
  }
}