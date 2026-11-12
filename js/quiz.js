/**
 * Interactive Quiz for Fête de la Musique
 * Features 6 engaging questions in French & English, instant explanations,
 * dynamic scoring, confetti celebration, and unlocks the secret Team Video Project showcase.
 */

const quizQuestions = [
  {
    id: 1,
    qFr: "En quelle année la première Fête de la Musique officielle a-t-elle eu lieu en France ?",
    qEn: "In what year did the first official Fête de la Musique take place in France?",
    optionsFr: ["1789", "1968", "1982", "2000"],
    optionsEn: ["1789", "1968", "1982", "2000"],
    correct: 2, // 1982
    explanationFr: "C'est le 21 juin 1982, sous l'impulsion de Jack Lang et Maurice Fleuret, que la fête a été lancée pour la première fois !",
    explanationEn: "It was on June 21, 1982, spearheaded by Jack Lang and Maurice Fleuret, that the festival was officially launched!"
  },
  {
    id: 2,
    qFr: "Quel était le mot d'ordre et jeu de mots célèbre qui a lancé l'événement ?",
    qEn: "What was the famous rallying slogan and French pun that launched the event?",
    optionsFr: [
      "« Écoutez le silence »",
      "« Faites de la musique, Fête de la Musique »",
      "« Achetez votre billet »",
      "« Chantez sous la pluie »"
    ],
    optionsEn: [
      "“Listen to the silence”",
      "“Faites de la musique, Fête de la Musique” (Make music, Music festival)",
      "“Buy your ticket”",
      "“Singing in the rain”"
    ],
    correct: 1,
    explanationFr: "L'homophonie entre « Faites de la musique » (Make music) et « Fête de la musique » est devenue le symbole de la fête.",
    explanationEn: "The French homophone between 'Faites de la musique' (Make music) and 'Fête de la musique' became the legendary rallying cry."
  },
  {
    id: 3,
    qFr: "Pourquoi la date du 21 juin a-t-elle été choisie pour célébrer ce festival ?",
    qEn: "Why was the date of June 21st chosen for this festival?",
    optionsFr: [
      "C'est le jour de l'anniversaire du président",
      "C'est le solstice d'été (le jour le plus long de l'année)",
      "C'était un jour férié obligatoire",
      "C'est le jour de l'invention de la guitare"
    ],
    optionsEn: [
      "It is the president's birthday",
      "It is the summer solstice (the longest day of the year)",
      "It was a mandatory public holiday",
      "It is the anniversary of the guitar's invention"
    ],
    correct: 1,
    explanationFr: "Le solstice d'été offre la nuit la plus courte et le jour le plus long de l'année, invitant tout le monde à veiller tard en musique !",
    explanationEn: "The summer solstice brings the longest day and shortest night of the year, perfect for celebrating music late into the warm night!"
  },
  {
    id: 4,
    qFr: "Quel est le casse-croûte de rue le plus populaire et emblématique dégusté pendant la fête ?",
    qEn: "What is the most iconic street food sandwich enjoyed during the festival?",
    optionsFr: [
      "Le sandwich Merguez-Frites",
      "Des sushis au saumon",
      "Une fondue savoyarde d'hiver",
      "Un bol de soupe à l'oignon"
    ],
    optionsEn: [
      "The Merguez-Frites grilled sausage sandwich",
      "Salmon sushi rolls",
      "A winter Savoyard fondue",
      "A hot bowl of onion soup"
    ],
    correct: 0,
    explanationFr: "L'odeur des merguez grillées sur les barbecues ambulants avec des frites chaudes et de la moutarde de Dijon embaume chaque coin de rue le 21 juin !",
    explanationEn: "The aroma of sizzling merguez sausages grilled on sidewalk stands, served with hot fries and Dijon mustard, fills every street on June 21!"
  },
  {
    id: 5,
    qFr: "Quelle règle d'or distingue la Fête de la Musique des festivals de musique commerciaux ?",
    qEn: "What golden rule distinguishes Fête de la Musique from commercial music festivals?",
    optionsFr: [
      "Les concerts doivent tous être payants",
      "Seuls les musiciens professionnels célèbres ont le droit de jouer",
      "Tous les concerts dans l'espace public sont 100% gratuits et ouverts aux amateurs",
      "Il est interdit d'applaudir les artistes"
    ],
    optionsEn: [
      "All concerts must charge admission fees",
      "Only famous superstar musicians are permitted to play",
      "All concerts in public spaces are 100% free and open to amateurs",
      "Applause is strictly prohibited"
    ],
    correct: 2,
    explanationFr: "La devise de Maurice Fleuret était claire : « La musique partout, le concert nulle part ». Tout le monde peut jouer et assister gratuitement !",
    explanationEn: "Maurice Fleuret's motto was clear: 'Music everywhere, concerts nowhere'. Anyone can perform and attend completely free of charge!"
  },
  {
    id: 6,
    qFr: "Combien de pays dans le monde célèbrent aujourd'hui la Fête de la Musique (Make Music Day) ?",
    qEn: "In how many countries worldwide is Fête de la Musique (Make Music Day) celebrated today?",
    optionsFr: ["Seulement la France", "5 pays d'Europe", "Plus de 120 pays", "2 pays"],
    optionsEn: ["Only France", "5 European countries", "Over 120 countries", "2 countries"],
    correct: 2,
    explanationFr: "Née à Paris en 1982, elle est aujourd'hui fêtée dans plus de 120 pays et 1000 villes (Berlin, New York, Tokyo, Bogotá, etc.) !",
    explanationEn: "Born in Paris in 1982, it is now celebrated in over 120 countries and 1,000 cities worldwide (Berlin, New York, Tokyo, Bogotá, etc.)!"
  }
];

