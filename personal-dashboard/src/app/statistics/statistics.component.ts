import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  user: any = null;
  aiInsights: string[] = [];
  
  sleepChart: any;
  studyChart: any;
  habitChart: any;

  filterType: string = 'week';

  ngOnInit(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      this.ensureHistoryExists();
    }
    this.generateAIInsights();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createAllCharts();
    }, 100);
  }

  ensureHistoryExists(): void {
    if (!this.user.trackers) {
      this.user.trackers = {};
    }

    if (!this.user.trackers.sleep) {
      this.user.trackers.sleep = { hours: 0, history: [] };
    }
    if (!this.user.trackers.sleep.history || this.user.trackers.sleep.history.length === 0) {
      this.user.trackers.sleep.history = this.generateMockHistory(6, 9);
    }

    if (!this.user.trackers.study) {
      this.user.trackers.study = { todayHours: 0, history: [] };
    }
    if (!this.user.trackers.study.history || this.user.trackers.study.history.length === 0) {
      this.user.trackers.study.history = this.generateMockHistory(2, 6);
    }
  }

  generateMockHistory(min: number, max: number): any[] {
    const history = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const value = Math.random() * (max - min) + min;
      
      history.push({
        date: date.toISOString().split('T')[0],
        value: Number(value.toFixed(1))
      });
    }
    
    return history;
  }

  createAllCharts(): void {
    this.createSleepChart();
    this.createStudyChart();
    this.createHabitChart();
  }

  destroyCharts(): void {
    if (this.sleepChart) {
      this.sleepChart.destroy();
    }
    if (this.studyChart) {
      this.studyChart.destroy();
    }
    if (this.habitChart) {
      this.habitChart.destroy();
    }
  }

  createSleepChart(): void {
    const ctx = document.getElementById('sleepChart') as HTMLCanvasElement;
    if (!ctx) return;

    const history = this.user?.trackers?.sleep?.history || [];
    const labels = history.map((h: any) => {
      const date = new Date(h.date);
      return date.toLocaleDateString('hr-BA', { weekday: 'short', day: 'numeric', month: 'short' });
    });
    const data = history.map((h: any) => h.value);
    
    this.sleepChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['Nema podataka'],
        datasets: [{
          label: 'Sati spavanja',
          data: data.length > 0 ? data : [0],
          backgroundColor: '#9370DB',
          borderColor: '#6A5ACD',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 12,
            title: {
              display: true,
              text: 'Sati'
            }
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

  createStudyChart(): void {
    const ctx = document.getElementById('studyChart') as HTMLCanvasElement;
    if (!ctx) return;

    const history = this.user?.trackers?.study?.history || [];
    const labels = history.map((h: any) => {
      const date = new Date(h.date);
      return date.toLocaleDateString('hr-BA', { weekday: 'short', day: 'numeric', month: 'short' });
    });
    const data = history.map((h: any) => h.value);
    
    this.studyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels.length > 0 ? labels : ['Nema podataka'],
        datasets: [{
          label: 'Sati učenja',
          data: data.length > 0 ? data : [0],
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
          borderColor: '#FFD700',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 8,
            title: {
              display: true,
              text: 'Sati'
            }
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

  createHabitChart(): void {
    const ctx = document.getElementById('habitChart') as HTMLCanvasElement;
    if (!ctx) return;

    const habits = this.user?.trackers?.habit?.habits || [];
    const completedCount = habits.filter((h: any) => h.completed).length;
    const totalCount = habits.length || 6;
    const notCompleted = totalCount - completedCount;
    
    this.habitChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Završeno', 'Preostalo'],
        datasets: [{
          data: [completedCount, notCompleted],
          backgroundColor: ['#32CD32', '#FF6B6B'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });
  }

  generateAIInsights(): void {
    this.aiInsights = [];

    const sleep = this.user?.trackers?.sleep?.hours || 0;
    const study = this.user?.trackers?.study?.todayHours || 0;
    const water = this.user?.trackers?.water?.today || 0;
    const habits = this.user?.trackers?.habit?.habits || [];
    const completedHabits = habits.filter((h: any) => h.completed).length;

    if (sleep < 6 && study > 3) {
      this.aiInsights.push('⚠️ Studiraš naporno ali ne spavaš dovoljno! Povećaj san na 7-8 sati.');
    }

    if (sleep > 8 && study > 3) {
      this.aiInsights.push('🌟 Odlično! Balansiraš san i učenje perfektno!');
    }

    if (water < 5) {
      this.aiInsights.push('💧 Piješ malo vode! Cilj je 8 čaša dnevno.');
    }

    if (water >= 8) {
      this.aiInsights.push('💪 Super hidratacija! Nastavi ovako!');
    }

    if (completedHabits >= habits.length && habits.length > 0) {
      this.aiInsights.push('🎉 Sve navike završene! Ti si produktivna mašina!');
    }

    if (completedHabits < habits.length / 2 && habits.length > 0) {
      this.aiInsights.push('📋 Manje od 50% navika završeno. Fokusiraj se danas!');
    }

    if (study < 2) {
      this.aiInsights.push('📚 Premalo učenja danas. Pokušaj barem 3-4 sata.');
    }

    if (study >= 5) {
      this.aiInsights.push('🔥 Odličan tempo učenja! Napravi pauzu za odmor.');
    }

    if (sleep < 6) {
      this.aiInsights.push('😴 Kritično malo sna! Prioritiziraj odmor večeras.');
    }

    if (this.aiInsights.length === 0) {
      this.aiInsights.push('👍 Sve izgleda dobro! Nastavi sa svojim navikama.');
    }
  }

  changeFilter(type: string): void {
    this.filterType = type;
    this.destroyCharts();
    
    if (type === 'week') {
      this.user.trackers.sleep.history = this.generateMockHistory(6, 9);
      this.user.trackers.study.history = this.generateMockHistory(2, 6);
    } else if (type === 'month') {
      this.user.trackers.sleep.history = this.generateMockHistory(5, 10);
      this.user.trackers.study.history = this.generateMockHistory(1, 7);
    } else {
      this.user.trackers.sleep.history = [{ date: new Date().toISOString().split('T')[0], value: this.user.trackers.sleep.hours || 7 }];
      this.user.trackers.study.history = [{ date: new Date().toISOString().split('T')[0], value: this.user.trackers.study.todayHours || 3 }];
    }
    
    setTimeout(() => {
      this.createAllCharts();
    }, 50);
  }
}
