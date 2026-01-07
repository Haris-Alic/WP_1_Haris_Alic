import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study-planner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './study-planner.component.html',
  styleUrls: ['./study-planner.component.css']
})
export class StudyPlannerComponent implements OnInit {
  user: any = null;
  studyData: any = {
    todayHours: 0,
    goal: 4,
    subjects: [
      { name: 'Matematika', hours: 0, color: '#FF6B6B' },
      { name: 'Angular', hours: 0, color: '#4ECDC4' },
      { name: 'SQL', hours: 0, color: '#FFD93D' },
      { name: 'C#', hours: 0, color: '#95E1D3' }
    ],
    history: []
  };

  ngOnInit(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      if (this.user.trackers && this.user.trackers.study) {
        this.studyData = this.user.trackers.study;
      }
    }
    this.calculateTotalHours();
  }

  addHour(subject: any): void {
    subject.hours += 0.5;
    this.calculateTotalHours();
    this.saveData();
  }

  removeHour(subject: any): void {
    if (subject.hours > 0) {
      subject.hours -= 0.5;
      this.calculateTotalHours();
      this.saveData();
    }
  }

  calculateTotalHours(): void {
    this.studyData.todayHours = this.studyData.subjects.reduce(
      (total: number, subject: any) => total + subject.hours, 
      0
    );
  }

  resetAll(): void {
    this.studyData.subjects.forEach((subject: any) => subject.hours = 0);
    this.studyData.todayHours = 0;
    this.saveData();
  }

  saveData(): void {
    if (this.user) {
      if (!this.user.trackers) {
        this.user.trackers = {};
      }
      this.studyData.lastUpdated = new Date().toISOString();
      this.user.trackers.study = this.studyData;
      localStorage.setItem('ipiCurrentUser', JSON.stringify(this.user));
      localStorage.setItem('ipiUser_' + this.user.email, JSON.stringify(this.user));
    }
  }

  getProgressPercentage(): number {
    return Math.min((this.studyData.todayHours / this.studyData.goal) * 100, 100);
  }

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/trackers']);
  }
}
