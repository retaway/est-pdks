let personelListesi = JSON.parse(localStorage.getItem("personeller")) || [];
let degisimKodlariListesi = JSON.parse(localStorage.getItem("degisimKodlari")) || [];
let gunlukVardiyalar = JSON.parse(localStorage.getItem("gunlukVardiyalar")) || [];
let tarifeDosyasi = null;
let tarifeVerileri = [];
let personelDegisimleri = JSON.parse(localStorage.getItem("personelDegisimleri")) || [];
let gorevTarifeDegisiklikleri = JSON.parse(localStorage.getItem("gorevTarifeDegisiklikleri")) || [];
let personelDurumlari = JSON.parse(localStorage.getItem("personelDurumlari")) || [];

// =========================
// İZİN HAKLARI
// =========================

const izinHaklari = {

    "YILLIK İZİN": {
        hak: 30,
        devreder: true,
        sifirlanma: "YOK"
    },

    "MAZERET İZNİ": {
        hak: 3,
        devreder: false,
        sifirlanma: "YILBASI"
    },

    "SENDİKAL İZİN": {
        hak: null,
        devreder: false,
        sifirlanma: "YOK"
    },

    "DOĞUM İZNİ": {
        hak: null,
        devreder: false,
        sifirlanma: "MEVZUAT"
    },

    "BABALIK İZNİ": {
        hak: null,
        devreder: false,
        sifirlanma: "MEVZUAT"
    },

    "ÜCRETLİ İZİN": {
        hak: null,
        devreder: false,
        sifirlanma: "YOK"
    },

    "ÜCRETSİZ İZİN": {
        hak: null,
        devreder: false,
        sifirlanma: "YOK"
    },

    "RAPOR": {
        hak: null,
        devreder: false,
        sifirlanma: "YOK"
    },

    "HAFTA TATİLİ": {
        hak: null,
        devreder: false,
        sifirlanma: "YOK"
    },

    "GÖREVE GELMEDİ": {
        hak: null,
        devreder: false,
        sifirlanma: "YOK"
    }

};

let gunlukVardiyaFiltre = "HEPSI";
let gorevTarifeFiltreTarih = new Date().toISOString().split("T")[0];
let gorevTarifeArama = "";

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
            izinler();
            break;

        case "puantaj":
            alert("Henüz geliştiriliyor");
            break;

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
        const satirRengi = degisim !== "-" ? 'style="background:#fff8cc;"' : "";

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
            case "HAFTA TATİLİ":
                durum = '<span style="color:gray;font-weight:bold;">⚪ HAFTA TATİLİ</span>';
                gorev = "-";
                break;
            case "GÖREVE GELMEDİ":
                durum = '<span style="color:black;font-weight:bold;">⚫ GÖREVE GELMEDİ</span>';
                gorev = "-";
                break;
        }

        const duzenleButonu =
            (bilgi.durum === "ATANDI" || bilgi.durum === "ATANMADI")
                ? `<button onclick="vardiyaDuzenle(${index})">✏️ Düzenle</button>`
                : `<button disabled title="Bu kayıt İK durumu olarak tanımlı.">👁️</button>`;

        satirlar += `
        <tr ${satirRengi}>
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
    const tarihKutusu = document.getElementById("gorevTarifeTarih");
if (tarihKutusu) {
    gorevTarifeFiltreTarih = tarihKutusu.value;
}

const aramaKutusu = document.getElementById("gorevTarifeArama");
if (aramaKutusu) {
    gorevTarifeArama = aramaKutusu.value.toLowerCase().trim();
}
    let kayitlar = gorevTarifeDegisiklikleri.filter(function(k){

    // Tarih filtresi
    if (k.tarih !== gorevTarifeFiltreTarih) {
        return false;
    }

    // Arama filtresi
    if (gorevTarifeArama !== "") {

        const metin = (
            (k.talepEdenSicil || "") + " " +
            (k.talepEdenPersonel || "") + " " +
            (k.degisenSicil || "") + " " +
            (k.degisenPersonel || "")
        ).toLowerCase();

        if (!metin.includes(gorevTarifeArama)) {
            return false;
        }
    }

    return true;
});
    let satirlar = "";

kayitlar.forEach(function (kayit, index) {        satirlar += `
        <tr>
            <td>${kayit.tarih}</td>            
            <td>${kayit.talepEdenPersonel}</td>
            <td>${kayit.talepEdenTarife}</td>
            <td>${kayit.degisenPersonel}</td>
            <td>${kayit.degisenTarife}</td>
            <td>${kayit.neden}</td>
            <td>
        <button onclick="gorevTarifeDegisimiSil(${kayit.id})">🗑️</button>      
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
<div class="toolbar" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:15px;">

    <label><b>📅 Tarih</b></label>

    <input
        type="date"
        id="gorevTarifeTarih"
        value="${gorevTarifeFiltreTarih}"
        onchange="gorevTarifeDegisimleri()">

    <input
        type="text"
        id="gorevTarifeArama"
        placeholder="🔍 Sicil veya Ad Soyad Ara..."
        value="${gorevTarifeArama}"
        onkeyup="gorevTarifeDegisimleri()"
        style="width:260px;">

    <button onclick="yeniGorevTarifeDegisimi()">
        ➕ Yeni Değişim
    </button>

