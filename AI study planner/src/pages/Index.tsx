import { AppProvider, useAppState } from "@/hooks/useAppState";
import Navbar from "@/components/Navbar";
import StudentInputScreen from "@/components/StudentInputScreen";
import PriorityDashboard from "@/components/PriorityDashboard";
import TodayScheduleScreen from "@/components/TodayScheduleScreen";
import UpdateConfidenceScreen from "@/components/UpdateConfidenceScreen";
import LoadingOverlay from "@/components/LoadingOverlay";
import { AnimatePresence } from "framer-motion";

function AppContent() {
  const { step, isGenerating } = useAppState();

  const screens = [
    <StudentInputScreen key="input" />,
    <PriorityDashboard key="priority" />,
    <TodayScheduleScreen key="schedule" />,
    <UpdateConfidenceScreen key="update" />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-20">
        <AnimatePresence mode="wait">
          {isGenerating && <LoadingOverlay />}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {screens[step]}
        </AnimatePresence>
      </main>
    </div>
  );
}

const Index = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default Index;
