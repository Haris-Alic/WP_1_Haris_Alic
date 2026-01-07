import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funzone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funzone.component.html',
  styleUrls: ['./funzone.component.css']
})
export class FunzoneComponent {
  
  modules = [
    { name: 'Whiteboard', icon: '🎨', route: '/funzone/whiteboard' },
    { name: 'Kanban', icon: '📋', route: '/funzone/kanban' },
    { name: 'Vision Board', icon: '✨', route: '/funzone/vision-board' }
  ];

  constructor(private router: Router) {}

  openModule(route: string): void {
    this.router.navigate([route]);
  }
}
