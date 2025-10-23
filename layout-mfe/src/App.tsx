import { BrowserRouter } from 'react-router-dom';
import { NavigationProvider } from './contexts/NavigationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

const App = () => (
  <BrowserRouter>
    <NavigationProvider>
      <div>
        <Header />
        <div className="min-h-screen p-8">
         
        </div>
        <Footer />
      </div>
    </NavigationProvider>
  </BrowserRouter>
);

export default App;