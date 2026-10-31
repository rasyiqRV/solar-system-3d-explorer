# AstroVoyager 3D - Simulasi Penerbangan Antariksa dan Edukasi Astronomi

## Deskripsi
Aplikasi web 3D interaktif simulasi penerbangan pesawat antariksa mengarungi seluruh Tata Surya kita. Pemain dapat mengendalikan pesawat luar angkasa dengan fisika manuver 6 derajat kebebasan (pitch, yaw, roll, throttle, boost, dan hiperdrive), mengunjungi Matahari, 8 planet, Bulan, dan Sabuk Asteroid. Proyek ini menyisipkan materi pembelajaran astronomi komprehensif, ensiklopedia benda langit, misi terpandu, dan kuis sains interaktif.

## Teknologi
- **HTML5 Canvas & WebGL** - Fondasi render grafis 3D realtime
- **Three.js (r128)** - Pengelolaan adegan 3D, geometri, pencahayaan, bayangan, partikel, dan material PBR
- **HTML5 Canvas Procedural Texture Generator** - Menghasilkan peta tekstur permukaan realistis beresolusi tinggi tanpa dependensi berkas eksternal
- **Web Audio API** - Pembangkit audio sintesis prosedural untuk deru mesin jet plasma, booster, lompatan hiperdrive, sensor pemindai, dan peringatan bahaya radiasi
- **CSS3 Glassmorphism** - Antarmuka Head-Up Display (HUD) bertema futuristik dengan telemetri instrumen dan radar dinamis

## Fitur Unggulan
1. **Simulasi Tata Surya Lengkap**:
   - Matahari dengan korona berpendar dan peringatan bahaya termal jika terbang terlalu dekat
   - Seluruh 8 planet (Merkurius, Venus, Bumi, Mars, Yupiter, Saturnus, Uranus, Neptunus) dengan skala visual proporsional
   - Bulan mengorbit Bumi dan Sabuk Asteroid berisi 650 bongkahan batuan 3D yang berotasi
   - Sistem cincin megah Saturnus dan cincin tipis Uranus
   - Garis orbit eliptis visual yang dapat dinyalakan atau dimatikan

2. **Kendali Pesawat Antariksa Mendalam**:
   - Fisika akselerasi dengan inersia dan peredaman sudut
   - Pendorong plasma dengan efek lidah api dinamis
   - Mesin pendorong akselerasi tinggi (Boost)
   - Lompatan Hiperdrive (Warp Drive) otomatis menuju objek langit yang dikunci
   - 3 mode sudut pandang kamera: Orang Ketiga (Third-Person), Kokpit (First-Person), dan Sinematik Orbit

3. **Edukasi dan Sains Astronomi**:
   - Sensor Pemindai Proksimitas: Otomatis mendeteksi saat mendekati planet dan membuka lembar data ilmiah
   - Data astronomi akurat dalam Bahasa Indonesia: Diameter, massa, percepatan gravitasi, suhu rata-rata, periode revolusi, rotasi, komposisi atmosfer, dan fakta-fakta sains unik
   - 11 Misi Penjelajahan Terpandu dengan pelacakan target otomatis
   - 8 Soal Kuis Astronomi Interaktif dengan umpan balik edukatif dan penilaian gelar penjelajah

## Cara Menjalankan
1. Buka berkas `index.html` langsung di peramban web modern, atau
2. Jalankan melalui server lokal:
   ```bash
   npx serve . -p 3001
   ```
3. Akses alamat `http://localhost:3001` pada peramban.

## Tingkat Kompleksitas
**Cukup Kompleks** - Melibatkan render WebGL/Three.js, generator tekstur prosedural berbasis canvas, sistem audio prosedural tanpa aset luar, fisika kinematika pesawat luar angkasa, mekanisme navigasi hiperdrive, radar 2D terproyeksi, dan integrasi ensiklopedia sains astronomi interaktif.

---
*Dibuat oleh Daily Project Builder — 31 Oktober 2026*
