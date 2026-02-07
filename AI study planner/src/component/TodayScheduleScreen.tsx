import { useAppState } from "@/hooks/useAppState";
import { motion } from "framer-motion";
import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatHour } from "@/lib/mockData";
import ProgressBar from "@/components/ProgressBar";

const priorityBg = {
  High: "bg-priority-high/15 border-priority-high/30",
  Medium: "bg-priority-medium/15 border-priority-medium/30",
  Low: "bg-priority-low/15 border-priority-low/30",
};

const priorityAccent = {
  High: "bg-priority-high",
  Medium: "bg-priority-medium",
  Low: "bg-priority-low",
};

export default function TodayScheduleScreen() {
  const { schedule, studentInfo, createSchedule } = useAppState();
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
  const totalHours = isWeekend ? studentInfo.weekendHours : studentInfo.weekdayHours;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Today's Study Plan</h1>
        <p className="mt-1 text-muted-foreground">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      <ProgressBar />

      {/* Total Hours Banner */}
      <div className="rounded-xl bg-card p-4 shadow-card flex items-center gap-3">
        <div className="rounded-lg bg-accent/15 p-2.5">
          <Clock className="h-5 w-5 text-accent" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Available Hours</p>
          <p className="font-display text-xl font-bold text-foreground">{totalHours} hours</p>
        </div>
      </div>

      {/* Timetable */}
      <div className="rounded-xl bg-card shadow-card overflow-hidden">
        <div className="border-b border-border px-5 py-3">
          <h2 className="font-display font-semibold text-foreground text-sm">Schedule</h2>
        </div>
        <div className="divide-y divide-border">
          {schedule.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`flex items-stretch ${priorityBg[block.priority]} border-l-4 ${priorityBg[block.priority].split(" ")[1]}`}
            >
              <div className="flex w-28 shrink-0 flex-col items-center justify-center border-r border-border/50 py-4 px-3">
                <span className="text-xs font-medium text-muted-foreground">{formatHour(block.startHour)}</span>
                <div className="my-1 h-4 w-px bg-border" />
                <span className="text-xs font-medium text-muted-foreground">{formatHour(block.endHour)}</span>
              </div>
              <div className="flex flex-1 items-center justify-between px-4 py-4">
                <div>
                  <p className="font-medium text-foreground">{block.subjectName}</p>
                  <p className="text-xs text-muted-foreground">{block.priority} Priority</p>
                </div>
                <div className={`h-2.5 w-2.5 rounded-full ${priorityAccent[block.priority]}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Button
        size="lg"
        variant="outline"
        onClick={createSchedule}
        className="w-full font-display text-base h-12 rounded-xl"
      >
        <RefreshCw className="mr-2 h-5 w-5" />
        Recalculate Plan
      </Button>
    </motion.div>
  );
}
