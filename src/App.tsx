import { AppRoutes } from './routes/route';
import { AppProvider } from './providers/app';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
