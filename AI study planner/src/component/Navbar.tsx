import { Brain, BookOpen, Calendar, RefreshCw } from "lucide-react";
import { useAppState } from "@/hooks/useAppState";
import { motion } from "framer-motion";

const navItems = [
  { label: "Input", icon: BookOpen, step: 0 },
  { label: "Priorities", icon: Brain, step: 1 },
  { label: "Schedule", icon: Calendar, step: 2 },
  { label: "Update", icon: RefreshCw, step: 3 },
];

export default function Navbar() {
  const { step, setStep, prioritySubjects } = useAppState();
  const canNavigate = (s: number) => {
    if (s === 0) return true;
    if (s >= 1 && prioritySubjects.length > 0) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary animate-ai-pulse">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground tracking-tight">
            SmartStudy AI
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => {
            const active = step === item.step;
            const enabled = canNavigate(item.step);
            return (
              <button
                key={item.step}
                onClick={() => enabled && setStep(item.step)}
                disabled={!enabled}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${active ? "text-primary" : enabled ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground/40 cursor-not-allowed"}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        {/* Mobile step indicator */}
        <div className="flex sm:hidden items-center gap-1.5">
          {navItems.map((item) => (
            <button
              key={item.step}
              onClick={() => canNavigate(item.step) && setStep(item.step)}
              className={`h-2 w-2 rounded-full transition-all ${step === item.step ? "w-6 bg-primary" : canNavigate(item.step) ? "bg-muted-foreground/30" : "bg-muted-foreground/10"}`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