</div>

        <table class="tablo">
    <thead>
        <tr>
            <th>Saat</th>
            <th>Değişim Talep Eden Personel</th>
            <th>Tarifesi</th>
            <th>Değişen Personel</th>
            <th>Tarifesi</th>
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

let siraliPersoneller = [...personelListesi].sort(function (a, b) {  
    const adA = `${a.ad} ${a.soyad}`.toLowerCase();
    const adB = `${b.ad} ${b.soyad}`.toLowerCase();
    return adA.localeCompare(adB, "tr");
});

siraliPersoneller.forEach(function (p) {
    personelSecenekleri += `
        <option value="${p.sicil}">${p.sicil} - ${p.ad} ${p.soyad}</option>
    `;
});

    document.getElementById("icerik").innerHTML = `
        <h2>➕ Yeni Görev / Tarife Değişimi</h2>

        <div class="form-kart">
            <label>Tarih</label>
            <input id="degisimTarihi" type="date" value="${new Date().toISOString().split("T")[0]}">

            <label>Değişim Talep Eden Personel</label>
            <select id="talepEdenPersonelSicil">
                ${personelSecenekleri}
            </select>

            <label>Tarifesi</label>
            <input
                id="talepEdenTarife"
                type="text"
                placeholder="Örn: 01011 / Sabah / A Hat">

            <label>Değişen Personel</label>
            <select id="degisenPersonelSicil">
                ${personelSecenekleri}
            </select>

            <label>Tarifesi</label>
            <input
                id="degisenTarife"
                type="text"
                placeholder="Örn: 02015 / Öğle / B Hat">

            <label>Neden</label>
            <textarea
                id="degisimNeden"
                rows="3"
                placeholder="Örn: Zorunlu Değişiklik, Vatman Değişim Talebi, Diğer"></textarea>

            <br><br>
            <button onclick="gorevTarifeDegisimiKaydet()">💾 Kaydet</button>
            <button onclick="gorevTarifeDegisimleri()">⬅ Geri</button>
        </div>
    `;
}
function gorevTarifeDegisimiKaydet() {
    const tarih = document.getElementById("degisimTarihi").value;
    const talepEdenSicil = document.getElementById("talepEdenPersonelSicil").value;
    const talepEdenTarife = document.getElementById("talepEdenTarife").value.trim();
    const degisenSicil = document.getElementById("degisenPersonelSicil").value;
    const degisenTarife = document.getElementById("degisenTarife").value.trim();
    const neden = document.getElementById("degisimNeden").value.trim();

    if (!tarih || !talepEdenSicil || !talepEdenTarife || !degisenSicil || !degisenTarife || !neden) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    if (talepEdenSicil === degisenSicil) {
        alert("Değişim talep eden ve değişen personel aynı olamaz.");
        return;
    }

    const talepEdenPersonel = personelListesi.find(p => String(p.sicil) === String(talepEdenSicil));
    const degisenPersonel = personelListesi.find(p => String(p.sicil) === String(degisenSicil));

    if (!talepEdenPersonel || !degisenPersonel) {
        alert("Personel bulunamadı.");
        return;
    }
gorevTarifeDegisiklikleri.push({

    id: Date.now(),

    tarih: tarih,

    saat: new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit"
    }),

    talepEdenSicil: talepEdenPersonel.sicil,
    talepEdenPersonel: `${talepEdenPersonel.ad} ${talepEdenPersonel.soyad}`,
    talepEdenTarife: talepEdenTarife,

    degisenSicil: degisenPersonel.sicil,
    degisenPersonel: `${degisenPersonel.ad} ${degisenPersonel.soyad}`,
    degisenTarife: degisenTarife,

    neden: neden

});

    const talepEdenVardiya = gunlukVardiyalar.find(v =>
        String(v.sicil) === String(talepEdenSicil) && String(v.tarih) === String(tarih)
    );

    const degisenVardiya = gunlukVardiyalar.find(v =>
        String(v.sicil) === String(degisenSicil) && String(v.tarih) === String(tarih)
    );

    if (talepEdenVardiya) {
        talepEdenVardiya.gorevKodu = talepEdenTarife;
        talepEdenVardiya.not = (talepEdenVardiya.not ? talepEdenVardiya.not + " | " : "") + `Tarife değişimi: ${neden}`;
    }

    if (degisenVardiya) {
        degisenVardiya.gorevKodu = degisenTarife;
        degisenVardiya.not = (degisenVardiya.not ? degisenVardiya.not + " | " : "") + `Tarife değişimi: ${neden}`;
    }

    localStorage.setItem("gorevTarifeDegisiklikleri", JSON.stringify(gorevTarifeDegisiklikleri));
    localStorage.setItem("gunlukVardiyalar", JSON.stringify(gunlukVardiyalar));

    alert("Görev / tarife değişimi kaydedildi.");
    gorevTarifeDegisimleri();
}
 function gorevTarifeDegisimiSil(id) {

    if (!confirm("Bu görev / tarife değişimi silinsin mi?")) {
        return;
    }

    gorevTarifeDegisiklikleri = gorevTarifeDegisiklikleri.filter(function(kayit) {
        return kayit.id !== id;
    });

    localStorage.setItem(
        "gorevTarifeDegisiklikleri",
        JSON.stringify(gorevTarifeDegisiklikleri)
    );

    gorevTarifeDegisimleri();
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
    let haftaTatiliSayisi = 0;
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
                haftaTatiliSayisi++;
                break;
            case "GÖREVE GELMEDİ":
                goreveGelmediSayisi++;
                break;
            default:
                atanmadiSayisi++;
                break;
        }
    });

    const bugunkuDegisimler = gorevTarifeDegisiklikleri.filter(function (k) {
        return String(k.tarih) === String(bugun);
    });

    const bugunkuVardiyaKayitlari = gunlukVardiyalar.filter(function (v) {
        return String(v.tarih) === String(bugun);
    });

    const degisimSatirlari = bugunkuDegisimler.length > 0
        ? bugunkuDegisimler.map(function (k) {
            return `
            <tr>
                <td>${k.tarih}</td>
                <td>${k.talepEdenPersonel}</td>
                <td>${k.talepEdenTarife}</td>
                <td>${k.degisenPersonel}</td>
                <td>${k.degisenTarife}</td>
                <td>${k.neden}</td>
            </tr>
            `;
        }).join("")
        : `
        <tr>
            <td colspan="6" style="text-align:center;">Bugün görev / tarife değişimi yok.</td>
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

            <div class="kart"><h3>${haftaTatiliSayisi}</h3><p>Hafta Tatili</p></div>
            <div class="kart"><h3>${goreveGelmediSayisi}</h3><p>Göreve Gelmedi</p></div>

            <div class="kart" style="grid-column:1 / -1;">
                <h3>${bugunkuDegisimler.length}</h3>
                <p>Görev / Tarife Değişimi</p>
            </div>
        </div>

        <div class="form-kart">
            <p><b>Tarih:</b> ${bugun}</p>
        </div>

        <h3>🔄 Görev / Tarife Değişimleri</h3>
        <table class="tablo">
            <thead>
                <tr>
                    <th>Tarih</th>
                    <th>Değişim Talep Eden Personel</th>
                    <th>Tarifesi</th>
                    <th>Değişen Personel</th>
                    <th>Tarifesi</th>
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
function degisimEtiketiBul(sicil, bugun) {
    const kayit = gorevTarifeDegisiklikleri.find(function (d) {
        return String(d.tarih) === String(bugun) &&
            (
                String(d.talepEdenPersonel).includes(String(sicil)) ||
                String(d.degisenPersonel).includes(String(sicil))
            );
    });

    if (!kayit) return "-";

    return `🔁 ${kayit.talepEdenPersonel} → ${kayit.degisenPersonel}`;
}
function izinler() {

    let satirlar = "";

    personelDurumlari.forEach(function(kayit, index){

        const personel = personelListesi.find(function(p){
           return String(p.sicil) === String(kayit.sicil);
});

        satirlar += `
        <tr>
            <td>${personel ? personel.sicil : kayit.sicil}</td>
            <td>${personel ? personel.ad + " " + personel.soyad : "-"}</td>
            <td>${kayit.baslangic}</td>
            <td>${kayit.bitis}</td>
            <td>${kayit.durum}</td>
            <td>${kayit.not || "-"}</td>
            <td>
                <button onclick="yeniIzin(${index})">✏️</button>
                <button onclick="izinSil(${index})">🗑️</button>
            </td>
        </tr>
        `;

    });

    if(satirlar===""){
        satirlar=`
        <tr>
            <td colspan="7" style="text-align:center">
                Henüz izin kaydı bulunmuyor.
            </td>
        </tr>`;
    }

    document.getElementById("icerik").innerHTML=`

        <h2>📝 İzinler</h2>

        <div class="toolbar">
            <button onclick="yeniIzin()">➕ Yeni İzin</button>
        </div>

        <table class="tablo">

            <thead>
                <tr>
                    <th>Sicil</th>
                    <th>Ad Soyad</th>
                    <th>Başlangıç</th>
                    <th>Bitiş</th>
                    <th>İzin Türü</th>
                    <th>Açıklama</th>
                    <th>İşlem</th>
                </tr>
            </thead>

            <tbody>

                ${satirlar}

            </tbody>

        </table>

    `;

}
function yeniIzin(index = null) {

    const duzenleme = index !== null;

    const kayit = duzenleme
        ? personelDurumlari[index]
      : {
    sicil: "",
    baslangic: "",
    bitis: "",
    isBasi: "",
    durum: "",
    not: ""
    };

    let personeller = '<option value="">Personel Seçiniz</option>';

    personelListesi
        .slice()
        .sort(function(a,b){
            return (a.ad + " " + a.soyad)
                .localeCompare(b.ad + " " + b.soyad,"tr");
        })
        .forEach(function(p){

            personeller += `
                <option value="${p.sicil}"
                    ${String(kayit.sicil)===String(p.sicil) ? "selected":""}>
                    ${p.sicil} - ${p.ad} ${p.soyad}
                </option>
            `;

        });

    document.getElementById("icerik").innerHTML = `

    <h2>${duzenleme ? "✏️ İzin Düzenle" : "➕ Yeni İzin"}</h2>

    <div class="form-kart">

       <label>Personel</label>

