import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavigationItem {
  name: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule ,  RouterModule],
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();

  navigationItems: NavigationItem[] = [
  {
    name: "Tableau de bord",
    icon: "home",
    route: "/student/dashboard",
    active: true,
  },
  {
    name: "Planning de la semaine",
    icon: "calendar",
    route: "/student/dashboard/emploidetemps",
    active: false,
  },
  {
    name: "Mes Absences",
    icon: "filetext",
    route: "/student/dashboard/absence",
    active: false,
  },
  {
    name: "Consulter réclamation",
    icon: "inbox",
    route: "/student/dashboard/listereclamation",
    active: false,
  },
  {
    name: "Faire une réclamation",
    icon: "messagesquare",
    route: "/student/dashboard/reclamation",
    active: false,
  },
  {
    name: "Document de Stage",
    icon: "document",
    route: "/student/dashboard/documentstage",
    active: false,
  },
  {
    name: "Evenement",
    icon: "event",
    route: "/student/dashboard/evenements",
    active: false,
  },
  {
    name: "Offre d'emploi",
    icon: "briefcase",
    route: "/student/dashboard/offre-emploi",
    active: false,
  },
  {
    name: "Offre de stage",
    icon: "laptop",
    route: "/student/dashboard/offres-stage",
    active: false,
  }
];

  getSidebarClasses(): string {
    return `fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 
            transform transition-transform duration-300 ease-in-out shadow-lg
            ${this.isOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:static lg:shadow-none lg:z-auto`;
  }

  getNavItemClasses(item: NavigationItem): string {
    return `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
            ${item.active 
              ? "bg-yellow-50 text-yellow-800 border border-yellow-200" 
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`;
  }

  getIconClasses(item: NavigationItem): string {
    return `mr-3 h-5 w-5 ${item.active ? "text-yellow-600" : "text-gray-500"}`;
  }
}