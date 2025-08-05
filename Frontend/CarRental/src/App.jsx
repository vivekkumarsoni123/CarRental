import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './assets/components/layout/Header';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </Router>
  );
}

export default App;