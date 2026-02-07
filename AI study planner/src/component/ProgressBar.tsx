import { useAppState } from "@/hooks/useAppState";
import { motion } from "framer-motion";

export default function ProgressBar() {
  const { overallProgress } = useAppState();
  return (
    <div className="rounded-xl bg-card p-4 shadow-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">Overall Preparation</span>
        <span className="text-sm font-bold text-foreground">{overallProgress}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-accent"
          initial={{ width: 0 }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
