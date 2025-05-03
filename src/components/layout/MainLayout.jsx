// src/components/layout/MainLayout.jsx
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};