class FestivalQuiz {
  constructor() {
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;
    this.isAnswered = false;
  }

  init() {
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;
    this.isAnswered = false;
    this.renderQuestion();
  }

  renderQuestion() {
    const container = document.getElementById("quiz-card-content");
    if (!container) return;

    const currentLang = window.currentLang || 'fr';
    const isFr = currentLang === 'fr';

    if (this.currentIndex >= quizQuestions.length) {
      this.renderResults();
      return;
    }

    const q = quizQuestions[this.currentIndex];
    const questionText = isFr ? q.qFr : q.qEn;
    const options = isFr ? q.optionsFr : q.optionsEn;

    const progressPercent = Math.round((this.currentIndex / quizQuestions.length) * 100);

    container.innerHTML = `
      <div class="quiz-progress-bar-wrapper">
        <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
      <div class="quiz-counter">
        <span>${isFr ? 'Question' : 'Question'} ${this.currentIndex + 1} / ${quizQuestions.length}</span>
        <span class="quiz-score-badge">⭐ ${isFr ? 'Score :' : 'Score:'} ${this.score}</span>
      </div>

      <h3 class="quiz-question-title">${questionText}</h3>

      <div class="quiz-options-grid">
        ${options.map((opt, idx) => `
          <button class="quiz-option-btn" data-index="${idx}" onclick="window.quizInstance.selectAnswer(${idx})">
            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
            <span class="option-text">${opt}</span>
          </button>
        `).join('')}
      </div>

      <div id="quiz-feedback-box" class="quiz-feedback-box hidden"></div>

      <div class="quiz-actions-row">
        <button id="quiz-next-btn" class="btn btn-primary hidden" onclick="window.quizInstance.nextQuestion()">
          ${isFr ? 'Question Suivante ➡️' : 'Next Question ➡️'}
        </button>
      </div>
    `;

    this.isAnswered = false;
    this.selectedOption = null;
  }

  selectAnswer(index) {
    if (this.isAnswered) return;
    this.isAnswered = true;
    this.selectedOption = index;

    const q = quizQuestions[this.currentIndex];
    const currentLang = window.currentLang || 'fr';
    const isFr = currentLang === 'fr';
    const isCorrect = index === q.correct;

    const allButtons = document.querySelectorAll(".quiz-option-btn");
    allButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add("correct");
      } else if (idx === index && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    const feedbackBox = document.getElementById("quiz-feedback-box");
    const nextBtn = document.getElementById("quiz-next-btn");

    if (isCorrect) {
      this.score++;
      if (window.audioEngine) window.audioEngine.playFanfare();
      feedbackBox.className = "quiz-feedback-box correct-feedback";
      feedbackBox.innerHTML = `
        <div class="feedback-badge">✅ ${isFr ? 'Bravo ! Excellente réponse !' : 'Correct! Great job!'}</div>
        <p>${isFr ? q.explanationFr : q.explanationEn}</p>
      `;
    } else {
      if (window.audioEngine) window.audioEngine.playWrongBuzz();
      feedbackBox.className = "quiz-feedback-box wrong-feedback";
      feedbackBox.innerHTML = `
        <div class="feedback-badge">❌ ${isFr ? 'Oups ! Pas tout à fait...' : 'Oops! Not quite...'}</div>
        <p>${isFr ? q.explanationFr : q.explanationEn}</p>
      `;
    }

    feedbackBox.classList.remove("hidden");
    if (nextBtn) nextBtn.classList.remove("hidden");
  }

