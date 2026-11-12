/**
 * Web Audio API Sound Engine
 * Synthesizes music loops, authentic piano notes, UI sound effects,
 * and street festival ambience without requiring external server dependencies.
 */

class FestivalAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;
    this.currentLoop = null;
    this.currentLoopId = null;
    this.isAmbiencePlaying = false;
    this.ambienceNode = null;
    this.analyser = null;
    this.visualizerCanvas = null;
    this.visualizerAnimId = null;
    this.pianoFrequencies = {
      'C4': 261.63,
      'D4': 293.66,
      'E4': 329.63,
      'F4': 349.23,
      'G4': 392.00,
      'A4': 440.00,
      'B4': 493.88,
      'C5': 523.25
    };
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    // SFX Gain
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    // Music Gain
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);

    // Visualizer Analyser
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.startVisualizer();
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  setVolume(val) {
    this.ensureContext();
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(parseFloat(val), this.ctx.currentTime);
    }
  }

  // --- Sound Effects (SFX) ---
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playChime() {
    if (this.isMuted) return;
    this.ensureContext();
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + (i * 0.07);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(time);
      osc.stop(time + 0.45);
    });
  }

  playFanfare() {
    if (this.isMuted) return;
    this.ensureContext();
    const notes = [
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.15 },
      { f: 1046.50, d: 0.45 }
    ];
    let time = this.ctx.currentTime;
    notes.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.f, time);

      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(time);
      osc.stop(time + note.d + 0.05);
      time += note.d + 0.04;
    });
  }

  playWrongBuzz() {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.25);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // --- Interactive Piano Synth ---
  playPianoNote(noteName) {
    this.ensureContext();
    const freq = this.pianoFrequencies[noteName] || 440;
    const now = this.ctx.currentTime;

    // Dual oscillator for rich natural piano / acoustic harmonics
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // 1st harmonic overtone

    // Lowpass filter simulates the felt hammer hitting a piano string
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.8);

    // Natural piano ADSR envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.25);
    osc2.stop(now + 1.25);
  }

  // --- Music Loops Generator ---
  stopLoop() {
    if (this.currentLoop) {
      clearInterval(this.currentLoop);
      this.currentLoop = null;
    }
    this.currentLoopId = null;
  }

  playMusicStyle(styleId) {
    this.ensureContext();
    this.stopLoop();
    this.currentLoopId = styleId;

    switch (styleId) {
      case 'soothingpiano':
      case 'pachelbel':
        this.startPachelbelCanon();
        break;
      case 'accordion':
        this.startAccordionWaltz();
        break;
      case 'frenchtouch':
        this.startFrenchTouchElectro();
        break;
      case 'jazz':
        this.startSaintGermainJazz();
        break;
      case 'fanfare':
        this.startStreetFanfare();
        break;
      default:
        break;
    }
  }

  // Original synthesized piano arrangement of Pachelbel's public-domain Canon in D.
  startPachelbelCanon() {
    const progression = [
      [146.83, 220.00, 293.66, 369.99], [110.00, 164.81, 220.00, 293.66],
      [123.47, 185.00, 246.94, 311.13], [92.50, 138.59, 185.00, 220.00],
      [98.00, 146.83, 196.00, 246.94], [146.83, 220.00, 293.66, 369.99],
      [98.00, 146.83, 196.00, 246.94], [110.00, 164.81, 220.00, 293.66]
    ];
    const melody = [587.33,554.37,587.33,493.88,523.25,493.88,440.00,493.88,440.00,392.00,440.00,369.99,392.00,369.99,329.63,369.99];
    let step = 0;
    const playFrequency = (frequency, duration=1.05, volume=0.14) => {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator(), overtone = this.ctx.createOscillator();
      const gain = this.ctx.createGain(), filter = this.ctx.createBiquadFilter();
      osc.type = 'triangle'; osc.frequency.setValueAtTime(frequency, now);
      overtone.type = 'sine'; overtone.frequency.setValueAtTime(frequency * 2, now);
      filter.type = 'lowpass'; filter.frequency.setValueAtTime(2100, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(filter); overtone.connect(filter); filter.connect(gain); gain.connect(this.musicGain);
      osc.start(now); overtone.start(now);
      osc.stop(now + duration + 0.03); overtone.stop(now + duration + 0.03);
    };
    const tick = () => {
      const bar = Math.floor(step / 4) % progression.length, beat = step % 4;
      const chord = progression[bar];
      playFrequency(chord[beat], 1.2, 0.10);
      if (beat === 0) playFrequency(chord[0] / 2, 1.6, 0.11);
      if (step % 2 === 0) playFrequency(melody[(Math.floor(step / 2)) % melody.length], 1.05, 0.08);
      step++;
    };
    tick();
    this.currentLoop = setInterval(tick, 430);
  }

  // 0. Piano Apaisant & Doux (Soothing Parisian Twilight Piano Arpeggios)
  startSoothingPiano() {
    let step = 0;
    const tempo = 270; // Relaxed gentle arpeggio pace in ms

    // 4 Bars of Paris Twilight Harmony: Am9 -> Fmaj7 -> Cmaj9 -> Em7
    const chords = [
      {
        bass: 110, // A2
        arpeggios: [261.63, 329.63, 440.00, 523.25, 493.88, 329.63] // C4, E4, A4, C5, B4, E4
      },
      {
        bass: 87.31, // F2
        arpeggios: [261.63, 329.63, 440.00, 659.25, 523.25, 440.00] // C4, E4, A4, E5, C5, A4
      },
      {
        bass: 65.41, // C2
        arpeggios: [196.00, 261.63, 329.63, 587.33, 493.88, 329.63] // G3, C4, E4, D5, B4, E4
      },
      {
        bass: 82.41, // E2
        arpeggios: [196.00, 246.94, 329.63, 493.88, 392.00, 246.94] // G3, B3, E4, B4, G4, B3
      }
    ];

    const playPianoStep = () => {
      if (this.isMuted) return;
      const now = this.ctx.currentTime;
      const barIndex = Math.floor((step / 6) % chords.length);
      const noteInBar = step % 6;
      const currentBar = chords[barIndex];

      // Play deep warm bass note on beat 1 of each bar
      if (noteInBar === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassFilter = this.ctx.createBiquadFilter();
        const bassGain = this.ctx.createGain();

        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(currentBar.bass, now);

        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(600, now);

        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.linearRampToValueAtTime(0.38, now + 0.04);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(this.musicGain);

        bassOsc.start(now);
        bassOsc.stop(now + 1.85);
      }

      // Play gentle soothing treble arpeggio note
      const noteFreq = currentBar.arpeggios[noteInBar];
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(noteFreq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(noteFreq * 2, now); // Gentle warm overtone

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.8);

      // Delicate felt hammer envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.15);
      osc2.stop(now + 1.15);

      step++;
    };

    playPianoStep();
    this.currentLoop = setInterval(playPianoStep, tempo);
  }

  // 1. Valse Accordéon Parisienne (Montmartre 3/4 Waltz)
  startAccordionWaltz() {
    let step = 0;
    const tempo = 220; // 3/4 time step in ms
    // Chord progression in A minor & D minor
    const progression = [
      { bass: 220, chord: [261.63, 329.63, 440] },      // Am
      { bass: 220, chord: [261.63, 329.63, 440] },
      { bass: 146.83, chord: [293.66, 349.23, 440] },   // Dm
      { bass: 196.00, chord: [246.94, 293.66, 392] },   // G
      { bass: 164.81, chord: [261.63, 329.63, 392] },   // C
      { bass: 164.81, chord: [246.94, 329.63, 415.30] } // E7
    ];
    let progIndex = 0;

    const playWaltzStep = () => {
      if (this.isMuted) return;
      const beat = step % 3;
      const current = progression[progIndex];
      const now = this.ctx.currentTime;

      if (beat === 0) {
        // Bass note (Beat 1 - "Boum")
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(current.bass, now);
        bassGain.gain.setValueAtTime(0.35, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        bassOsc.connect(bassGain);
        bassGain.connect(this.musicGain);
        bassOsc.start(now);
        bassOsc.stop(now + 0.4);
      } else {
        // Accordion chord stabs (Beats 2 and 3 - "Tchack-Tchack")
        current.chord.forEach((freq) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);

          // Accordion vibrato/tremolo effect
          gain.gain.setValueAtTime(0.09, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

          osc.connect(gain);
          gain.connect(this.musicGain);
          osc.start(now);
          osc.stop(now + 0.22);
        });
      }

      step++;
      if (step % 3 === 0) {
        progIndex = (progIndex + 1) % progression.length;
      }
    };

    playWaltzStep();
    this.currentLoop = setInterval(playWaltzStep, tempo);
  }

  // 2. French Touch & Electro (Daft Punk / House inspired groove)
  startFrenchTouchElectro() {
    let step = 0;
    const tempo = 125; // 120 BPM 16th notes
    const bassNotes = [110, 110, 130.81, 146.83, 110, 164.81, 146.83, 123.47];
    const synthNotes = [440, 523.25, 659.25, 587.33, 440, 659.25, 783.99, 659.25];

    const playElectroStep = () => {
      if (this.isMuted) return;
      const now = this.ctx.currentTime;
      const beat16 = step % 16;

      // 4-on-the-floor Kick drum
      if (beat16 % 4 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(150, now);
        kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.08);
        kickGain.gain.setValueAtTime(0.6, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        kickOsc.connect(kickGain);
        kickGain.connect(this.musicGain);
        kickOsc.start(now);
        kickOsc.stop(now + 0.16);
      }

      // Snare / Clap on beats 4 and 12
      if (beat16 === 4 || beat16 === 12) {
        const noiseOsc = this.ctx.createOscillator();
        const noiseGain = this.ctx.createGain();
        noiseOsc.type = 'triangle';
        noiseOsc.frequency.setValueAtTime(220, now);
        noiseGain.gain.setValueAtTime(0.2, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        noiseOsc.connect(noiseGain);
        noiseGain.connect(this.musicGain);
        noiseOsc.start(now);
        noiseOsc.stop(now + 0.13);
      }

      // Funky House Bassline
      if (beat16 % 2 === 0) {
        const bassFreq = bassNotes[(step / 2) % bassNotes.length];
        const bassOsc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const bassGain = this.ctx.createGain();

        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.15);

        bassGain.gain.setValueAtTime(0.28, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        bassOsc.connect(filter);
        filter.connect(bassGain);
        bassGain.connect(this.musicGain);
        bassOsc.start(now);
        bassOsc.stop(now + 0.19);
      }

      // Filtered French Disco Arpeggio
      if (beat16 % 2 === 1) {
        const synthFreq = synthNotes[(step % synthNotes.length)];
        const synthOsc = this.ctx.createOscillator();
        const synthGain = this.ctx.createGain();
        synthOsc.type = 'square';
        synthOsc.frequency.setValueAtTime(synthFreq, now);

        synthGain.gain.setValueAtTime(0.05, now);
        synthGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        synthOsc.connect(synthGain);
        synthGain.connect(this.musicGain);
        synthOsc.start(now);
        synthOsc.stop(now + 0.11);
      }

      step++;
    };

    playElectroStep();
    this.currentLoop = setInterval(playElectroStep, tempo);
  }

  // 3. Saint-Germain Jazz Piano (Smooth 7th/9th Chords)
  startSaintGermainJazz() {
    let step = 0;
    const tempo = 550; // relaxed jazz swing tempo
    // Jazz Chords: Dm9, G13, Cmaj9, A7alt
    const jazzChords = [
      [146.83, 220, 261.63, 329.63, 392],    // Dm9
      [196.00, 246.94, 329.63, 349.23, 440], // G13
      [130.81, 196.00, 246.94, 329.63, 392], // Cmaj9
      [220.00, 277.18, 329.63, 392, 493.88]  // A7b9
    ];

    const playJazzStep = () => {
      if (this.isMuted) return;
      const now = this.ctx.currentTime;
      const chord = jazzChords[step % jazzChords.length];

      // Play chord with slight humanized arpeggio
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteTime = now + (i * 0.035);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.18 / (i + 1), noteTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.4);

        osc.connect(gain);
        gain.connect(this.musicGain);
        osc.start(noteTime);
        osc.stop(noteTime + 1.5);
      });

      step++;
    };

    playJazzStep();
    this.currentLoop = setInterval(playJazzStep, tempo);
  }

  // 4. Fanfare Festive des Rues (Brass & Street March)
  startStreetFanfare() {
    let step = 0;
    const tempo = 280;
    const fanfareMelody = [
      261.63, 329.63, 392.00, 523.25, 392.00, 523.25, 659.25, 523.25
    ];

    const playFanfareStep = () => {
      if (this.isMuted) return;
      const now = this.ctx.currentTime;
      const freq = fanfareMelody[step % fanfareMelody.length];

      // Brass lead
      const brassOsc = this.ctx.createOscillator();
      const brassGain = this.ctx.createGain();
      brassOsc.type = 'sawtooth';
      brassOsc.frequency.setValueAtTime(freq, now);

      brassGain.gain.setValueAtTime(0.18, now);
      brassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

      brassOsc.connect(brassGain);
      brassGain.connect(this.musicGain);
      brassOsc.start(now);
      brassOsc.stop(now + 0.28);

      // Drum March beat
      const drumOsc = this.ctx.createOscillator();
      const drumGain = this.ctx.createGain();
      drumOsc.frequency.setValueAtTime(80, now);
      drumGain.gain.setValueAtTime(0.2, now);
      drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      drumOsc.connect(drumGain);
      drumGain.connect(this.musicGain);
      drumOsc.start(now);
      drumOsc.stop(now + 0.14);

      step++;
    };

    playFanfareStep();
    this.currentLoop = setInterval(playFanfareStep, tempo);
  }

  // --- Street Atmosphere Ambience (Crowd murmur & evening breeze) ---
  toggleAmbience() {
    this.ensureContext();
    if (this.isAmbiencePlaying) {
      if (this.ambienceNode) {
        this.ambienceNode.stop();
        this.ambienceNode.disconnect();
        this.ambienceNode = null;
      }
      this.isAmbiencePlaying = false;
      return false;
    } else {
      // Generate soothing street background murmur using pink-noise buffer
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.1;
        b2 = 0.85 * b2 + white * 0.2;
        data[i] = (b0 + b1 + b2) * 0.1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter to sound like outdoor terrace murmur
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      const ambienceGain = this.ctx.createGain();
      ambienceGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(ambienceGain);
      ambienceGain.connect(this.musicGain);

      noise.start();
      this.ambienceNode = noise;
      this.isAmbiencePlaying = true;
      return true;
    }
  }

  // Visualizer Canvas Bars
  attachVisualizer(canvasElement) {
    this.visualizerCanvas = canvasElement;
  }

  startVisualizer() {
    const draw = () => {
      this.visualizerAnimId = requestAnimationFrame(draw);
      if (!this.visualizerCanvas || !this.analyser) return;

      const canvas = this.visualizerCanvas;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        // Gradient color for festive look
        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#FF5E7E');
        gradient.addColorStop(0.5, '#FFB703');
        gradient.addColorStop(1, '#3A86FF');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    };
    draw();
  }
}

// Global instance
window.audioEngine = new FestivalAudioEngine();
