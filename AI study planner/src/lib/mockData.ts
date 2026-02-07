import { Subject, StudentInfo, ScheduleBlock, PrioritySubject } from "./types";

export const mockStudentInfo: StudentInfo = {
  name: "Alex Johnson",
  college: "MIT",
  graduationYear: "2026",
  email: "alex@mit.edu",
  weekdayHours: 4,
  weekendHours: 6,
  preferredTime: "Night",
};

export const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Operating Systems",
    credits: 4,
    confidence: 2,
    strongAreas: "Process scheduling, Memory management",
    weakAreas: "File systems, Deadlocks",
  },
  {
    id: "2",
    name: "Data Structures",
    credits: 3,
    confidence: 4,
    strongAreas: "Arrays, Linked lists, Stacks",
    weakAreas: "Graphs, AVL trees",
  },
  {
    id: "3",
    name: "Computer Networks",
    credits: 3,
    confidence: 1,
    strongAreas: "OSI model basics",
    weakAreas: "TCP/IP, Routing, Subnetting",
  },
  {
    id: "4",
    name: "Database Systems",
    credits: 4,
    confidence: 3,
    strongAreas: "SQL queries, ER diagrams",
    weakAreas: "Normalization, Transactions",
  },
  {
    id: "5",
    name: "Discrete Mathematics",
    credits: 3,
    confidence: 5,
    strongAreas: "Logic, Set theory, Combinatorics",
    weakAreas: "Graph theory proofs",
  },
];

export function getPrioritySubjects(subjects: Subject[]): PrioritySubject[] {
  return subjects.map((s) => {
    let priority: "High" | "Medium" | "Low";
    if (s.confidence <= 2) priority = "High";
    else if (s.confidence <= 3) priority = "Medium";
    else priority = "Low";
    return { ...s, priority };
  }).sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return order[a.priority] - order[b.priority];
  });
}

export function getTopFocusSubject(subjects: PrioritySubject[]): string {
  return subjects[0]?.name ?? "N/A";
}

export function generateSchedule(
  subjects: PrioritySubject[],
  totalHours: number,
  preferredTime: string
): ScheduleBlock[] {
  const startHourMap: Record<string, number> = {
    Morning: 6,
    Afternoon: 13,
    Night: 19,
  };
  let startHour = startHourMap[preferredTime] ?? 19;
  const blocks: ScheduleBlock[] = [];

  // Weighted allocation based on priority
  const weights = subjects.map((s) =>
    s.priority === "High" ? 3 : s.priority === "Medium" ? 2 : 1
  );
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let hoursLeft = totalHours;
  subjects.forEach((s, i) => {
    const allocated = Math.max(1, Math.round((weights[i] / totalWeight) * totalHours));
    const hours = Math.min(allocated, hoursLeft);
    if (hours <= 0) return;
    for (let h = 0; h < hours; h++) {
      const from = startHour;
      const to = startHour + 1;
      blocks.push({
        id: `${s.id}-${h}`,
        subjectName: s.name,
        startHour: from,
        endHour: to,
        priority: s.priority,
      });
      startHour++;
      hoursLeft--;
    }
  });

  return blocks;
}

export function formatHour(h: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour12} ${period}`;
}
