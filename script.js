function sayfaGoster(sayfa) {

    let icerik = document.getElementById("icerik");

    switch(sayfa){

        case "anasayfa":
            icerik.innerHTML = `
                <h2>🏠 Ana Sayfa</h2>
                <p>ESTRAM Personel ve Vardiya Yönetim Sistemine hoş geldiniz.</p>
            `;
        break;

        case "personeller":
            icerik.innerHTML = `
                <h2>👥 Personeller</h2>

                <table border="1" width="100%" cellspacing="0">

                    <tr>
                        <th>Ad Soyad</th>
                        <th>Görevi</th>
                        <th>Durum</th>
                    </tr>

                    <tr>
                        <td>Ahmet Yılmaz</td>
                        <td>Vatman</td>
                        <td>Görevde</td>
                    </tr>

                    <tr>
                        <td>Mehmet Demir</td>
                        <td>Sürücü Şefi</td>
                        <td>İzinli</td>
                    </tr>

                </table>
            `;
        break;

        case "degisimKodlari":
            icerik.innerHTML=`
                <h2>🔄 Değişim Kodları</h2>

                <ul>
                    <li>Yİ - Yıllık İzin</li>
                    <li>R - Rapor</li>
                    <li>M - Mesai</li>
                    <li>İ - İdari İzin</li>
                </ul>
            `;
        break;

        case "tarifeler":
            icerik.innerHTML=`
                <h2>🚋 Tarifeler</h2>

                <button>Yaz</button>
                <button>Kış</button>

                <hr>

                <button>Hafta İçi</button>
                <button>Cumartesi</button>
                <button>Pazar</button>
            `;
        break;

        case "gunlukVardiya":
            icerik.innerHTML=`
                <h2>📅 Günlük Vardiya</h2>

                <p>Bugünkü vardiyalar burada görünecek.</p>
            `;
        break;

        case "izinler":
            icerik.innerHTML=`
                <h2>📝 İzinler</h2>

                <p>İzin talepleri burada listelenecek.</p>
            `;
        break;

        case "puantaj":
            icerik.innerHTML=`
                <h2>📊 Puantaj</h2>

                <p>Puantaj ekranı.</p>
            `;
        break;

        case "bildirimler":
            icerik.innerHTML=`
                <h2>🔔 Bildirimler</h2>

                <p>Yeni duyurular burada.</p>
            `;
        break;

        case "raporlar":
            icerik.innerHTML=`
                <h2>📈 Raporlar</h2>

                <p>Rapor ekranı.</p>
            `;
        break;

        case "ayarlar":
            icerik.innerHTML=`
                <h2>⚙️ Ayarlar</h2>

                <p>Sistem ayarları.</p>
            `;
        break;

    }

}
