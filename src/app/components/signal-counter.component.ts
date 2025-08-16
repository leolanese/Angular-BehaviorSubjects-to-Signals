import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SignalService } from '../services/signal.service';

@Component({
  selector: 'app-signal-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Signal User</h2>

    <div *ngIf="userService.getUser() as user; else guest">
      Welcome, {{ user.name ?? user }}!
      <button (click)="logout()">Logout</button>
    </div>

    <ng-template #guest>
      <button (click)="login()">Login as Leo</button>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalCounterComponent {
  readonly userService = inject(SignalService);

  // Counter signal demo (still here if you want to play)
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  login(): void {
    this.userService.setUser({ id: 2, name: 'Leo' });
  }

  logout(): void {
    this.userService.clearUser();
  }
}
