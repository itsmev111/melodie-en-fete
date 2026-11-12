/**
 * Main Application Controller for Fête de la Musique
 * Handles Audio, Bilingual Translations, Interactive France Map,
 * Truly Interactive Timeline Modals, True Stories Modals, Virtual Piano, and Quiz Reveal.
 */

window.currentLang = 'fr'; // French by default as requested!

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Floating Music Notes Background Canvas
  initFloatingNotes();

  // 2. Initialize Language
  applyTranslations(window.currentLang);

  // 3. Initialize France Map
  if (typeof initFranceMap === 'function') {
    initFranceMap();
  }

  // 4. Initialize Quiz
  if (window.quizInstance) {
    window.quizInstance.init();
  }

  // 5. Connect Audio Engine to Visualizer Canvas
  const visCanvas = document.getElementById("audio-visualizer-canvas");
  if (visCanvas && window.audioEngine) {
    window.audioEngine.attachVisualizer(visCanvas);
  }

  // 6. Setup Interactive Virtual Piano with Touch & Keyboard
  setupPianoKeyboard();

  // 7. Setup Genre Filter Buttons
  setupGenreFilters();

  // 8. Attach Global UI Sound FX
  setupGlobalSfx();

  // 9. Setup Video Fallback & Custom File Uploader
  setupVideoCustomizer();

  // Start the requested background piano after the first user gesture
  // (browsers block audio autoplay until the visitor interacts).
  const startBackgroundCanon = (event) => {
    if (event && event.target && event.target.closest &&
        event.target.closest('#dock-play-pause-btn, [onclick*="selectMusicStyle"]')) return;
    if (window.audioEngine && !window.audioEngine.currentLoopId) {
      window.audioEngine.playMusicStyle('pachelbel');
      updateAudioDockStatus('pachelbel');
    }
    document.removeEventListener('pointerdown', startBackgroundCanon);
    document.removeEventListener('keydown', startBackgroundCanon);
  };
  document.addEventListener('pointerdown', startBackgroundCanon);
  document.addEventListener('keydown', startBackgroundCanon);
});

/**
 * Applies translations dynamically to all elements with data-i18n
 */
function switchLanguage() {
  window.currentLang = window.currentLang === 'fr' ? 'en' : 'fr';
  applyTranslations(window.currentLang);

  if (window.audioEngine) {
    window.audioEngine.playClick();
  }

  // Re-render map pills and quiz question with new language
  if (typeof initFranceMap === 'function') {
    initFranceMap();
  }
  if (window.quizInstance && !window.quizInstance.isAnswered) {
    window.quizInstance.renderQuestion();
  }

  // Update audio dock title if playing
  if (window.audioEngine && window.audioEngine.currentLoopId) {
    updateAudioDockStatus(window.audioEngine.currentLoopId);
  }
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  // Update elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Update language toggle button text
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.innerHTML = t.langSwitch;
  }

  // Update document title and html lang attribute
  document.documentElement.lang = lang;
  document.title = lang === 'fr' 
    ? "Mélodie en Fête • La Fête de la Musique en France" 
    : "Mélodie en Fête • Music Festival in France";
}

/**
 * Setup Global UI Click Sound Effects on buttons and interactive cards
 */
function setupGlobalSfx() {
  document.querySelectorAll("button, .interactive-card, .nav-link, .timeline-card-interactive, .story-card").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.audioEngine) {
        window.audioEngine.playClick();
      }
    });
  });
}

/**
 * Interactive Virtual Piano (Click, Touch + Computer Keyboard Support)
 */
function setupPianoKeyboard() {
  const keys = document.querySelectorAll(".piano-key");
  const keyMap = {
    'a': 'C4',
    's': 'D4',
    'd': 'E4',
    'f': 'F4',
    'g': 'G4',
    'h': 'A4',
    'j': 'B4',
    'k': 'C5'
  };

  keys.forEach(k => {
    const handleKeyTrigger = (e) => {
      e.preventDefault();
      const note = k.getAttribute("data-note");
      playPianoKey(k, note);
    };

    k.addEventListener("mousedown", handleKeyTrigger);
    k.addEventListener("touchstart", handleKeyTrigger, { passive: false });
  });

  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const key = e.key.toLowerCase();
    if (keyMap[key]) {
      const note = keyMap[key];
      const keyEl = document.querySelector(`.piano-key[data-note="${note}"]`);
      if (keyEl) {
        playPianoKey(keyEl, note);
      }
    }
  });
}

function playPianoKey(element, note) {
  if (window.audioEngine) {
    window.audioEngine.playPianoNote(note);
  }
  element.classList.add("active");
  setTimeout(() => element.classList.remove("active"), 220);
}

