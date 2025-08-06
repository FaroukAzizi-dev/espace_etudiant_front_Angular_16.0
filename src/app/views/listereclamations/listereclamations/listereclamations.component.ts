// listereclamations.component.ts - VERSION CORRIGÉE
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReclamationService, Reclamation } from '../../../services/reclamation/reclamation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-liste-reclamations',
  imports: [CommonModule],
  templateUrl: './listereclamations.component.html',
  styleUrls: ['./listereclamations.component.scss'],
})
export class ListeReclamationsComponent implements OnInit, OnDestroy {
  reclamations: Reclamation[] = [];
  isLoading = false;
  errorMessage = '';
  lastRefresh = new Date();
  
 
  private subscriptions: Subscription[] = [];
  private autoRefreshInterval?: Subscription;

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
    this.startAutoRefresh();
    this.subscribeToReclamations();
  }

  ngOnDestroy(): void {
 
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.autoRefreshInterval) {
      this.autoRefreshInterval.unsubscribe();
    }
  }


  private subscribeToReclamations(): void {
    const sub = this.reclamationService.reclamations$.subscribe({
      next: (data) => {
        this.reclamations = data;
        this.lastRefresh = new Date();
        console.log('Réclamations mises à jour:', data.length);
      }
    });
    this.subscriptions.push(sub);
  }


  private startAutoRefresh(): void {
    // Rafraîchir toutes les 30 secondes
    this.autoRefreshInterval = interval(30000).subscribe(() => {
      console.log('Auto-refresh des réclamations...');
      this.refreshReclamations();
    });
  }

  loadReclamations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const sub = this.reclamationService.getReclamations().subscribe({
      next: (data) => {
        this.reclamations = data;
        this.isLoading = false;
        this.lastRefresh = new Date();
        console.log('Réclamations chargées:', data.length);
      },
      error: (error) => {
        this.handleError(error);
      }
    });
    this.subscriptions.push(sub);
  }

 
  refreshReclamations(): void {
    console.log('Rafraîchissement manuel des réclamations...');
    this.isLoading = true;
    this.errorMessage = '';
    
    const sub = this.reclamationService.loadReclamations().subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log('Rafraîchissement terminé:', data.length, 'réclamations');
      },
      error: (error) => {
        this.handleError(error);
      }
    });
    this.subscriptions.push(sub);
  }

  private handleError(error: any): void {
    this.isLoading = false;
    
    if (error.message?.includes('Session expirée') || error.status === 401) {
      this.errorMessage = 'Session expirée - Veuillez vous reconnecter';
      localStorage.removeItem('odoo_session');
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = error.message || 'Erreur lors du chargement des réclamations';
      console.error('Error loading reclamations:', error);
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Non défini';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Date invalide';
    }
  }

  getStatusClass(etat: string): string {
    if (!etat) return 'bg-gray-100 text-gray-800';
    
    switch (etat.toLowerCase()) {
      case 'nouvelle': 
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'en_cours':
      case 'en cours': 
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'traitee':
      case 'résolue': 
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'rejetee':
      case 'rejetée': 
        return 'bg-red-100 text-red-800 border border-red-200';
      default: 
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }

  getStatusText(etat: string): string {
    if (!etat) return 'Inconnu';
    
    switch (etat.toLowerCase()) {
      case 'nouvelle': return 'Nouvelle';
      case 'en_cours': return 'En cours';
      case 'traitee': return 'Traitée';
      case 'rejetee': return 'Rejetée';
      default: return etat;
    }
  }

  getTimeSinceLastRefresh(): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - this.lastRefresh.getTime()) / 1000);
    
    if (diff < 60) return `${diff} secondes`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes`;
    return `${Math.floor(diff / 3600)} heures`;
  }
  trackByReclamationId(index: number, reclamation: any): number {
  return reclamation.id;
  }
}