// Game Utama: Penjelajahan Tata Surya 3D Interaktif & Edukasi Astronomi

class SolarSystemGame {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.celestialBodies = {};
        this.orbitLines = [];
        this.selectedTargetKey = 'earth';
        this.activeMissionIndex = 0;
        this.scanTarget = null;
        this.showOrbits = true;
        this.simulationSpeed = 1.0;

        // Input Keyboard State
        this.inputState = {
            pitchUp: false,
            pitchDown: false,
            yawLeft: false,
            yawRight: false,
            rollLeft: false,
            rollRight: false,
            throttleUp: false,
            throttleDown: false,
            boost: false
        };

        this.initThree();
        this.initStarfield();
        this.initCelestialBodies();
        this.initAsteroidBelt();
        this.initSpaceship();
        this.initEventListeners();
        this.initUI();

        this.lastTime = performance.now();
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    initThree() {
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.1;
        this.container.appendChild(this.renderer.domElement);

        // Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x020617, 0.00004);

        // Camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.5, 35000);
        this.camera.position.set(0, 60, 520);

        // Cahaya Matahari (PointLight di pusat tata surya)
        this.sunLight = new THREE.PointLight(0xffffff, 2.5, 9000, 0.15);
        this.sunLight.position.set(0, 0, 0);
        this.scene.add(this.sunLight);

        // Cahaya redup kosmik (Ambient Light)
        this.ambientLight = new THREE.AmbientLight(0x1e293b, 0.25);
        this.scene.add(this.ambientLight);
    }

