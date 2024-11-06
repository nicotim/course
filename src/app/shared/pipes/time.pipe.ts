import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'timestampToDate',
  standalone: true,
})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: Timestamp | Date | undefined): Date | null {
    if (value instanceof Timestamp) {
      return value.toDate();
    } else if (value instanceof Date) {
      return value;
    } else {
      return null;
    }
  }
}
