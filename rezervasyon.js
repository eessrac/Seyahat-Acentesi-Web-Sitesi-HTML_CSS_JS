document.addEventListener("DOMContentLoaded", () => {
  const secilenTur = localStorage.getItem("secilenTur");
  const birimFiyat = parseFloat(localStorage.getItem("birimFiyat"));
  const kisiSayisi = parseInt(localStorage.getItem("kisiSayisi")) || 2;
  const EURO_KURU = 49.15;

  if (secilenTur) {
    const turSelect = document.getElementById("turSecimi");

    if (secilenTur === "yunanistan") turSelect.value = "avrupa";
    else if (secilenTur === "paris") turSelect.value = "kis";
    else turSelect.value = secilenTur;

    const toplamEur = birimFiyat * kisiSayisi;
    const toplamTl = toplamEur * EURO_KURU;

    document.querySelector(".ozet-kutusu p strong").innerText =
      turSelect.options[turSelect.selectedIndex].text;
    document.querySelectorAll(".ozet-kutusu p strong")[1].innerText =
      kisiSayisi;
    document.querySelector(".buyuk-fiyat").innerText =
      `${toplamEur.toLocaleString("tr-TR")},00 EUR / ${toplamTl.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} TL`;
  }

  const rezForm = document.querySelector(".rezervasyon-formu");

  if (rezForm) {
    rezForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const adSoyad = document.getElementById("adSoyad").value.trim();
      const email = document.getElementById("email").value.trim();
      const turSecimi = document.getElementById("turSecimi").value;
      const kvkk = document.getElementById("kvkkOnay").checked;

      if (turSecimi === "" || adSoyad === "" || email === "") {
        alert("Lütfen tüm alanları doldurunuz!");
        return;
      }

      const emailTaslak = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailTaslak.test(email)) {
        alert("Lütfen geçerli bir e-posta adresi giriniz!");
        return;
      }

      if (!kvkk) {
        alert("Lütfen gizlilik politikasını onaylayınız!");
        return;
      }

      alert(
        `Sayın ${adSoyad}, rezervasyon talebiniz başarıyla alınmıştır! En kısa sürede sizinle iletişime geçeceğiz.`,
      );

      rezForm.reset();

      localStorage.clear();
    });
  }
});
