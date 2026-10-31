// Generator Tekstur Prosedural Berkualitas Tinggi Menggunakan HTML5 Canvas
// Menghilangkan ketergantungan pada aset gambar eksternal agar selalu dapat dimuat cepat dan offline.

class TextureGenerator {
    static createSunTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Dasar gradien korona matahari
        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, '#ff3300');
        grad.addColorStop(0.3, '#ff7700');
        grad.addColorStop(0.5, '#ffbb00');
        grad.addColorStop(0.7, '#ff7700');
        grad.addColorStop(1, '#ff3300');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Simulasi granulasi dan turbulensi konveksi plasma
        for (let i = 0; i < 4000; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const radius = 2 + Math.random() * 12;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 240, 160, 0.25)' : 'rgba(220, 40, 0, 0.2)';
            ctx.fill();
        }

        // Bintik matahari (Sunspots)
        for (let i = 0; i < 24; i++) {
            const x = (Math.random() * 0.8 + 0.1) * 1024;
            const y = (Math.random() * 0.5 + 0.25) * 512;
            const r = 4 + Math.random() * 10;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(60, 10, 0, 0.85)';
            ctx.fill();

            // Penumbra di sekitar bintik
            ctx.beginPath();
            ctx.arc(x, y, r * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(160, 40, 0, 0.35)';
            ctx.fill();
        }

        return new THREE.CanvasTexture(canvas);
    }

    static createMercuryTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Permukaan basalt abu-abu kecokelatan
        ctx.fillStyle = '#6e6761';
        ctx.fillRect(0, 0, 1024, 512);

        // Pola kawah tubrukan
        for (let i = 0; i < 3500; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const r = 1 + Math.random() * 16;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = Math.random() > 0.5 ? 'rgba(160, 150, 140, 0.3)' : 'rgba(40, 36, 33, 0.4)';
            ctx.fill();

            if (r > 6) {
                // Bibir kawah terang
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = 'rgba(200, 195, 185, 0.4)';
                ctx.stroke();
            }
        }

        return new THREE.CanvasTexture(canvas);
    }

    static createVenusTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Lapisan atmosfer asam sulfat keemasan berpusar
        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, '#d9b479');
        grad.addColorStop(0.2, '#ecd09e');
        grad.addColorStop(0.5, '#c99f5d');
        grad.addColorStop(0.8, '#ecd09e');
        grad.addColorStop(1, '#b58a48');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Pola pusaran angin khatulistiwa
        for (let y = 0; y < 512; y += 4) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            for (let x = 0; x < 1024; x += 30) {
                const waveY = y + Math.sin(x * 0.02 + y * 0.05) * 12;
                ctx.lineTo(x, waveY);
            }
            ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(255, 235, 190, 0.15)' : 'rgba(150, 100, 40, 0.15)';
            ctx.lineWidth = 6;
            ctx.stroke();
        }

        return new THREE.CanvasTexture(canvas);
    }

    static createEarthTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Samudra biru
        const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
        oceanGrad.addColorStop(0, '#10305e');
        oceanGrad.addColorStop(0.5, '#0b2347');
        oceanGrad.addColorStop(1, '#10305e');
        ctx.fillStyle = oceanGrad;
        ctx.fillRect(0, 0, 1024, 512);

        // Benua & Daratan (Representasi prosedural benua Bumi)
        function drawContinent(cx, cy, rx, ry, col) {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.beginPath();
            ctx.moveTo(rx, 0);
            for (let a = 0; a < Math.PI * 2; a += 0.15) {
                const noise = 0.7 + Math.sin(a * 5) * 0.2 + Math.cos(a * 3) * 0.15;
                const px = Math.cos(a) * rx * noise;
                const py = Math.sin(a) * ry * noise;
                ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = col;
            ctx.fill();

            // Pesisir pantai hijau muda / pasir
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'rgba(76, 175, 80, 0.4)';
            ctx.stroke();
            ctx.restore();
        }

        // Benua Amerika Utara
        drawContinent(240, 180, 130, 80, '#2e7d32');
        // Benua Amerika Selatan
        drawContinent(320, 340, 75, 110, '#388e3c');
        // Benua Eurasia
        drawContinent(680, 170, 210, 95, '#4caf50');
        // Benua Afrika
        drawContinent(560, 280, 100, 110, '#8d6e63');
        // Benua Australia
        drawContinent(840, 360, 80, 55, '#a1887f');
        // Kepulauan Nusantara
        drawContinent(780, 270, 70, 30, '#1b5e20');

        // Kutub Es Utara & Antartika
        ctx.fillStyle = '#f0f4f8';
        ctx.fillRect(0, 0, 1024, 40);
        ctx.fillRect(0, 475, 1024, 37);

        return new THREE.CanvasTexture(canvas);
    }

    static createEarthCloudsTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 1024, 512);

        // Awan putih semi-transparan berputar
        for (let i = 0; i < 280; i++) {
            const x = Math.random() * 1024;
            const y = 60 + Math.random() * 380;
            const rx = 20 + Math.random() * 60;
            const ry = 6 + Math.random() * 20;

            ctx.beginPath();
            ctx.ellipse(x, y, rx, ry, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.random() * 0.25})`;
            ctx.fill();
        }

        return new THREE.CanvasTexture(canvas);
    }

    static createMoonTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#8c8c8c';
        ctx.fillRect(0, 0, 512, 256);

        // Maria Bulan (daratan gelap basal)
        const maria = [
            { x: 180, y: 90, r: 45 },
            { x: 260, y: 80, r: 50 },
            { x: 230, y: 140, r: 60 },
            { x: 340, y: 110, r: 35 }
        ];
        maria.forEach(m => {
            ctx.beginPath();
            ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(60, 60, 60, 0.65)';
            ctx.fill();
        });

        // Kawah tubrukan regolit
        for (let i = 0; i < 1500; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 256;
            const r = 1 + Math.random() * 7;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = Math.random() > 0.4 ? 'rgba(220, 220, 220, 0.4)' : 'rgba(30, 30, 30, 0.4)';
            ctx.fill();
        }

        return new THREE.CanvasTexture(canvas);
    }

    static createMarsTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Permukaan karat kemerahan
        const marsGrad = ctx.createLinearGradient(0, 0, 0, 512);
        marsGrad.addColorStop(0, '#9e3d1b');
        marsGrad.addColorStop(0.5, '#c85a2b');
        marsGrad.addColorStop(1, '#8c3214');
        ctx.fillStyle = marsGrad;
        ctx.fillRect(0, 0, 1024, 512);

        // Wilayah gelap vulkanik (Syrtis Major dsb)
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * 1024;
            const y = 140 + Math.random() * 260;
            ctx.beginPath();
            ctx.ellipse(x, y, 40 + Math.random() * 70, 20 + Math.random() * 40, Math.random(), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(80, 28, 12, 0.4)';
            ctx.fill();
        }

        // Olympus Mons (Gunung tertinggi)
        ctx.beginPath();
        ctx.arc(360, 210, 22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180, 90, 45, 0.9)';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(230, 130, 80, 0.7)';
        ctx.stroke();

        // Valles Marineris (Palung raksasa)
        ctx.beginPath();
        ctx.moveTo(420, 260);
        ctx.quadraticCurveTo(560, 280, 680, 270);
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'rgba(50, 15, 8, 0.8)';
        ctx.stroke();

        // Tudung es kutub utara dan selatan
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 1024, 25);
        ctx.fillRect(0, 485, 1024, 27);

        return new THREE.CanvasTexture(canvas);
    }

    static createJupiterTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Pita awan atmosfer khas Yupiter
        const colors = [
            '#4a3326', '#b58863', '#d9b48f', '#a66e4e',
            '#f2d6b3', '#8c5034', '#e6c29e', '#733d26',
            '#e0c4a8', '#b37752', '#d9ad8b', '#5c331e'
        ];

        let curY = 0;
        for (let i = 0; i < 24; i++) {
            const h = 512 / 24;
            ctx.fillStyle = colors[i % colors.length];
            ctx.fillRect(0, curY, 1024, h);
            curY += h;
        }

        // Turbulensi pita awan
        for (let y = 10; y < 512; y += 8) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            for (let x = 0; x < 1024; x += 20) {
                const py = y + Math.sin(x * 0.04 + y * 0.1) * 4;
                ctx.lineTo(x, py);
            }
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        // Bintik Merah Raksasa (Great Red Spot)
        ctx.save();
        ctx.translate(620, 310);
        ctx.scale(1.8, 1.0);
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.fillStyle = '#b3381e';
        ctx.fill();

        // Inti bintik merah
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#d94d26';
        ctx.fill();
        ctx.restore();

        return new THREE.CanvasTexture(canvas);
    }

    static createSaturnTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Pita gas halus warna emas lembut
        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, '#c7a36f');
        grad.addColorStop(0.2, '#dfc49c');
        grad.addColorStop(0.4, '#e6d3b3');
        grad.addColorStop(0.6, '#d1b485');
        grad.addColorStop(0.8, '#dfc49c');
        grad.addColorStop(1, '#b8925c');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Garis-garis halus atmosfer
        for (let y = 0; y < 512; y += 12) {
            ctx.fillStyle = y % 24 === 0 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(100, 70, 30, 0.08)';
            ctx.fillRect(0, y, 1024, 6);
        }

        return new THREE.CanvasTexture(canvas);
    }

    static createSaturnRingTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        const grad = ctx.createLinearGradient(0, 0, 512, 0);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(0.08, 'rgba(180, 150, 110, 0.3)');
        grad.addColorStop(0.25, 'rgba(220, 195, 150, 0.85)');
        grad.addColorStop(0.55, 'rgba(240, 220, 180, 0.95)');
        // Cassini Division (celah gelap)
        grad.addColorStop(0.62, 'rgba(10, 10, 10, 0.05)');
        grad.addColorStop(0.66, 'rgba(10, 10, 10, 0.05)');
        // Cincin A
        grad.addColorStop(0.72, 'rgba(200, 180, 140, 0.8)');
        grad.addColorStop(0.92, 'rgba(170, 140, 100, 0.6)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 64);

        return new THREE.CanvasTexture(canvas);
    }

    static createUranusTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, '#5faeb8');
        grad.addColorStop(0.3, '#74c4cd');
        grad.addColorStop(0.5, '#8be0e8');
        grad.addColorStop(0.7, '#74c4cd');
        grad.addColorStop(1, '#539fa9');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Awan metana samar
        for (let y = 0; y < 512; y += 16) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.fillRect(0, y, 1024, 8);
        }

        return new THREE.CanvasTexture(canvas);
    }

    static createNeptuneTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, '#1a3375');
        grad.addColorStop(0.3, '#264aa8');
        grad.addColorStop(0.5, '#3b6dd8');
        grad.addColorStop(0.7, '#264aa8');
        grad.addColorStop(1, '#152960');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Garis badai putih metana cepat
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * 1024;
            const y = 80 + Math.random() * 350;
            ctx.beginPath();
            ctx.ellipse(x, y, 60 + Math.random() * 90, 4 + Math.random() * 8, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.fill();
        }

        // Bintik Gelap Besar (Great Dark Spot)
        ctx.beginPath();
        ctx.ellipse(400, 240, 55, 30, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(8, 20, 60, 0.6)';
        ctx.fill();

        return new THREE.CanvasTexture(canvas);
    }
}
