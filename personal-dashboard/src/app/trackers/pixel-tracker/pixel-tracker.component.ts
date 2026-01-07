import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pixel-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pixel-tracker.component.html',
  styleUrls: ['./pixel-tracker.component.css']
})
export class PixelTrackerComponent implements OnInit {
  user: any = null;
  pixelData: any = {
    grid: [],
    gridSize: 16,
    currentColor: '#FF6B6B',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']
  };

  ngOnInit(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      if (this.user.trackers && this.user.trackers.pixel) {
        this.pixelData = this.user.trackers.pixel;
      } else {
        this.initializeGrid();
      }
    } else {
      this.initializeGrid();
    }
  }

  initializeGrid(): void {
    this.pixelData.grid = [];
    for (let i = 0; i < this.pixelData.gridSize; i++) {
      const row = [];
      for (let j = 0; j < this.pixelData.gridSize; j++) {
        row.push('#ffffff');
      }
      this.pixelData.grid.push(row);
    }
  }

  paintPixel(rowIndex: number, colIndex: number): void {
    this.pixelData.grid[rowIndex][colIndex] = this.pixelData.currentColor;
    this.saveData();
  }

  selectColor(color: string): void {
    this.pixelData.currentColor = color;
  }

  clearGrid(): void {
    this.initializeGrid();
    this.saveData();
  }

  fillAll(): void {
    for (let i = 0; i < this.pixelData.gridSize; i++) {
      for (let j = 0; j < this.pixelData.gridSize; j++) {
        this.pixelData.grid[i][j] = this.pixelData.currentColor;
      }
    }
    this.saveData();
  }

  saveData(): void {
    if (this.user) {
      if (!this.user.trackers) {
        this.user.trackers = {};
      }
      this.pixelData.lastUpdated = new Date().toISOString();
      this.user.trackers.pixel = this.pixelData;
      localStorage.setItem('ipiCurrentUser', JSON.stringify(this.user));
      localStorage.setItem('ipiUser_' + this.user.email, JSON.stringify(this.user));
    }
  }

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/trackers']);
  }
}
