import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-planner.component.html',
  styleUrls: ['./task-planner.component.css']
})
export class TaskPlannerComponent implements OnInit {
  user: any = null;
  taskData: any = {
    projects: [
      {
        name: 'Web Development',
        tasks: [
          { title: 'Angular setup', completed: false, priority: 'high' },
          { title: 'Backend API', completed: false, priority: 'medium' }
        ]
      },
      {
        name: 'Learning',
        tasks: [
          { title: 'Study TypeScript', completed: false, priority: 'high' },
          { title: 'Read documentation', completed: false, priority: 'low' }
        ]
      }
    ]
  };

  newTaskTitle: string = '';
  selectedProjectIndex: number = 0;

  ngOnInit(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      if (this.user.trackers && this.user.trackers.task) {
        this.taskData = this.user.trackers.task;
      }
    }
  }

  toggleTask(projectIndex: number, taskIndex: number): void {
    this.taskData.projects[projectIndex].tasks[taskIndex].completed = 
      !this.taskData.projects[projectIndex].tasks[taskIndex].completed;
    this.saveData();
  }

  addTask(projectIndex: number): void {
    const taskTitle = prompt('Naziv zadatka:');
    if (taskTitle && taskTitle.trim()) {
      this.taskData.projects[projectIndex].tasks.push({
        title: taskTitle.trim(),
        completed: false,
        priority: 'medium'
      });
      this.saveData();
    }
  }

  deleteTask(projectIndex: number, taskIndex: number): void {
    if (confirm('Obrisati zadatak?')) {
      this.taskData.projects[projectIndex].tasks.splice(taskIndex, 1);
      this.saveData();
    }
  }

  addProject(): void {
    const projectName = prompt('Naziv projekta:');
    if (projectName && projectName.trim()) {
      this.taskData.projects.push({
        name: projectName.trim(),
        tasks: []
      });
      this.saveData();
    }
  }

  deleteProject(projectIndex: number): void {
    if (confirm('Obrisati projekat?')) {
      this.taskData.projects.splice(projectIndex, 1);
      this.saveData();
    }
  }

  getCompletedCount(project: any): number {
    return project.tasks.filter((t: any) => t.completed).length;
  }

  getTotalCount(project: any): number {
    return project.tasks.length;
  }

  getProgressPercentage(project: any): number {
    const total = this.getTotalCount(project);
    if (total === 0) return 0;
    return (this.getCompletedCount(project) / total) * 100;
  }

  setPriority(projectIndex: number, taskIndex: number, priority: string): void {
    this.taskData.projects[projectIndex].tasks[taskIndex].priority = priority;
    this.saveData();
  }

  saveData(): void {
    if (this.user) {
      if (!this.user.trackers) {
        this.user.trackers = {};
      }
      this.taskData.lastUpdated = new Date().toISOString();
      this.user.trackers.task = this.taskData;
      localStorage.setItem('ipiCurrentUser', JSON.stringify(this.user));
      localStorage.setItem('ipiUser_' + this.user.email, JSON.stringify(this.user));
    }
  }

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/trackers']);
  }
}
