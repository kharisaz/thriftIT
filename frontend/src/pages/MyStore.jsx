import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MyStore() {
    const [products, setProducts] = useState([]);
    const myId = localStorage.getItem('userId');

    const fetchProducts = () => {
        axios.get('http://localhost:5000/api/products').then(res => {
            setProducts(res.data.filter(p => p.user === myId));
        });
    };
    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id) => {
        if(confirm('Hapus barang ini?')) {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        }
    };

    return (
        <div>
            <div className="section-header">
                <h2 style={{margin:0}}>🏪 Toko Saya</h2>
                <Link to="/add"><button className="btn-primary" style={{width:'auto'}}>+ Jual Barang</button></Link>
            </div>
            <div className="grid">
                {products.map(p => (
                    <div key={p._id} className="card">
                        <img src={`http://localhost:5000${p.imageUrl}`} className="card-img-top" />
                        <div className="card-body">
                            <h3 style={{margin:0, color:'var(--text-main)'}}>{p.name}</h3>
                            <p style={{color:'#6c5ce7'}}>Rp {p.price.toLocaleString()}</p>
                            <button onClick={() => handleDelete(p._id)} className="btn-danger" style={{width:'100%', marginTop:'10px'}}>Hapus Barang</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}