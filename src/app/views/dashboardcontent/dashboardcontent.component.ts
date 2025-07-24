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
  templateUrl: './dashboardcontent.component.html',

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