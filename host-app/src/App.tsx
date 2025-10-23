import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAppSelector } from "./store/hooks";

const Header = lazy(() => import("layout_app/Header"));
const Footer = lazy(() => import("layout_app/Footer"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// Page Components with dynamic height
const LaunchesPage = () => {
  const [height, setHeight] = useState(1000);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only process messages from our MFEs
      if (
        event.data.type === 'iframe-height' && 
        event.data.source === 'launches' &&
        event.data.height
      ) {
        setHeight(event.data.height + 50);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      src="http://localhost:5002"
      className="w-full border-0"
      style={{ height: `${height * 1.4}px`, display: 'block' }}
      title="SpaceX Launches"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
};

const RocketsPage = () => {
  const [height, setHeight] = useState(1000);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data.type === 'iframe-height' && 
        event.data.source === 'rockets' &&
        event.data.height
      ) {
        setHeight(event.data.height + 50);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      src="http://localhost:5003"
      className="w-full border-0"
      style={{ height: `${height}px`, display: 'block' }}
      title="SpaceX Rockets"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
};

const RouterSync: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const path = customEvent.detail?.path;
      if (path && path !== location.pathname) {
        navigate(path);
      }
    };

    window.addEventListener("routechange", handleRouteChange);
    return () => window.removeEventListener("routechange", handleRouteChange);
  }, [navigate, location.pathname]);

  return null;
};

function App() {
  const { theme } = useAppSelector((state) => state.user);

  return (
    <BrowserRouter>
      <RouterSync />
      <div className={theme === "dark" ? "bg-gray-300" : "bg-gray-50"}>
        <Suspense fallback={<LoadingSpinner />}>
          <Header />
        </Suspense>

        <main>
          <Routes>
            <Route path="/" element={<LaunchesPage />} />
            <Route path="/rockets" element={<RocketsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;