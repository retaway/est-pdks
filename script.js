let personelListesi =
JSON.parse(localStorage.getItem("personeller")) || [];
let degisimKodlariListesi =
JSON.parse(localStorage.getItem("degisimKodlari")) || [];
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

            <td>${personel.durum=="Aktif" ? "🟢 Aktif" : "🔴 Pasif"}</td>

            <td>
                <button onclick="personelDuzenle(${index})">✏️</button>
                <button onclick="personelDurum(${index})">🔄</button>
                <button onclick="personelSil(${index})">🗑️</button>
            </td>

        </tr>
        `;

    });

    if (satirlar == "") {

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
        <button onclick="yeniPersonel()">➕ Yeni Personel</button>
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

function yeniPersonel(){

document.getElementById("icerik").innerHTML = `

<h2>➕ Yeni Personel</h2>

<div class="form-kart">

<label>Sicil No</label>
<input id="sicil" type="text" placeholder="Örn: 2045">

<label>Ad</label>
<input id="ad" type="text" placeholder="Ahmet">

<label>Soyad</label>
<input id="soyad" type="text" placeholder="Yılmaz">

<label>Telefon</label>
<input id="telefon" type="tel" placeholder="05xxxxxxxxx">

<label>E-Posta</label>
<input id="email" type="email" placeholder="ornek@estram.com.tr">

<label>Görev</label>
<select id="gorev">
    <option>Vatman</option>
    <option>Denetçi</option>
    <option>Amir</option>
</select>

<label>Durum</label>
<select id="durum">
    <option>Aktif</option>
    <option>Pasif</option>
</select>

<br><br>

<button onclick="personelKaydet()">💾 Kaydet</button>

<button onclick="surucuSefligi()">⬅ Geri</button>

</div>

`;

}

function personelKaydet(){

    const personel = {

        sicil: document.getElementById("sicil").value,
        ad: document.getElementById("ad").value,
        soyad: document.getElementById("soyad").value,
        telefon: document.getElementById("telefon").value,
        email: document.getElementById("email").value,
        gorev: document.getElementById("gorev").value,
        durum: document.getElementById("durum").value

    };

    personelListesi.push(personel);

    localStorage.setItem(
        "personeller",
        JSON.stringify(personelListesi)
    );

    alert("Personel kaydedildi.");

    surucuSefligi();
}

function degisimKodlari() {

    let satirlar = "";

    degisimKodlariListesi.forEach(function(kayit, index){

        satirlar += `
        <tr>
            <td>${kayit.kod}</td>
            <td>${kayit.aciklama}</td>
            <td>
                ${kayit.durum == "Aktif" ? "🟢 Aktif" : "🔴 Pasif"}
            </td>
            <td>
                <button onclick="degisimDuzenle(${index})">✏️</button>
                <button onclick="degisimDurum(${index})">🔄</button>
                <button onclick="degisimSil(${index})">🗑️</button>
            </td>
        </tr>
        `;

    });


    if(satirlar==""){

        satirlar=`
        <tr>
            <td colspan="4" style="text-align:center;">
                Henüz değişim kodu eklenmedi.
            </td>
        </tr>
        `;

    }

    document.getElementById("icerik").innerHTML=`

    <h2>🔄 Değişim Kodları</h2>

    <div class="toolbar">

        <button onclick="yeniDegisimKodu()">
            ➕ Yeni Değişim Kodu
        </button>

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
let tarifeDosyasi = null;
let tarifeVerileri = [];
function excelSec() {

    document.getElementById("excelDosya").click();

    document.getElementById("excelDosya").onchange = function () {

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

            if(index === 0){
                html += "<th>" + hucre + "</th>";
            } else {
                html += "<td>" + hucre + "</td>";
            }
        });

        html += "</tr>";

    });

    html += "</table>";

    document.getElementById("icerik").innerHTML = html;
}

