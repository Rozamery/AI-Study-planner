import { useAppState } from "@/hooks/useAppState";
import { motion } from "framer-motion";
import { Brain, Calendar, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { getTopFocusSubject } from "@/lib/mockData";

const priorityConfig = {
  High: { color: "border-priority-high bg-priority-high/10 text-priority-high", icon: AlertTriangle, label: "High Priority" },
  Medium: { color: "border-priority-medium bg-priority-medium/10 text-priority-medium", icon: Clock, label: "Medium Priority" },
  Low: { color: "border-priority-low bg-priority-low/10 text-priority-low", icon: CheckCircle2, label: "Low Priority" },
};

export default function PriorityDashboard() {
  const { prioritySubjects, createSchedule } = useAppState();
  const topFocus = getTopFocusSubject(prioritySubjects);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Priority Dashboard</h1>
        <p className="mt-1 text-muted-foreground">AI-analyzed subject priorities based on your confidence levels.</p>
      </div>

      <ProgressBar />

      {/* AI Recommendation Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl gradient-hero p-5 text-primary-foreground"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary-foreground/20 p-2">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium opacity-90">AI Recommendation</p>
            <p className="mt-0.5 font-display text-lg font-bold">
              Focus more on: {topFocus}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Subject Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {prioritySubjects.map((subject, index) => {
          const config = priorityConfig[subject.priority];
          const Icon = config.icon;
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`rounded-xl border-l-4 bg-card p-5 shadow-card ${config.color.split(" ")[0]}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">{subject.credits} credits</p>
                </div>
                <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${config.color}`}>
                  <Icon className="h-3 w-3" />
                  {config.label}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Confidence</span>
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-accent"
                    style={{ width: `${(subject.confidence / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-foreground">{subject.confidence}/5</span>
              </div>
              {subject.weakAreas && (
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Weak:</span> {subject.weakAreas}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      <Button
        size="lg"
        onClick={createSchedule}
        className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity font-display text-base h-12 rounded-xl"
      >
        <Calendar className="mr-2 h-5 w-5" />
        Create Today's Schedule
      </Button>
    </motion.div>
  );
}
