import React, { Suspense, lazy, useEffect, useState, useRef } from "react";
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

const LaunchesPage = () => {
  const [height, setHeight] = useState(1000);
  const lastSetHeightRef = useRef(1000);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.source === "launches") {
        if (
          event.data.type === "iframe-height" &&
          typeof event.data.height === "number"
        ) {
          const contentHeight = event.data.height;
          const newHeight = contentHeight + 100;

          if (newHeight !== lastSetHeightRef.current) {
            lastSetHeightRef.current = newHeight;
            setHeight(newHeight);
          }
        }

        if (event.data.type === "scroll-to-top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      src={import.meta.env.VITE_LAUNCHES_MFE_URL}
      className="w-full border-0"
      style={{
        minHeight: "2000px",
        height: `${height}px`,
        display: "block",
      }}
      title="SpaceX Launches"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
  );
};

const RocketsPage = () => {
  const [height, setHeight] = useState(1000);
  const lastSetHeightRef = useRef(1000);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.source === "rockets") {
        if (
          event.data.type === "iframe-height" &&
          typeof event.data.height === "number"
        ) {
          const contentHeight = event.data.height;
          const newHeight = contentHeight + 100;

          if (newHeight !== lastSetHeightRef.current) {
            lastSetHeightRef.current = newHeight;
            setHeight(newHeight);
          }
        }

        if (event.data.type === "scroll-to-top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      src={import.meta.env.VITE_ROCKETS_MFE_URL}
      className="w-full border-0"
      style={{
        minHeight: "1000px",
        height: `${height}px`,
        display: "block",
      }}
      title="SpaceX Rockets"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
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

        <main className="p-6">
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
