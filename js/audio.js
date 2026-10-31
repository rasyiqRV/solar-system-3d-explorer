// Audio Synthesizer Berbasis Web Audio API (Tanpa Dependensi File Eksternal)
class SpaceAudioSystem {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.engineGain = null;
        this.engineOsc = null;
        this.engineNoiseNode = null;
        this.ambientGain = null;
        this.ambientOsc1 = null;
        this.ambientOsc2 = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();

            // Setup Engine Loop
            this.engineGain = this.ctx.createGain();
            this.engineGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

            this.engineOsc = this.ctx.createOscillator();
            this.engineOsc.type = 'sawtooth';
            this.engineOsc.frequency.setValueAtTime(65, this.ctx.currentTime);

            // Filter frekuensi rendah untuk suara mesin jet plasma
            const engineFilter = this.ctx.createBiquadFilter();
            engineFilter.type = 'lowpass';
            engineFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

            this.engineOsc.connect(engineFilter);
            engineFilter.connect(this.engineGain);
            this.engineGain.connect(this.ctx.destination);
            this.engineOsc.start();

            // Setup Ambient Space Drone
            this.ambientGain = this.ctx.createGain();
            this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

            this.ambientOsc1 = this.ctx.createOscillator();
            this.ambientOsc1.type = 'sine';
            this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

            this.ambientOsc2 = this.ctx.createOscillator();
            this.ambientOsc2.type = 'triangle';
            this.ambientOsc2.frequency.setValueAtTime(82.5, this.ctx.currentTime);

            const ambientFilter = this.ctx.createBiquadFilter();
            ambientFilter.type = 'lowpass';
            ambientFilter.frequency.setValueAtTime(200, this.ctx.currentTime);

            this.ambientOsc1.connect(ambientFilter);
            this.ambientOsc2.connect(ambientFilter);
            ambientFilter.connect(this.ambientGain);
            this.ambientGain.connect(this.ctx.destination);

            this.ambientOsc1.start();
            this.ambientOsc2.start();

            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API belum dapat diinisialisasi:', e);
        }
    }

    resume() {
        if (!this.initialized) {
            this.init();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    updateEngineSound(throttle, isBoosting) {
        if (!this.initialized || this.isMuted) return;

        const targetFreq = 50 + throttle * 70 + (isBoosting ? 60 : 0);
        const targetVol = Math.min(0.22, throttle * 0.12 + (isBoosting ? 0.10 : 0.01));

        this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);
        this.engineGain.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.08);
    }

    playScannerChirp() {
        if (!this.initialized || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
        osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.2); // D6

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
    }

    playWarpSound() {
        if (!this.initialized || this.isMuted) return;
        const now = this.ctx.currentTime;

        // Suara ramp frekuensi sci-fi hyperdrive
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 1.2);
        osc.frequency.exponentialRampToValueAtTime(220, now + 2.0);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(2400, now + 1.2);
        filter.Q.value = 4;

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.2);
    }

    playAlertBeep() {
        if (!this.initialized || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(440, now + 0.08);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
    }

    playUiClick() {
        if (!this.initialized || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.initialized) {
            if (this.isMuted) {
                this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);
                this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
            } else {
                this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
            }
        }
        return this.isMuted;
    }
}

const spaceAudio = new SpaceAudioSystem();
