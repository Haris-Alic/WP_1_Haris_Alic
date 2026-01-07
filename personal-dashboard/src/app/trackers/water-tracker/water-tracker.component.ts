import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-water-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './water-tracker.component.html',
  styleUrls: ['./water-tracker.component.css']
})
export class WaterTrackerComponent implements OnInit {
  user: any = null;
  waterData: any = {
    today: 0,
    goal: 8,
    history: []
  };

  ngOnInit(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      if (this.user.trackers && this.user.trackers.water) {
        this.waterData = this.user.trackers.water;
      }
    }
  }

  addGlass(): void {
    this.waterData.today++;
    this.saveData();
  }

  removeGlass(): void {
    if (this.waterData.today > 0) {
      this.waterData.today--;
      this.saveData();
    }
  }

  resetToday(): void {
    this.waterData.today = 0;
    this.saveData();
  }

  saveData(): void {
    if (this.user) {
      if (!this.user.trackers) {
        this.user.trackers = {};
      }
      this.user.trackers.water = this.waterData;
      localStorage.setItem('ipiCurrentUser', JSON.stringify(this.user));
      localStorage.setItem('ipiUser_' + this.user.email, JSON.stringify(this.user));
    }
  }

  getProgressPercentage(): number {
    return Math.min((this.waterData.today / this.waterData.goal) * 100, 100);
  }

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/trackers']);
  }
}
