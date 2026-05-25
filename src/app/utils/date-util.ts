export class DateUtil {
  static parseIso(isoDate: string): Date {
    return new Date(`${isoDate}T12:00:00`);
  }

  static formatIso(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
