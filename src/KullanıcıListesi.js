
import React, { useState, useEffect } from 'react';

function KullanıcıListesi() {
    // State tanımlamaları
    const [kullanıcılar, setKullanıcılar] = useState([]);
    const [yükleniyor, setYükleniyor] = useState(true);
    const [hata, setHata] = useState(null);
    const [arama, setArama] = useState('');
    const [seçiliKullanıcı, setSeçiliKullanıcı] = useState(null);

    // API’den veri çekme fonksiyonu
    const veriCek = async () => {
        setYükleniyor(true);
        setHata(null);
        try {
            const yanıt = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!yanıt.ok) throw new Error('Veri çekme başarısız oldu!');
            const veri = await yanıt.json();
            setKullanıcılar(veri);
        } catch (err) {
            setHata(err.message);
        } finally {
            setYükleniyor(false);
        }
    };

    // useEffect ile ilk veri çekme
    useEffect(() => {
        veriCek();
    }, []);

    // Arama filtresi uygulanmış kullanıcılar
    const filtrelenmişKullanıcılar = kullanıcılar.filter(kullanıcı => 
        kullanıcı.name.toLowerCase().includes(arama.toLowerCase())
    );

    return (
        <div>
            <h1>Kullanıcı Listesi</h1>
            <input 
                type="text" 
                placeholder="İsme göre ara..." 
                value={arama} 
                onChange={(e) => setArama(e.target.value)} 
            />
            
            {/* Yükleniyor durumunu kontrol etme */}
            {yükleniyor && <p>Yükleniyor...</p>}

            {/* Hata mesajı ve "Yeniden Dene" butonu */}
            {hata && (
                <div>
                    <p>Hata: {hata}</p>
                    <button onClick={veriCek}>Yeniden Dene</button>
                </div>
            )}

            {/* Kullanıcı Listesi */}
            <ul>
                {filtrelenmişKullanıcılar.map((kullanıcı) => (
                    <li key={kullanıcı.id} onClick={() => setSeçiliKullanıcı(kullanıcı)}>
                        <p>Ad: {kullanıcı.name}</p>
                        <p>E-posta: {kullanıcı.email}</p>
                        <p>Telefon: {kullanıcı.phone}</p>
                    </li>
                ))}
            </ul>

            {/* Detay modal penceresi */}
            {seçiliKullanıcı && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSeçiliKullanıcı(null)}>&times;</span>
                        <h2>{seçiliKullanıcı.name} Detayları</h2>
                        <p><strong>Adres:</strong> {seçiliKullanıcı.address.street}, {seçiliKullanıcı.address.city}</p>
                        <p><strong>Şirket:</strong> {seçiliKullanıcı.company.name}</p>
                        <p><strong>Telefon:</strong> {seçiliKullanıcı.phone}</p>
                        <p><strong>Email:</strong> {seçiliKullanıcı.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default KullanıcıListesi;
