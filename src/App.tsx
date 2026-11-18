import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { IS_LOW_END_DEVICE } from "@/lib/devicePerformance";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Oldalankénti kódbetöltés: a diák telefonja csak a csatlakozó és a játék oldal kódját
// tölti le (nem a tanári szerkesztőt, diagramokat, AI-generálót stb.) → gyorsabb indulás.
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const QuizEditor = lazy(() => import("./pages/QuizEditor"));
const AIGenerate = lazy(() => import("./pages/AIGenerate"));
const CreateRoom = lazy(() => import("./pages/CreateRoom"));
const RoomControl = lazy(() => import("./pages/RoomControl"));
const JoinRoom = lazy(() => import("./pages/JoinRoom"));
const PlayQuiz = lazy(() => import("./pages/PlayQuiz"));
const Discover = lazy(() => import("./pages/Discover"));
const Results = lazy(() => import("./pages/Results"));
const PresenterView = lazy(() => import("./pages/PresenterView"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <p className="text-muted-foreground">Betöltés...</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Gyenge eszközön mindig, máshol a rendszerbeállítás szerint csökkentett animáció */}
    <MotionConfig reducedMotion={IS_LOW_END_DEVICE ? "always" : "user"}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <ErrorBoundary>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/quiz/new" element={<QuizEditor />} />
                <Route path="/quiz/:id/edit" element={<QuizEditor />} />
                <Route path="/ai-generate" element={<AIGenerate />} />
                <Route path="/room/new" element={<CreateRoom />} />
                <Route path="/room/:id" element={<RoomControl />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/join" element={<JoinRoom />} />
                <Route path="/join/:code" element={<JoinRoom />} />
                <Route path="/play/:roomId" element={<PlayQuiz />} />
                <Route path="/results/:roomId" element={<Results />} />
                <Route path="/presenter/:id" element={<PresenterView />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </HashRouter>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
