import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-tracker.component.html',
  styleUrls: ['./calendar-tracker.component.css']
})
export class CalendarTrackerComponent implements OnInit {
  user: any = null;
  calendarData: any = {
    events: [],
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear()
  };

  days: any[] = [];
  monthNames = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];

  ngOnInit(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      if (this.user.trackers && this.user.trackers.calendar) {
        this.calendarData = this.user.trackers.calendar;
      }
    }
    this.generateCalendar();
  }

  generateCalendar(): void {
    const firstDay = new Date(this.calendarData.currentYear, this.calendarData.currentMonth, 1);
    const lastDay = new Date(this.calendarData.currentYear, this.calendarData.currentMonth + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    this.days = [];

    for (let i = 0; i < startDay; i++) {
      this.days.push({ day: '', empty: true });
    }

    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${this.calendarData.currentYear}-${String(this.calendarData.currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const hasEvent = this.calendarData.events.some((e: any) => e.date === dateStr);
      const isToday = this.isToday(i);
      this.days.push({ day: i, empty: false, date: dateStr, hasEvent, isToday });
    }
  }

  isToday(day: number): boolean {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === this.calendarData.currentMonth && 
           today.getFullYear() === this.calendarData.currentYear;
  }

  toggleEvent(dayObj: any): void {
    if (dayObj.empty) return;

    const eventIndex = this.calendarData.events.findIndex((e: any) => e.date === dayObj.date);
    
    if (eventIndex > -1) {
      this.calendarData.events.splice(eventIndex, 1);
    } else {
      this.calendarData.events.push({
        date: dayObj.date,
        title: 'Event',
        type: 'important'
      });
    }
    
    this.generateCalendar();
    this.saveData();
  }

  prevMonth(): void {
    this.calendarData.currentMonth--;
    if (this.calendarData.currentMonth < 0) {
      this.calendarData.currentMonth = 11;
      this.calendarData.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.calendarData.currentMonth++;
    if (this.calendarData.currentMonth > 11) {
      this.calendarData.currentMonth = 0;
      this.calendarData.currentYear++;
    }
    this.generateCalendar();
  }

  goToToday(): void {
    const today = new Date();
    this.calendarData.currentMonth = today.getMonth();
    this.calendarData.currentYear = today.getFullYear();
    this.generateCalendar();
  }

  saveData(): void {
    if (this.user) {
      if (!this.user.trackers) {
        this.user.trackers = {};
      }
      this.calendarData.lastUpdated = new Date().toISOString();
      this.user.trackers.calendar = this.calendarData;
      localStorage.setItem('ipiCurrentUser', JSON.stringify(this.user));
      localStorage.setItem('ipiUser_' + this.user.email, JSON.stringify(this.user));
    }
  }

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/trackers']);
  }
}
