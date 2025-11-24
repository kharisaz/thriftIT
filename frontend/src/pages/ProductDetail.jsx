import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { NotificationContext } from '../App'; // Import Context

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const myId = localStorage.getItem('userId');
    
    // Panggil fungsi notifikasi
    const { showToast } = useContext(NotificationContext);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products`).then(res => {
            setProduct(res.data.find(p => p._id === id));
        });
    }, [id]);

    const addToCart = (isBuyNow) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        if (isBuyNow) {
            navigate('/checkout');
        } else {
            // GANTI ALERT DENGAN TOAST
            showToast('Sukses masuk keranjang! 🛒');
        }
    };

    if (!product) return <div>Loading...</div>;

    // ... (SISA KODE RENDER DI BAWAH TETAP SAMA SEPERTI SEBELUMNYA) ...
    return (
        <div style={{display:'flex', gap:'40px', justifyContent:'center', marginTop:'40px', flexWrap:'wrap'}}>
             {/* ... kode gambar ... */}
             <div style={{flex:1, minWidth:'300px', maxWidth:'500px'}}>
                <img src={`http://localhost:5000${product.imageUrl}`} style={{width:'100%', borderRadius:'20px', boxShadow:'var(--card-shadow)'}} />
            </div>

            <div style={{flex:1, minWidth:'300px', maxWidth:'500px'}}>
                <h1 style={{fontSize:'2.5rem', marginBottom:'10px', color:'var(--text-main)'}}>{product.name}</h1>
                <h2 style={{color:'#6c5ce7', fontSize:'2rem', margin:'0 0 20px 0'}}>Rp {product.price.toLocaleString()}</h2>
                
                <div style={{background:'var(--glass-bg)', border:'1px solid var(--border-color)', padding:'25px', borderRadius:'15px', marginBottom:'30px'}}>
                    <h4 style={{marginTop:0, color:'var(--text-muted)'}}>Deskripsi Barang</h4>
                    <p style={{lineHeight:'1.6', color:'var(--text-main)', whiteSpace:'pre-wrap'}}>{product.description}</p>
                </div>

                {product.user !== myId ? (
                    <div style={{display:'flex', gap:'15px'}}>
                        <button onClick={() => addToCart(true)} className="btn-primary">Beli Sekarang</button>
                        <button onClick={() => addToCart(false)} className="btn-outline">Masukan Keranjang 🛒</button>
                    </div>
                ) : (
                    <div style={{padding:'15px', background:'rgba(255,71,87,0.1)', border:'1px solid #ff4757', borderRadius:'10px', textAlign:'center', color:'#ff4757'}}>🔒 Ini barang daganganmu sendiri.</div>
                )}
            </div>
        </div>
    );
}