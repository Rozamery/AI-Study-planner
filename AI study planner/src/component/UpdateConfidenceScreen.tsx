import { useAppState } from "@/hooks/useAppState";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

export default function UpdateConfidenceScreen() {
  const { subjects, updateConfidence, replan } = useAppState();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Update Confidence</h1>
        <p className="mt-1 text-muted-foreground">Adjust your confidence levels after studying and let AI replan.</p>
      </div>

      <ProgressBar />

      <div className="space-y-3">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-xl bg-card p-5 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-foreground">{subject.name}</h3>
                <p className="text-xs text-muted-foreground">{subject.credits} credits</p>
              </div>
              <span className="text-2xl font-display font-bold text-primary">{subject.confidence}</span>
            </div>
            <Slider
              value={[subject.confidence]}
              onValueChange={([v]) => updateConfidence(subject.id, v)}
              min={1}
              max={5}
              step={1}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-muted-foreground">Not confident</span>
              <span className="text-[10px] text-muted-foreground">Very confident</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Button
        size="lg"
        onClick={replan}
        className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity font-display text-base h-12 rounded-xl"
      >
        <RefreshCw className="mr-2 h-5 w-5" />
        Update & Replan
      </Button>
    </motion.div>
  );
}
