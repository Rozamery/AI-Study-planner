import { createContext, useContext, useState, ReactNode } from "react";
import { Subject, StudentInfo, PrioritySubject, ScheduleBlock } from "@/lib/types";
import { mockSubjects, mockStudentInfo, getPrioritySubjects, generateSchedule } from "@/lib/mockData";

interface AppState {
  step: number;
  setStep: (s: number) => void;
  studentInfo: StudentInfo;
  setStudentInfo: (info: StudentInfo) => void;
  subjects: Subject[];
  setSubjects: (s: Subject[]) => void;
  prioritySubjects: PrioritySubject[];
  schedule: ScheduleBlock[];
  isGenerating: boolean;
  generatePlan: () => void;
  createSchedule: () => void;
  updateConfidence: (id: string, confidence: number) => void;
  replan: () => void;
  overallProgress: number;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(mockStudentInfo);
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [prioritySubjects, setPrioritySubjects] = useState<PrioritySubject[]>([]);
  const [schedule, setSchedule] = useState<ScheduleBlock[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const overallProgress = subjects.length
    ? Math.round((subjects.reduce((sum, s) => sum + s.confidence, 0) / (subjects.length * 5)) * 100)
    : 0;

  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const ps = getPrioritySubjects(subjects);
      setPrioritySubjects(ps);
      setIsGenerating(false);
      setStep(1);
    }, 2000);
  };

  const createSchedule = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
      const hours = isWeekend ? studentInfo.weekendHours : studentInfo.weekdayHours;
      const s = generateSchedule(prioritySubjects, hours, studentInfo.preferredTime);
      setSchedule(s);
      setIsGenerating(false);
      setStep(2);
    }, 1500);
  };

  const updateConfidence = (id: string, confidence: number) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, confidence } : s)));
  };

  const replan = () => {
    const ps = getPrioritySubjects(subjects);
    setPrioritySubjects(ps);
    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
    const hours = isWeekend ? studentInfo.weekendHours : studentInfo.weekdayHours;
    const s = generateSchedule(ps, hours, studentInfo.preferredTime);
    setSchedule(s);
    setStep(1);
  };

  return (
    <AppContext.Provider
      value={{
        step, setStep, studentInfo, setStudentInfo,
        subjects, setSubjects, prioritySubjects, schedule,
        isGenerating, generatePlan, createSchedule,
        updateConfidence, replan, overallProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
}
