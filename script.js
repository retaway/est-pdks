const button = document.querySelector("button");

if (button) {
    button.addEventListener("click", function () {

        let kullanici = document.querySelectorAll("input")[0].value;
        let sifre = document.querySelectorAll("input")[1].value;

        if (kullanici === "admin" && sifre === "1234") {
            window.location.href = "panel.html";
        } else {
            alert("Kullanıcı adı veya şifre hatalı!");
        }

    });
}

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

document.getElementById("icerik").innerHTML = `

<h2>🔄 Değişim Kodları</h2>

<div class="toolbar">

<button>➕ Yeni Kod</button>

<button>✏️ Düzenle</button>

<button>🗑️ Sil</button>

<button>📥 Excel Aktar</button>

<button>📤 Excel Dışa Aktar</button>

</div>

<table class="tablo">

<thead>

<tr>

<th>Değişim Kodu</th>

<th>İlk Görev</th>

<th>Başlangıç</th>

<th>Bitiş</th>

<th>Durum</th>

</tr>

</thead>

<tbody>

<tr>

<td>01011</td>

<td>1013</td>

<td>05:30</td>

<td>20:21</td>

<td>Aktif</td>

</tr>

<tr>

<td>01012</td>

<td>1015</td>

<td>05:45</td>

<td>20:35</td>

<td>Aktif</td>

</tr>

</tbody>

</table>

`;

}
function tarifeler() {
    document.getElementById("icerik").innerHTML = `
        <h2>🚋 Tarife Yönetimi</h2>

        <div class="ust-menu">
            <button onclick="yeniTarife()">➕ Yeni Tarife</button>
            <button onclick="excelAktar()">📥 Excel'den Aktar</button>
            <button onclick="excelDisaAktar()">📤 Excel'e Aktar</button>
        </div>

        <table class="tablo">
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

            <tbody id="tarifeTablosu">

            </tbody>
        </table>
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
function degisimKaydet(){

alert("Değişim kodu kaydedildi.");

}
