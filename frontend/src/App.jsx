import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react'; // Tambah createContext & useContext
import Auth from './pages/Auth';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyStore from './pages/MyStore';
import AddEdit from './pages/AddEdit';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './App.css';

// 1. BUAT CONTEXT UNTUK NOTIFIKASI
export const NotificationContext = createContext();

// 2. KOMPONEN UI NOTIFIKASI (TOAST)
function Toast({ message, type, onClose }) {
    if (!message) return null;
    return (
        <div className="toast-notification">
            <span className="toast-icon">{type === 'success' ? '✅' : 'ℹ️'}</span>
            <span className="toast-msg">{message}</span>
        </div>
    );
}

// 3. NAVBAR (Sama seperti sebelumnya)
function Navbar({ token, logout, theme, toggleTheme }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'nav-item active' : 'nav-item';

    return (
        <nav>
            <Link to="/" className="logo">⚡ ThriftIT</Link>
            <div className="nav-links">
                <button onClick={toggleTheme} className="theme-btn" title="Ganti Tema">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                {token && (
                    <>
                        <Link to="/" className={isActive('/')}>Home</Link>
                        <Link to="/market" className={isActive('/market')}>Marketplace</Link>
                        <Link to="/my-store" className={isActive('/my-store')}>Toko Saya</Link>
                        <Link to="/cart" className={isActive('/cart')}>Keranjang</Link>
                        <button onClick={logout} className="btn-danger">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

// 4. APP UTAMA
function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    
    // State Notifikasi
    const [notification, setNotification] = useState(null);

    // Fungsi Trigger Notifikasi
    const showToast = (msg, type = 'success') => {
        setNotification({ msg, type });
        // Hilang otomatis setelah 3 detik
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('cart');
        setToken(null);
    };

    return (
        // Bungkus Aplikasi dengan Provider Notifikasi
        <NotificationContext.Provider value={{ showToast }}>
            <Router>
                <div className="container">
                    <Navbar token={token} logout={logout} theme={theme} toggleTheme={toggleTheme} />
                    
                    {/* Tampilkan Toast jika ada */}
                    <Toast message={notification?.msg} type={notification?.type} />

                    <div style={{ width: '100%', flex: 1 }}>
                        <Routes>
                            <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
                            <Route path="/market" element={token ? <Marketplace /> : <Navigate to="/login" />} />
                            <Route path="/my-store" element={token ? <MyStore /> : <Navigate to="/login" />} />
                            <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
                            <Route path="/checkout" element={token ? <Checkout /> : <Navigate to="/login" />} />
                            <Route path="/add" element={token ? <AddEdit /> : <Navigate to="/login" />} />
                            <Route path="/product/:id" element={token ? <ProductDetail /> : <Navigate to="/login" />} />
                            <Route path="/login" element={!token ? <Auth setToken={setToken} /> : <Navigate to="/" />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </NotificationContext.Provider>
    );
}

export default App;