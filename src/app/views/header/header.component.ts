import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthServiceService } from '../../services/auth/auth-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white shadow-sm py-3 px-4 flex items-center justify-between">
      <!-- Left side - Logo and Menu Button -->
      <div class="flex items-center">
        <button class="lg:hidden mr-3 hover:bg-yellow-50 p-2 rounded-md transition-colors"
                (click)="onMenuClick.emit()">
          <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex items-center">
          <img [src]="getLogoPath()" 
               alt="School Logo" 
               class="h-10 w-auto mr-3 object-contain"
               (error)="handleImageError()">
          <span class="text-lg font-semibold text-gray-800 hidden sm:inline">ISP TED University</span>
        </div>
      </div>

    <!-- Right side - Icons -->
      <div class="flex items-center space-x-3 ml-4">
        <!-- Notification bell -->
        <button class="relative hover:bg-yellow-50 p-2 rounded-md transition-colors">
          <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19H6.5A2.5 2.5 0 0 1 4 16.5v-9A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5H11z"/>
          </svg>
          <span class="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full border-2 border-white"></span>
        </button>

        <!-- User dropdown -->
        <div class="relative">
          <button class="relative h-9 w-9 rounded-full hover:bg-yellow-50 p-1 transition-colors"
                  (click)="toggleDropdown()">
            <img [src]="userImage" 
                 alt="User Profile" 
                 class="h-8 w-8 rounded-full object-cover border-2 border-yellow-400"
                 (error)="userImage = '/assets/images/default-avatar.png'">
          </button>
          
          <div *ngIf="dropdownOpen" 
               class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
            <div class="py-1">
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-medium leading-none">{{ userName }}</p>
                <p class="text-xs leading-none text-gray-500 mt-1">{{ userEmail }}</p>
              </div>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mon Profil</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Paramètres</a>
              <hr class="border-gray-100">
              <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Se déconnecter</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    img {
      transition: all 0.3s ease;
    }
    img:hover {
      transform: scale(1.05);
    }
  `]
})
export class HeaderComponent implements OnInit {
  @Output() onMenuClick = new EventEmitter<void>();
  dropdownOpen = false;
  userName = 'John Doe';
  userEmail = 'john.doe@example.com';
  userImage = '/assets/images/default-avatar.png';

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name || 'Utilisateur';
      this.userEmail = user.email || '';
      this.userImage = user.image || '/assets/images/default-avatar.png';
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  getLogoPath(): string {
    return '/assets/images/logo2.png';
  }

  handleImageError(): void {
    console.error('Failed to load logo image');
  }
}