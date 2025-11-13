
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  weight = signal<number | null>(null);
  height = signal<number | null>(null);
  submitted = signal(false);

  bmi = computed(() => {
    const w = this.weight();
    const h = this.height();
    if (w && w > 0 && h && h > 0) {
      const heightInMeters = h / 100;
      return w / (heightInMeters * heightInMeters);
    }
    return null;
  });

  result = computed(() => {
    const bmiValue = this.bmi();
    if (bmiValue === null) {
      return { category: '', color: 'text-gray-800' };
    }

    if (bmiValue < 18.5) {
      return { category: 'نحافة', color: 'text-blue-500' };
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      return { category: 'وزن صحي', color: 'text-green-500' };
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      return { category: 'زيادة في الوزن', color: 'text-orange-500' };
    } else {
      return { category: 'سمنة', color: 'text-red-500' };
    }
  });

  calculate(): void {
    this.submitted.set(true);
  }
}
