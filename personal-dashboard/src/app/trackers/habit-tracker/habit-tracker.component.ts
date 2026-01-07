import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habit-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.css']
})
export class HabitTrackerComponent implements OnInit {
  user: any = null;
  habitData: any = {
    habits: [
      { name: 'Vježbanje', icon: '💪', completed: false, streak: 0 },
      { name: 'Čitanje', icon: '📖', completed: false, streak: 0 },
      { name: 'Meditacija', icon: '🧘', completed: false, streak: 0 },
      { name: 'Coding', icon: '💻', completed: false, streak: 0 },
      { name: 'Здрава храна', icon: '🥗', completed: false, streak: 0 },
      { name: 'Rano ustajanje', icon: '🌅', completed: false, streak: 0 }
    ],
    date: new Date().toDateString()
  };

  ngOnInit(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      if (this.user.trackers && this.user.trackers.habit) {
        this.habitData = this.user.trackers.habit;
        this.checkDateReset();
      }
    }
  }

  checkDateReset(): void {
    const today = new Date().toDateString();
    if (this.habitData.date !== today) {
      // Novi dan - resetuj completed, ali zadrži streak
      this.habitData.habits.forEach((habit: any) => {
        if (!habit.completed) {
          habit.streak = 0; // Izgubio streak jer nije završio jučerašnju naviku
        }
        habit.completed = false;
      });
      this.habitData.date = today;
      this.saveData();
    }
  }

  toggleHabit(habit: any): void {
    habit.completed = !habit.completed;
    
    if (habit.completed) {
      habit.streak++;
    } else {
      habit.streak = Math.max(0, habit.streak - 1);
    }
    
    this.saveData();
  }

  getCompletedCount(): number {
    return this.habitData.habits.filter((h: any) => h.completed).length;
  }

  getTotalCount(): number {
    return this.habitData.habits.length;
  }

  getProgressPercentage(): number {
    return (this.getCompletedCount() / this.getTotalCount()) * 100;
  }

  resetAll(): void {
    this.habitData.habits.forEach((habit: any) => {
      habit.completed = false;
    });
    this.saveData();
  }

  saveData(): void {
    if (this.user) {
      if (!this.user.trackers) {
        this.user.trackers = {};
      }
      this.habitData.lastUpdated = new Date().toISOString();
      this.user.trackers.habit = this.habitData;
      localStorage.setItem('ipiCurrentUser', JSON.stringify(this.user));
      localStorage.setItem('ipiUser_' + this.user.email, JSON.stringify(this.user));
    }
  }

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/trackers']);
  }
}
