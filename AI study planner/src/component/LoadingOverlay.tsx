import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoadingOverlay({ message = "AI is analyzing your study profile..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 shadow-elevated"
      >
        <div className="relative">
          <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center animate-ai-pulse">
            <Sparkles className="h-7 w-7 text-primary-foreground" />
          </div>
        </div>
        <div className="text-center">
          <p className="font-display font-semibold text-foreground">{message}</p>
          <div className="mt-3 h-1.5 w-48 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full gradient-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
