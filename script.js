let personelListesi = JSON.parse(localStorage.getItem("personeller")) || [];
let degisimKodlariListesi = JSON.parse(localStorage.getItem("degisimKodlari")) || [];
let gunlukVardiyalar = JSON.parse(localStorage.getItem("gunlukVardiyalar")) || [];
let tarifeDosyasi = null;
let tarifeVerileri = [];
let personelDegisimleri = JSON.parse(localStorage.getItem("personelDegisimleri")) || [];
let gorevTarifeDegisiklikleri = JSON.parse(localStorage.getItem("gorevTarifeDegisiklikleri")) || [];
let personelDurumlari = JSON.parse(localStorage.getItem("personelDurumlari")) || [];
let gunlukVardiyaFiltre = "HEPSI";

document.addEventListener("DOMContentLoaded", function () {
    const kullaniciInput = document.querySelector('input[type="text"]');
    const sifreInput = document.querySelector('input[type="password"]');
    const girisButonu = document.querySelector(".login-container button");

    if (kullaniciInput && sifreInput && girisButonu) {
        girisButonu.addEventListener("click", function () {
            const kullanici = kullaniciInput.value.trim();
            const sifre = sifreInput.value.trim();

            if (kullanici === "admin" && sifre === "1234") {
                window.location.href = "panel.html";
            } else {
                alert("Kullanıcı adı veya şifre hatalı!");
            }
        });
    }
});

function surucuSefligi() {
    let satirlar = "";

    personelListesi.forEach(function(personel, index){
        const metin =
    (personel.sicil + " " +
     personel.ad + " " +
     personel.soyad).toLowerCase();

if (arama !== "" && !metin.includes(arama)) {
    return;
}
        satirlar += `
        <tr>
            <td>${personel.sicil}</td>
            <td>${personel.ad} ${personel.soyad}</td>
            <td>${personel.telefon}</td>
            <td>${personel.email}</td>
            <td>${personel.gorev}</td>
            <td>${personel.durum === "Aktif" ? "🟢 Aktif" : "🔴 Pasif"}</td>
           <td>
            <button onclick="personelDetay(${index})">👁️</button>
            <button onclick="personelAta(${index})">📋</button>
        </td>
        </tr>
        `;
    });

    if (satirlar === "") {
        satirlar = `
        <tr>
            <td colspan="7" style="text-align:center;">
                Henüz personel eklenmedi.
            </td>
        </tr>
        `;
    }

    document.getElementById("icerik").innerHTML = `
    <h2>👷 Personeller</h2>
  <div class="toolbar">
    <button disabled title="Personel kayıtları İnsan Kaynakları tarafından yönetilir.">
        👥 Personeller İK Modülünden Yönetilir
    </button>
</div>
<div class="toolbar">

    <input
        type="text"
        id="arama"
        placeholder="🔍 Sicil veya Ad Soyad Ara..."
        onkeyup="gunlukVardiya()"
        style="width:300px;">

</div>
    <table class="tablo">
        <thead>
            <tr>
                <th>Sicil</th>
                <th>Ad Soyad</th>
                <th>Telefon</th>
                <th>E-Posta</th>
                <th>Görev</th>
                <th>Durum</th>
                <th>İşlem</th>
            </tr>
        </thead>
        <tbody>
            ${satirlar}
        </tbody>
    </table>
    `;
}
function personelDetay(index) {
    const p = personelListesi[index];
    if (!p) return;

    document.getElementById("icerik").innerHTML = `
        <h2>👤 Personel Bilgileri</h2>

        <div class="form-kart">
            <p><b>Sicil:</b> ${p.sicil}</p>
            <p><b>Ad Soyad:</b> ${p.ad} ${p.soyad}</p>
            <p><b>Telefon:</b> ${p.telefon}</p>
            <p><b>E-Posta:</b> ${p.email}</p>
            <p><b>Görev:</b> ${p.gorev}</p>
            <p><b>Durum:</b> ${p.durum}</p>

            <br>

            <button onclick="surucuSefligi()">⬅ Geri</button>
        </div>
    `;
}

