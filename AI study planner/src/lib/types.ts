export interface Subject {
  id: string;
  name: string;
  credits: number;
  confidence: number;
  strongAreas: string;
  weakAreas: string;
}

export interface PrioritySubject extends Subject {
  priority: "High" | "Medium" | "Low";
}

export interface StudentInfo {
  name: string;
  college: string;
  graduationYear: string;
  email: string;
  weekdayHours: number;
  weekendHours: number;
  preferredTime: string;
}

export interface ScheduleBlock {
  id: string;
  subjectName: string;
  startHour: number;
  endHour: number;
  priority: "High" | "Medium" | "Low";
}
