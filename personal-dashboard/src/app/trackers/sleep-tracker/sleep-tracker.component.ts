import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sleep-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sleep-tracker.component.html',
  styleUrls: ['./sleep-tracker.component.css']
})
export class SleepTrackerComponent implements OnInit {
  user: any = null;
  sleepData: any = {
    hours: 0,
    quality: 'good',
    bedtime: '',
    wakeup: '',
    goal: 8,
    history: []
  };

  ngOnInit(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      if (this.user.trackers && this.user.trackers.sleep) {
        this.sleepData = this.user.trackers.sleep;
      }
    }
  }

  incrementHours(): void {
    if (this.sleepData.hours < 24) {
      this.sleepData.hours += 0.5;
      this.saveData();
    }
  }

  decrementHours(): void {
    if (this.sleepData.hours > 0) {
      this.sleepData.hours -= 0.5;
      this.saveData();
    }
  }

  setQuality(quality: string): void {
    this.sleepData.quality = quality;
    this.saveData();
  }

  resetToday(): void {
    this.sleepData.hours = 0;
    this.sleepData.quality = 'good';
    this.saveData();
  }

  saveData(): void {
    if (this.user) {
      if (!this.user.trackers) {
        this.user.trackers = {};
      }
      this.sleepData.lastUpdated = new Date().toISOString();
      this.user.trackers.sleep = this.sleepData;
      localStorage.setItem('ipiCurrentUser', JSON.stringify(this.user));
      localStorage.setItem('ipiUser_' + this.user.email, JSON.stringify(this.user));
    }
  }

  getProgressPercentage(): number {
    return Math.min((this.sleepData.hours / this.sleepData.goal) * 100, 100);
  }

  getSleepQualityEmoji(): string {
    switch(this.sleepData.quality) {
      case 'excellent': return '😴🌟';
      case 'good': return '😊';
      case 'fair': return '😐';
      case 'poor': return '😫';
      default: return '😴';
    }
  }

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/trackers']);
  }
}
