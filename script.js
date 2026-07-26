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

    document.getElementById("icerik").innerHTML = `
        <h2>👷 Sürücü Şefliği</h2>

        <input type="text" placeholder="Personel Ara">

        <br><br>

        <table border="1" width="100%" cellspacing="0" cellpadding="10">

            <tr>
                <th>Ad Soyad</th>
                <th>Görev No</th>
                <th>Durum</th>
            </tr>

            <tr>
                <td>Ahmet Yılmaz</td>
                <td>204</td>
                <td>Görevde</td>
            </tr>

            <tr>
                <td>Mehmet Kaya</td>
                <td>315</td>
                <td>İzinli</td>
            </tr>

            <tr>
                <td>Ali Demir</td>
                <td>118</td>
                <td>Yedek</td>
            </tr>

        </table>
    `;
}
function degisimKodlari() {

    let satirlar = "";

    degisimKodlariListesi.forEach(function(kod, index){

        satirlar += `
      <tr>
    <td>${kod.kod}</td>
    <td>${kod.aciklama}</td>
    <td>🟢 Aktif</td>
   <td>

<button onclick="degisimDetay(${index})">📂</button>

<button onclick="degisimDuzenle(${index})">✏️</button>

<button onclick="degisimSil(${index})">🗑️</button>

</td>
</tr>
        `;

    });

    if(satirlar === ""){

        satirlar = `
        <tr>
            <td colspan="5" style="text-align:center;">
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

                   <th>Değişim Kodu</th>
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

<button onclick="yeniDegisimKodu()">
➕ Yeni Değişim Kodu
</button>

<table class="tablo">

<thead>

<tr>

<th>Değişim Kodu</th>

<th>Açıklama</th>

<th>İşlem</th>

</tr>

</thead>

<tbody>

<tr>

<td>01011</td>

<td>Sabah Görevi</td>

<td>✏️</td>

</tr>

</tbody>

</table>

`;

}
function yeniDegisimKodu(){

document.getElementById("icerik").innerHTML=`

<h2>🔄 Yeni Değişim Kodu</h2>

<div class="form-kart">

<label>Değişim Kodu</label>
<input id="degisimKodu" type="text" placeholder="Örn: 01011">

<label>Açıklama</label>
<input id="degisimAdi" type="text" placeholder="Sabah Görevi">

<br><br>

<button onclick="satirEkle()">➕ Satır Ekle</button>

<table class="tablo" id="degisimTablosu">

<thead>

<tr>

<th>Görev No</th>

<th>Platform</th>

<th>Tarife</th>

<th>Başlangıç</th>

<th>Bitiş</th>

<th>Süre</th>

<th>İşlem</th>

</tr>

</thead>

<tbody>

</tbody>

</table>

<br>

<button onclick="degisimKaydet()">💾 Kaydet</button>

</div>

`;

}
function satirEkle(){

let tbody=document.querySelector("#degisimTablosu tbody");

let satir=`

<tr>

<td><input type="text"></td>

<td><input type="text"></td>

<td><input type="text"></td>

<td><input type="time"></td>

<td><input type="time"></td>

<td><input type="text" readonly></td>

<td>

<button>🗑</button>

</td>

</tr>

`;

tbody.insertAdjacentHTML("beforeend",satir);

}


function degisimKaydet() {

    const kod = document.getElementById("degisimKodu").value.trim();
    const aciklama = document.getElementById("degisimAdi").value.trim();

    if (kod === "" || aciklama === "") {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    degisimKodlariListesi.push({
        kod: kod,
        aciklama: aciklama
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
function degisimDetay(index){

    const kayit = degisimKodlariListesi[index];

    document.getElementById("icerik").innerHTML = `

    <h2>📂 Değişim Kodu Detayı</h2>

    <div class="form-kart">

        <p><b>Değişim Kodu:</b> ${kayit.kod}</p>

       <p><b>Değişim Kodu:</b> ${kayit.kod}</p>

<p><b>Açıklama:</b> ${kayit.aciklama}</p>

<br>

<button onclick="gorevEkle()">➕ Görev Ekle</button>

<br><br>

<table class="tablo">

            <thead>

                <tr>

                    <th>Görev No</th>
                    <th>Platform</th>
                    <th>Tarife</th>
                    <th>Başlangıç</th>
                    <th>Bitiş</th>

                </tr>

            </thead>

            <tbody id="detayTablo">

                <tr>

                    <td colspan="5">
                    Henüz görev eklenmedi.
                    </td>

                </tr>

            </tbody>

        </table>

        <br>

        <button onclick="degisimKodlari()">⬅ Geri Dön</button>

    </div>

    `;

}

function degisimDuzenle(index){
    alert("Düzenleme ekranı yakında eklenecek.");
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
     