/**
 * Music Genres Filter System
 */
function setupGenreFilters() {
  const filterBtns = document.querySelectorAll(".genre-filter-btn");
  const cards = document.querySelectorAll(".genre-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute("data-category") === filter) {
          card.style.display = "flex";
          card.classList.add("fade-in");
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * Floating Audio Player Dock Controls
 */
function selectMusicStyle(styleId) {
  if (!window.audioEngine) return;
  const isCurrentlyPlaying = window.audioEngine.currentLoopId === styleId;

  // Toggle or switch
  if (isCurrentlyPlaying) {
    window.audioEngine.stopLoop();
    updateAudioDockStatus(null);
  } else {
    window.audioEngine.playMusicStyle(styleId);
    updateAudioDockStatus(styleId);
  }
}

function toggleDockPlay() {
  if (!window.audioEngine) return;
  if (window.audioEngine.currentLoopId) {
    window.audioEngine.stopLoop();
    updateAudioDockStatus(null);
  } else {
    // Default to soothing piano under Ambiance Live as requested!
    selectMusicStyle('pachelbel');
  }
}

function updateAudioDockStatus(styleId) {
  const statusEl = document.getElementById("dock-now-playing");
  const playPauseBtn = document.getElementById("dock-play-pause-btn");
  const lang = window.currentLang || 'fr';
  const isFr = lang === 'fr';

  if (!statusEl || !playPauseBtn) return;

  if (!styleId) {
    statusEl.innerText = isFr ? "En pause" : "Paused";
    playPauseBtn.innerText = "▶️";
  } else {
    const names = {
      soothingpiano: isFr ? "🎹 Canon de Pachelbel" : "🎹 Pachelbel’s Canon in D",
      pachelbel: isFr ? "🎹 Canon de Pachelbel" : "🎹 Pachelbel’s Canon in D",
      accordion: isFr ? "🪗 Valse Musette Parisienne" : "🪗 Paris Accordion Waltz",
      frenchtouch: isFr ? "🎧 French Touch Électro" : "🎧 French Touch Electro",
      jazz: isFr ? "🎹 Jazz Café Saint-Germain" : "🎹 Saint-Germain Jazz",
      fanfare: isFr ? "🎺 Fanfare Festive des Rues" : "🎺 Street Brass Fanfare"
    };
    statusEl.innerText = names[styleId] || styleId;
    playPauseBtn.innerText = "⏸️";
  }
}

function toggleAmbienceSound() {
  if (!window.audioEngine) return;
  const isPlaying = window.audioEngine.toggleAmbience();
  const btn = document.getElementById("ambience-btn");
  if (btn) {
    btn.classList.toggle("active", isPlaying);
  }
}

function toggleAudioMute() {
  if (!window.audioEngine) return;
  const isMuted = window.audioEngine.toggleMute();
  const btn = document.getElementById("dock-mute-btn");
  if (btn) {
    btn.innerText = isMuted ? "🔇" : "🔊";
  }
}

function updateVolume(val) {
  if (window.audioEngine) {
    window.audioEngine.setVolume(val);
  }
}

/**
 * Setup Video Customizer & Player
 * Allows the team to either play their local piano mashup video file
 * or view the interactive canvas visualizer fallback!
 */
function setupVideoCustomizer() {
  const fileInput = document.getElementById("team-video-file-input");
  const videoPlayer = document.getElementById("team-main-video");
  const visualizerContainer = document.getElementById("video-visualizer-fallback");

  if (fileInput && videoPlayer) {
    fileInput.addEventListener("change", function(e) {
      const file = this.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        videoPlayer.src = fileUrl;
        videoPlayer.style.display = "block";
        if (visualizerContainer) visualizerContainer.style.display = "none";
        videoPlayer.play();
      }
    });
  }
}

/**
 * Floating Musical Notes Canvas Background
 * High-vibrancy festive notes, stars, and sparklers floating upwards
 */
function initFloatingNotes() {
  const canvas = document.getElementById("floating-notes-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const festivalSymbols = ["♪", "♫", "♬", "♩", "🎷", "🎸", "✨", "🎺", "⚡", "🪗", "🎉", "𝄞", "⭐", "🎹"];
  const festivalColors = [
    "#FF5E7E", // neon coral
    "#FFD166", // warm gold
    "#00F5D4", // electric cyan
    "#A8FF3E", // lime green
    "#8338EC", // ultraviolet
    "#FF6B35", // sunset orange
    "#FF1493", // deep pink
    "#3A86FF"  // french blue
  ];

  const notes = [];

  for (let i = 0; i < 45; i++) {
    notes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      symbol: festivalSymbols[Math.floor(Math.random() * festivalSymbols.length)],
      color: festivalColors[Math.floor(Math.random() * festivalColors.length)],
      size: Math.random() * 24 + 18,
      speedY: Math.random() * 1.0 + 0.35,
      speedX: (Math.random() - 0.5) * 0.7,
      opacity: Math.random() * 0.65 + 0.25,
      angle: Math.random() * 360,
      vAngle: (Math.random() - 0.5) * 1.0
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    notes.forEach(note => {
      note.y -= note.speedY;
      note.x += note.speedX;
      note.angle += note.vAngle;

      if (note.y < -40) {
        note.y = height + 40;
        note.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(note.x, note.y);
      ctx.rotate((note.angle * Math.PI) / 180);
      ctx.fillStyle = note.color;
      ctx.globalAlpha = note.opacity;
      ctx.font = `${note.size}px 'Segoe UI Emoji', sans-serif`;
      ctx.fillText(note.symbol, 0, 0);
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * Truly Interactive Historical Timeline Modals (Backstage Secrets)
 */
const timelineSecretsData = {
  "1981": {
    year: "1981",
    tagFr: "L'Enquête Révolutionnaire & La Révélation Secrète",
    tagEn: "The Groundbreaking Survey & The Secret Revelation",
    titleFr: "1981 : Le Choc des Chiffres au Ministère de la Culture",
    titleEn: "1981: The Shocking Survey at the French Ministry",
    bodyFr: `
      <p>En octobre 1981, Jack Lang nomme <strong>Maurice Fleuret</strong>, critique musical et compositeur avant-gardiste, au poste de Directeur de la Musique et de la Danse. Fleuret commande immédiatement une étude sociologique approfondie sur les pratiques culturelles des Français.</p>
      <div style="background: rgba(255, 183, 3, 0.1); border-left: 4px solid #FFB703; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #FFB703;">Le chiffre qui a tout bouleversé :</strong> L'enquête révèle que plus de <strong>5 millions de Français</strong> (soit 1 Français sur 2 dans la jeunesse) pratiquaient un instrument, mais que la musique vivante était confinée à moins de 0,5% d'entre eux dans des conservatoires élitistes et salles payantes !
      </div>
      <p>Fleuret prononce alors sa célèbre devise révolutionnaire devant le cabinet ministériel : <em>« La musique sera partout et le concert nulle part ! Il faut donner la rue à ceux qui aiment faire vibrer les cordes et souffler dans les cuivres sans demander la permission. »</em></p>
    `,
    bodyEn: `
      <p>In October 1981, French Culture Minister Jack Lang appointed <strong>Maurice Fleuret</strong>, a renowned music critic and avant-garde thinker, as Director of Music and Dance. Fleuret immediately commissioned an in-depth nationwide sociological study on cultural habits.</p>
      <div style="background: rgba(255, 183, 3, 0.1); border-left: 4px solid #FFB703; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #FFB703;">The statistic that changed everything:</strong> The survey revealed over <strong>5 million French citizens</strong> (including 1 in 2 young people) played an instrument, yet live public music was restricted to under 0.5% in elite, paywalled concert halls!
      </div>
      <p>Fleuret proclaimed his historic manifesto before the ministry: <em>“Music will be everywhere and concerts nowhere! We must give the streets back to everyday players who love blowing horns and plucking guitars without asking for permits.”</em></p>
    `
  },
  "1982": {
    year: "1982",
    tagFr: "Le Coup de Folie du 21 Juin & La Grande Panique",
    tagEn: "The June 21st Gamble & The Near Heart Attack",
    titleFr: "1982 : Le Miracle Inattendu de la Première Édition",
    titleEn: "1982: The Unexpected Miracle of the First Edition",
    bodyFr: `
      <p>Organisée en moins de trois semaines sans budget publicitaire, la première Fête de la Musique est fixée au <strong>21 juin 1982</strong>, jour symbolique du solstice d'été (la nuit la plus courte de l'année).</p>
      <div style="background: rgba(255, 94, 126, 0.1); border-left: 4px solid #FF5E7E; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #FF5E7E;">La Panique de 17h00 :</strong> À 17h, le 21 juin, Jack Lang et ses conseillers parcourent les rues de Paris en voiture officielle : les boulevards sont quasi silencieux. La presse prédit un fiasco ministériel retentissant.
      </div>
      <p>Mais dès 20h30, un basculement historique se produit : des centaines de milliers de Français sortent de leurs appartements avec guitares en bandoulière, violons, accordéons et percussions ! Des places entières se transforment en scènes sauvages. Le lendemain matin, le Ministère croule sous les lettres réclamant que cette fête devienne un rendez-vous annuel perpétuel.</p>
    `,
    bodyEn: `
      <p>Organized in under three weeks with virtually zero advertising budget, the maiden Fête de la Musique was scheduled for <strong>June 21, 1982</strong>, the summer solstice (the shortest night of the year).</p>
      <div style="background: rgba(255, 94, 126, 0.1); border-left: 4px solid #FF5E7E; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #FF5E7E;">The 5:00 PM Panic:</strong> At 5 PM on June 21, Jack Lang and his staff drove through Paris avenues in government cars: the streets were dead quiet. Media columnists were ready to declare an embarrassing flop.
      </div>
      <p>Then at 8:30 PM, an explosive turning point occurred: hundreds of thousands of French citizens poured out of their doorways armed with acoustic guitars, violins, accordions, and drums! City squares transformed into joyous open jams. By morning, the Ministry was flooded with petitions demanding the celebration become an annual national tradition.</p>
    `
  },
  "1985": {
    year: "1985",
    tagFr: "Le Tremplin Européen d'Athènes & L'Expansion Internationale",
    tagEn: "The Athens European Summit & International Launch",
    titleFr: "1985 : Quand l'Europe Entière Adopte la Fête",
    titleEn: "1985: When All of Europe Embraced the Festival",
    bodyFr: `
      <p>L'année 1985 est proclamée <strong>Année Européenne de la Musique</strong>. Lors d'un sommet culturel réuni au pied du Parthénon à Athènes, Jack Lang présente l'idée à ses homologues européens.</p>
      <div style="background: rgba(0, 245, 212, 0.1); border-left: 4px solid #00F5D4; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #00F5D4;">L'effet domino :</strong> L'Allemagne, l'Italie, la Belgique, la Grèce et la Suisse emboîtent le pas. Berlin lance sa Fête de la Musique avec des scènes électro et fanfare le long du Mur de Berlin encore debout !
      </div>
      <p>En parallèle, les <strong>Alliances Françaises</strong> à travers le monde (New Delhi, Bogota, Tokyo, New York, Dakar) organisent des concerts gratuits sur les trottoirs, exportant ce trésor de fraternité culturelle sur tous les continents.</p>
    `,
    bodyEn: `
      <p>1985 was designated the <strong>European Year of Music</strong>. At a high-level summit held at the foot of the Acropolis in Athens, Jack Lang pitched the festival concept to European cultural ministers.</p>
      <div style="background: rgba(0, 245, 212, 0.1); border-left: 4px solid #00F5D4; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #00F5D4;">The domino effect:</strong> Germany, Italy, Belgium, Greece, and Switzerland jumped aboard immediately. Berlin launched its celebration featuring brass bands and techno alongside the still-standing Berlin Wall!
      </div>
      <p>Simultaneously, the global <strong>Alliance Française</strong> network (New Delhi, Bogota, Tokyo, New York, Dakar) created free street stages, exporting this beacon of universal friendship across all continents.</p>
    `
  },
  "1997": {
    year: "1997",
    tagFr: "La Charte Internationale des Principes Fondateurs",
    tagEn: "The International Charter of Core Principles",
    titleFr: "1997 : La Signature Historique de la Charte de Budapest",
    titleEn: "1997: The Historic Signing of the Budapest Charter",
    bodyFr: `
      <p>Devant l'immense succès mondial, de grands sponsors privés et des promoteurs commerciaux ont tenté de privatiser des scènes de rue et de faire payer des billets d'entrée.</p>
      <div style="background: rgba(131, 56, 236, 0.1); border-left: 4px solid #8338EC; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #8338EC;">Le rempart éthique :</strong> Les ministres et maires de Budapest, Paris, Berlin, Barcelone, Rome et Bruxelles se réunissent en 1997 et signent la <strong>Charte Européenne de la Fête de la Musique</strong>.
      </div>
      <p>Cette charte impose 4 règles immuables pour toute ville participante : gratuité totale, pas de billetterie, accès sans distinction aux amateurs comme aux professionnels, et célébration obligatoirement fixée le 21 juin, jour du solstice d'été.</p>
    `,
    bodyEn: `
      <p>Facing overwhelming global success, commercial promoters and corporate brands attempted to buy up public squares and sell tickets to street concerts.</p>
      <div style="background: rgba(131, 56, 236, 0.1); border-left: 4px solid #8338EC; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #8338EC;">The ethical firewall:</strong> Mayors and cultural ministers from Budapest, Paris, Berlin, Barcelona, Rome, and Brussels assembled in 1997 to sign the <strong>International Charter of Budapest</strong>.
      </div>
      <p>This charter etched four inviolable rules for any host city: strictly free admission, zero ticket gating, equal dignity for amateurs and pros, and celebration strictly held on June 21, the summer solstice.</p>
    `
  },
  "today": {
    year: "Aujourd'hui",
    tagFr: "Le Mouvement Mondial Make Music Day",
    tagEn: "The Global Make Music Day Movement",
    titleFr: "Aujourd'hui : Plus de 120 Pays et 1 000 Villes Unies",
    titleEn: "Today: Over 120 Countries & 1,000 Cities United",
    bodyFr: `
      <p>Aujourd'hui, la Fête de la Musique est devenue le plus grand événement musical participatif et gratuit de la planète Terre, fêté sur tous les fuseaux horaires.</p>
      <div style="background: rgba(168, 255, 62, 0.1); border-left: 4px solid #A8FF3E; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #A8FF3E;">De New York à Bengaluru :</strong> Sous le nom international de <strong>« Make Music Day »</strong>, des métropoles comme New York, Tokyo, Sydney, Londres et New Delhi accueillent des milliers de concerts sur les trottoirs, dans les parcs et les gares.
      </div>
      <p>Plus de 40 ans après son lancement improvisé, l'esprit d'origine reste intact : rassembler les êtres humains par la beauté universelle du son, sans frontière d'âge, d'origine ou de classe sociale.</p>
    `,
    bodyEn: `
      <p>Today, the Fête de la Musique stands as the single largest free participatory musical celebration on planet Earth, traveling across every time zone with the sun.</p>
      <div style="background: rgba(168, 255, 62, 0.1); border-left: 4px solid #A8FF3E; padding: 14px; margin: 16px 0; border-radius: 6px;">
        <strong style="color: #A8FF3E;">From New York to Bengaluru:</strong> Known internationally as <strong>“Make Music Day”</strong>, megacities like New York, Tokyo, Sydney, London, and New Delhi host thousands of performances on curbs, gardens, and train stations.
      </div>
      <p>Over 40 years after its daring inception, the original soul remains vibrant: bringing human beings together through the universal power of sound, free of borders, ages, or social divisions.</p>
    `
  }
};

function openTimelineModal(yearKey) {
  const data = timelineSecretsData[yearKey];
  if (!data) return;

  const currentLang = window.currentLang || 'fr';
  const isFr = currentLang === 'fr';
  const modal = document.getElementById("general-info-modal");
  const body = document.getElementById("general-modal-content");
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="timeline-modal-detail" style="padding: 10px;">
      <div style="display: inline-block; background: var(--accent-gold); color: #000; font-weight: 800; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; margin-bottom: 10px;">
        ${isFr ? data.tagFr : data.tagEn}
      </div>
      <h3 style="color: #FFF; font-size: 1.6rem; margin-bottom: 14px;">${isFr ? data.titleFr : data.titleEn}</h3>
      <div style="line-height: 1.8; font-size: 1.05rem; color: #E2E8F0;">
        ${isFr ? data.bodyFr : data.bodyEn}
      </div>
      <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center;">
        <button class="btn btn-primary" onclick="selectMusicStyle('pachelbel')">
          🎹 ${isFr ? 'Jouer le Piano Apaisant' : 'Play Soothing Piano'}
        </button>
        <button class="btn btn-secondary" onclick="closeGeneralModal()">
          ${isFr ? 'Fermer les Coulisses' : 'Close Backstage Secrets'}
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");
  if (window.audioEngine) window.audioEngine.playChime();
}

/**
 * True Stories of June 21st Modals
 */
const trueStoriesData = {
  story1: {
    titleFr: "Le Miracle de 1982 : La Panique Ministérielle de Jack Lang",
    titleEn: "The 1982 Miracle: Jack Lang's Panic Turned Historic Triumph",
    tagFr: "Coulisses Officielles de 1982",
    tagEn: "1982 Backstage History",
    textFr: `
      <p>Le 21 juin 1982, le Ministère de la Culture avait fait imprimer des tracts avec la phrase : <em>« Faites de la musique le 21 juin de 20h30 à 21h00 »</em>. À 17h, Jack Lang et Maurice Fleuret font un tour dans les rues de Paris en Peugeot 604 noire. Paris était désert et silencieux. Jack Lang confia plus tard à ses proches : <em>« J'étais terrorisé. Je pensais que personne n'oserait descendre et que la presse nous démolirait le lendemain. »</em></p>
      <p>Mais vers 20h, l'impensable s'est produit. Les fenêtres des appartements ont commencé à s'ouvrir. Des adolescents sont sortis avec des amplis branchés sur des rallonges jetées depuis le 4e étage. Des violonistes se sont assis sur les bancs publics. À minuit, plus de 300 000 personnes chantaient et dansaient sur les boulevards parisiens ! Le lendemain, Le Monde titrait : <em>« La fête que la France attendait sans le savoir. »</em></p>
    `,
    textEn: `
      <p>On June 21, 1982, the Ministry had printed leaflets urging: <em>“Make music on June 21 from 8:30 PM to 9:00 PM.”</em> At 5:00 PM, Minister Jack Lang and Maurice Fleuret drove through Paris in an official black sedan. The city was ghostly quiet. Jack Lang later recalled: <em>“I was sweating with fear. I believed no one would dare step out and tomorrow's headlines would destroy my ministry.”</em></p>
      <p>Then around 8:00 PM, the unimaginable happened. Apartment windows flew open across the capital. Teenagers dragged amplifiers into courtyards plugged into extension cords hung from 4th-floor balconies. Classical violinists sat on park benches. By midnight, over 300,000 citizens were singing and dancing on Paris boulevards! Next morning, newspapers proclaimed: <em>“The celebration France was waiting for without knowing it.”</em></p>
    `
  },
  story2: {
    titleFr: "La Cantatrice du 4e Étage dans le Quartier du Marais",
    titleEn: "The 4th-Floor Balcony Opera Singer in Le Marais",
    tagFr: "Magie Serendipiteuse Parisienne",
    tagEn: "Pure Parisian Serendipity",
    textFr: `
      <p>En 1999, rue des Rosiers dans le cœur du Marais à Paris, une foule compacte de milliers de jeunes se pressait entre les stands de falafels et les enceintes techno assourdissantes. Soudain, à 22h, une fenêtre au quatrième étage d'un vieil immeuble haussmannien s'est grande ouverte.</p>
      <p>Une femme en robe du soir est apparue sur son minuscule balcon en fer forgé. Sans micro ni haut-parleur, elle a entonné avec une voix de soprano d'une pureté surnaturelle l'air de <em>« O mio babbino caro »</em> de Puccini. En l'espace de dix secondes, le DJ de rue a coupé ses basses, les conversations se sont tues, et plus de 2 000 personnes sont restées figées dans un silence religieux. À la dernière note tenue, une clameur d'émotion immense a fait trembler les pavés et beaucoup avaient les larmes aux yeux.</p>
    `,
    textEn: `
      <p>In 1999, along Rue des Rosiers in the historic Marais district of Paris, a bustling crowd of thousands squeezed between street snack stalls and loud techno speakers. Suddenly, at 10:00 PM, a window flew open on the fourth floor of an old limestone Haussmann building.</p>
      <p>A woman in an elegant evening gown stepped onto her wrought-iron balcony. Without any microphone or speaker, she launched into Puccini's aria <em>“O mio babbino caro”</em> with breathtaking operatic clarity. Within ten seconds, the street DJ killed the bass, murmuring crowds hushed, and 2,000 strangers stood motionless in awe. As her final note resonated through the alleyway, a colossal wave of applause erupted, with dozens in tears.</p>
    `
  },
  story3: {
    titleFr: "L'Inconnu Célèbre et l'Amplificateur Grillé",
    titleEn: "The Secret Superstar and the Blown Guitar Amplifier",
    tagFr: "Légende du Rock de Rue",
    tagEn: "Street Rock Legend",
    textFr: `
      <p>En 2004, dans une petite impasse du 11e arrondissement de Paris, un groupe de lycéens de 16 ans jouait des reprises de rock devant une cinquantaine d'amis. En plein milieu d'un solo, l'unique amplificateur de guitare du groupe a explosé dans un panache de fumée grise sous les regards déçus du public.</p>
      <p>Alors que les jeunes s'apprêtaient à ranger leurs instruments en larmes, un homme d'une cinquantaine d'années en trench-coat est descendu de l'immeuble d'en face avec un amplificateur Fender vintage à lampes. Il leur a dit avec un sourire : <em>« Branchez-vous là-dessus les gars, la fête ne s'arrête pas comme ça ! »</em> Il a pris une seconde guitare et a jammé avec eux pendant une heure et demie sur Jimi Hendrix. Cet homme n'était autre que l'un des plus célèbres guitaristes de rock français en personne, qui habitait discrètement dans la rue !</p>
    `,
    textEn: `
      <p>In 2004, in a secluded cobblestone alleyway in Paris's 11th arrondissement, a band of 16-year-old high schoolers was rocking cover tunes before 50 cheering schoolmates. Midway through an electric solo, their only guitar amplifier popped with a shower of sparks and a cloud of grey smoke.</p>
      <p>As the heartbroken teenagers prepared to pack up their gear, a man in his fifties wearing a casual trench-coat walked down from the opposite building carrying a rare vintage Fender tube amp. He grinned: <em>“Plug into this, boys! The festival does not stop like this.”</em> He plugged in a second guitar and jammed with them for 90 minutes on classic Jimi Hendrix riffs. The stranger was none other than an iconic French rock hall-of-famer who lived quietly in that very alley!</p>
    `
  },
  story4: {
    titleFr: "Le Chœur Spontané du Métro Parisien à 3h du Matin",
    titleEn: "The 3:00 AM Metro Line 1 Sing-Along Choir",
    tagFr: "Fraternité Nocturne Urbaine",
    tagEn: "Nocturnal Subway Harmony",
    textFr: `
      <p>Sur les lignes de métro qui restent exceptionnellement ouvertes toute la nuit le 21 juin, la fête ne s'arrête jamais. Vers 3h30 du matin sur la Ligne 1 entre Châtelet et Bastille, une rame bondée de festivaliers fatigués et silencieux rentrait chez eux.</p>
      <p>Un jeune homme assis par terre a sorti un accordéon diatonique et a entonné timidement les premières notes de <em>« Aux Champs-Élysées »</em> de Joe Dassin. En quelques mesures, tout le wagon s'est mis à chanter en chœur à tue-tête. À la station suivante, les passagers des wagons voisins ont rejoint le refrain. Les gens dansaient entre les strapontins et se serraient la main comme des amis d'enfance. C'est l'essence même de la Fête de la Musique : abattre toute distance entre les êtres humains.</p>
    `,
    textEn: `
      <p>On the French metro lines that run all night on June 21st, the celebration simply never sleeps. Around 3:30 AM on Paris Metro Line 1 between Châtelet and Bastille, a packed subway car of exhausted partygoers was heading home in quiet weariness.</p>
      <p>A young man seated on the floor pulled out a wooden accordion and softly launched into the opening bars of Joe Dassin's <em>“Aux Champs-Élysées”</em>. Within seconds, the entire subway car joined in full voice. At the next stop, passengers from adjoining cars heard the singing and joined the roaring chorus. Strangers danced around handrails and embraced like lifelong companions. That is the true magic of the festival: tearing down every barrier between human souls.</p>
    `
  },
  story5: {
    titleFr: "La Sérénade Douce de l'Hôpital Pédiatrique de Lyon",
    titleEn: "The Children's Hospital Lullaby Serenade in Lyon",
    tagFr: "Générosité & Douceur Humaine",
    tagEn: "Kindness & Tenderness",
    textFr: `
      <p>À Lyon, une fanfare étudiante de cuivres réputée pour sa puissance sonore traversait le quartier de la Croix-Rousse à minuit. En passant devant un hôpital pédiatrique dont les lumières étaient encore allumées, les musiciens se sont arrêtés spontanément.</p>
      <p>Pour ne pas réveiller brutalement les enfants malades, les trompettistes et trombonistes ont tous retiré leurs bonnets de laine pour les enfoncer dans les pavillons de leurs instruments afin d'en étouffer le son, le transformant en une sonorité feutrée et veloutée. Pendant 20 minutes, ils ont joué de douces berceuses traditionnelles et des thèmes de films d'animation sous les fenêtres. Les soignants et les enfants se sont approchés des vitres en agitant des lampes de poche et des téléphones en rythme, créant une constellation d'étoiles émouvante.</p>
    `,
    textEn: `
      <p>In Lyon, a high-octane university brass marching band known for explosive volume was marching across Croix-Rousse at midnight. As they passed beneath the illuminated windows of a children's hospital, the musicians abruptly paused.</p>
      <p>Not wanting to startle young patients, trumpet and trombone players removed their winter wool beanies and stuffed them into their brass bells to mute the blast into a soft, velvety whisper. For 20 minutes, they played gentle French lullabies and Disney animation melodies under the starry sky. Nurses and pediatric patients gathered by windows, waving flashlights and smartphone screens in rhythm, creating a sea of stars that melted hearts.</p>
    `
  }
};

function openStoryModal(storyId) {
  const data = trueStoriesData[storyId];
  if (!data) return;

  const currentLang = window.currentLang || 'fr';
  const isFr = currentLang === 'fr';
  const modal = document.getElementById("general-info-modal");
  const body = document.getElementById("general-modal-content");
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="story-modal-detail" style="padding: 10px;">
      <div style="display: inline-block; background: var(--accent-pink); color: #FFF; font-weight: 800; font-size: 0.8rem; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px;">
        📖 ${isFr ? data.tagFr : data.tagEn}
      </div>
      <h3 style="color: #FFF; font-size: 1.6rem; margin-bottom: 16px;">${isFr ? data.titleFr : data.titleEn}</h3>
      <div style="line-height: 1.8; font-size: 1.05rem; color: #E2E8F0;">
        ${isFr ? data.textFr : data.textEn}
      </div>
      <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <button class="btn btn-primary" onclick="selectMusicStyle('pachelbel')">
          🎹 ${isFr ? 'Ambiance Piano Doux' : 'Play Soothing Piano'}
        </button>
        <button class="btn btn-secondary" onclick="closeGeneralModal()">
          ${isFr ? 'Fermer l’Histoire' : 'Close Story'}
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");
  if (window.audioEngine) window.audioEngine.playChime();
}

/**
 * Street Details Modal
 */
function openStreetDetailModal(type) {
  const currentLang = window.currentLang || 'fr';
  const isFr = currentLang === 'fr';
  const modal = document.getElementById("general-info-modal");
  const body = document.getElementById("general-modal-content");
  if (!modal || !body) return;

  const details = {
    cafes: {
      titleFr: "Les Terrasses & Cafés : Le Cœur Vivant du 21 Juin",
      titleEn: "Bistros & Terraces: The Living Heart of June 21st",
      textFr: "Le 21 juin, la loi autorise exceptionnellement les cafés et restaurants français à étendre leurs terrasses et à diffuser de la musique en direct dans la rue. Des serveurs qui dansent avec les plateaux, des passants qui s'assoient sur les bordures de trottoirs, un verre de blanc ou un diabolo à la main... C'est la quintessence de la convivialité française !",
      textEn: "On June 21, French regulations exceptionally permit bistros and restaurants to expand their outdoor terraces and play amplified live music into the street. Waiters carry trays through cheerful crowds, locals sit along curbs with a cold drink... It is the purest expression of French joie de vivre!"
    },
    fanfares: {
      titleFr: "L'Énergie des Fanfares & Cuivres Ambulants",
      titleEn: "The Energy of Roaming Brass Bands (Fanfares)",
      textFr: "En France, les fanfares des écoles d'art, d'architecture et de médecine (les célèbres Fanfares des Beaux-Arts) ont une tradition centenaire. Vêtues de costumes loufoques ou de chapeaux extravagants, elles arpentent les boulevards avec sousaphones, trombones et percussions en jouant des tubes populaires réarrangés.",
      textEn: "In France, student brass bands from fine arts, architecture, and medical universities boast a century-old tradition. Wearing quirky costumes and eccentric hats, they march down boulevards with sousaphones, trombones, and bass drums, turning every corner into an electric dance party."
    },
    spontaneous: {
      titleFr: "L'Improvisation Totale : Pas de Billet, Pas de Scène !",
      titleEn: "Pure Spontaneity: No Tickets, No Stage Barriers!",
      textFr: "La magie voulue par Maurice Fleuret réside dans l'inattendu : vous marchez dans une ruelle silencieuse du Marais et tombez sur une cantatrice qui chante depuis son balcon au 3e étage. Deux pas plus loin, un batteur de 12 ans fait son tout premier concert public devant 200 personnes émerveillées.",
      textEn: "The magic envisioned by Maurice Fleuret lies in serendipity: you wander down a quiet alleyway and discover an opera singer performing from a 3rd-floor balcony. Steps away, a 12-year-old drummer performs their first public gig before an admiring crowd."
    }
  };

  const item = details[type] || details.cafes;

  body.innerHTML = `
    <div class="general-modal-inner">
      <h3 style="color: #FFB703; margin-bottom: 1rem; font-size: 1.6rem;">${isFr ? item.titleFr : item.titleEn}</h3>
      <p style="line-height: 1.8; font-size: 1.1rem; color: #E2E8F0;">${isFr ? item.textFr : item.textEn}</p>
      <div style="margin-top: 1.8rem; text-align: right;">
        <button class="btn btn-secondary" onclick="closeGeneralModal()">${isFr ? 'Fermer' : 'Close'}</button>
      </div>
    </div>
  `;

  modal.classList.add("open");
  if (window.audioEngine) window.audioEngine.playChime();
}

function closeGeneralModal() {
  const modal = document.getElementById("general-info-modal");
  if (modal) modal.classList.remove("open");
}

function openTeamProjectDirectly() {
  const section = document.getElementById("team-showcase");
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

function closeTeamModal() {
  const modal = document.getElementById("team-project-modal");
  if (modal) modal.classList.remove("open");
}
