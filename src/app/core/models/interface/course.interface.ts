export interface Course {
  id: string;
  title: string;
  teacherId: string;
  description: string;
  overallScore: number;
}

export interface Enrollment {
  userId: string;
  courseId: string;
}
