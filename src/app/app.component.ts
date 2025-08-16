import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorCounterComponent } from './components/behavior-counter.component';
import { SignalCounterComponent } from './components/signal-counter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BehaviorCounterComponent, SignalCounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '';
}
