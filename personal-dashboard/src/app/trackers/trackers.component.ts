import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trackers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trackers.component.html',
  styleUrls: ['./trackers.component.css']
})
export class TrackersComponent {
  
  constructor(private router: Router) {}

  openTracker(type: string): void {
    console.log('Opening tracker:', type);
    this.router.navigate(['/trackers', type]);
  }
}
