import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function AddEdit() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', desc);
        formData.append('user', localStorage.getItem('userId')); // KIRIM ID PEMILIK
        if (file) formData.append('image', file);

        try {
            await axios.post('http://localhost:5000/api/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            navigate('/my-store');
        } catch (err) { alert('Gagal upload'); }
    };

    return (
        <div className="auth-box" style={{margin:'0 auto'}}>
            <h3>📦 Jual Barang Baru</h3>
            <form onSubmit={handleSubmit}>
                <label>Nama Barang</label>
                <input type="text" onChange={e => setName(e.target.value)} required />
                <label>Harga (Rp)</label>
                <input type="number" onChange={e => setPrice(e.target.value)} required />
                <label>Deskripsi</label>
                <textarea rows="4" onChange={e => setDesc(e.target.value)} required></textarea>
                <label>Foto</label>
                <input type="file" onChange={e => setFile(e.target.files[0])} required />
                <button type="submit" className="btn-primary">Upload & Jual</button>
            </form>
            <Link to="/my-store"><button className="btn-outline" style={{marginTop:'10px'}}>Batal</button></Link>
        </div>
    );
}