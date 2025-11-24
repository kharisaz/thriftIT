import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../App'; // Import Context

export default function Checkout() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    
    // Panggil fungsi notifikasi
    const { showToast } = useContext(NotificationContext);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('cart')) || [];
        if(saved.length === 0) navigate('/cart');
        setCart(saved);
    }, []);

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    
    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            // GANTI ALERT DENGAN TOAST
            showToast('Pembayaran Berhasil! Pesanan diproses.');
            localStorage.removeItem('cart');
            navigate('/');
        }, 2000);
    };

    return (
        <div style={{maxWidth:'800px', margin:'0 auto'}}>
            {/* Header dengan Tombol Back */}
            <div style={{display:'flex', alignItems:'center', gap:'15px', marginBottom:'20px'}}>
                <button onClick={() => navigate('/cart')} className="btn-outline" style={{width:'auto', padding:'8px 15px'}}>
                    &larr; Kembali
                </button>
                <h2 style={{margin:0}}>💳 Pembayaran</h2>
            </div>

            <div className="checkout-summary" style={{width:'100%'}}>
                <h4>Rincian Pesanan</h4>
                {cart.map((item, i) => (
                    <div key={i} style={{display:'flex', justifyContent:'space-between', marginBottom:'10px', borderBottom:'1px solid var(--border-color)', paddingBottom:'10px'}}>
                        <span>{item.name}</span>
                        <span>Rp {item.price.toLocaleString()}</span>
                    </div>
                ))}
                <div style={{marginTop:'20px', display:'flex', justifyContent:'space-between', fontSize:'1.2rem', fontWeight:'bold', color:'#55efc4'}}>
                    <span>Total Bayar</span>
                    <span>Rp {(total + 2000).toLocaleString()}</span>
                </div>
                <button onClick={handlePay} className="btn-success" style={{marginTop:'20px', width:'100%'}} disabled={processing}>
                    {processing ? 'Memproses...' : 'Bayar Sekarang'}
                </button>
            </div>
        </div>
    );
}