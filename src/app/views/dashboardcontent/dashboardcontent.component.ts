import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CourseItem {
  title: string;
  description: string;
  icon: string;
  href: string;
  adminOnly: boolean;
  color: string;
  iconColor: string;
}

interface FormationItem {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  iconColor: string;
  logo: string;
}

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="flex-1 p-6 bg-gray-50 overflow-auto">
      <div class="max-w-7xl mx-auto space-y-8">
        <!-- Welcome Banner -->
        <div class="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold mb-2">Bienvenue, John!</h1>
              <p class="text-yellow-100 text-lg">
                Accédez à vos cours et formations depuis votre espace personnel.
              </p>
            </div>
            <div class="hidden md:block">
              <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <!-- BookOpen Icon -->
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Mes cours Section -->
        <section>
          <div class="flex items-center mb-6">
            <!-- BookOpen Icon -->
            <svg class="h-6 w-6 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 class="text-2xl font-bold text-gray-800">Mes cours</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              *ngFor="let item of mesCoursItems"
              [class]="'cursor-pointer transition-all duration-200 hover:shadow-lg border-2 rounded-lg ' + item.color">
              <a [href]="item.href" target="_blank" rel="noopener noreferrer" class="block h-full">
                <div class="p-6 pb-3">
                  <div class="flex items-center justify-between mb-2">
                    <ng-container [ngSwitch]="item.icon">
                      <!-- FileText Icon -->
                      <svg *ngSwitchCase="'filetext'" [class]="'h-8 w-8 ' + item.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <!-- BookOpen Icon -->
                      <svg *ngSwitchCase="'bookopen'" [class]="'h-8 w-8 ' + item.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <!-- Users Icon -->
                      <svg *ngSwitchCase="'users'" [class]="'h-8 w-8 ' + item.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <!-- Video Icon -->
                      <svg *ngSwitchCase="'video'" [class]="'h-8 w-8 ' + item.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </ng-container>
                    <div class="flex items-center space-x-2">
                      <span 
                        *ngIf="item.adminOnly" 
                        class="text-xs bg-yellow-100 text-yellow-800 border-yellow-300 px-2 py-1 rounded border">
                        Admin
                      </span>
                      <!-- ExternalLink Icon -->
                      <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                  <h3 class="text-lg text-gray-800 leading-tight font-semibold">{{ item.title }}</h3>
                </div>
                <div class="px-6 pb-6">
                  <p class="text-gray-600 text-sm">{{ item.description }}</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <!-- Formation Académique Section -->
        <section>
          <div class="flex items-center mb-6">
            <!-- Award Icon -->
            <svg class="h-6 w-6 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <h2 class="text-2xl font-bold text-gray-800">Formation Académique</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              *ngFor="let item of formationItems"
              [class]="'cursor-pointer transition-all duration-200 hover:shadow-lg border-2 rounded-lg ' + item.color">
              <a [href]="item.href" target="_blank" rel="noopener noreferrer" class="block h-full">
                <div class="p-6 pb-3">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-2xl">{{ item.logo }}</span>
                      <ng-container [ngSwitch]="item.icon">
                        <!-- Globe Icon -->
                        <svg *ngSwitchCase="'globe'" [class]="'h-6 w-6 ' + item.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <!-- Cloud Icon -->
                        <svg *ngSwitchCase="'cloud'" [class]="'h-6 w-6 ' + item.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        <!-- Shield Icon -->
                        <svg *ngSwitchCase="'shield'" [class]="'h-6 w-6 ' + item.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <!-- Award Icon -->
                        <svg *ngSwitchCase="'award'" [class]="'h-6 w-6 ' + item.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </ng-container>
                    </div>
                    <!-- ExternalLink Icon -->
                    <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <h3 class="text-lg text-gray-800 leading-tight font-semibold">{{ item.title }}</h3>
                </div>
                <div class="px-6 pb-6">
                  <p class="text-gray-600 text-sm">{{ item.description }}</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <!-- Quick Stats -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white border border-gray-200 rounded-lg">
            <div class="p-6 pb-2">
              <h3 class="text-sm font-medium text-gray-600">Cours Actifs</h3>
            </div>
            <div class="px-6 pb-6">
              <div class="text-2xl font-bold text-gray-800">8</div>
              <p class="text-xs text-gray-500 mt-1">En cours ce semestre</p>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg">
            <div class="p-6 pb-2">
              <h3 class="text-sm font-medium text-gray-600">Certifications</h3>
            </div>
            <div class="px-6 pb-6">
              <div class="text-2xl font-bold text-gray-800">3</div>
              <p class="text-xs text-gray-500 mt-1">En préparation</p>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg">
            <div class="p-6 pb-2">
              <h3 class="text-sm font-medium text-gray-600">Projets</h3>
            </div>
            <div class="px-6 pb-6">
              <div class="text-2xl font-bold text-gray-800">5</div>
              <p class="text-xs text-gray-500 mt-1">À rendre ce mois</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  `
})
export class DashboardContentComponent {
  mesCoursItems: CourseItem[] = [
    {
      title: "Plan de cours",
      description: "Accédez aux plans de cours détaillés",
      icon: "filetext",
      href: "https://teams.microsoft.com",
      adminOnly: true,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Support de cours",
      description: "Documents et ressources pédagogiques",
      icon: "bookopen",
      href: "https://teams.microsoft.com",
      adminOnly: false,
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Affichage des TD/Projets",
      description: "Travaux dirigés et projets assignés",
      icon: "users",
      href: "https://teams.microsoft.com",
      adminOnly: false,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Cours en ligne",
      description: "Sessions de cours virtuelles",
      icon: "video",
      href: "https://teams.microsoft.com",
      adminOnly: false,
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  formationItems: FormationItem[] = [
    {
      title: "NetAcad",
      description: "Cisco Networking Academy",
      icon: "globe",
      href: "https://netacad.com",
      color: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
      iconColor: "text-cyan-600",
      logo: "🌐",
    },
    {
      title: "AWS Academy",
      description: "Amazon Web Services Training",
      icon: "cloud",
      href: "https://aws.amazon.com/training/",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
      iconColor: "text-yellow-600",
      logo: "☁️",
    },
    {
      title: "PALOALTO",
      description: "Cybersecurity Training Platform",
      icon: "shield",
      href: "https://paloaltonetworks.com",
      color: "bg-red-50 border-red-200 hover:bg-red-100",
      iconColor: "text-red-600",
      logo: "🔒",
    },
    {
      title: "EC-Council",
      description: "Ethical Hacking & Security",
      icon: "award",
      href: "https://eccouncil.org",
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
      iconColor: "text-indigo-600",
      logo: "🛡️",
    },
  ];
}