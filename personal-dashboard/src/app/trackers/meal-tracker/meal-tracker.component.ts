import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-tracker.component.html',
  styleUrls: ['./meal-tracker.component.css']
})
export class MealTrackerComponent implements OnInit {
  user: any = null;
  mealData: any = {
    meals: [
      { name: 'Doručak', icon: '🍳', logged: false, time: '', calories: 0 },
      { name: 'Užina 1', icon: '🍎', logged: false, time: '', calories: 0 },
      { name: 'Ručak', icon: '🍽️', logged: false, time: '', calories: 0 },
      { name: 'Užina 2', icon: '🥪', logged: false, time: '', calories: 0 },
      { name: 'Večera', icon: '🍲', logged: false, time: '', calories: 0 }
    ],
    totalCalories: 0,
    calorieGoal: 2000,
    date: new Date().toDateString()
  };

  ngOnInit(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      if (this.user.trackers && this.user.trackers.meal) {
        this.mealData = this.user.trackers.meal;
        this.checkDateReset();
      }
    }
    this.calculateTotal();
  }

  checkDateReset(): void {
    const today = new Date().toDateString();
    if (this.mealData.date !== today) {
      this.mealData.meals.forEach((meal: any) => {
        meal.logged = false;
        meal.time = '';
        meal.calories = 0;
      });
      this.mealData.totalCalories = 0;
      this.mealData.date = today;
      this.saveData();
    }
  }

  toggleMeal(meal: any): void {
    meal.logged = !meal.logged;
    if (meal.logged && !meal.time) {
      meal.time = new Date().toLocaleTimeString('hr-BA', { hour: '2-digit', minute: '2-digit' });
    }
    this.saveData();
  }

  addCalories(meal: any, amount: number): void {
    meal.calories += amount;
    if (meal.calories < 0) meal.calories = 0;
    this.calculateTotal();
    this.saveData();
  }

  calculateTotal(): void {
    this.mealData.totalCalories = this.mealData.meals.reduce(
      (total: number, meal: any) => total + meal.calories, 
      0
    );
  }

  getLoggedCount(): number {
    return this.mealData.meals.filter((m: any) => m.logged).length;
  }

  getTotalCount(): number {
    return this.mealData.meals.length;
  }

  getProgressPercentage(): number {
    return Math.min((this.mealData.totalCalories / this.mealData.calorieGoal) * 100, 100);
  }

  resetAll(): void {
    this.mealData.meals.forEach((meal: any) => {
      meal.logged = false;
      meal.time = '';
      meal.calories = 0;
    });
    this.mealData.totalCalories = 0;
    this.saveData();
  }

  saveData(): void {
    if (this.user) {
      if (!this.user.trackers) {
        this.user.trackers = {};
      }
      this.mealData.lastUpdated = new Date().toISOString();
      this.user.trackers.meal = this.mealData;
      localStorage.setItem('ipiCurrentUser', JSON.stringify(this.user));
      localStorage.setItem('ipiUser_' + this.user.email, JSON.stringify(this.user));
    }
  }

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/trackers']);
  }
}