  nextQuestion() {
    if (window.audioEngine) window.audioEngine.playClick();
    this.currentIndex++;
    this.renderQuestion();
  }

  renderResults() {
    const container = document.getElementById("quiz-card-content");
    if (!container) return;

    const currentLang = window.currentLang || 'fr';
    const isFr = currentLang === 'fr';
    const total = quizQuestions.length;
    const isHigh = this.score >= Math.ceil(total / 2);

    // Launch confetti!
    launchConfetti();
    if (window.audioEngine) window.audioEngine.playFanfare();

    container.innerHTML = `
      <div class="quiz-results-card">
        <div class="results-trophy">🏆</div>
        <h3 class="results-title">${isFr ? 'Quiz Terminé ! Bravo !' : 'Quiz Completed! Bravo!'}</h3>
        <div class="results-score-display">
          ${isFr ? 'Votre score final :' : 'Your Final Score:'} <strong>${this.score} / ${total}</strong>
        </div>
        <p class="results-praise">
          ${isFr 
            ? 'Vous avez démontré une excellente connaissance de la culture et des valeurs de la Fête de la Musique !' 
            : 'You demonstrated an impressive understanding of the culture and spirit of Fête de la Musique!'}
        </p>

        <div class="unlocked-reward-banner pulse-glow">
          <div class="reward-sparkle">✨ 🎁 ✨</div>
          <h4>${isFr ? 'RÉCOMPENSE DÉBLOQUÉE !' : 'REWARD UNLOCKED!'}</h4>
          <p>${isFr 
            ? 'Vous avez débloqué la création vidéo et musicale exclusive de notre équipe !' 
            : 'You have unlocked our team’s exclusive musical & video creation!'}</p>
          <button class="btn btn-unlock-reveal" onclick="window.quizInstance.revealTeamCreation()">
            🎬 ${isFr ? 'Ouvrir notre Création Spéciale' : 'Open Our Special Video Creation'} 🎹
          </button>
        </div>

        <div style="margin-top: 1.5rem;">
          <button class="btn btn-secondary" onclick="window.quizInstance.init()">
            🔄 ${isFr ? 'Recommencer le quiz' : 'Restart Quiz'}
          </button>
        </div>
      </div>
    `;

    // Also trigger the celebratory popup automatically after 1.2s!
    setTimeout(() => {
      this.triggerUnlockPopup();
    }, 1200);
  }

  triggerUnlockPopup() {
    const popup = document.getElementById("unlock-congrats-modal");
    if (popup) {
      popup.classList.add("open");
      if (window.audioEngine) window.audioEngine.playChime();
    }
  }

  revealTeamCreation() {
    const popup = document.getElementById("unlock-congrats-modal");
    if (popup) popup.classList.remove("open");
    const videoSection = document.getElementById("team-showcase");
    if (videoSection) videoSection.scrollIntoView({ behavior: "smooth" });
    if (window.audioEngine) window.audioEngine.playFanfare();
  }
}

// Global quiz instance
window.quizInstance = new FestivalQuiz();

/**
 * Lightweight Confetti particle celebration effect
 */
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#FF5E7E", "#FFB703", "#3A86FF", "#00F5D4", "#8338EC", "#FFFFFF"];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  let startTime = null;

  function render(time) {
    if (!startTime) startTime = time;
    const progress = (time - startTime) / 2500;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // gravity
      p.rotation += p.vRot;
      p.alpha = Math.max(0, 1 - progress);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    if (progress < 1) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(render);
}