<select id="izinPersonel" onchange="izinBilgileriGetir()">
    ${personeller}
</select>

<div id="izinBilgileri"
     style="display:none; margin-top:15px; margin-bottom:15px;">

    <table class="tablo">
        <tr>
            <th>Yıllık Hak</th>
            <th>Kullanılan</th>
            <th>Kalan</th>
        </tr>

        <tr>
            <td id="lblYillikHak">-</td>
            <td id="lblKullanilan">-</td>
            <td id="lblKalan">-</td>
        </tr>
    </table>

</div>

  <label>Başlangıç Tarihi</label>

<label>İzin Süresi</label>
<input
    type="text"
    id="izinSure"
    readonly
    placeholder="0 Gün">
    
<label>Bitiş Tarihi</label>
<input
    type="date"
    id="izinBitis"
    value="${kayit.bitis}"
    onchange="isBasiHesapla()">

<label>İş Başı Tarihi</label>
<input
    type="date"
    id="izinIsBasi"
    value="${kayit.isBasi || ""}">
    
<label>İzin Süresi</label>
<input
    type="text"
    id="izinSure"
    readonly
    placeholder="0 Gün">

       <label>İzin Türü</label>

<select id="izinDurumu">

    <option>YILLIK İZİN</option>

    <option>MAZERET İZNİ</option>

    <option>SENDİKAL İZİN</option>

    <option>ÜCRETLİ İZİN</option>

    <option>ÜCRETSİZ İZİN</option>

    <option>DOĞUM İZNİ</option>

    <option>BABALIK İZNİ</option>

    <option>RAPOR</option>

    <option>HAFTA TATİLİ</option>

    <option>GÖREVE GELMEDİ</option>

