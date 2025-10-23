import React, { useEffect, useState } from "react";
import { useSafeDispatch, useSafeSelector } from "../hooks/useSafeRedux";
import {
  NavigationProvider,
  useNavigation,
} from "../contexts/NavigationContext";

interface UserState {
  name: string;
  theme: "light" | "dark";
}

interface RootState {
  user: UserState;
}

const HeaderContent: React.FC = () => {
  const defaultUser: UserState = {
    name: "Guest",
    theme: "light",
  };

  const { theme } = useSafeSelector(
    (state: RootState) => state.user,
    defaultUser
  );
  const dispatch = useSafeDispatch();
  const { isMenuOpen, toggleMenu } = useNavigation();

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    window.addEventListener("routechange", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("routechange", handleRouteChange);
    };
  }, []);

  const handleThemeToggle = () => {
    if (dispatch) {
      dispatch({ type: "user/toggleTheme" });
    }
  };

  const handleNavigation = (path: string) => {
    window.history.pushState({}, "", path);

    window.dispatchEvent(new CustomEvent("routechange", { detail: { path } }));

    setCurrentPath(path);
  };

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <header
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
      } shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <span className="text-xl font-bold">SpaceX Explorer</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigation("/")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive("/") ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
            >
              Launches
            </button>
            <button
              onClick={() => handleNavigation("/rockets")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive("/rockets") ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
            >
              Rockets
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-blue-500 transition"
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md hover:bg-blue-500"
            >
              X
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <button
              onClick={() => {
                handleNavigation("/");
                toggleMenu();
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/launches") ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
            >
              Launches
            </button>
            <button
              onClick={() => {
                handleNavigation("/rockets");
                toggleMenu();
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium mt-1 ${
                isActive("/rockets") ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
            >
              Rockets
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const Header: React.FC = () => {
  return (
    <NavigationProvider>
      <HeaderContent />
    </NavigationProvider>
  );
};

export default Header;
