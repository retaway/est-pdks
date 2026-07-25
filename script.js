document.querySelector("button").addEventListener("click", function() {

    let kullanici = document.querySelectorAll("input")[0].value;
    let sifre = document.querySelectorAll("input")[1].value;

    if(kullanici == "admin" && sifre == "1234") {
        alert("Giriş başarılı!");
    }
    else {
        alert("Kullanıcı adı veya şifre hatalı!");
    }

});
