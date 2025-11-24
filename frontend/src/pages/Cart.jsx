import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { setCart(JSON.parse(localStorage.getItem('cart')) || []); }, []);

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="checkout-container">
            <div className="checkout-items">
                <h2>🛒 Keranjang ({cart.length})</h2>
                {cart.length === 0 ? <p>Keranjang kosong. <Link to="/market" style={{color:'#6c5ce7'}}>Belanja dulu!</Link></p> : cart.map((item, idx) => (
                    <div key={idx} className="cart-item">
                        <img src={`http://localhost:5000${item.imageUrl}`} style={{width:'80px', height:'80px', borderRadius:'10px', objectFit:'cover'}} />
                        <div style={{flex:1}}>
                            <h4 style={{margin:0, color:'var(--text-main)'}}>{item.name}</h4>
                            <p style={{color:'var(--text-muted)', margin:'5px 0'}}>Rp {item.price.toLocaleString()}</p>
                        </div>
                        <button onClick={() => removeFromCart(idx)} className="btn-danger">Hapus</button>
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className="checkout-summary">
                    <h3>Ringkasan</h3>
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
                        <span>Total</span>
                        <span style={{fontWeight:'bold', color:'#55efc4'}}>Rp {total.toLocaleString()}</span>
                    </div>
                    <button onClick={() => navigate('/checkout')} className="btn-primary">Checkout</button>
                </div>
            )}
        </div>
    );
}