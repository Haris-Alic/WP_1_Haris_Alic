import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Task {
  id: number;
  text: string;
  status: 'todo' | 'progress' | 'done';
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {
  
  tasks: Task[] = [];
  showTaskModal = false;
  showClearModal = false;
  showEmailModal = false;
  taskInput = '';
  emailValue = '';
  draggedTask: Task | null = null;
  private taskIdCounter = 1;

  constructor(private router: Router) {}

  get todoTasks(): Task[] {
    return this.tasks.filter(t => t.status === 'todo');
  }

  get progressTasks(): Task[] {
    return this.tasks.filter(t => t.status === 'progress');
  }

  get doneTasks(): Task[] {
    return this.tasks.filter(t => t.status === 'done');
  }

  openTaskModal(): void {
    this.showTaskModal = true;
    this.taskInput = '';
  }

  closeTaskModal(): void {
    this.showTaskModal = false;
  }

  addTask(): void {
    if (this.taskInput.trim() === '') return;
    
    const newTask: Task = {
      id: this.taskIdCounter++,
      text: this.taskInput.trim(),
      status: 'todo'
    };
    
    this.tasks.push(newTask);
    this.closeTaskModal();
  }

  openClearModal(): void {
    this.showClearModal = true;
  }

  closeClearModal(): void {
    this.showClearModal = false;
  }

  clearBoard(): void {
    this.tasks = [];
    this.closeClearModal();
  }

  openEmailModal(): void {
    this.showEmailModal = true;
    this.emailValue = '';
  }

  closeEmailModal(): void {
    this.showEmailModal = false;
  }

  sendEmail(): void {
    if (!this.validateEmail(this.emailValue)) {
      alert('Molimo unesite validnu email adresu!');
      return;
    }

    const subject = encodeURIComponent('Kanban ploča');
    const body = encodeURIComponent('Molimo priložite vaš Kanban board.');
    const mailtoLink = `mailto:${this.emailValue}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
    this.closeEmailModal();
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  onDragStart(task: Task): void {
    this.draggedTask = task;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(status: 'todo' | 'progress' | 'done'): void {
    if (this.draggedTask) {
      this.draggedTask.status = status;
      this.draggedTask = null;
    }
  }

  goBack(): void {
    this.router.navigate(['/funzone']);
  }

  handleTaskInput(event: any): void {
    this.taskInput = event.target.value;
  }

  handleEmailInput(event: any): void {
    this.emailValue = event.target.value;
  }
}
