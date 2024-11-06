import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  isLoading = signal<Boolean>(false);
  isLoading$ = toObservable(this.isLoading);

  constructor() {
    this.isLoading$.subscribe((data) => console.log('Is loading?', data));
  }

  public show() {
    this.isLoading.set(true);
  }

  public hide() {
    this.isLoading.set(false);
  }
}