    initStarfield() {
        // Lapisan 8.000 bintang latar belakang kosmik
        const starGeo = new THREE.BufferGeometry();
        const starCount = 8000;
        const starPos = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        const colorPalette = [
            new THREE.Color(0xffffff), // Putih
            new THREE.Color(0x93c5fd), // Biru muda
            new THREE.Color(0xfef08a), // Kuning lembut
            new THREE.Color(0xfca5a5), // Merah jingga
            new THREE.Color(0xa7f3d0)  // Cyan lembut
        ];

        for (let i = 0; i < starCount; i++) {
            const radius = 9000 + Math.random() * 5000;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            starPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            starPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPos[i * 3 + 2] = radius * Math.cos(phi);

            const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            starColors[i * 3] = col.r;
            starColors[i * 3 + 1] = col.g;
            starColors[i * 3 + 2] = col.b;
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMat = new THREE.PointsMaterial({
            size: 2.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.95
        });

        const starfield = new THREE.Points(starGeo, starMat);
        this.scene.add(starfield);
    }

    initCelestialBodies() {
        // Konfigurasi Benda Langit (Skala disesuaikan untuk kenyamanan visual penjelajahan game)
        const planetConfigs = [
            { id: 'sun', name: 'Matahari', radius: 46, dist: 0, speed: 0, rot: 0.002, textureFn: TextureGenerator.createSunTexture, isEmissive: true },
            { id: 'mercury', name: 'Merkurius', radius: 4.2, dist: 160, speed: 0.040, rot: 0.004, textureFn: TextureGenerator.createMercuryTexture },
            { id: 'venus', name: 'Venus', radius: 7.2, dist: 250, speed: 0.026, rot: -0.002, textureFn: TextureGenerator.createVenusTexture },
            { id: 'earth', name: 'Bumi', radius: 8.0, dist: 370, speed: 0.018, rot: 0.015, textureFn: TextureGenerator.createEarthTexture, hasClouds: true, hasMoon: true },
            { id: 'mars', name: 'Mars', radius: 5.4, dist: 510, speed: 0.014, rot: 0.014, textureFn: TextureGenerator.createMarsTexture },
            { id: 'jupiter', name: 'Yupiter', radius: 24.0, dist: 890, speed: 0.008, rot: 0.035, textureFn: TextureGenerator.createJupiterTexture },
            { id: 'saturn', name: 'Saturnus', radius: 19.0, dist: 1280, speed: 0.006, rot: 0.030, textureFn: TextureGenerator.createSaturnTexture, hasRing: true },
            { id: 'uranus', name: 'Uranus', radius: 12.0, dist: 1720, speed: 0.004, rot: -0.020, textureFn: TextureGenerator.createUranusTexture, hasUranusRing: true, tilt: 1.7 },
            { id: 'neptune', name: 'Neptunus', radius: 11.5, dist: 2180, speed: 0.003, rot: 0.022, textureFn: TextureGenerator.createNeptuneTexture }
        ];

        planetConfigs.forEach(cfg => {
            const texture = cfg.textureFn();

            let mesh;
            if (cfg.isEmissive) {
                // Matahari dengan material berpendar cerah
                const sunGeo = new THREE.SphereGeometry(cfg.radius, 48, 48);
                const sunMat = new THREE.MeshBasicMaterial({ map: texture });
                mesh = new THREE.Mesh(sunGeo, sunMat);

                // Efek Halo Korona Luar Matahari
                const glowGeo = new THREE.SphereGeometry(cfg.radius * 1.25, 32, 32);
                const glowMat = new THREE.MeshBasicMaterial({
                    color: 0xff6600,
                    transparent: true,
                    opacity: 0.22,
                    side: THREE.BackSide
                });
                const glow = new THREE.Mesh(glowGeo, glowMat);
                mesh.add(glow);
            } else {
                // Planet standar dengan pantulan cahaya matahari
                const planetGeo = new THREE.SphereGeometry(cfg.radius, 40, 40);
                const planetMat = new THREE.MeshStandardMaterial({
                    map: texture,
                    roughness: 0.75,
                    metalness: 0.1
                });
                mesh = new THREE.Mesh(planetGeo, planetMat);
            }

            // Atur Kemiringan Sumbu
            if (cfg.tilt) {
                mesh.rotation.z = cfg.tilt;
            }

            // Fitur Khusus: Awan & Bulan Bumi
            let cloudsMesh = null;
            let moonMesh = null;
            if (cfg.hasClouds) {
                const cloudGeo = new THREE.SphereGeometry(cfg.radius * 1.025, 36, 36);
                const cloudMat = new THREE.MeshStandardMaterial({
                    map: TextureGenerator.createEarthCloudsTexture(),
                    transparent: true,
                    opacity: 0.75,
                    blending: THREE.AdditiveBlending
                });
                cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
                mesh.add(cloudsMesh);
            }

            if (cfg.hasMoon) {
                const moonGeo = new THREE.SphereGeometry(2.2, 24, 24);
                const moonMat = new THREE.MeshStandardMaterial({
                    map: TextureGenerator.createMoonTexture(),
                    roughness: 0.9,
                    metalness: 0.05
                });
                moonMesh = new THREE.Mesh(moonGeo, moonMat);
                this.scene.add(moonMesh);
            }

            // Fitur Khusus: Cincin Saturnus
            if (cfg.hasRing) {
                const ringGeo = new THREE.RingGeometry(cfg.radius * 1.35, cfg.radius * 2.5, 64);
                // Rotate ring to horizontal plane
                ringGeo.rotateX(Math.PI / 2.3);
                const ringMat = new THREE.MeshStandardMaterial({
                    map: TextureGenerator.createSaturnRingTexture(),
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.88
                });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                mesh.add(ring);
            }

            // Fitur Khusus: Cincin Uranus
            if (cfg.hasUranusRing) {
                const uRingGeo = new THREE.RingGeometry(cfg.radius * 1.3, cfg.radius * 1.7, 48);
                uRingGeo.rotateX(Math.PI / 1.9);
                const uRingMat = new THREE.MeshBasicMaterial({
                    color: 0x94d2bd,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.35
                });
                const uRing = new THREE.Mesh(uRingGeo, uRingMat);
                mesh.add(uRing);
            }

            // Buat Garis Orbit Faint
            if (cfg.dist > 0) {
                const orbitCurve = new THREE.EllipseCurve(0, 0, cfg.dist, cfg.dist, 0, 2 * Math.PI, false, 0);
                const points = orbitCurve.getPoints(120);
                const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
                const orbitMat = new THREE.LineBasicMaterial({
                    color: 0x0284c7,
                    transparent: true,
                    opacity: 0.18
                });
                const orbitLine = new THREE.Line(orbitGeo, orbitMat);
                this.scene.add(orbitLine);
                this.orbitLines.push(orbitLine);
            }

            // Posisi awal acak pada orbit
            const initialAngle = Math.random() * Math.PI * 2;
            const x = Math.cos(initialAngle) * cfg.dist;
            const z = Math.sin(initialAngle) * cfg.dist;
            mesh.position.set(x, 0, z);
            this.scene.add(mesh);

            this.celestialBodies[cfg.id] = {
                ...cfg,
                mesh,
                cloudsMesh,
                moonMesh,
                currentAngle: initialAngle,
                position: mesh.position
            };
        });

        // Simpan referensi bulan sebagai target mandiri
        this.celestialBodies['moon'] = {
            id: 'moon',
            name: 'Bulan',
            radius: 2.2,
            dist: 22,
            position: new THREE.Vector3(),
            mesh: this.celestialBodies['earth'].moonMesh
        };

        // Simpan titik pusat Sabuk Asteroid
        this.celestialBodies['asteroidBelt'] = {
            id: 'asteroidBelt',
            name: 'Sabuk Asteroid',
            radius: 35,
            dist: 680,
            position: new THREE.Vector3(680, 0, 0)
        };
    }

    initAsteroidBelt() {
        // Kumpulan 650 bongkahan asteroid 3D di antara Mars dan Yupiter
        const asteroidGroup = new THREE.Group();
        const asteroidGeo = new THREE.DodecahedronGeometry(1.6, 1);
        const asteroidMat = new THREE.MeshStandardMaterial({
            color: 0x64748b,
            roughness: 0.9,
            metalness: 0.2
        });

        this.asteroids = [];
        const count = 650;
        const innerRadius = 600;
        const outerRadius = 760;

        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(asteroidGeo, asteroidMat);
            const dist = innerRadius + Math.random() * (outerRadius - innerRadius);
            const angle = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 45;

            mesh.position.set(Math.cos(angle) * dist, y, Math.sin(angle) * dist);
            const s = 0.5 + Math.random() * 2.2;
            mesh.scale.set(s, s * (0.7 + Math.random() * 0.6), s);
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

            asteroidGroup.add(mesh);
            this.asteroids.push({
                mesh,
                dist,
                angle,
                speed: 0.009 + (Math.random() - 0.5) * 0.003,
                rotSpeed: (Math.random() - 0.5) * 0.02
            });
        }

        this.scene.add(asteroidGroup);
    }

