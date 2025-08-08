import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../services/schedule1/schedule.service1';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Session {
  id: number;
  name: string;
  matiere_id: [number, string];
  enseignant_id: [number, string];
  classe_id: [number, string];
  start_datetime: string;
  end_datetime: string;
  timing_id: [number, string];
  state: string;
}

@Component({
  selector: 'app-teacher-schedule',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.scss'],
  providers: [DatePipe]
})
export class TeacherScheduleComponent implements OnInit {
  sessions: Session[] = [];
  loading = false;
  error = '';
  
  currentView: 'day' | 'week' | 'month' = 'week';
  currentDate = new Date();
  daysInView: Date[] = [];
  weeksInMonth: Date[][] = [];
  hoursToDisplay = [7,8,9,10,11,12,13,14,15,16,17,18,19];

  constructor(
    private scheduleService: ScheduleService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.loading = true;
    this.error = '';
    this.scheduleService.getTeacherSchedule().subscribe({
      next: (sessions: Session[]) => {
        this.sessions = sessions.map(session => ({
          ...session,
          start_datetime: this.fixDateTimeFormat(session.start_datetime),
          end_datetime: this.fixDateTimeFormat(session.end_datetime)
        }));
        this.loading = false;
        this.generateCalendar();
      },
      error: (err: any) => {
        this.error = 'Erreur lors du chargement des séances';
        this.loading = false;
        console.error(err);
      }
    });
  }

  private fixDateTimeFormat(dateString: string): string {
    // Correction du format de date si nécessaire
    return dateString.replace(' ', 'T') + 'Z';
  }

  generateCalendar(): void {
    if (this.currentView === 'day') {
      this.daysInView = [new Date(this.currentDate)];
    } else if (this.currentView === 'week') {
      this.generateWeekDays();
    } else {
      this.generateMonthView();
    }
  }

  generateWeekDays(): void {
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Lundi
    
    this.daysInView = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.daysInView.push(day);
    }
  }

  generateMonthView(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    this.weeksInMonth = [];
    let currentWeek: Date[] = [];
    let currentDate = new Date(firstDay);
    
    // Remplir les jours du mois précédent si nécessaire
    if (firstDay.getDay() > 1) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDay.getDay() - 2; i >= 0; i--) {
        currentWeek.push(new Date(year, month - 1, prevMonthLastDay - i));
      }
    }
    
    // Remplir les jours du mois courant
    while (currentDate <= lastDay) {
      currentWeek.push(new Date(currentDate));
      if (currentWeek.length === 7 || currentDate.getTime() === lastDay.getTime()) {
        this.weeksInMonth.push([...currentWeek]);
        currentWeek = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Remplir les jours du mois suivant si nécessaire
    if (currentWeek.length > 0) {
      let nextMonthDay = 1;
      while (currentWeek.length < 7) {
        currentWeek.push(new Date(year, month + 1, nextMonthDay++));
      }
      this.weeksInMonth.push([...currentWeek]);
    }
  }

  changeView(view: 'day' | 'week' | 'month'): void {
    this.currentView = view;
    this.generateCalendar();
  }

  navigate(direction: 'prev' | 'next'): void {
    if (this.currentView === 'day') {
      this.currentDate.setDate(this.currentDate.getDate() + (direction === 'prev' ? -1 : 1));
    } else if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() + (direction === 'prev' ? -7 : 7));
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() + (direction === 'prev' ? -1 : 1));
    }
    this.generateCalendar();
  }

  getDaySessions(day: Date): Session[] {
    const dayStr = this.formatDate(day);
    return this.sessions.filter(session => {
      const sessionDate = this.formatDate(new Date(session.start_datetime));
      return sessionDate === dayStr;
    }).sort((a, b) => {
      return new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime();
    });
  }

  getHourSessions(day: Date, hour: number): Session[] {
    const dayStr = this.formatDate(day);
    return this.sessions.filter(session => {
      const sessionDate = this.formatDate(new Date(session.start_datetime));
      const sessionHour = new Date(session.start_datetime).getHours();
      return sessionDate === dayStr && sessionHour === hour;
    });
  }

  formatTime(timeString: string): string {
    return this.datePipe.transform(timeString, 'HH:mm') || '';
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  isCurrentHourSession(session: Session, hour: number): boolean {
    const sessionHour = new Date(session.start_datetime).getHours();
    return sessionHour === hour;
  }
}