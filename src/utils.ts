import { SerializedError } from '@reduxjs/toolkit';

export function getRatingName(rating: number): string {
  switch (true) {
    case (rating <= 3): return 'Bad';
    case (rating <= 5): return 'Normal';
    case (rating <= 8): return 'Good';
    case (rating < 10): return 'Very good';
    default: return 'Awesome';
  }
}

export function getRunTime(runTime: number): string {
  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60;
  return `${hours}h ${minutes}m`;
}

export function isNotFoundError(err: SerializedError): boolean {
  return err.message?.includes('404') ?? false;
}