</select>

        <label>Açıklama</label>
<label>Onaylayan Amir</label>

<input
    type="text"
    id="izinOnaylayan"
    placeholder="Sürücü Şefi">

<label>Evrak No</label>

<input
    type="text"
    id="izinEvrakNo"
    placeholder="Örn : 2026-000125">
        <textarea
            id="izinNot"
            rows="3">${kayit.not || ""}</textarea>

        <br><br>

        <button onclick="izinKaydet(${index})">
            💾 Kaydet
        </button>

        <button onclick="izinler()">
            ⬅ Geri
        </button>

    </div>

    `;

}
function izinKaydet(index = null) {

    const sicil = document.getElementById("izinPersonel").value;
    const baslangic = document.getElementById("izinBaslangic").value;
    const bitis = document.getElementById("izinBitis").value;
    const isBasi = document.getElementById("izinIsBasi").value;
    const durum = document.getElementById("izinDurumu").value;
    const not = document.getElementById("izinNot").value.trim();
    const onaylayan = document.getElementById("izinOnaylayan").value.trim();
    const evrakNo = document.getElementById("izinEvrakNo").value.trim();
  
    // İzin süresi (gün)
    const izinGunSayisi =
        Math.floor(
            (new Date(bitis) - new Date(baslangic)) /
            (1000 * 60 * 60 * 24)
        ) + 1;
   if (!izinKontrolEt(
    sicil,
    durum,
    izinGunSayisi,
    baslangic,
    bitis,
    index
)) {
    return;
}
    // İleride İK modülüyle entegre olacak izin kontrolleri
    switch (durum) {

        case "YILLIK İZİN":
            // personel.izinBilgileri.yillik.kalan kontrol edilecek
            break;

        case "MAZERET İZNİ":
            // personel.izinBilgileri.mazeret.kalan kontrol edilecek
            break;

        case "SENDİKAL İZİN":
            // Sendikal izin kontrolü
            break;

        case "DOĞUM İZNİ":
            // Doğum izni kontrolü
            break;

        case "BABALIK İZNİ":
            // Babalık izni kontrolü
            break;
    }
    if (
        sicil === "" ||
        baslangic === "" ||
        bitis === "" ||
        isBasi === ""
    ) {
        alert("Lütfen zorunlu alanları doldurunuz.");
        return;
    }

    if (baslangic > bitis) {
        alert("Başlangıç tarihi bitiş tarihinden büyük olamaz.");
        return;
    }

    if (isBasi <= bitis) {
        alert("İş başı tarihi bitiş tarihinden sonra olmalıdır.");
        return;
    }

    // Aynı personele çakışan izin kontrolü
    const cakisan = personelDurumlari.find(function (k, i) {

        if (index !== null && i === index)
            return false;

        if (String(k.sicil) !== String(sicil))
            return false;

        return !(bitis < k.baslangic || baslangic > k.bitis);

    });

    if (cakisan) {
        alert("Bu tarih aralığında personele ait başka bir izin bulunmaktadır.");
        return;
    }

const izinKaydi = {

    sicil: sicil,

    baslangic: baslangic,
    bitis: bitis,
    isBasi: isBasi,

    izinTuru: durum,
    gunSayisi: izinGunSayisi,

    not: not,
    evrakNo: evrakNo,

    talepEden: "",
    talepTarihi: new Date().toISOString(),

    onaylayanVardiyaAmiri: "",
    vardiyaAmiriOnayTarihi: "",

    ikBilgilendirildi: false,
    ikBilgilendirmeTarihi: "",

    durum: "ONAY BEKLİYOR"

};

    if (index !== null && index >= 0) {

        personelDurumlari[index] = izinKaydi;

    } else {

        personelDurumlari.push(izinKaydi);

    }

    localStorage.setItem(
        "personelDurumlari",
        JSON.stringify(personelDurumlari)
    );

    alert("İzin kaydedildi.");

    izinler();

}
function izinSil(index){

    if(!confirm("Bu izin kaydı silinsin mi?")){
        return;
    }

    personelDurumlari.splice(index,1);

    localStorage.setItem(
        "personelDurumlari",
        JSON.stringify(personelDurumlari)
    );

    izinler();

}
function isBasiHesapla() {

    const baslangic = document.getElementById("izinBaslangic").value;
    const bitis = document.getElementById("izinBitis").value;

    if (!baslangic || !bitis) {
        return;
    }

    // İş başı tarihini hesapla
    const isBasiTarihi = new Date(bitis);
    isBasiTarihi.setDate(isBasiTarihi.getDate() + 1);

    const yil = isBasiTarihi.getFullYear();
    const ay = String(isBasiTarihi.getMonth() + 1).padStart(2, "0");
    const gun = String(isBasiTarihi.getDate()).padStart(2, "0");

    document.getElementById("izinIsBasi").value =
        `${yil}-${ay}-${gun}`;

    // İzin süresini hesapla
    const bas = new Date(baslangic);
    const bit = new Date(bitis);

    const gunSayisi = Math.floor(
        (bit - bas) / (1000 * 60 * 60 * 24)
    ) + 1;

    const izinSure = document.getElementById("izinSure");

    if (izinSure) {
        izinSure.value = gunSayisi + " Gün";
    }

}
function izinBilgileriGetir() {

    const sicil = document.getElementById("izinPersonel").value;

    if (sicil == "") {

        document.getElementById("izinBilgileri").style.display = "none";
        return;

    }

    const personel = personelListesi.find(function (p) {
        return String(p.sicil) === String(sicil);
    });

    if (!personel) {

        document.getElementById("izinBilgileri").style.display = "none";
        return;

    }

    document.getElementById("izinBilgileri").style.display = "block";

    document.getElementById("lblYillikHak").innerHTML =
        (personel.yillikHak ?? 0) + " Gün";

    document.getElementById("lblKullanilan").innerHTML =
        (personel.kullanilanIzin ?? 0) + " Gün";

    document.getElementById("lblKalan").innerHTML =
        (personel.kalanIzin ?? 0) + " Gün";

}
function izinKontrolEt(sicil, izinTuru, gunSayisi, baslangic, bitis, index = null) {

    // Aynı tarih aralığında izin var mı?
    const cakisan = personelDurumlari.find(function (kayit, i) {

        if (index !== null && i === index)
            return false;

        if (String(kayit.sicil) !== String(sicil))
            return false;

        return !(bitis < kayit.baslangic || baslangic > kayit.bitis);

    });

    if (cakisan) {

        alert("Bu personelin seçilen tarihlerde başka bir izin kaydı bulunmaktadır.");

        return false;

    }

    // İK kontrolleri daha sonra buraya eklenecek

    return true;

}
function personelDurumuGetir(sicil, tarih) {

    const kayit = personelDurumlari.find(function (izin) {

        return String(izin.sicil) === String(sicil)
            && tarih >= izin.baslangic
            && tarih <= izin.bitis
            && izin.durum !== "İPTAL EDİLDİ";

    });

    if (!kayit) {

        return null;

    }

    return kayit;

}
