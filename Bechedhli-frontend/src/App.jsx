import { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api } from './api';
import LoginPage from './pages/LoginPage';
import Loader from './components/Loader';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastContainer from './components/ToastContainer';
import DashboardView from './views/DashboardView';
import EmployeesView from './views/EmployeesView';
import StockView from './views/StockView';
import ClientsView from './views/ClientsView';
import LivraisonView from './views/LivraisonView';

function AppContent() {
  const { logout, user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [employees, setEmployees] = useState([]);
  const [stock, setStock] = useState([]);
  const [clients, setClients] = useState([]);
  const [bls, setBls] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('bechedhli_theme');
    return stored || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('bechedhli_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  useEffect(() => {
    Promise.all([
      api.get('/employees').then(setEmployees).catch(() => {}),
      api.get('/stock').then(setStock).catch(() => {}),
      api.get('/clients').then(setClients).catch(() => {}),
      api.get('/delivery-notes').then(setBls).catch(() => {}),
    ]).then(() => {
      setTimeout(() => setLoading(false), 400);
    });
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
    }, 3000);
  }, []);

  const employeeHandlers = {
    add: async (data) => {
      const emp = await api.post('/employees', data);
      setEmployees(prev => [...prev, emp]);
      return emp;
    },
    update: async (id, data) => {
      const emp = await api.put(`/employees/${id}`, data);
      setEmployees(prev => prev.map(e => e.id === id ? emp : e));
      return emp;
    },
    remove: async (id) => {
      await api.del(`/employees/${id}`);
      setEmployees(prev => prev.filter(e => e.id !== id));
    },
  };

  const stockHandlers = {
    add: async (data) => {
      const item = await api.post('/stock', data);
      setStock(prev => [...prev, item]);
      return item;
    },
    update: async (id, data) => {
      const item = await api.put(`/stock/${id}`, data);
      setStock(prev => prev.map(i => i.id === id ? item : i));
      return item;
    },
    remove: async (id) => {
      await api.del(`/stock/${id}`);
      setStock(prev => prev.filter(i => i.id !== id));
    },
  };

  const clientHandlers = {
    add: async (data) => {
      const client = await api.post('/clients', data);
      setClients(prev => [...prev, client]);
      return client;
    },
    update: async (id, data) => {
      const client = await api.put(`/clients/${id}`, data);
      setClients(prev => prev.map(c => c.id === id ? client : c));
      return client;
    },
    remove: async (id) => {
      await api.del(`/clients/${id}`);
      setClients(prev => prev.filter(c => c.id !== id));
    },
    addOrder: async (clientId, data) => {
      const order = await api.post('/orders', { client_id: clientId, ...data });
      setClients(prev => prev.map(c => c.id === clientId ? { ...c, orders: [...(c.orders || []), order] } : c));
      return order;
    },
    markOrderReceived: async (orderId) => {
      const order = await api.post(`/orders/${orderId}/mark-received`);
      setClients(prev => prev.map(c => ({
        ...c,
        orders: (c.orders || []).map(o => o.id === orderId ? order : o),
      })));
      return order;
    },
    removeOrder: async (clientId, orderId) => {
      await api.del(`/orders/${orderId}`);
      setClients(prev => prev.map(c => c.id === clientId ? { ...c, orders: (c.orders || []).filter(o => o.id !== orderId) } : c));
    },
  };

  const blHandlers = {
    add: async (data) => {
      const dn = await api.post('/delivery-notes', data);
      setBls(prev => [...prev, dn]);
      return dn;
    },
    nextId: async () => {
      const res = await api.get('/delivery-notes/next-id');
      return res.next_id;
    },
    markDelivered: async (id) => {
      const dn = await api.post(`/delivery-notes/${id}/mark-delivered`);
      setBls(prev => prev.map(b => b.id === id ? dn : b));
      return dn;
    },
    markInvoiced: async (id) => {
      const dn = await api.post(`/delivery-notes/${id}/mark-invoiced`);
      setBls(prev => prev.map(b => b.id === id ? dn : b));
      return dn;
    },
    remove: async (id) => {
      await api.del(`/delivery-notes/${id}`);
      setBls(prev => prev.filter(b => b.id !== id));
    },
  };

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
      logout();
    }
  };

  if (loading) return <Loader />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="bg-mesh" />
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div style={{ flex: 1, marginLeft: 260, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header theme={theme} setTheme={setTheme} user={user} onLogout={handleLogout} />
        <main style={{ flex: 1, overflow: 'auto', padding: '28px 32px 40px' }} key={activeView}>
          {activeView === 'dashboard' && <DashboardView employees={employees} stock={stock} clients={clients} />}
          {activeView === 'employees' && <EmployeesView employees={employees} handlers={employeeHandlers} addToast={addToast} />}
          {activeView === 'stock' && <StockView stock={stock} handlers={stockHandlers} addToast={addToast} />}
          {activeView === 'clients' && <ClientsView clients={clients} handlers={clientHandlers} addToast={addToast} />}
          {activeView === 'livraison' && <LivraisonView bls={bls} handlers={blHandlers} clients={clients} addToast={addToast} />}
        </main>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  );
}

function AppWithAuth() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated) return <LoginPage />;

  return <AppContent />;
}