function personelAta(index){
    const p = personelListesi[index];
    if(!p) return;

    alert(
        p.ad + " " + p.soyad +
        " için vardiya / araç / hat atama ekranı burada açılacak."
    );
}
function yeniPersonel(index = null) {
    const isEdit = index !== null;
    const p = isEdit ? personelListesi[index] : { sicil: "", ad: "", soyad: "", telefon: "", email: "", gorev: "Vatman", durum: "Aktif" };

    document.getElementById("icerik").innerHTML = `
    <h2>${isEdit ? "✏️ Personel Düzenle" : "➕ Yeni Personel"}</h2>
    <div class="form-kart">
    <label>Sicil No</label>
    <input id="sicil" type="text" value="${p.sicil}" placeholder="Örn: 2045">

    <label>Ad</label>
    <input id="ad" type="text" value="${p.ad}" placeholder="Ahmet">

    <label>Soyad</label>
    <input id="soyad" type="text" value="${p.soyad}" placeholder="Yılmaz">

    <label>Telefon</label>
    <input id="telefon" type="tel" value="${p.telefon}" placeholder="05xxxxxxxxx">

    <label>E-Posta</label>
    <input id="email" type="email" value="${p.email}" placeholder="ornek@estram.com.tr">

    <label>Görev</label>
    <select id="gorev">
        <option ${p.gorev === "Vatman" ? "selected" : ""}>Vatman</option>
        <option ${p.gorev === "İdari Personel" ? "selected" : ""}>Denetçi</option>
        <option ${p.gorev === "Vardiya Amiri" ? "selected" : ""}>Vardiya Amiri</option>
          <option ${p.gorev === "Sürücü Şefi" ? "selected" : ""}>Sürücü Şefi</option>

    </select>

    <label>Durum</label>
    <select id="durum">
        <option ${p.durum === "Aktif" ? "selected" : ""}>Aktif</option>
        <option ${p.durum === "Pasif" ? "selected" : ""}>Pasif</option>
    </select>
    <br><br>
    <button onclick="personelKaydet(${index})">💾 Kaydet</button>
    <button onclick="surucuSefligi()">⬅ Geri</button>
    </div>
    `;
}

function personelKaydet(index = null) {
   const personel = {
    sicil: document.getElementById("sicil").value,
    ad: document.getElementById("ad").value,
    soyad: document.getElementById("soyad").value,
    telefon: document.getElementById("telefon").value,
    email: document.getElementById("email").value,
    gorev: document.getElementById("gorev").value,
    durum: document.getElementById("durum").value,

    vardiyaDurumu:
        index !== null && personelListesi[index]
            ? personelListesi[index].vardiyaDurumu || "ATANMADI"
            : "ATANMADI"
};

    if (index !== null && index >= 0) {
        personelListesi[index] = personel;
    } else {
        personelListesi.push(personel);
    }

    localStorage.setItem("personeller", JSON.stringify(personelListesi));
    alert("Personel kaydedildi.");
    surucuSefligi();
}

function personelDuzenle(index) {
    yeniPersonel(index);
}

function personelDurum(index) {
    if (!personelListesi[index]) return;
    personelListesi[index].durum = personelListesi[index].durum === "Aktif" ? "Pasif" : "Aktif";
    localStorage.setItem("personeller", JSON.stringify(personelListesi));
    surucuSefligi();
}

function personelSil(index) {
    if (confirm("Bu personeli silmek istediğinize emin misiniz?")) {
        personelListesi.splice(index, 1);
        localStorage.setItem("personeller", JSON.stringify(personelListesi));
        surucuSefligi();
    }
}

function degisimKodlari() {
    let satirlar = "";

    degisimKodlariListesi.forEach(function(kayit, index){
        satirlar += `
        <tr>
            <td>${kayit.kod}</td>
            <td>${kayit.aciklama}</td>
            <td>${kayit.durum === "Aktif" ? "🟢 Aktif" : "🔴 Pasif"}</td>
            <td>
                <button onclick="degisimDuzenle(${index})">✏️</button>
                <button onclick="degisimDurum(${index})">🔄</button>
                <button onclick="degisimSil(${index})">🗑️</button>
            </td>
        </tr>
        `;
    });

    if (satirlar === "") {
        satirlar = `
        <tr>
            <td colspan="4" style="text-align:center;">
                Henüz değişim kodu eklenmedi.
            </td>
        </tr>
        `;
    }

    document.getElementById("icerik").innerHTML = `
    <h2>🔄 Değişim Kodları</h2>
    <div class="toolbar">
        <button onclick="yeniDegisimKodu()">➕ Yeni Değişim Kodu</button>
    </div>
    <table class="tablo">
        <thead>
            <tr>
                <th>Kod</th>
                <th>Açıklama</th>
                <th>Durum</th>
                <th>İşlem</th>
            </tr>
        </thead>
        <tbody>
            ${satirlar}
        </tbody>
    </table>
    `;
}

function tarifeler() {
    document.getElementById("icerik").innerHTML = `
    <h2>🚋 Tarifeler</h2>
    <div class="toolbar">
        <button onclick="excelSec()">📥 Excel Yükle</button>
        <button onclick="tarifeAc()">👁️ Aç</button>
        <button onclick="tarifeSil()">🗑️ Kaldır</button>
    </div>
    <input type="file" id="excelDosya" accept=".xlsx,.xls" style="display:none">
    <table class="tablo">
        <thead>
            <tr>
                <th>Dosya Adı</th>
                <th>Yüklenme Tarihi</th>
                <th>Durum</th>
            </tr>
        </thead>
        <tbody id="tarifeListe">
            <tr>
                <td colspan="3" style="text-align:center">
                    Henüz tarife yüklenmedi.
                </td>
            </tr>
        </tbody>
    </table>
    `;
}

function excelSec() {
    const fileInput = document.getElementById("excelDosya");
    if (!fileInput) return;

    fileInput.click();
    fileInput.onchange = function () {
        const dosya = this.files[0];
        if (!dosya) return;

        tarifeDosyasi = dosya;
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sayfa = workbook.Sheets[workbook.SheetNames[0]];

            tarifeVerileri = XLSX.utils.sheet_to_json(sayfa, { header: 1 });

            document.getElementById("tarifeListe").innerHTML = `
                <tr>
                    <td>${dosya.name}</td>
                    <td>${new Date().toLocaleString()}</td>
                    <td>✅ Aktif</td>
                </tr>
            `;
        };

        reader.readAsArrayBuffer(dosya);
    };
}

