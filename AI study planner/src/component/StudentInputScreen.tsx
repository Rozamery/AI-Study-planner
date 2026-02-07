import { useState } from "react";
import { useAppState } from "@/hooks/useAppState";
import { Subject } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Sparkles, BookOpen } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

export default function StudentInputScreen() {
  const { studentInfo, setStudentInfo, subjects, setSubjects, generatePlan } = useAppState();
  const [info, setInfo] = useState(studentInfo);

  const updateField = (field: string, value: string | number) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
    setStudentInfo({ ...info, [field]: value });
  };

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: "",
      credits: 3,
      confidence: 3,
      strongAreas: "",
      weakAreas: "",
    };
    setSubjects([...subjects, newSubject]);
  };

  const updateSubject = (id: string, field: string, value: string | number) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const isValid = info.name && subjects.length > 0 && subjects.every((s) => s.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Set Up Your Study Profile</h1>
        <p className="mt-1 text-muted-foreground">Tell us about yourself and your subjects so our AI can craft the perfect plan.</p>
      </div>

      <ProgressBar />

      {/* Student Info */}
      <div className="rounded-xl bg-card p-5 shadow-card space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Student Info
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input value={info.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Your name" />
          </div>
          <div className="space-y-1.5">
            <Label>College</Label>
            <Input value={info.college} onChange={(e) => updateField("college", e.target.value)} placeholder="Your college" />
          </div>
          <div className="space-y-1.5">
            <Label>Graduation Year</Label>
            <Input value={info.graduationYear} onChange={(e) => updateField("graduationYear", e.target.value)} placeholder="2026" />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input value={info.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@email.com" type="email" />
          </div>
        </div>
      </div>

      {/* Study Availability */}
      <div className="rounded-xl bg-card p-5 shadow-card space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground">Study Availability</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Weekday Hours</Label>
            <div className="flex items-center gap-3">
              <Slider
                value={[info.weekdayHours]}
                onValueChange={([v]) => updateField("weekdayHours", v)}
                min={1} max={10} step={1}
                className="flex-1"
              />
              <span className="text-sm font-bold text-foreground w-6 text-right">{info.weekdayHours}h</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Weekend Hours</Label>
            <div className="flex items-center gap-3">
              <Slider
                value={[info.weekendHours]}
                onValueChange={([v]) => updateField("weekendHours", v)}
                min={1} max={12} step={1}
                className="flex-1"
              />
              <span className="text-sm font-bold text-foreground w-6 text-right">{info.weekendHours}h</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preferred Time</Label>
            <div className="flex gap-2">
              {["Morning", "Afternoon", "Night"].map((t) => (
                <button
                  key={t}
                  onClick={() => updateField("preferredTime", t)}
                  className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all border
                    ${info.preferredTime === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/30"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="rounded-xl bg-card p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">Subjects</h2>
          <Button variant="outline" size="sm" onClick={addSubject}>
            <Plus className="mr-1.5 h-4 w-4" /> Add Subject
          </Button>
        </div>

        <AnimatePresence>
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-lg border border-border bg-secondary/30 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Subject {index + 1}</span>
                <button onClick={() => removeSubject(subject.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Subject Name</Label>
                  <Input value={subject.name} onChange={(e) => updateSubject(subject.id, "name", e.target.value)} placeholder="e.g. Data Structures" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Credits</Label>
                  <Input type="number" value={subject.credits} onChange={(e) => updateSubject(subject.id, "credits", parseInt(e.target.value) || 1)} min={1} max={6} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Confidence Level: {subject.confidence}/5</Label>
                <Slider
                  value={[subject.confidence]}
                  onValueChange={([v]) => updateSubject(subject.id, "confidence", v)}
                  min={1} max={5} step={1}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Strong Areas</Label>
                  <Input value={subject.strongAreas} onChange={(e) => updateSubject(subject.id, "strongAreas", e.target.value)} placeholder="Topics you're good at" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Weak Areas</Label>
                  <Input value={subject.weakAreas} onChange={(e) => updateSubject(subject.id, "weakAreas", e.target.value)} placeholder="Topics you need help with" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Button
        size="lg"
        disabled={!isValid}
        onClick={generatePlan}
        className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity font-display text-base h-12 rounded-xl"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Generate Smart Plan
      </Button>
    </motion.div>
  );
}
