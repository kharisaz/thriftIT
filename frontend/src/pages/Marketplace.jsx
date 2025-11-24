import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Marketplace() {
    const [products, setProducts] = useState([]);
    const myId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('http://localhost:5000/api/products').then(res => {
            // Filter: Hanya tampilkan barang ORANG LAIN
            setProducts(res.data.filter(p => p.user !== myId));
        });
    }, []);

    return (
        <div>
            {/* --- HEADER SECTION (Layout Seperti Toko Saya) --- */}
            {/* Menggunakan class 'section-header' dari App.css agar Judul kiri, Tombol kanan */}
            <div className="section-header" style={{marginBottom:'30px'}}>
                <div>
                    <h2 style={{margin:0}}>Marketplace 🌏</h2>
                    <p style={{margin:'5px 0 0 0', fontSize:'0.9rem', color:'var(--text-muted)'}}>
                        Jelajahi barang berkualitas dari mahasiswa lain
                    </p>
                </div>
                
                <Link to="/add">
                    <button className="btn-primary" style={{width:'auto', padding:'10px 25px'}}>
                        + Tambah Barang
                    </button>
                </Link>
            </div>

            {/* --- GRID BARANG --- */}
            <div className="grid">
                {products.map(p => (
                    <Link to={`/product/${p._id}`} key={p._id} style={{textDecoration:'none'}}>
                        <div className="card">
                            {p.imageUrl ? (
                                <img src={`http://localhost:5000${p.imageUrl}`} className="card-img-top" alt={p.name} />
                            ) : (
                                <div className="card-img-top" style={{display:'flex', alignItems:'center', justifyContent:'center', background:'#2d3436'}}>No Image</div>
                            )}
                            
                            <div className="card-body">
                                <h3 style={{margin:0, color:'var(--text-main)'}}>{p.name}</h3>
                                <p style={{color:'#55efc4', fontWeight:'bold', marginTop:'5px'}}>
                                    Rp {p.price.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* State Kosong */}
            {products.length === 0 && (
                <div style={{textAlign:'center', padding:'80px', color:'var(--text-muted)'}}>
                    <h3>Belum ada barang lain dijual 😢</h3>
                    <p>Klik tombol di atas untuk mulai berjualan!</p>
                </div>
            )}
        </div>
    );
}