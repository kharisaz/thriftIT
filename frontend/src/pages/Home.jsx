import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [featured, setFeatured] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const myId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('http://localhost:5000/api/products').then(res => {
            setFeatured(res.data.filter(p => p.user !== myId).slice(0, 3));
            setMyProducts(res.data.filter(p => p.user === myId).slice(0, 3));
        });
    }, []);

    return (
        <div>
            <div className="home-hero">
                <span style={{background:'#6c5ce7', padding:'5px 15px', borderRadius:'20px', fontSize:'0.8rem', color:'white'}}>#1 Campus Thrift</span>
                <h1 style={{fontSize:'3rem', margin:'10px 0', background:'linear-gradient(to right, #fff, #a29bfe)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>ThriftIT.</h1>
                <p style={{maxWidth:'600px', margin:'0 auto 20px auto', color:'var(--text-muted)'}}>Jual barang pre-loved kamu atau temukan hidden gem dari mahasiswa lain.</p>
                <Link to="/market"><button className="btn-primary" style={{width:'auto', padding:'12px 40px'}}>Mulai Belanja 🚀</button></Link>
            </div>

            {myProducts.length > 0 && (
                <div style={{marginBottom:'50px'}}>
                    <div className="section-header">
                        <h3>🏪 Toko Saya (Preview)</h3>
                        <Link to="/my-store" style={{color:'#6c5ce7', textDecoration:'none'}}>Kelola Toko &rarr;</Link>
                    </div>
                    <div className="grid">
                        {myProducts.map(p => (
                            <div key={p._id} className="card" style={{borderColor:'#6c5ce7'}}>
                                <img src={`http://localhost:5000${p.imageUrl}`} className="card-img-top" />
                                <div className="card-body">
                                    <h4 style={{margin:0, color:'var(--text-main)'}}>{p.name}</h4>
                                    <p style={{color:'#6c5ce7', fontWeight:'bold'}}>Rp {p.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <div className="section-header">
                    <h3>🔥 Marketplace Terbaru</h3>
                    <Link to="/market" style={{color:'#6c5ce7', textDecoration:'none'}}>Lihat Semua &rarr;</Link>
                </div>
                <div className="grid">
                    {featured.map(p => (
                        <Link to={`/product/${p._id}`} key={p._id} style={{textDecoration:'none'}}>
                            <div className="card">
                                <img src={`http://localhost:5000${p.imageUrl}`} className="card-img-top" />
                                <div className="card-body">
                                    <h4 style={{margin:0, color:'var(--text-main)'}}>{p.name}</h4>
                                    <p style={{color:'#55efc4', fontWeight:'bold'}}>Rp {p.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}