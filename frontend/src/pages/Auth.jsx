import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth({ setToken }) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/login' : '/register';
        try {
            const res = await axios.post(`http://localhost:5000/api/auth${endpoint}`, form);
            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                setToken(res.data.token);
                navigate('/');
            } else {
                alert('Register berhasil! Silakan login.');
                setIsLogin(true);
            }
        } catch (err) { alert('Gagal: ' + (err.response?.data?.error || 'Server Error')); }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>{isLogin ? '👋' : '🚀'}</h1>
                    <h2 style={{ margin: '0 0 5px 0', color: 'var(--text-main)' }}>{isLogin ? 'Welcome Back!' : 'Join ThriftIT'}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{isLogin ? 'Masuk untuk kelola toko thriftmu' : 'Gabung komunitas thrift terbesar'}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input name="username" type="text" onChange={handleChange} required />
                    <label>Password</label>
                    <input name="password" type="password" onChange={handleChange} required />
                    <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>{isLogin ? 'Masuk Sekarang' : 'Daftar Akun'}</button>
                </form>
                <p style={{ marginTop: '25px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
                    <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 'bold', marginLeft: '5px' }}>{isLogin ? 'Daftar disini' : 'Login disini'}</span>
                </p>
            </div>
        </div>
    );
}