function tarifeSil(){


document.getElementById("tarifeListe").innerHTML=`

<tr>

<td colspan="3">

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

document.getElementById("icerik").innerHTML=`

<h2>${plan=="yaz"?"☀️ Yaz":"❄️ Kış"} Çalışma Planı</h2>

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

document.getElementById("planIcerik").innerHTML=`

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

<td><input type="text" placeholder="Görev No"></td>

<td><input type="text" placeholder="Platform"></td>

<td><input type="text" placeholder="Tarife"></td>

<td><input type="time"></td>

<td><input type="time"></td>

</tr>

</thead>

<tbody>

</tbody>

</table>

<br>

<button onclick="degisimKaydet()">💾 Kaydet</button>

<button onclick="degisimKodlari()">⬅ Geri</button>

</div>

`;

}
function satirEkle(gorev = {}){

const tbody=document.querySelector("#degisimTablosu tbody");

tbody.insertAdjacentHTML("beforeend",`

<tr>

<td><input type="text" value="${gorev.gorevNo || ""}"></td>

<td><input type="text" value="${gorev.platform || ""}"></td>

<td><input type="text" value="${gorev.tarife || ""}"></td>

<td><input type="time" value="${gorev.baslangic || ""}"></td>

<td><input type="time" value="${gorev.bitis || ""}"></td>

<td>

<button onclick="this.closest('tr').remove()">
🗑️
</button>

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

document.querySelectorAll("#degisimTablosu tbody tr").forEach(function(tr){

    const inputlar = tr.querySelectorAll("input");

    gorevler.push({

        gorevNo: inputlar[0].value,
        platform: inputlar[1].value,
        tarife: inputlar[2].value,
        baslangic: inputlar[3].value,
        bitis: inputlar[4].value

    });

});

degisimKodlariListesi.push({

    kod: kod,
    aciklama: aciklama,
    durum: "Aktif",
    gorevler: gorevler

});

    localStorage.setItem(
        "degisimKodlari",
        JSON.stringify(degisimKodlariListesi)
    );

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

        case "gunlukVardiya":
            alert("Henüz geliştiriliyor");
            break;

        case "izinler":
            alert("Henüz geliştiriliyor");
            break;

        case "puantaj":
            alert("Henüz geliştiriliyor");
            break;

        case "bildirimler":
            alert("Henüz geliştiriliyor");
            break;

        case "raporlar":
            alert("Henüz geliştiriliyor");
            break;

        case "ayarlar":
            alert("Henüz geliştiriliyor");
            break;
    }
}


function degisimDuzenle(index){

const kayit = degisimKodlariListesi[index];

document.getElementById("icerik").innerHTML=`

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

<tbody>

</tbody>

</table>

<br>

<button onclick="degisimGuncelle(${index})">
💾 Güncelle
</button>

<button onclick="degisimKodlari()">
⬅ Geri
</button>

</div>

`;

if(kayit.gorevler){

kayit.gorevler.forEach(function(gorev){

satirEkle(gorev);

});

}

}

function degisimSil(index){

    if(confirm("Bu değişim kodu silinsin mi?")){

        degisimKodlariListesi.splice(index, 1);

        localStorage.setItem(
            "degisimKodlari",
            JSON.stringify(degisimKodlariListesi)
        );

        degisimKodlari();

    }

    
}
function degisimGuncelle(index){

const gorevler=[];

document.querySelectorAll("#degisimTablosu tbody tr").forEach(function(tr){

const inputlar=tr.querySelectorAll("input");

gorevler.push({

gorevNo:inputlar[0].value,
platform:inputlar[1].value,
tarife:inputlar[2].value,
baslangic:inputlar[3].value,
bitis:inputlar[4].value

});

});

degisimKodlariListesi[index].kod=document.getElementById("degisimKodu").value;

degisimKodlariListesi[index].aciklama=document.getElementById("degisimAdi").value;

degisimKodlariListesi[index].gorevler=gorevler;

localStorage.setItem(
"degisimKodlari",
JSON.stringify(degisimKodlariListesi)
);

alert("Güncellendi.");

degisimKodlari();

}
function degisimDurum(index){

    if(degisimKodlariListesi[index].durum=="Aktif"){

        degisimKodlariListesi[index].durum="Pasif";

    }else{

        degisimKodlariListesi[index].durum="Aktif";

    }

    localStorage.setItem(
        "degisimKodlari",
        JSON.stringify(degisimKodlariListesi)
    );

    degisimKodlari();
}