function tarifeAc() {
    if (tarifeVerileri.length === 0) {
        alert("Önce bir Excel yükleyiniz.");
        return;
    }

    let html = `
        <h2>🚋 Güncel Tarife</h2>
        <button onclick="tarifeler()">⬅ Geri Dön</button>
        <br><br>
        <table class="tablo">
    `;

    tarifeVerileri.forEach(function(satir, index){
        html += "<tr>";
        satir.forEach(function(hucre){
            if (index === 0) {
                html += "<th>" + (hucre || "") + "</th>";
            } else {
                html += "<td>" + (hucre || "") + "</td>";
            }
        });
        html += "</tr>";
    });

    html += "</table>";
    document.getElementById("icerik").innerHTML = html;
}

function tarifeSil() {
    tarifeDosyasi = null;
    tarifeVerileri = [];
    document.getElementById("tarifeListe").innerHTML = `
    <tr>
        <td colspan="3" style="text-align:center">
            Henüz tarife yüklenmedi.
        </td>
    </tr>
    `;
}

function yeniTarife() {
    document.getElementById("icerik").innerHTML = `
    <h2>🚋 Yeni Tarife Oluştur</h2>
    <div class="form-kart">
    <label>Görev No</label>
    <input type="text" id="gorevNo">

    <label>Platform</label>
    <input type="text" id="platform">

    <label>Tarife</label>
    <input type="text" id="tarife">

    <label>Başlangıç Saati</label>
    <input type="time" id="baslangic">

    <label>Bitiş Saati</label>
    <input type="time" id="bitis">

    <label>Açıklama</label>
    <textarea id="aciklama"></textarea>
    <br><br>
    <button onclick="tarifeKaydet()">💾 Kaydet</button>
    <button onclick="tarifeler()">⬅ Geri Dön</button>
    </div>
    `;
}

function excelAktar(){
    alert("Excel içe aktarma daha sonra eklenecek.");
}

function excelDisaAktar(){
    alert("Excel dışa aktarma daha sonra eklenecek.");
}

function tarifeKaydet(){
    alert("Tarife başarıyla kaydedildi.");
    tarifeler();
}

function calismaPlanlari() {
    document.getElementById("icerik").innerHTML = `
    <h2>📅 Çalışma Planları</h2>
    <div class="kartlar">
        <div class="kart" onclick="planAc('yaz')">
            ☀️
            <h3>Yaz Çalışma Planı</h3>
            <p>Hafta İçi - Cumartesi - Pazar</p>
        </div>
        <div class="kart" onclick="planAc('kis')">
            ❄️
            <h3>Kış Çalışma Planı</h3>
            <p>Hafta İçi - Cumartesi - Pazar</p>
        </div>
    </div>
    `;
}

function planAc(plan){
    document.getElementById("icerik").innerHTML = `
    <h2>${plan === "yaz" ? "☀️ Yaz" : "❄️ Kış"} Çalışma Planı</h2>
    <div class="toolbar">
        <button onclick="gunSec('haftaici')">Hafta İçi</button>
        <button onclick="gunSec('cumartesi')">Cumartesi</button>
        <button onclick="gunSec('pazar')">Pazar</button>
    </div>
    <div id="planIcerik">
        <h3>Lütfen gün seçiniz.</h3>
    </div>
    `;
}

function gunSec(gun){
    document.getElementById("planIcerik").innerHTML = `
    <h2>${gun.toUpperCase()}</h2>
    <h3>Bu gün için henüz çalışma planı oluşturulmadı.</h3>
    <br>
    <button onclick="alert('Yakında eklenecek')">
        ➕ Yeni Çalışma Planı
    </button>
    `;
}

function yeniDegisimKodu(){
    document.getElementById("icerik").innerHTML = `
    <h2>🔄 Yeni Değişim Kodu</h2>
    <div class="form-kart">
    <label>Değişim Kodu</label>
    <input id="degisimKodu" type="text" placeholder="Örn: 01011">

    <label>Açıklama</label>
    <input id="degisimAdi" type="text" placeholder="Örn: Sabah Vardiyası">
    <hr>
    <h3>Görevler</h3>
    <div class="toolbar">
        <button onclick="satirEkle()">➕ Görev Ekle</button>
    </div>

    <table class="tablo" id="degisimTablosu">
        <thead>
            <tr>
                <th>Görev No</th>
                <th>Platform</th>
                <th>Tarife</th>
                <th>Başlangıç</th>
                <th>Bitiş</th>
                <th>İşlem</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <br>
    <button onclick="degisimKaydet()">💾 Kaydet</button>
    <button onclick="degisimKodlari()">⬅ Geri</button>
    </div>
    `;
}

