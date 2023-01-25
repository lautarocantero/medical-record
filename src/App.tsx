import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import AppTheme from './utilities/theme/AppTheme';
import AuthContextProvider from './context/AuthContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppTheme>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </AppTheme>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
