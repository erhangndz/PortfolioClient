import { Component, OnInit } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {


  ngOnInit(): void {

// Elementleri seç
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("mainContent");
const toggleButton = document.getElementById("sidebarToggle");

// Arka plan overlay ekleyin
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

// Ekran genişliğini kontrol et
function handleResize() {
  if (window.innerWidth > 768) {
    // Masaüstünde sidebar her zaman açık
    sidebar.classList.remove("open");
    content.classList.add("shifted");
    overlay.classList.remove("show");
  } else {
    // Mobilde sidebar kapalı başlar
    sidebar.classList.remove("open");
    content.classList.remove("shifted");
    overlay.classList.remove("show");
  }
}

// Sayfa yüklenince ekran genişliğini kontrol et
window.addEventListener("load", handleResize);
window.addEventListener("resize", handleResize);

// Toggle işlemi
toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("open"); // Sidebar aç/kapa
  content.classList.toggle("shifted"); // İçerik yana kayar
  overlay.classList.toggle("show"); // Overlay görünür/gizli
});

// Overlay'e tıklayınca sidebar'ı kapat
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  content.classList.remove("shifted");
  overlay.classList.remove("show");
});

// Sidebar içindeki tüm linkleri seç
const sidebarLinks = document.querySelectorAll(".sidebar a");

// Mevcut URL'ye göre active sınıfını ekle
function setActiveLink() {
  // Tüm linklerden active sınıfını kaldır
  sidebarLinks.forEach(link => link.classList.remove("active"));

  // Şu anki URL ile eşleşen linke active sınıfı ekle

}

// Sayfa yüklendiğinde doğru linki seç
window.addEventListener("load", setActiveLink);

// Linklere tıklandığında active sınıfını güncelle
sidebarLinks.forEach(link => {
  link.addEventListener("click", () => {
    // Tüm linklerden active sınıfını kaldır
    sidebarLinks.forEach(l => l.classList.remove("active"));

    // Tıklanan linke active sınıfını ekle
    link.classList.add("active");
  });
});





  }
  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.remove('open');
  }
}