    initSpaceship() {
        this.spaceship = new Spaceship(this.scene);
    }

    initEventListeners() {
        // Window Resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Kontrol Keyboard
        window.addEventListener('keydown', (e) => {
            // Aktifkan Audio pada interaksi pengguna pertama
            spaceAudio.resume();

            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.inputState.pitchDown = true;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.inputState.pitchUp = true;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.inputState.yawLeft = true;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.inputState.yawRight = true;
                    break;
                case 'KeyQ':
                    this.inputState.rollLeft = true;
                    break;
                case 'KeyE':
                    this.inputState.rollRight = true;
                    break;
                case 'Space':
                    e.preventDefault();
                    this.inputState.throttleUp = true;
                    break;
                case 'ControlLeft':
                case 'KeyX':
                    this.inputState.throttleDown = true;
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    this.inputState.boost = true;
                    break;
                case 'KeyC':
                    const mode = this.spaceship.toggleCamera();
                    this.showNotification(`Kamera: ${mode.toUpperCase()}`);
                    break;
                case 'KeyF':
                    if (this.scanTarget) {
                        this.openScanModal(this.scanTarget);
                    }
                    break;
                case 'KeyH':
                    this.executeWarp();
                    break;
                case 'KeyM':
                    this.toggleModal('mission-modal');
                    break;
                case 'Tab':
                    e.preventDefault();
                    this.cycleTarget();
                    break;
                case 'Escape':
                    this.closeAllModals();
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.inputState.pitchDown = false;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.inputState.pitchUp = false;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.inputState.yawLeft = false;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.inputState.yawRight = false;
                    break;
                case 'KeyQ':
                    this.inputState.rollLeft = false;
                    break;
                case 'KeyE':
                    this.inputState.rollRight = false;
                    break;
                case 'Space':
                    this.inputState.throttleUp = false;
                    break;
                case 'ControlLeft':
                case 'KeyX':
                    this.inputState.throttleDown = false;
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    this.inputState.boost = false;
                    break;
            }
        });
    }

    initUI() {
        // Tombol Scanner di HUD
        const scanActionBtn = document.getElementById('scan-action-btn');
        if (scanActionBtn) {
            scanActionBtn.addEventListener('click', () => {
                if (this.scanTarget) this.openScanModal(this.scanTarget);
            });
        }

        // Tombol Lompat Hiperdrive
        const warpBtn = document.getElementById('warp-btn');
        if (warpBtn) {
            warpBtn.addEventListener('click', () => this.executeWarp());
        }

        // Dropdown Pemilih Target
        const targetSelect = document.getElementById('target-select');
        if (targetSelect) {
            targetSelect.addEventListener('change', (e) => {
                this.selectedTargetKey = e.target.value;
                spaceAudio.playUiClick();
            });
        }

        // Toggle Audio
        const audioBtn = document.getElementById('audio-toggle-btn');
        if (audioBtn) {
            audioBtn.addEventListener('click', () => {
                const muted = spaceAudio.toggleMute();
                audioBtn.textContent = muted ? 'Audio: Mati' : 'Audio: Aktif';
            });
        }

        // Toggle Garis Orbit
        const orbitBtn = document.getElementById('orbit-toggle-btn');
        if (orbitBtn) {
            orbitBtn.addEventListener('click', () => {
                this.showOrbits = !this.showOrbits;
                this.orbitLines.forEach(l => l.visible = this.showOrbits);
                orbitBtn.textContent = this.showOrbits ? 'Orbit: Tampil' : 'Orbit: Sembunyi';
                spaceAudio.playUiClick();
            });
        }

        // Navigasi Modal (Misi & Kuis)
        document.getElementById('btn-open-missions').addEventListener('click', () => {
            this.renderMissionList();
            this.toggleModal('mission-modal');
        });

        document.getElementById('btn-open-quiz').addEventListener('click', () => {
            this.startQuiz();
            this.toggleModal('quiz-modal');
        });

        document.getElementById('btn-open-controls').addEventListener('click', () => {
            this.toggleModal('controls-modal');
        });

        // Tombol Close Modal
        document.querySelectorAll('.close-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });

        this.renderMissionList();
    }

    cycleTarget() {
        const keys = Object.keys(CELESTIAL_DATA);
        const currentIndex = keys.indexOf(this.selectedTargetKey);
        const nextIndex = (currentIndex + 1) % keys.length;
        this.selectedTargetKey = keys[nextIndex];

        const targetSelect = document.getElementById('target-select');
        if (targetSelect) targetSelect.value = this.selectedTargetKey;

        const body = CELESTIAL_DATA[this.selectedTargetKey];
        this.showNotification(`Target Terkunci: ${body.name}`);
        spaceAudio.playUiClick();
    }

    executeWarp() {
        const target = this.celestialBodies[this.selectedTargetKey];
        if (!target) return;

        const success = this.spaceship.startWarp(target.position, target.radius || 20, target.name);
        if (success) {
            this.showNotification(`Melakukan Lompatan Hiperdrive ke ${target.name}...`);
        } else {
            this.showNotification('Energi Hiperdrive Kurang! Tunggu pengisian baterai.');
            spaceAudio.playAlertBeep();
        }
    }

    animate(now) {
        requestAnimationFrame(this.animate);

        const delta = Math.min((now - this.lastTime) * 0.001, 0.1);
        this.lastTime = now;

        // 1. Update Gerak Orbit & Rotasi Planet
        this.updatePlanets(delta);

        // 2. Update Fisika Pesawat
        this.spaceship.update(delta, this.inputState);

        // 3. Update Kamera
        this.spaceship.updateCamera(this.camera);

        // 4. Update Deteksi Jarak & Scanner Proximity
        this.updateProximityAndScanner();

        // 5. Update Elemen HUD
        this.updateHUD();

        // 6. Render Frame
        this.renderer.render(this.scene, this.camera);
    }

    updatePlanets(delta) {
        const scaledDelta = delta * this.simulationSpeed;

        Object.keys(this.celestialBodies).forEach(key => {
            const body = this.celestialBodies[key];
            if (!body.mesh) return;

            // Rotasi poros planet
            if (body.rot) {
                body.mesh.rotation.y += body.rot * scaledDelta;
            }

            // Gerak revolusi orbit mengelilingi matahari
            if (body.dist > 0 && body.speed) {
                body.currentAngle += body.speed * 0.12 * scaledDelta;
                const x = Math.cos(body.currentAngle) * body.dist;
                const z = Math.sin(body.currentAngle) * body.dist;
                body.mesh.position.set(x, 0, z);
            }

            // Rotasi awan atmosfer Bumi
            if (body.cloudsMesh) {
                body.cloudsMesh.rotation.y += 0.008 * scaledDelta;
            }

            // Orbit Bulan mengelilingi Bumi
            if (body.moonMesh && this.celestialBodies['earth']) {
                const earthPos = this.celestialBodies['earth'].mesh.position;
                if (!body.moonAngle) body.moonAngle = 0;
                body.moonAngle += 0.06 * scaledDelta;
                const moonDist = 24;
                const mx = earthPos.x + Math.cos(body.moonAngle) * moonDist;
                const mz = earthPos.z + Math.sin(body.moonAngle) * moonDist;
                body.moonMesh.position.set(mx, 1.2, mz);
                this.celestialBodies['moon'].position.copy(body.moonMesh.position);
            }
        });

        // Gerak orbit Sabuk Asteroid
        if (this.asteroids) {
            this.asteroids.forEach(ast => {
                ast.angle += ast.speed * 0.15 * scaledDelta;
                ast.mesh.position.x = Math.cos(ast.angle) * ast.dist;
                ast.mesh.position.z = Math.sin(ast.angle) * ast.dist;
                ast.mesh.rotation.x += ast.rotSpeed;
                ast.mesh.rotation.y += ast.rotSpeed;
            });
        }
    }

    updateProximityAndScanner() {
        const shipPos = this.spaceship.position;
        let closestBody = null;
        let closestDist = Infinity;

        // Cek jarak ke setiap benda langit
        Object.keys(this.celestialBodies).forEach(key => {
            const body = this.celestialBodies[key];
            const dist = shipPos.distanceTo(body.position);
            if (dist < closestDist) {
                closestDist = dist;
                closestBody = body;
            }
        });

        // Peringatan Bahaya Radiasi Matahari
        const sunDist = shipPos.distanceTo(this.celestialBodies['sun'].position);
        const dangerAlert = document.getElementById('radiation-alert');
        if (sunDist < 120) {
            if (dangerAlert) dangerAlert.classList.remove('hidden');
            this.spaceship.hullIntegrity = Math.max(0, this.spaceship.hullIntegrity - 0.08);
        } else {
            if (dangerAlert) dangerAlert.classList.add('hidden');
        }

        // Tentukan Jangkauan Pemindaian
        const scanBanner = document.getElementById('scan-banner');
        const scanTargetName = document.getElementById('scan-target-name');

        const scanThreshold = closestBody ? Math.max((closestBody.radius || 20) * 4.5, 120) : 100;

        if (closestBody && closestDist <= scanThreshold) {
            this.scanTarget = closestBody.id;
            if (scanBanner) {
                scanBanner.classList.remove('hidden');
                scanTargetName.textContent = closestBody.name;
            }
        } else {
            this.scanTarget = null;
            if (scanBanner) scanBanner.classList.add('hidden');
        }
    }

    updateHUD() {
        // Kecepatan & Throttle
        const speedValue = document.getElementById('hud-speed');
        const throttleBar = document.getElementById('hud-throttle-bar');
        const warpBar = document.getElementById('hud-warp-bar');
        const targetDistEl = document.getElementById('hud-target-distance');
        const targetNameEl = document.getElementById('hud-target-name');

        if (speedValue) {
            const displaySpeed = Math.round(this.spaceship.speed * 85);
            speedValue.textContent = `${displaySpeed} km/detik`;
        }

        if (throttleBar) {
            throttleBar.style.width = `${Math.round(this.spaceship.throttle * 100)}%`;
        }

        if (warpBar) {
            warpBar.style.width = `${Math.round(this.spaceship.warpEnergy)}%`;
        }

        // Jarak Target Terpilih
        const selectedTarget = this.celestialBodies[this.selectedTargetKey];
        if (selectedTarget && targetDistEl && targetNameEl) {
            const distUnits = this.spaceship.position.distanceTo(selectedTarget.position);
            const km = Math.round(distUnits * 350000);
            targetNameEl.textContent = selectedTarget.name;
            targetDistEl.textContent = `${km.toLocaleString('id-ID')} km`;
        }

        // Update Kompas / Radar Sederhana
        this.updateRadar();
    }

    updateRadar() {
        const radarCanvas = document.getElementById('radar-canvas');
        if (!radarCanvas) return;
        const ctx = radarCanvas.getContext('2d');
        const w = radarCanvas.width;
        const h = radarCanvas.height;
        const cx = w / 2;
        const cy = h / 2;

        ctx.clearRect(0, 0, w, h);

        // Lingkaran Radar
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, cx - 4, 0, Math.PI * 2);
        ctx.arc(cx, cy, cx / 2, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshair
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, h);
        ctx.moveTo(0, cy);
        ctx.lineTo(w, cy);
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.2)';
        ctx.stroke();

        // Pesawat di pusat (titik cyan)
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();

        // Arah hadap pesawat
        const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.spaceship.group.quaternion);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + fwd.x * 12, cy + fwd.z * 12);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Render Titik Planet pada Radar
        const scale = 0.038;
        const shipPos = this.spaceship.position;

        Object.keys(this.celestialBodies).forEach(k => {
            const body = this.celestialBodies[k];
            const dx = (body.position.x - shipPos.x) * scale;
            const dz = (body.position.z - shipPos.z) * scale;

            const rx = cx + dx;
            const ry = cy + dz;

            if (rx >= 4 && rx <= w - 4 && ry >= 4 && ry <= h - 4) {
                ctx.beginPath();
                ctx.arc(rx, ry, k === 'sun' ? 4 : (k === this.selectedTargetKey ? 3.5 : 2), 0, Math.PI * 2);
                ctx.fillStyle = k === 'sun' ? '#f59e0b' : (k === this.selectedTargetKey ? '#ef4444' : '#94a3b8');
                ctx.fill();
            }
        });
    }

    openScanModal(targetId) {
        const data = CELESTIAL_DATA[targetId];
        if (!data) return;

        spaceAudio.playScannerChirp();

        document.getElementById('scan-modal-title').textContent = data.name;
        document.getElementById('scan-modal-type').textContent = data.type;
        document.getElementById('scan-modal-desc').textContent = data.description;

        const specsContainer = document.getElementById('scan-modal-specs');
        specsContainer.innerHTML = '';

        const specItems = [
            { label: 'Diameter', val: data.diameter },
            { label: 'Massa', val: data.mass },
            { label: 'Gravitasi', val: data.gravity },
            { label: 'Suhu Permukaan', val: data.surfaceTemp },
            { label: 'Periode Rotasi', val: data.rotationPeriod },
            { label: 'Periode Orbit', val: data.orbitalPeriod || '-' },
            { label: 'Jarak dari Matahari', val: data.distanceFromSun || '-' },
            { label: 'Jumlah Satelit Alami', val: data.moons !== undefined ? data.moons : '-' },
            { label: 'Atmosfer', val: data.atmosphere || data.composition || '-' }
        ];

        specItems.forEach(item => {
            const row = document.createElement('div');
            row.className = 'spec-row';
            row.innerHTML = `<span class="spec-label">${item.label}:</span> <span class="spec-val">${item.val}</span>`;
            specsContainer.appendChild(row);
        });

        // Fakta Ilmiah Penting
        const factsList = document.getElementById('scan-modal-facts');
        factsList.innerHTML = '';
        if (data.facts) {
            data.facts.forEach(f => {
                const li = document.createElement('li');
                li.textContent = f;
                factsList.appendChild(li);
            });
        }

        // Periksa apakah ini menyelesaikan misi aktif
        this.checkMissionProgress(targetId);

        this.toggleModal('scan-modal');
    }

    checkMissionProgress(targetId) {
        EXPLORATION_MISSIONS.forEach(mission => {
            if (mission.target === targetId && !mission.completed) {
                mission.completed = true;
                this.showNotification(`Misi Selesai: ${mission.title}! Penghargaan: ${mission.reward}`);
                this.renderMissionList();
            }
        });
    }

    renderMissionList() {
        const container = document.getElementById('mission-list-container');
        if (!container) return;
        container.innerHTML = '';

        let completedCount = 0;

        EXPLORATION_MISSIONS.forEach((m, idx) => {
            if (m.completed) completedCount++;

            const card = document.createElement('div');
            card.className = `mission-card ${m.completed ? 'completed' : ''}`;
            card.innerHTML = `
                <div class="mission-header">
                    <span class="mission-badge">Misi ${m.id}</span>
                    <span class="mission-status">${m.completed ? '[Selesai]' : '[Tertunda]'}</span>
                </div>
                <h4 class="mission-title">${m.title}</h4>
                <p class="mission-obj">${m.objective}</p>
                <div class="mission-footer">
                    <span class="mission-reward">Imbalan: ${m.reward}</span>
                    ${!m.completed ? `<button class="btn-track-mission" data-target="${m.target}">Lacak Target</button>` : ''}
                </div>
            `;

            container.appendChild(card);
        });

        // Event listener lacak target misi
        container.querySelectorAll('.btn-track-mission').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.getAttribute('data-target');
                this.selectedTargetKey = target;
                const targetSelect = document.getElementById('target-select');
                if (targetSelect) targetSelect.value = target;
                this.closeAllModals();
                this.showNotification(`Target Navigasi Diarahkan ke: ${CELESTIAL_DATA[target].name}`);
                spaceAudio.playUiClick();
            });
        });

        // Update progress counter
        const counterEl = document.getElementById('mission-counter');
        if (counterEl) {
            counterEl.textContent = `${completedCount} / ${EXPLORATION_MISSIONS.length} Selesai`;
        }
    }

    startQuiz() {
        this.quizCurrentIndex = 0;
        this.quizScore = 0;
        this.renderQuizQuestion();
    }

    renderQuizQuestion() {
        const qContainer = document.getElementById('quiz-question-container');
        const qData = ASTRONOMY_QUIZ[this.quizCurrentIndex];

        if (!qData) {
            // Selesai kuis
            this.showQuizResult();
            return;
        }

        document.getElementById('quiz-progress').textContent = `Pertanyaan ${this.quizCurrentIndex + 1} dari ${ASTRONOMY_QUIZ.length}`;

        qContainer.innerHTML = `
            <h3 class="quiz-q">${qData.question}</h3>
            <div class="quiz-options">
                ${qData.options.map((opt, i) => `
                    <button class="quiz-opt-btn" data-index="${i}">${opt}</button>
                `).join('')}
            </div>
            <div id="quiz-feedback" class="quiz-feedback hidden"></div>
            <button id="quiz-next-btn" class="quiz-next-btn hidden">Pertanyaan Selanjutnya</button>
        `;

        const optButtons = qContainer.querySelectorAll('.quiz-opt-btn');
        const feedbackEl = document.getElementById('quiz-feedback');
        const nextBtn = document.getElementById('quiz-next-btn');

        optButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedIdx = parseInt(e.target.getAttribute('data-index'));
                optButtons.forEach(b => b.disabled = true);

                if (selectedIdx === qData.correct) {
                    this.quizScore++;
                    btn.classList.add('correct');
                    feedbackEl.className = 'quiz-feedback success';
                    feedbackEl.textContent = `Tepat sekali! ${qData.explanation}`;
                    spaceAudio.playScannerChirp();
                } else {
                    btn.classList.add('wrong');
                    optButtons[qData.correct].classList.add('correct');
                    feedbackEl.className = 'quiz-feedback error';
                    feedbackEl.textContent = `Kurang tepat. ${qData.explanation}`;
                    spaceAudio.playAlertBeep();
                }

                feedbackEl.classList.remove('hidden');
                nextBtn.classList.remove('hidden');
            });
        });

        nextBtn.addEventListener('click', () => {
            this.quizCurrentIndex++;
            this.renderQuizQuestion();
        });
    }

    showQuizResult() {
        const qContainer = document.getElementById('quiz-question-container');
        const total = ASTRONOMY_QUIZ.length;
        const percentage = Math.round((this.quizScore / total) * 100);

        let rank = 'Kadet Astronomi Pemula';
        if (percentage >= 85) rank = 'Perwira Ahli Astrofisika Galaksi';
        else if (percentage >= 60) rank = 'Penjelajah Antariksa Terampil';

        qContainer.innerHTML = `
            <div class="quiz-result-card">
                <h3>Hasil Evaluasi Pengetahuan Tata Surya</h3>
                <div class="score-display">${this.quizScore} / ${total}</div>
                <div class="score-pct">${percentage}% Jawaban Benar</div>
                <div class="rank-badge">Gelar: ${rank}</div>
                <p>Terima kasih telah mempelajari sains dan astronomi Tata Surya bersama wahana penjelajah ini!</p>
                <button id="quiz-retry-btn" class="btn-primary" style="margin-top: 18px;">Ulangi Kuis</button>
            </div>
        `;

        document.getElementById('quiz-retry-btn').addEventListener('click', () => {
            this.startQuiz();
        });
    }

    showNotification(msg) {
        const notif = document.getElementById('notification-toast');
        if (!notif) return;
        notif.textContent = msg;
        notif.classList.remove('hidden');

        if (this.notifTimeout) clearTimeout(this.notifTimeout);
        this.notifTimeout = setTimeout(() => {
            notif.classList.add('hidden');
        }, 3200);
    }

    toggleModal(modalId) {
        this.closeAllModals();
        const m = document.getElementById(modalId);
        if (m) m.classList.remove('hidden');
        spaceAudio.playUiClick();
    }

    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
    }
}

// Inisialisasi Game saat DOM siap
window.addEventListener('DOMContentLoaded', () => {
    window.game = new SolarSystemGame();
});
