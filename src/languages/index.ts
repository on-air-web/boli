import type { Course } from './types';
import { punjabi } from './punjabi/course';
import { marathi } from './marathi/course';
import { bengali } from './bengali/course';

/** Add a new language by creating languages/<id>/course.ts and listing it here. */
export const courses: Course[] = [punjabi, marathi, bengali];

export function getCourse(id: string): Course {
  return courses.find((c) => c.languageId === id) ?? punjabi;
}
