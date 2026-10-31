// Model Pesawat Antariksa, Partikel Pendorong Plasma, dan Fisika Penerbangan

class Spaceship {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();

        // Parameter Fisika Penerbangan
        this.position = new THREE.Vector3(0, 50, 480);
        this.velocity = new THREE.Vector3();
        this.rotationVelocity = new THREE.Vector3(); // Pitch, Yaw, Roll rates
        this.speed = 0;
        this.maxNormalSpeed = 120;
        this.maxBoostSpeed = 320;
        this.acceleration = 70;
        this.drag = 0.985;
        this.angularDrag = 0.92;

        // Kontrol & State
        this.throttle = 0;
        this.isBoosting = false;
        this.isWarping = false;
        this.warpTarget = null;
        this.warpProgress = 0;
        this.warpEnergy = 100;
        this.hullIntegrity = 100;
        this.cameraMode = 'thirdPerson'; // 'thirdPerson', 'cockpit', 'cinematic'

        // Buat Mesh 3D Pesawat
        this.createMesh();

        // Buat Partikel Pendorong
        this.createThrusters();

        this.scene.add(this.group);
        this.group.position.copy(this.position);
    }

    createMesh() {
        const shipRoot = new THREE.Group();

        // Material Badan Pesawat (Sci-Fi Titanium Matte)
        const hullMaterial = new THREE.MeshStandardMaterial({
            color: 0x1f2937,
            roughness: 0.35,
            metalness: 0.85
        });

        const accentMaterial = new THREE.MeshStandardMaterial({
            color: 0x0284c7, // Cyan logam
            roughness: 0.2,
            metalness: 0.9
        });

        const canopyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.75,
            roughness: 0.1,
            metalness: 0.9,
            transmission: 0.8,
            reflectivity: 0.9
        });

        // 1. Badan Utama (Fuselage Aerodinamis Antariksa)
        const bodyGeo = new THREE.ConeGeometry(2.4, 11, 6);
        bodyGeo.rotateX(Math.PI / 2);
        bodyGeo.scale(1.2, 0.65, 1.0);
        const body = new THREE.Mesh(bodyGeo, hullMaterial);
        body.position.z = -1;
        shipRoot.add(body);

        // 2. Kanopi Kokpit Kaca
        const cockpitGeo = new THREE.SphereGeometry(1.3, 16, 16);
        cockpitGeo.scale(0.8, 0.6, 2.2);
        const cockpit = new THREE.Mesh(cockpitGeo, canopyMaterial);
        cockpit.position.set(0, 0.7, -0.6);
        shipRoot.add(cockpit);

        // 3. Sayap Kiri dan Kanan (Delta Wings)
        const wingShape = new THREE.Shape();
        wingShape.moveTo(0, 0);
        wingShape.lineTo(-5.5, -2.5);
        wingShape.lineTo(-5.5, -4.5);
        wingShape.lineTo(0, -3.2);
        wingShape.closePath();

        const extrudeSettings = { depth: 0.22, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.08, bevelThickness: 0.08 };
        const leftWingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
        leftWingGeo.rotateX(Math.PI / 2);
        const leftWing = new THREE.Mesh(leftWingGeo, accentMaterial);
        leftWing.position.set(-0.8, 0.05, 2.8);
        shipRoot.add(leftWing);

        // Sayap Kanan (Mirror)
        const rightWingGeo = leftWingGeo.clone();
        rightWingGeo.scale(-1, 1, 1);
        const rightWing = new THREE.Mesh(rightWingGeo, accentMaterial);
        rightWing.position.set(0.8, 0.05, 2.8);
        shipRoot.add(rightWing);

        // 4. Sirip Penstabil Vertikal Kembar
        const finGeo = new THREE.BoxGeometry(0.18, 1.6, 2.6);
        const leftFin = new THREE.Mesh(finGeo, hullMaterial);
        leftFin.position.set(-1.8, 0.9, 2.6);
        leftFin.rotation.z = -0.22;
        shipRoot.add(leftFin);

        const rightFin = new THREE.Mesh(finGeo, hullMaterial);
        rightFin.position.set(1.8, 0.9, 2.6);
        rightFin.rotation.z = 0.22;
        shipRoot.add(rightFin);

        // 5. Dua Nozel Mesin Plasma Belakang
        const nozzleGeo = new THREE.CylinderGeometry(0.65, 0.85, 2.2, 16);
        nozzleGeo.rotateX(Math.PI / 2);
        const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.95, roughness: 0.2 });

        const leftNozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
        leftNozzle.position.set(-1.25, -0.1, 4.0);
        shipRoot.add(leftNozzle);

        const rightNozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
        rightNozzle.position.set(1.25, -0.1, 4.0);
        shipRoot.add(rightNozzle);

        // 6. Lampu Indikator Navigasi Wingtip
        const beaconGeo = new THREE.SphereGeometry(0.14, 8, 8);
        const redBeaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const greenBeaconMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });

        const leftBeacon = new THREE.Mesh(beaconGeo, redBeaconMat);
        leftBeacon.position.set(-6.3, 0.1, 0.3);
        shipRoot.add(leftBeacon);

        const rightBeacon = new THREE.Mesh(beaconGeo, greenBeaconMat);
        rightBeacon.position.set(6.3, 0.1, 0.3);
        shipRoot.add(rightBeacon);

        this.shipMesh = shipRoot;
        this.group.add(shipRoot);
    }

    createThrusters() {
        // Partikel lidah api plasma mesin ganda
        const flameGeo = new THREE.ConeGeometry(0.55, 3.5, 12);
        flameGeo.rotateX(-Math.PI / 2);
        flameGeo.translate(0, 0, 1.75);

        this.thrusterMat = new THREE.MeshBasicMaterial({
            color: 0x00d2ff,
            transparent: true,
            opacity: 0.85
        });

        this.leftFlame = new THREE.Mesh(flameGeo, this.thrusterMat);
        this.leftFlame.position.set(-1.25, -0.1, 4.8);
        this.group.add(this.leftFlame);

        this.rightFlame = new THREE.Mesh(flameGeo, this.thrusterMat);
        this.rightFlame.position.set(1.25, -0.1, 4.8);
        this.group.add(this.rightFlame);

        // Garis-garis efek warp (hyperdrive streak lines)
        const warpLineGeo = new THREE.BufferGeometry();
        const lineCount = 180;
        const positions = new Float32Array(lineCount * 6);

        for (let i = 0; i < lineCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 6 + Math.random() * 45;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            const zStart = (Math.random() - 0.5) * 160;
            const zEnd = zStart - (40 + Math.random() * 80);

            positions[i * 6] = x;
            positions[i * 6 + 1] = y;
            positions[i * 6 + 2] = zStart;

            positions[i * 6 + 3] = x;
            positions[i * 6 + 4] = y;
            positions[i * 6 + 5] = zEnd;
        }

        warpLineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.warpLinesMat = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.0,
            linewidth: 2
        });

        this.warpStreakLines = new THREE.LineSegments(warpLineGeo, this.warpLinesMat);
        this.group.add(this.warpStreakLines);
    }

    update(delta, inputState) {
        if (this.isWarping) {
            this.handleWarpNavigation(delta);
            return;
        }

        // 1. Tangani Rotasi (Pitch, Yaw, Roll)
        const pitchSpeed = 1.6;
        const yawSpeed = 1.3;
        const rollSpeed = 2.0;

        if (inputState.pitchUp) this.rotationVelocity.x += pitchSpeed * delta;
        if (inputState.pitchDown) this.rotationVelocity.x -= pitchSpeed * delta;
        if (inputState.yawLeft) this.rotationVelocity.y += yawSpeed * delta;
        if (inputState.yawRight) this.rotationVelocity.y -= yawSpeed * delta;
        if (inputState.rollLeft) this.rotationVelocity.z += rollSpeed * delta;
        if (inputState.rollRight) this.rotationVelocity.z -= rollSpeed * delta;

        // Auto-roll miring saat belok yaw untuk estetika penerbangan antariksa
        if (inputState.yawLeft) this.rotationVelocity.z += rollSpeed * 0.45 * delta;
        if (inputState.yawRight) this.rotationVelocity.z -= rollSpeed * 0.45 * delta;

        // Terapkan rotasi lokal ke pesawat
        this.group.rotateX(this.rotationVelocity.x * delta);
        this.group.rotateY(this.rotationVelocity.y * delta);
        this.group.rotateZ(this.rotationVelocity.z * delta);

        // Damping rotasi
        this.rotationVelocity.multiplyScalar(this.angularDrag);

        // 2. Tangani Akselerasi dan Throttle
        this.isBoosting = inputState.boost && this.throttle > 0.1 && this.warpEnergy > 10;

        if (this.isBoosting) {
            this.warpEnergy = Math.max(0, this.warpEnergy - 25 * delta);
        } else {
            this.warpEnergy = Math.min(100, this.warpEnergy + 8 * delta);
        }

        if (inputState.throttleUp) {
            this.throttle = Math.min(1.0, this.throttle + 1.2 * delta);
        } else if (inputState.throttleDown) {
            this.throttle = Math.max(0.0, this.throttle - 1.5 * delta);
        }

        const currentMaxSpeed = this.isBoosting ? this.maxBoostSpeed : this.maxNormalSpeed;
        const targetSpeed = this.throttle * currentMaxSpeed;

        if (this.speed < targetSpeed) {
            this.speed = Math.min(targetSpeed, this.speed + this.acceleration * (this.isBoosting ? 2.5 : 1.0) * delta);
        } else {
            this.speed = Math.max(targetSpeed, this.speed - this.acceleration * 1.5 * delta);
        }

        // Terapkan kecepatan ke arah hadap depan pesawat (sumbu -Z lokal)
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.group.quaternion);
        this.velocity.copy(forward).multiplyScalar(this.speed);

        this.position.addScaledVector(this.velocity, delta);
        this.group.position.copy(this.position);

        // 3. Update Visual Lidah Api Mesin
        const flameScaleZ = (0.2 + this.throttle * (this.isBoosting ? 2.8 : 1.2)) * (0.85 + Math.random() * 0.3);
        const flameScaleXY = 0.6 + this.throttle * (this.isBoosting ? 1.5 : 0.8);

        this.leftFlame.scale.set(flameScaleXY, flameScaleXY, flameScaleZ);
        this.rightFlame.scale.set(flameScaleXY, flameScaleXY, flameScaleZ);

        if (this.isBoosting) {
            this.thrusterMat.color.setHex(0xf97316); // Api oranye terang saat boost
        } else {
            this.thrusterMat.color.setHex(0x00d2ff); // Plasma cyan saat cruise
        }

        // Update audio mesin
        spaceAudio.updateEngineSound(this.throttle, this.isBoosting);
    }

    startWarp(targetPosition, targetRadius, targetName) {
        if (this.isWarping || this.warpEnergy < 30) return false;

        this.isWarping = true;
        this.warpEnergy = Math.max(0, this.warpEnergy - 35);
        this.warpTargetName = targetName;

        // Titik henti aman: di depan planet sejauh jarak aman
        const dir = new THREE.Vector3().subVectors(this.position, targetPosition).normalize();
        const safeDistance = Math.max(targetRadius * 3.5, 90);
        this.warpDestination = new THREE.Vector3().copy(targetPosition).addScaledVector(dir, safeDistance);
        this.warpStartPosition = this.position.clone();
        this.warpProgress = 0;

        spaceAudio.playWarpSound();
        return true;
    }

    handleWarpNavigation(delta) {
        this.warpProgress += delta * 0.45; // Selesai sekitar 2,2 detik

        // Efek garis-garis warp terlihat
        const streakAlpha = Math.sin(Math.min(1, this.warpProgress) * Math.PI);
        this.warpLinesMat.opacity = streakAlpha * 0.9;

        // Hadapkan pesawat ke tujuan
        this.group.lookAt(this.warpDestination);

        // Interpolasi posisi (Smoothstep / Cubic)
        const t = Math.min(1.0, this.warpProgress);
        const smoothT = t * t * (3 - 2 * t);
        this.position.lerpVectors(this.warpStartPosition, this.warpDestination, smoothT);
        this.group.position.copy(this.position);

        if (this.warpProgress >= 1.0) {
            this.isWarping = false;
            this.warpLinesMat.opacity = 0.0;
            this.throttle = 0.2;
            this.speed = 25;
            spaceAudio.playScannerChirp();
        }
    }

    updateCamera(camera) {
        if (this.cameraMode === 'thirdPerson') {
            // Kamera mengekor di belakang atas pesawat
            const offset = new THREE.Vector3(0, 4.5, 18).applyQuaternion(this.group.quaternion);
            const targetCamPos = this.position.clone().add(offset);
            camera.position.lerp(targetCamPos, 0.12);

            const lookTarget = this.position.clone().add(new THREE.Vector3(0, 1.2, -25).applyQuaternion(this.group.quaternion));
            camera.lookAt(lookTarget);
        } else if (this.cameraMode === 'cockpit') {
            // Kamera di dalam kanopi kokpit
            const cockpitOffset = new THREE.Vector3(0, 0.75, -0.6).applyQuaternion(this.group.quaternion);
            camera.position.copy(this.position).add(cockpitOffset);

            const forward = new THREE.Vector3(0, 0.2, -100).applyQuaternion(this.group.quaternion);
            camera.lookAt(this.position.clone().add(forward));
        } else if (this.cameraMode === 'cinematic') {
            // Kamera orbital mengelilingi pesawat
            const time = performance.now() * 0.0003;
            const dist = 24;
            camera.position.set(
                this.position.x + Math.sin(time) * dist,
                this.position.y + 6,
                this.position.z + Math.cos(time) * dist
            );
            camera.lookAt(this.position);
        }
    }

    toggleCamera() {
        if (this.cameraMode === 'thirdPerson') {
            this.cameraMode = 'cockpit';
        } else if (this.cameraMode === 'cockpit') {
            this.cameraMode = 'cinematic';
        } else {
            this.cameraMode = 'thirdPerson';
        }
        return this.cameraMode;
    }
}
