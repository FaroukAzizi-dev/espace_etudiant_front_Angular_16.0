import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule/schedule.service';
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
  salle_name: string;
  timing_id: [number, string];
  state: string;
}

@Component({
  selector: 'app-student-schedule',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './studentschedule.component.html',
  styleUrls: ['./studentschedule.component.scss'],
  providers: [DatePipe]
})
export class StudentScheduleComponent implements OnInit {
  sessions: Session[] = [];
  loading = false;
  error = '';
  
  currentView: 'day' | 'week' | 'month' = 'week';
  currentDate = new Date();
  daysInView: Date[] = [];
  weeksInMonth: Date[][] = [];
  hoursToDisplay = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  constructor(
    private scheduleService: ScheduleService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  trackBySessionId(index: number, session: Session): number {
    return session.id;
  }

  trackByDate(index: number, date: Date): number {
    return date.getTime();
  }

  trackByWeek(index: number, week: Date[]): number {
    return week[0]?.getTime() || index;
  }

  trackByHour(index: number, hour: number): number {
    return hour;
  }

  loadSessions(): void {
    this.loading = true;
    this.error = '';
    this.scheduleService.getStudentSchedule().subscribe({
      next: (response: any) => {
        const sessionsData = Array.isArray(response) ? response : 
                          (response?.sessions || response?.data || []);
        
        if (!Array.isArray(sessionsData)) {
          throw new Error('Invalid sessions data format');
        }

        this.sessions = sessionsData.map((session: any) => ({
          ...session,
          start_datetime: this.adjustTimezone(session.start_datetime),
          end_datetime: this.adjustTimezone(session.end_datetime)
        }));
        
        this.loading = false;
        this.generateCalendar();
      },
      error: (err: any) => {
        this.error = 'Error loading your schedule. Please try again later.';
        this.loading = false;
        console.error('Schedule load error:', err);
      }
    });
  }

  private adjustTimezone(dateString: string): string {
    if (!dateString) return '';
    
    // Remove any existing timezone information
    dateString = dateString.split('+')[0].split('Z')[0];
    
    // Create date object assuming UTC
    const date = new Date(dateString + 'Z');
    
    // Return in ISO format without timezone (will be treated as local time)
    return date.toISOString().split('.')[0] + 'Z';
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
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    
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
    
    // Add days from previous month if needed
    if (firstDay.getDay() > 1) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDay.getDay() - 2; i >= 0; i--) {
        currentWeek.push(new Date(year, month - 1, prevMonthLastDay - i));
      }
    }
    
    // Add current month days
    while (currentDate <= lastDay) {
      currentWeek.push(new Date(currentDate));
      if (currentWeek.length === 7 || currentDate.getTime() === lastDay.getTime()) {
        this.weeksInMonth.push([...currentWeek]);
        currentWeek = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Add days from next month if needed
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
    // Create a new date object to avoid modifying the original
    const d = new Date(date);
    // Adjust for timezone offset to get the correct local date
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  formatDisplayDate(date: Date, format: string): string {
    return this.datePipe.transform(date, format) || '';
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return day.getDate() === today.getDate() && 
           day.getMonth() === today.getMonth() && 
           day.getFullYear() === today.getFullYear();
  }
}