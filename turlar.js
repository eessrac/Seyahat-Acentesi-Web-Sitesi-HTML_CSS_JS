document.addEventListener("DOMContentLoaded", () => {
  const araBtn = document.getElementById("araBtn");
  const temizleBtn = document.getElementById("temizleBtn");
  const aramaInput = document.getElementById("turAramaInput");
  const kisiSecimi = document.getElementById("kisiSecimi");
  const turKartlari = document.querySelectorAll(".tur1, .tur2, .tur3");
  const EURO_KURU = 49.15;

  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll(".navbar");
      navLinks.forEach((link) => {
        if (currentPath.includes(link.getAttribute("href"))) {
          link.classList.add("active");
        }
      });

      const darkModeBtn = document.getElementById("dark-mode-toggle");
      const body = document.body;

      if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        if (darkModeBtn) darkModeBtn.innerText = "☀️";
      }

      if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
          body.classList.toggle("dark-mode");
          if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            darkModeBtn.innerText = "☀️";
          } else {
            localStorage.setItem("theme", "light");
            darkModeBtn.innerText = "🌙";
          }
        });
      }
    });

  function filtreleVeHesapla() {
    if (!aramaInput || !kisiSecimi) return;

    const arananKelime = aramaInput.value.toLowerCase();
    const kisiSayisi = parseInt(kisiSecimi.value);

    turKartlari.forEach((kart) => {
      const turIsmi = kart.getAttribute("data-isim").toLowerCase();

      if (turIsmi.includes(arananKelime)) {
        kart.style.display = "block";

        const birimFiyat = parseFloat(kart.getAttribute("data-fiyat"));
        const yeniFiyatEur = birimFiyat * kisiSayisi;
        const yeniFiyatTl = yeniFiyatEur * EURO_KURU;

        const eurAlani = kart.querySelector(".anlik-fiyat");
        const tlAlani = kart.querySelector(".anlik-fiyat-tl");

        if (eurAlani)
          eurAlani.innerText = yeniFiyatEur.toLocaleString("tr-TR") + ",00";
        if (tlAlani)
          tlAlani.innerText = yeniFiyatTl.toLocaleString("tr-TR", {
            maximumFractionDigits: 2,
          });
      } else {
        kart.style.display = "none";
      }
    });
  }

  if (araBtn) {
    araBtn.addEventListener("click", (e) => {
      e.preventDefault();
      filtreleVeHesapla();
    });
  }

  if (temizleBtn) {
    temizleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      aramaInput.value = "";
      kisiSecimi.value = "2";

      turKartlari.forEach((kart) => {
        kart.style.display = "block";
        const birimFiyat = parseFloat(kart.getAttribute("data-fiyat"));
        const varsayilanFiyatEur = birimFiyat * 2;
        const varsayilanFiyatTl = varsayilanFiyatEur * EURO_KURU;

        const eurAlani = kart.querySelector(".anlik-fiyat");
        const tlAlani = kart.querySelector(".anlik-fiyat-tl");

        if (eurAlani)
          eurAlani.innerText =
            varsayilanFiyatEur.toLocaleString("tr-TR") + ",00";
        if (tlAlani)
          tlAlani.innerText = varsayilanFiyatTl.toLocaleString("tr-TR", {
            maximumFractionDigits: 2,
          });
      });
    });
  }

  let kaydedilmisBitis = localStorage.getItem("sayacBitisZamani");
  let bitisZamani;

  if (kaydedilmisBitis) {
    bitisZamani = parseInt(kaydedilmisBitis);
  } else {
    bitisZamani = Date.now() + 12 * 60 * 60 * 1000;
    localStorage.setItem("sayacBitisZamani", bitisZamani);
  }

  function sayaciGuncelle() {
    const sayacElementi = document.getElementById("geri-sayim");
    if (!sayacElementi) return;

    const simdi = Date.now();
    const fark = bitisZamani - simdi;

    if (fark <= 0) {
      sayacElementi.innerHTML = "Fırsat Sona Erdi!";
      return;
    }

    const saat = Math.floor((fark / (1000 * 60 * 60)) % 24);
    const dakika = Math.floor((fark / (1000 * 60)) % 60);
    const saniye = Math.floor((fark / 1000) % 60);

    sayacElementi.innerHTML = `${saat.toString().padStart(2, "0")}:${dakika.toString().padStart(2, "0")}:${saniye.toString().padStart(2, "0")}`;
  }

  setInterval(sayaciGuncelle, 1000);
  sayaciGuncelle();
});

function rezervasyonKaydet(turId, fiyat) {
  const kisiInput = document.getElementById("kisiSecimi");
  const kisi = kisiInput ? kisiInput.value : 2;

  localStorage.setItem("secilenTur", turId);
  localStorage.setItem("birimFiyat", fiyat);
  localStorage.setItem("kisiSayisi", kisi);
}
