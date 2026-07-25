document.querySelector("button").addEventListener("click", function() {

    let kullanici = document.querySelectorAll("input")[0].value;
    let sifre = document.querySelectorAll("input")[1].value;

    if(kullanici == "admin" && sifre == "1234") {
        window.location.href = "panel.html";
    }
    else {
        alert("Kullanıcı adı veya şifre hatalı!");
    }

});
function surucuSefligi(){

document.getElementById("icerik").innerHTML=`

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
