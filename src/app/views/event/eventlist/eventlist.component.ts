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

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadAllEvents();
  }

  loadAllEvents(): void {
    this.isLoading = true;
    
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        console.log('Response complète:', response);
        this.events = response.events;
        
        // Debug pour chaque événement
        this.events.forEach((event, index) => {
          console.log(`Événement ${index}:`, {
            id: event.id,
            name: event.name,
            link: event.link,
            linkType: typeof event.link,
            linkEmpty: !event.link,
            linkLength: event.link?.length
          });
        });
        
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
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }


}