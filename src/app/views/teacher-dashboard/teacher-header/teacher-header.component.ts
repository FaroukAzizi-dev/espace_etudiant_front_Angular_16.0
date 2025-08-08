import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="border-b border-border bg-background px-4 py-3 flex items-center justify-between shadow-sm">
      <div class="flex items-center">
        <button class="lg:hidden mr-3 hover:bg-accent p-2 rounded-md transition-colors"
                (click)="onMenuClick.emit()">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex items-center">
          <div class="relative">
            <img [src]="getLogoPath()"
                  alt="School Logo"
                  class="h-12 w-auto mr-3 object-contain"
                 (load)="logoLoaded = true"
                 (error)="handleImageError()" />
                     
            <div *ngIf="!logoLoaded" class="absolute inset-0 flex items-center justify-center">
              <svg class="h-12 w-auto" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
                <rect width="100" height="50" rx="5" fill="#3b82f6"/>
                <text x="50" y="30" font-family="Arial" font-size="20" fill="white"
                       text-anchor="middle" dominant-baseline="middle">LOGO</text>
              </svg>
            </div>
          </div>
                  
          <span class="text-xl font-bold text-foreground hidden sm:inline">ISP TED University</span>
        </div>
      </div>

      <div class="flex-1 text-center hidden md:block">
        <h2 class="text-lg font-semibold text-foreground">Tableau de Bord</h2>
      </div>

      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-2">
          <div class="relative">
            <img [src]="userImage"
                  alt="User Profile"
                  class="h-10 w-10 rounded-full object-cover border-2 border-isp-yellow"
                 (error)="onImageError()">
          </div>
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-foreground">{{ userName }}</p>
            <p class="text-xs text-muted-foreground capitalize">{{ userRole }}</p>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    img {
      max-height: 60px;
      transition: all 0.3s ease;
    }
    img:hover {
      transform: scale(1.05);
    }
  `]
})
export class HeaderComponent implements OnInit {
  @Output() onMenuClick = new EventEmitter<void>();
  logoLoaded = false;
  userName = '';
  userRole = '';
  userImage = '/assets/images/default-avatar.png';

  constructor(
    private authService: AuthServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name || 'Utilisateur';
      this.userRole = user.role || 'user';
      
      // Vérification que l'image est bien une URL data:image valide
      if (user.image && user.image.startsWith('data:image')) {
        this.userImage = user.image;
      } else {
        this.userImage = '/assets/images/default-avatar.png';
      }
      
      // Déclencher manuellement la détection de changements
      this.cdr.detectChanges();
    }
  }

  onImageError(): void {
    this.userImage = '/assets/images/default-avatar.png';
    this.cdr.detectChanges();
  }

  getLogoPath(): string {
    return '/assets/images/logo2.png';
  }

  handleImageError(): void {
    this.logoLoaded = false;
  }
}