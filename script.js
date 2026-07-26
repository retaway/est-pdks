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
