import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">About SpaceX Explorer</h3>
            <p className="text-gray-400 text-sm text-center">
              Explore SpaceX launches and rockets using real-time data from the official SpaceX GraphQL API.
            </p>
          </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} SpaceX Explorer. Built with Micro-Frontend Architecture.</p>
          <p className="mt-2">Powered by Vite + React + TypeScript + Module Federation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;