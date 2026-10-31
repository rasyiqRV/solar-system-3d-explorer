# AstroVoyager 3D - Simulasi Penerbangan Antariksa dan Edukasi Astronomi

## Deskripsi
Aplikasi web 3D interaktif simulasi penerbangan pesawat antariksa mengarungi seluruh Tata Surya kita. Pemain dapat mengendalikan pesawat luar angkasa dengan fisika manuver 6 derajat kebebasan (pitch, yaw, roll, throttle, boost, dan hiperdrive), mengunjungi Matahari, 8 planet, Bulan, dan Sabuk Asteroid. Proyek ini menyisipkan materi pembelajaran astronomi komprehensif, ensiklopedia benda langit, misi terpandu, dan kuis sains interaktif.

## Peningkatan Terkini
1. **Pencahayaan Visual 3D**:
   - Penambahan intensitas PointLight Matahari dari 2.5 ke 3.8 untuk kontras dan detail yang tajam.
   - Peningkatan tone mapping exposure dari 1.1 ke 1.45 agar adegan keseluruhan lebih cerah dan hidup.
   - Peningkatan Ambient Light kosmik dari 0.25 ke 0.55 serta penambahan HemisphereLight untuk gradasi cahaya alami.
   - Lampu sorot eksplorasi depan (SpotLight) pada haluan wahana antariksa untuk menerangi sisi gelap objek langit saat didekati.
   - Penyesuaian densitas kabut antariksa agar planet-planet jauh terlihat lebih jelas.

2. **Optimasi Mesin Pencari (Search Engine Optimization / SEO)**:
   - Metadata lengkap: title, description, keywords, author, robots, canonical URL.
   - Tag Open Graph (Facebook, WhatsApp, LinkedIn, Discord) dan Twitter Cards beresolusi tinggi dengan aset preview vektor `assets/og-preview.svg`.
   - Data Terstruktur JSON-LD Schema.org (`WebApplication` & `EducationalApplication`) untuk peringkat hasil penelusuran Google.
   - Berkas `robots.txt` dan `sitemap.xml` untuk pengindeksan perayap mesin pencari otomatis.
   - Berkas `manifest.json` dan ikon SVG `assets/favicon.svg` untuk Progressive Web App (PWA).
   - Konten semantik `<main>` ramah pembaca layar (screen reader) dan perayap web (crawler).

3. **Konfigurasi Deployment Vercel**:
   - Berkas `vercel.json` dengan konfigurasi clean URLs, header keamanan modern (CSP/X-Frame-Options/X-Content-Type-Options), dan strategi caching berkas statis (CSS, JS, SVG).

## Teknologi
- **HTML5 Canvas & WebGL** - Fondasi render grafis 3D realtime
- **Three.js (r128)** - Pengelolaan adegan 3D, geometri, pencahayaan, bayangan, partikel, dan material PBR
- **HTML5 Canvas Procedural Texture Generator** - Menghasilkan peta tekstur permukaan realistis beresolusi tinggi tanpa dependensi berkas eksternal
- **Web Audio API** - Pembangkit audio sintesis prosedural untuk deru mesin jet plasma, booster, lompatan hiperdrive, sensor pemindai, dan peringatan bahaya radiasi
- **CSS3 Glassmorphism** - Antarmuka Head-Up Display (HUD) bertema futuristik dengan telemetri instrumen dan radar dinamis

## Cara Menjalankan
1. Buka berkas `index.html` langsung di peramban web modern, atau
2. Jalankan melalui server lokal:
   ```bash
   npx serve . -p 3001
   ```
3. Akses alamat `http://localhost:3001` pada peramban.

## Tingkat Kompleksitas
**Cukup Kompleks** - Melibatkan render WebGL/Three.js, pencahayaan multi-layer, generator tekstur prosedural berbasis canvas, sistem audio prosedural tanpa aset luar, fisika kinematika pesawat luar angkasa, mekanisme navigasi hiperdrive, radar 2D terproyeksi, integrasi ensiklopedia sains astronomi interaktif, dan optimasi SEO standar produksi.

---
*Dibuat oleh Daily Project Builder — 31 Oktober 2026*
