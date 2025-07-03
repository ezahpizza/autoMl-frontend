import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import AboutDev from "./pages/AboutDev";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ModelDashboard from "./pages/dashboard/ModelDashboard";
import EdaDashboard from "./pages/dashboard/EdaDashboard";
import UserProfilePage from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutdev" element={<AboutDev />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/model" element={<ModelDashboard />} />
          <Route path="/dashboard/eda" element={<EdaDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
