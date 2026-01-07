import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FunzoneComponent } from './funzone/funzone.component';
import { TrackersComponent } from './trackers/trackers.component';
import { WaterTrackerComponent } from './trackers/water-tracker/water-tracker.component';
import { SleepTrackerComponent } from './trackers/sleep-tracker/sleep-tracker.component';
import { StudyPlannerComponent } from './trackers/study-planner/study-planner.component';
import { HabitTrackerComponent } from './trackers/habit-tracker/habit-tracker.component';
import { MealTrackerComponent } from './trackers/meal-tracker/meal-tracker.component';
import { PixelTrackerComponent } from './trackers/pixel-tracker/pixel-tracker.component';
import { CalendarTrackerComponent } from './trackers/calendar-tracker/calendar-tracker.component';
import { TaskPlannerComponent } from './trackers/task-planner/task-planner.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { WhiteboardComponent } from './funzone/whiteboard/whiteboard.component';
import { VisionBoardComponent } from './funzone/vision-board/vision-board.component';
import { KanbanComponent } from './funzone/kanban/kanban.component';

export const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'funzone', component: FunzoneComponent },
  { path: 'funzone/whiteboard', component: WhiteboardComponent },
  { path: 'funzone/vision-board', component: VisionBoardComponent },
  { path: 'funzone/kanban', component: KanbanComponent },
  { path: 'trackers', component: TrackersComponent },
  { path: 'statistics', component: StatisticsComponent},
  { path: 'trackers/water', component: WaterTrackerComponent },
  { path: 'trackers/sleep', component: SleepTrackerComponent },
  { path: 'trackers/study', component: StudyPlannerComponent },
  { path: 'trackers/habit', component: HabitTrackerComponent },
  { path: 'trackers/meal', component: MealTrackerComponent },
  { path: 'trackers/pixel', component: PixelTrackerComponent },
  { path: 'trackers/calendar', component: CalendarTrackerComponent },
  { path: 'trackers/task', component: TaskPlannerComponent }
];