function satirEkle(gorev = {}) {
    const tbody = document.querySelector("#degisimTablosu tbody");
    if (!tbody) return;

    tbody.insertAdjacentHTML("beforeend", `
        <tr>
            <td><input type="text" value="${gorev.gorevNo || ""}"></td>
            <td><input type="text" value="${gorev.platform || ""}"></td>
            <td><input type="text" value="${gorev.tarife || ""}"></td>
            <td><input type="time" value="${gorev.baslangic || ""}"></td>
            <td><input type="time" value="${gorev.bitis || ""}"></td>
            <td>
                <button onclick="this.closest('tr').remove()">🗑️</button>
            </td>
        </tr>
    `);
}

function degisimKaydet() {
    const kod = document.getElementById("degisimKodu").value.trim();
    const aciklama = document.getElementById("degisimAdi").value.trim();

    if (kod === "" || aciklama === "") {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    const gorevler = [];
    document.querySelectorAll("#degisimTablosu tbody tr").forEach(function (tr) {
        const inputlar = tr.querySelectorAll("input");
        if (inputlar.length >= 5) {
            gorevler.push({
                gorevNo: inputlar[0].value,
                platform: inputlar[1].value,
                tarife: inputlar[2].value,
                baslangic: inputlar[3].value,
                bitis: inputlar[4].value
            });
        }
    });

    degisimKodlariListesi.push({
        kod: kod,
        aciklama: aciklama,
        durum: "Aktif",
        gorevler: gorevler
    });

    localStorage.setItem("degisimKodlari", JSON.stringify(degisimKodlariListesi));
    alert("Değişim kodu kaydedildi.");
    degisimKodlari();
}
function sayfaGoster(sayfa) {
    switch (sayfa) {
        case "anasayfa":
            document.getElementById("icerik").innerHTML = `
                <h2>🏠 Ana Sayfa</h2>
                <p>ESTRAM Personel ve Vardiya Yönetim Sistemine hoş geldiniz.</p>
            `;
            break;

        case "personeller":
            surucuSefligi();
            break;

        case "degisimKodlari":
            degisimKodlari();
            break;

        case "tarifeler":
            tarifeler();
            break;

        case "calismaPlanlari":
            calismaPlanlari();
            break;

        case "personelDegisimi":
            gorevTarifeDegisimleri();
            break;

        case "gunlukVardiya":
             gunlukVardiya();
            break;
            
        case "raporlar":
             gunSonuRaporu();
            break;

        case "ayarlar":
            alert("Henüz geliştiriliyor");
            break;
            
        case "izinler":
        case "puantaj":
        case "bildirimler":
            alert("Henüz geliştiriliyor");
            break;
    }
}

function degisimDuzenle(index){
    const kayit = degisimKodlariListesi[index];
    if (!kayit) return;

    document.getElementById("icerik").innerHTML = `
    <h2>✏️ Değişim Kodu Düzenle</h2>
    <div class="form-kart">
    <label>Değişim Kodu</label>
    <input id="degisimKodu" value="${kayit.kod}">

    <label>Açıklama</label>
    <input id="degisimAdi" value="${kayit.aciklama}">
    <hr>
    <h3>Görevler</h3>
    <button onclick="satirEkle()">➕ Görev Ekle</button>

    <table class="tablo" id="degisimTablosu">
        <thead>
            <tr>
                <th>Görev No</th>
                <th>Platform</th>
                <th>Tarife</th>
                <th>Başlangıç</th>
                <th>Bitiş</th>
                <th>İşlem</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <br>
    <button onclick="degisimGuncelle(${index})">💾 Güncelle</button>
    <button onclick="degisimKodlari()">⬅ Geri</button>
    </div>
    `;

    if (kayit.gorevler) {
        kayit.gorevler.forEach(function(gorev){
            satirEkle(gorev);
        });
    }
}

function degisimSil(index){
    if (confirm("Bu değişim kodu silinsin mi?")){
        degisimKodlariListesi.splice(index, 1);
        localStorage.setItem("degisimKodlari", JSON.stringify(degisimKodlariListesi));
        degisimKodlari();
    }
}

function degisimGuncelle(index){
    if (!degisimKodlariListesi[index]) return;

    const gorevler = [];
    document.querySelectorAll("#degisimTablosu tbody tr").forEach(function(tr){
        const inputlar = tr.querySelectorAll("input");
        if (inputlar.length >= 5) {
            gorevler.push({
                gorevNo: inputlar[0].value,
                platform: inputlar[1].value,
                tarife: inputlar[2].value,
                baslangic: inputlar[3].value,
                bitis: inputlar[4].value
            });
        }
    });

    degisimKodlariListesi[index].kod = document.getElementById("degisimKodu").value;
    degisimKodlariListesi[index].aciklama = document.getElementById("degisimAdi").value;
    degisimKodlariListesi[index].gorevler = gorevler;

    localStorage.setItem("degisimKodlari", JSON.stringify(degisimKodlariListesi));
    alert("Güncellendi.");
    degisimKodlari();
}

function degisimDurum(index){
    if (!degisimKodlariListesi[index]) return;

    if (degisimKodlariListesi[index].durum === "Aktif") {
        degisimKodlariListesi[index].durum = "Pasif";
    } else {
        degisimKodlariListesi[index].durum = "Aktif";
    }

    localStorage.setItem("degisimKodlari", JSON.stringify(degisimKodlariListesi));
    degisimKodlari();
}
function vardiyaFiltreDegistir(filtre) {
    gunlukVardiyaFiltre = filtre;
    gunlukVardiya();
}

function vardiyaDurumuBul(personel, bugun) {
    const ikKaydi = personelDurumlari.find(function (k) {
        return String(k.sicil) === String(personel.sicil) &&
            (!k.baslangic || k.baslangic <= bugun) &&
            (!k.bitis || k.bitis >= bugun);
    });

    if (ikKaydi) {
        return {
            durum: ikKaydi.durum || "ATANMADI",
            gorevKodu: ikKaydi.gorevKodu || "-"
        };
    }

    const vardiyaKaydi = gunlukVardiyalar.find(function (v) {
        return String(v.sicil) === String(personel.sicil) && v.tarih === bugun;
    });

    if (vardiyaKaydi) {
        return {
            durum: vardiyaKaydi.durum || "ATANDI",
            gorevKodu: vardiyaKaydi.gorevKodu || "-"
        };
    }

    return {
        durum: "ATANMADI",
        gorevKodu: "-"
    };
}

function gunlukVardiya() {
    let arama = "";

    const aramaKutusu = document.getElementById("arama");
    if (aramaKutusu) {
        arama = aramaKutusu.value.toLowerCase().trim();
    }

    const bugun = new Date().toISOString().split("T")[0];
    let satirlar = "";

    personelListesi.forEach(function (personel, index) {
        const metin =
            (String(personel.sicil) + " " + personel.ad + " " + personel.soyad).toLowerCase();

        if (arama !== "" && !metin.includes(arama)) {
            return;
        }

        const bilgi = vardiyaDurumuBul(personel, bugun);

        if (gunlukVardiyaFiltre !== "HEPSI" && bilgi.durum !== gunlukVardiyaFiltre) {
            return;
        }

        let gorev = bilgi.gorevKodu;
        let durum = '<span style="color:red;font-weight:bold;">🔴 ATANMADI</span>';
        const degisim = degisimEtiketiBul(personel.sicil, bugun);

        switch (bilgi.durum) {
            case "ATANDI":
                durum = '<span style="color:green;font-weight:bold;">🟢 ATANDI</span>';
                break;
            case "YILLIK İZİN":
                durum = '<span style="color:#d4a017;font-weight:bold;">🟡 YILLIK İZİN</span>';
                gorev = "-";
                break;
            case "ÜCRETSİZ İZİN":
                durum = '<span style="color:orange;font-weight:bold;">🟠 ÜCRETSİZ İZİN</span>';
                gorev = "-";
                break;
            case "ÜCRETLİ İZİN":
                durum = '<span style="color:blue;font-weight:bold;">🔵 ÜCRETLİ İZİN</span>';
                gorev = "-";
                break;
            case "DOĞUM İZNİ":
                durum = '<span style="color:purple;font-weight:bold;">🟣 DOĞUM İZNİ</span>';
                gorev = "-";
                break;
            case "RAPOR":
                durum = '<span style="color:red;font-weight:bold;">🔴 RAPOR</span>';
                gorev = "-";
                break;
            case "GÖREVE GELMEDİ":
                durum = '<span style="color:black;font-weight:bold;">⚫ GÖREVE GELMEDİ</span>';
                gorev = "-";
                break;
            case "İSTİRAHAT":
                durum = '<span style="color:gray;font-weight:bold;">⚪ İSTİRAHAT</span>';
                gorev = "-";
                break;
        }

        const duzenleButonu =
            (bilgi.durum === "ATANDI" || bilgi.durum === "ATANMADI")
                ? `<button onclick="vardiyaDuzenle(${index})">✏️ Düzenle</button>`
                : `<button disabled title="Bu kayıt İK durumu olarak tanımlı.">👁️</button>`;

        satirlar += `
        <tr>
            <td>${personel.sicil}</td>
            <td>${personel.ad} ${personel.soyad}</td>
            <td>${gorev}</td>
            <td>${durum}</td>
            <td>${degisim}</td>
            <td>${duzenleButonu}</td>
        </tr>
        `;
    });

    if (satirlar === "") {
        satirlar = `
        <tr>
            <td colspan="6" style="text-align:center;">
                Kayıt bulunamadı.
            </td>
        </tr>
        `;
    }

    document.getElementById("icerik").innerHTML = `
        <h2>📅 Günlük Vardiya</h2>

        <div class="toolbar" style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:12px;">
            <input
                type="text"
                id="arama"
                placeholder="🔍 Sicil veya Ad Soyad Ara..."
                value="${arama}"
                onkeyup="gunlukVardiya()"
                style="width:300px;">

            <button onclick="vardiyaFiltreDegistir('HEPSI')">Hepsi</button>
            <button onclick="vardiyaFiltreDegistir('ATANDI')">Atananlar</button>
            <button onclick="vardiyaFiltreDegistir('ATANMADI')">Atanmayanlar</button>
            <button onclick="vardiyaFiltreDegistir('YILLIK İZİN')">Yıllık İzin</button>
            <button onclick="vardiyaFiltreDegistir('ÜCRETLİ İZİN')">Ücretli İzin</button>
            <button onclick="vardiyaFiltreDegistir('ÜCRETSİZ İZİN')">Ücretsiz İzin</button>
            <button onclick="vardiyaFiltreDegistir('DOĞUM İZNİ')">Doğum İzni</button>
            <button onclick="vardiyaFiltreDegistir('RAPOR')">Rapor</button>
            <button onclick="vardiyaFiltreDegistir('HAFTA TATİLİ')">Hafta Tatili</button>
            <button onclick="vardiyaFiltreDegistir('GÖREVE GELMEDİ')">Göreve Gelmedi</button>
        </div>

        <table class="tablo">
            <thead>
                <tr>
                    <th>Sicil</th>
                    <th>Ad Soyad</th>
                    <th>Görev Kodu</th>
                    <th>Durum</th>
                    <th>Değişim</th>
                    <th>İşlem</th>
                </tr>
            </thead>
            <tbody>
                ${satirlar}
            </tbody>
        </table>
    `;
}
function vardiyaDuzenle(index){

    const personel = personelListesi[index];

    let secenekler = '<option value="">Görev Kodu Seçiniz</option>';

    degisimKodlariListesi.forEach(function(kod){

        secenekler += `
            <option value="${kod.kod}">
                ${kod.kod} - ${kod.aciklama}
            </option>
        `;

    });

  document.getElementById("icerik").innerHTML = `

<h2>📋 Günlük Vardiya Atama</h2>

<div class="form-kart">

    <p><b>Sicil :</b> ${personel.sicil}</p>

    <p><b>Ad Soyad :</b> ${personel.ad} ${personel.soyad}</p>

    <label>Görev Kodu</label>

    <select id="gorevKodu">
        ${secenekler}
    </select>

    <label>Not</label>
    <textarea
        id="not"
        rows="3"
        placeholder="Açıklama giriniz..."></textarea>

    <br><br>

    <button onclick="vardiyaKaydet(${index})">
        💾 Kaydet
    </button>

    <button onclick="gunlukVardiya()">
        ⬅ Geri
    </button>

</div>

`;
}

function vardiyaKaydet(index){

    const personel = personelListesi[index];
    const gorevKodu = document.getElementById("gorevKodu").value;
    const notKutusu = document.getElementById("not");

    if (gorevKodu == "") {
        alert("Görev kodu seçiniz.");
        return;
    }

    const bugun = new Date().toISOString().split("T")[0];
    const mevcutDurum = vardiyaDurumuBul(personel, bugun);

    // İK'dan gelen özel durum varsa görev atamasını engelle
    if (
        mevcutDurum.durum !== "ATANMADI" &&
        mevcutDurum.durum !== "ATANDI"
    ) {
        alert("Bu personele bugün görev atanamaz. Durum: " + mevcutDurum.durum);
        return;
    }

    // Aynı görev kodu başka birine verilmiş mi?
    const ayniKod = gunlukVardiyalar.find(v =>
        v.tarih === bugun &&
        v.gorevKodu === gorevKodu &&
        v.sicil !== personel.sicil
    );

    if (ayniKod) {
        alert("Bu görev kodu başka bir personele atanmış.");
        return;
    }

    const kayit = gunlukVardiyalar.find(v =>
        v.tarih === bugun &&
        v.sicil === personel.sicil
    );

    if (kayit) {
        kayit.gorevKodu = gorevKodu;
        kayit.not = notKutusu ? notKutusu.value : "";
    } else {
        gunlukVardiyalar.push({
            tarih: bugun,
            sicil: personel.sicil,
            gorevKodu: gorevKodu,
            not: notKutusu ? notKutusu.value : ""
        });
    }

    localStorage.setItem(
        "gunlukVardiyalar",
        JSON.stringify(gunlukVardiyalar)
    );

    alert("Görev başarıyla atandı.");
    gunlukVardiya();
}
function personelDurumuKaydet(sicil, baslangic, bitis, durum, not = "") {

    let personelDurumlari = JSON.parse(localStorage.getItem("personelDurumlari")) || [];

    personelDurumlari.push({
        sicil: String(sicil),
        baslangic: baslangic,
        bitis: bitis,
        durum: durum,
        not: not
    });

    localStorage.setItem("personelDurumlari", JSON.stringify(personelDurumlari));
}
function gorevTarifeDegisimleri() {
    let satirlar = "";

    gorevTarifeDegisiklikleri.forEach(function (kayit, index) {
        satirlar += `
        <tr>
            <td>${kayit.tarih}</td>
            <td>${kayit.sicil}</td>
            <td>${kayit.adSoyad}</td>
            <td>${kayit.eskiGorevKodu}</td>
            <td>${kayit.yeniGorevKodu}</td>
            <td>${kayit.neden}</td>
            <td>
                <button onclick="gorevTarifeDegisimiSil(${index})">🗑️</button>
            </td>
        </tr>
        `;
    });

    if (satirlar === "") {
        satirlar = `
        <tr>
            <td colspan="7" style="text-align:center;">
                Henüz görev / tarife değişimi yapılmadı.
            </td>
        </tr>
        `;
    }

    document.getElementById("icerik").innerHTML = `
        <h2>🔄 Görev / Tarife Değişimleri</h2>

        <div class="toolbar">
            <button onclick="yeniGorevTarifeDegisimi()">➕ Yeni Değişim</button>
        </div>

        <table class="tablo">
            <thead>
                <tr>
                    <th>Tarih</th>
                    <th>Sicil</th>
                    <th>Ad Soyad</th>
                    <th>Eski Görev Kodu</th>
                    <th>Yeni Görev Kodu</th>
                    <th>Neden</th>
                    <th>İşlem</th>
                </tr>
            </thead>
            <tbody>
                ${satirlar}
            </tbody>
        </table>
    `;
}

function yeniGorevTarifeDegisimi() {
    let personelSecenekleri = '<option value="">Personel seçiniz</option>';

    personelListesi.forEach(function (p) {
        personelSecenekleri += `
            <option value="${p.sicil}">${p.sicil} - ${p.ad} ${p.soyad}</option>
        `;
    });

    let gorevSecenekleri = '<option value="">Görev kodu seçiniz</option>';

    degisimKodlariListesi.forEach(function (kod) {
        gorevSecenekleri += `
            <option value="${kod.kod}">${kod.kod} - ${kod.aciklama}</option>
        `;
    });

    document.getElementById("icerik").innerHTML = `
        <h2>➕ Yeni Görev / Tarife Değişimi</h2>

        <div class="form-kart">
            <label>Tarih</label>
            <input id="degisimTarihi" type="date" value="${new Date().toISOString().split("T")[0]}">

            <label>Personel</label>
            <select id="degisimPersonelSicil">
                ${personelSecenekleri}
            </select>

            <label>Eski Görev Kodu</label>
            <select id="eskiGorevKodu">
                ${gorevSecenekleri}
            </select>

            <label>Yeni Görev Kodu</label>
            <select id="yeniGorevKodu">
                ${gorevSecenekleri}
            </select>

            <label>Neden</label>
            <textarea id="degisimNeden" rows="3" placeholder="Örn: Operasyon ihtiyacı, keyfi tarife değişimi, yoğunluk"></textarea>

            <br><br>
            <button onclick="gorevTarifeDegisimiKaydet()">💾 Kaydet</button>
            <button onclick="gorevTarifeDegisimleri()">⬅ Geri</button>
        </div>
    `;
}

function gorevTarifeDegisimiKaydet() {
    const tarih = document.getElementById("degisimTarihi").value;
    const sicil = document.getElementById("degisimPersonelSicil").value;
    const eskiGorevKodu = document.getElementById("eskiGorevKodu").value;
    const yeniGorevKodu = document.getElementById("yeniGorevKodu").value;
    const neden = document.getElementById("degisimNeden").value.trim();

    if (!tarih || !sicil || !eskiGorevKodu || !yeniGorevKodu || !neden) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    if (eskiGorevKodu === yeniGorevKodu) {
        alert("Eski ve yeni görev kodu aynı olamaz.");
        return;
    }

    const personel = personelListesi.find(p => String(p.sicil) === String(sicil));
    if (!personel) {
        alert("Personel bulunamadı.");
        return;
    }

    const kayit = {
        tarih: tarih,
        sicil: String(personel.sicil),
        adSoyad: `${personel.ad} ${personel.soyad}`,
        eskiGorevKodu: eskiGorevKodu,
        yeniGorevKodu: yeniGorevKodu,
        neden: neden
    };

    gorevTarifeDegisiklikleri.push(kayit);

    // O tarihteki vardiya kaydını da güncelle
    const vardiya = gunlukVardiyalar.find(v =>
        String(v.sicil) === String(sicil) && String(v.tarih) === String(tarih)
    );

    if (vardiya) {
        vardiya.gorevKodu = yeniGorevKodu;
        vardiya.not = (vardiya.not ? vardiya.not + " | " : "") + `Görev değişimi: ${neden}`;
        localStorage.setItem("gunlukVardiyalar", JSON.stringify(gunlukVardiyalar));
    }

    localStorage.setItem("gorevTarifeDegisiklikleri", JSON.stringify(gorevTarifeDegisiklikleri));

    alert("Görev / tarife değişimi kaydedildi.");
    gorevTarifeDegisimleri();
}

function gorevTarifeDegisimiSil(index) {
    if (confirm("Bu değişim kaydı silinsin mi?")) {
        gorevTarifeDegisiklikleri.splice(index, 1);
        localStorage.setItem("gorevTarifeDegisiklikleri", JSON.stringify(gorevTarifeDegisiklikleri));
        gorevTarifeDegisimleri();
    }
}
function gunSonuRaporu() {
    const bugun = new Date().toISOString().split("T")[0];

    const toplamPersonel = personelListesi.length;

    let atandiSayisi = 0;
    let atanmadiSayisi = 0;
    let yillikIzinSayisi = 0;
    let ucretliIzinSayisi = 0;
    let ucretsizIzinSayisi = 0;
    let dogumIzniSayisi = 0;
    let raporSayisi = 0;
    let istirahatSayisi = 0;
    let goreveGelmediSayisi = 0;

    personelListesi.forEach(function (personel) {
        const bilgi = vardiyaDurumuBul(personel, bugun);

        switch (bilgi.durum) {
            case "ATANDI":
                atandiSayisi++;
                break;
            case "YILLIK İZİN":
                yillikIzinSayisi++;
                break;
            case "ÜCRETLİ İZİN":
                ucretliIzinSayisi++;
                break;
            case "ÜCRETSİZ İZİN":
                ucretsizIzinSayisi++;
                break;
            case "DOĞUM İZNİ":
                dogumIzniSayisi++;
                break;
            case "RAPOR":
                raporSayisi++;
                break;
            case "HAFTA TATİLİ":
                istirahatSayisi++;
                break;
            case "GÖREVE GELMEDİ":
                goreveGelmediSayisi++;
                break;
            default:
                atanmadiSayisi++;
                break;
        }
    });

    const bugunkuDegisimler = personelDegisimleri.filter(function (k) {
        return String(k.tarih) === String(bugun);
    });

    const bugunkuVardiyaKayitlari = gunlukVardiyalar.filter(function (v) {
        return String(v.tarih) === String(bugun);
    });

    const degisimSatirlari = bugunkuDegisimler.length > 0
        ? bugunkuDegisimler.map(function (k) {
            return `
            <tr>
                <td>${k.eskiSicil}</td>
                <td>${k.eskiAdSoyad}</td>
                <td>${k.yeniSicil}</td>
                <td>${k.yeniAdSoyad}</td>
                <td>${k.neden}</td>
            </tr>
            `;
        }).join("")
        : `
        <tr>
            <td colspan="5" style="text-align:center;">Bugün personel değişimi yok.</td>
        </tr>
        `;

    const vardiyaNotSatirlari = bugunkuVardiyaKayitlari.filter(function (v) {
        return v.not && v.not.trim() !== "";
    }).map(function (v) {
        const personel = personelListesi.find(p => String(p.sicil) === String(v.sicil));
        const adSoyad = personel ? `${personel.ad} ${personel.soyad}` : v.sicil;

        return `
        <tr>
            <td>${v.sicil}</td>
            <td>${adSoyad}</td>
            <td>${v.gorevKodu || "-"}</td>
            <td>${v.not}</td>
        </tr>
        `;
    }).join("") || `
        <tr>
            <td colspan="4" style="text-align:center;">Bugün vardiya notu yok.</td>
        </tr>
    `;

    document.getElementById("icerik").innerHTML = `
        <h2>📄 Gün Sonu Raporu</h2>

        <div style="
            display:grid;
            grid-template-columns:repeat(2, minmax(0, 1fr));
            gap:12px;
            margin-bottom:16px;
        ">
            <div class="kart"><h3>${toplamPersonel}</h3><p>Toplam Personel</p></div>
            <div class="kart"><h3>${atandiSayisi}</h3><p>Atanan</p></div>

            <div class="kart"><h3>${atanmadiSayisi}</h3><p>Atanmayan</p></div>
            <div class="kart"><h3>${yillikIzinSayisi}</h3><p>Yıllık İzin</p></div>

            <div class="kart"><h3>${ucretliIzinSayisi}</h3><p>Ücretli İzin</p></div>
            <div class="kart"><h3>${ucretsizIzinSayisi}</h3><p>Ücretsiz İzin</p></div>

            <div class="kart"><h3>${dogumIzniSayisi}</h3><p>Doğum İzni</p></div>
            <div class="kart"><h3>${raporSayisi}</h3><p>Rapor</p></div>

            <div class="kart"><h3>${istirahatSayisi}</h3><p>Hafta Tatili</p></div>
            <div class="kart"><h3>${goreveGelmediSayisi}</h3><p>Göreve Gelmedi</p></div>

            <div class="kart" style="grid-column:1 / -1;">
                <h3>${bugunkuDegisimler.length}</h3>
                <p>Değişim</p>
            </div>
        </div>

        <div class="form-kart">
            <p><b>Tarih:</b> ${bugun}</p>
        </div>

   <h3>🔄 Görev / Tarife Değişimleri</h3>
        <table class="tablo">
            <thead>
                <tr>
                    <th>Eski Sicil</th>
                    <th>Eski Personel</th>
                    <th>Yeni Sicil</th>
                    <th>Yeni Personel</th>
                    <th>Neden</th>
                </tr>
            </thead>
            <tbody>
                ${degisimSatirlari}
            </tbody>
        </table>

        <br>

        <h3>📝 Vardiya Notları</h3>
        <table class="tablo">
            <thead>
                <tr>
                    <th>Sicil</th>
                    <th>Ad Soyad</th>
                    <th>Görev Kodu</th>
                    <th>Not</th>
                </tr>
            </thead>
            <tbody>
                ${vardiyaNotSatirlari}
            </tbody>
        </table>

        <br>

        <button onclick="gunlukVardiya()">⬅ Günlük Vardiya</button>
    `;
}
