// =========================
// NIDO MVP - app.js
// =========================

// 1) "Base de datos" simple en memoria.
// Luego la podremos mover a un JSON o a un archivo aparte.
const CONTENT = {
  stages: [
    { id: "pregnancy", label: "Gestación" },
    { id: "0-1", label: "0–1 mes" },
    { id: "2-3", label: "2–3 meses" },
    { id: "4-6", label: "4–6 meses" },
    { id: "7-9", label: "7–9 meses" },
    { id: "10-12", label: "10–12 meses" },
  ],
  roles: [
    { id: "madre", label: "Madre" },
    { id: "padre", label: "Padre" },
    { id: "cuidador", label: "Persona cuidadora" },
  ],
  // Texto por etapa (home)
  home: {
    "0-1": {
      babyToday:
        "Durante este primer mes, tu bebé está conociendo el mundo fuera del vientre. Es normal que necesite cercanía y presencia. No necesita estímulos complejos; necesita vínculo.",
      game:
        "🧡 Mirarnos despacio: mírale con calma y háblale suave. No busques respuesta; busca presencia.",
      caregiver:
        "Cuidar puede sentirse intenso. No necesitas tener todas las respuestas. Estar presente, incluso en el cansancio, ya es una forma profunda de cuidar.",
      calm:
        "Si lo necesitan, un momento de calma: respiren juntos. El contacto también regula.",
    },
    "2-3": {
      babyToday:
        "Entre 2 y 3 meses puede aparecer más curiosidad: sonrisas, sonidos y más atención. Cada bebé tiene su ritmo, y ese ritmo está bien.",
      game:
        "🌸 Conversaciones suaves: responde a sus sonidos con tu voz. Es intercambio, no examen.",
      caregiver:
        "Acompañar no es estimular todo el tiempo. A veces observar y estar cerca también es cuidar.",
      calm:
        "Baja el ritmo al final del día: voz suave, brazos y rutina simple ayudan a integrar lo vivido.",
    },
    "4-6": {
      babyToday:
        "Entre 4 y 6 meses tu bebé explora con más intención: manos, boca, giro, atención. Explorar gasta energía; el cansancio también es parte.",
      game:
        "🌿 Explorar texturas: objetos seguros, diferentes texturas. La boca también es una forma de conocer.",
      caregiver:
        "Puede sentirse que ‘todo pasa rápido’. Alegría y nostalgia pueden convivir. Permítete sentir sin juzgarte.",
      calm:
        "Después de explorar, el cuerpo pide calma: contacto y voz tranquila pueden sostener.",
    },
    "7-9": {
      babyToday:
        "Entre 7 y 9 meses hay más interacción y también puede aparecer ansiedad ante personas nuevas o separación. No es dependencia: es apego.",
      game:
        "🫣 Aparecer y desaparecer: cúbrete el rostro y vuelve. Ayuda a sentir seguridad y permanencia.",
      caregiver:
        "Si tu bebé te busca más, no es que lo estés ‘malacostumbrando’. Es que confía en ti.",
      calm:
        "Rutina + contacto al final del día ayudan a regular. La calma compartida también enseña.",
    },
    "10-12": {
      babyToday:
        "Entre 10 y 12 meses aparece más iniciativa: explorar, señalar, intentar ponerse de pie, comunicar deseos. Autonomía y seguridad van juntas.",
      game:
        "🧡 Pequeñas elecciones: ofrece dos opciones simples y observa. Elegir también es aprender.",
      caregiver:
        "Criar no es una línea recta. Hay días livianos y otros pesados. Tu bienestar también importa.",
      calm:
        "Al cerrar el día, recuérdate: acompañar no es hacerlo todo, es estar cuando importa.",
    },
    pregnancy: {
      babyToday:
        "En la gestación, el proceso ocurre de forma silenciosa y profunda. No es necesario sentirlo todo de inmediato. Cada experiencia es única.",
      game:
        "🎵 Vínculo suave: si te nace, habla o canta con calma. No es técnica; es conexión.",
      caregiver:
        "Gestar y acompañar transforma. Puede haber alegría, miedo, dudas o silencio emocional. Todo es humano.",
      calm:
        "🌿 Ritual breve: manos sobre el abdomen (si aplica), respirar 3 veces, y reconocer: ‘estamos en proceso’.",
    },
  },

  gamesByStage: {
    "0-1": [
      { title: "Mirarnos despacio", text: "Presencia y vínculo: mirada + voz suave por unos segundos." },
      { title: "Tu voz como refugio", text: "Háblale en rutinas (pañal, ropa). Tu tono es sostén." },
    ],
    "2-3": [
      { title: "Conversaciones suaves", text: "Responde a sus sonidos. Imitar y contestar es conexión." },
      { title: "Tiempo boca arriba", text: "Espacio seguro para mover brazos y piernas libremente." },
    ],
    "4-6": [
      { title: "Explorar con las manos", text: "Texturas seguras: tocar, mirar, llevar a la boca." },
      { title: "Boca abajo acompañado", text: "Momentos cortos, siempre con tu presencia y mirada." },
    ],
    "7-9": [
      { title: "Aparecer y desaparecer", text: "Juego simple: ‘¡acá estoy!’. Seguridad y permanencia." },
      { title: "Explorar el espacio", text: "Espacio seguro en el suelo. Acompaña sin dirigir todo." },
    ],
    "10-12": [
      { title: "Imitar juntos", text: "Imita gestos/sonidos y deja que te imite." },
      { title: "Pequeñas elecciones", text: "Dos opciones simples. Elegir también es aprender." },
    ],
    pregnancy: [
      { title: "Hablar con calma", text: "Si te nace, habla o canta suave. Es vínculo, no exigencia." },
      { title: "Respirar juntas/os", text: "Un minuto de respiración consciente para bajar el ritmo." },
    ],
  },

  calmSounds: [
    { title: "Ruido blanco", note: "Puedes usar un audio de YouTube o uno propio luego." },
    { title: "Sonidos suaves", note: "Lluvia / agua / viento (más adelante agregamos audios reales)." },
    { title: "Rutina breve", note: "Bajar luces, voz suave, contacto. Sin prisa." },
  ],

  dailyMessages: [
    "Hoy no necesitas hacerlo perfecto. Estar presente ya es suficiente.",
    "Criar también cansa. Descansar no es rendirse.",
    "El vínculo se construye en lo pequeño.",
    "No todo tiene que resolverse hoy.",
    "Tu bienestar también importa.",
    "Criar no se hace en soledad. Aquí estamos contigo.",
  ],
};

// 2) Estado del usuario (se guarda en el navegador)
const STORAGE_KEY = "nido_state_v1";
const defaultState = {
  role: null,       // "madre" | "padre" | "cuidador"
  stage: null,      // "pregnancy" | "0-1" | "2-3"...
  route: "home",    // "home" | "games" | "calm" | "profile"
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

// 3) Helpers para lenguaje inclusivo basado en rol
function roleLabel(roleId) {
  const r = CONTENT.roles.find(x => x.id === roleId);
  return r ? r.label : "quien cuida";
}

function greetForRole(roleId) {
  if (roleId === "madre") return "Bienvenida";
  if (roleId === "padre") return "Bienvenido";
  return "Bienvenida/o";
}

function youForRole(roleId) {
  // “madre/padre/persona cuidadora” como sustantivo
  if (roleId === "madre") return "como madre";
  if (roleId === "padre") return "como padre";
  return "como persona cuidadora";
}

// 4) Render principal
const appEl = document.getElementById("app");
const tabButtons = document.querySelectorAll(".tab");

function setRoute(route) {
  state.route = route;
  saveState(state);
  render();
}

function setRole(roleId) {
  state.role = roleId;
  saveState(state);
  render();
}

function setStage(stageId) {
  state.stage = stageId;
  saveState(state);
  render();
}

function resetProfile() {
  state = { ...defaultState };
  saveState(state);
  render();
}

// 5) UI components
function Card(title, bodyHtml) {
  return `
    <section class="card">
      <h2>${title}</h2>
      ${bodyHtml}
    </section>
  `;
}

function Notice(text) {
  return `<div class="notice">${text}</div>`;
}

function Pill(id, label, selected, onClickName) {
  const pressed = selected ? "true" : "false";
  return `
    <button class="pill" aria-pressed="${pressed}" onclick="${onClickName}('${id}')">
      ${label}
    </button>
  `;
}

function requireProfileGate() {
  if (!state.role || !state.stage) {
    const rolePicked = !!state.role;
    const stagePicked = !!state.stage;

    const rolePills = CONTENT.roles.map(r =>
      Pill(r.id, r.label, state.role === r.id, "window.__nidoSetRole")
    ).join("");

    const stagePills = CONTENT.stages.map(s =>
      Pill(s.id, s.label, state.stage === s.id, "window.__nidoSetStage")
    ).join("");

    const canContinue = rolePicked && stagePicked;

    return `
      ${Card("Antes de empezar", `
        <p>${greetForRole(state.role)}. En Nido queremos hablarte con respeto y claridad.</p>
        <div class="hr"></div>
        <p class="small">1) Elige tu rol</p>
        <div class="row">${rolePills}</div>
        <div class="hr"></div>
        <p class="small">2) Elige la etapa</p>
        <div class="row">${stagePills}</div>
        <div class="hr"></div>
        ${Notice("Aquí no buscamos hacerlo perfecto, sino acompañarte.")}
        <div class="hr"></div>
        <button class="btn" ${canContinue ? "" : "disabled"} onclick="window.__nidoGoHome()">
          Entrar a Nido
        </button>
      `)}
    `;
  }
  return null;
}

// 6) Screens
function renderHome() {
  const gate = requireProfileGate();
  if (gate) return gate;

  const stageContent = CONTENT.home[state.stage];
  const greeting = `${greetForRole(state.role)}. Gracias por estar aquí ${youForRole(state.role)}.`;

  // mensaje diario simple: rotación por día (no perfecto, pero funciona)
  const msgIndex = new Date().getDate() % CONTENT.dailyMessages.length;
  const daily = CONTENT.dailyMessages[msgIndex];

  return `
    ${Card("Hoy en Nido", `
      <p><strong>${greeting}</strong></p>
      <div class="hr"></div>
      <p>${daily}</p>
      <div class="hr"></div>
      <p class="small">Etapa seleccionada: <strong>${CONTENT.stages.find(s => s.id === state.stage)?.label}</strong></p>
    `)}

    ${Card("👶 Tu bebé hoy", `<p>${stageContent.babyToday}</p>`)}
    ${Card("🎲 Para acompañar hoy", `<p>${stageContent.game}</p>`)}
    ${Card("🤍 Para quien cuida", `<p>${stageContent.caregiver}</p>`)}
    ${Card("🌙 Momento de calma", `<p>${stageContent.calm}</p>`)}
  `;
}

function renderGames() {
  const gate = requireProfileGate();
  if (gate) return gate;

  const list = CONTENT.gamesByStage[state.stage] || [];
  const items = list.map(g => `
    ${Card(`🎲 ${g.title}`, `<p>${g.text}</p>`)}
  `).join("");

  return `
    ${Card("Juegos por etapa", `
      <p class="small">Pensados para acompañar sin presión. Pequeños momentos también cuentan.</p>
      <div class="hr"></div>
      <p>Estás en: <strong>${CONTENT.stages.find(s => s.id === state.stage)?.label}</strong></p>
    `)}
    ${items || Card("Aún no hay juegos aquí", `<p>Pronto agregaremos más opciones.</p>`)}
  `;
}

function renderCalm() {
  const gate = requireProfileGate();
  if (gate) return gate;

  const items = CONTENT.calmSounds.map(s => `
    ${Card(`🎵 ${s.title}`, `<p>${s.note}</p>`)}
  `).join("");

  return `
    ${Card("Calma y rutinas", `
      <p class="small">Nido no promete milagros: propone presencia, ritmo suave y descanso posible.</p>
    `)}
    ${items}
  `;
}

function renderProfile() {
  const role = state.role ? roleLabel(state.role) : "—";
  const stage = state.stage ? (CONTENT.stages.find(s => s.id === state.stage)?.label || "—") : "—";

  return `
    ${Card("Tu perfil en Nido", `
      <p><strong>Rol:</strong> ${role}</p>
      <p><strong>Etapa:</strong> ${stage}</p>
      <div class="hr"></div>
      <p class="small">Nido guarda esto en tu teléfono para personalizar el lenguaje y el contenido.</p>
      <div class="hr"></div>
      <button class="btn" onclick="window.__nidoReset()">Cambiar rol/etapa</button>
    `)}
    ${Card("Sobre Nido", `
      <p class="notice">
        Nido acompaña con información y herramientas prácticas. No reemplaza atención médica o psicológica.
        Si algo te preocupa, buscar apoyo profesional es un acto de cuidado.
      </p>
    `)}
  `;
}

function render() {
  // actualizar tabs
  tabButtons.forEach(btn => {
    const route = btn.dataset.route;
    btn.classList.toggle("active", route === state.route);
  });

  let html = "";
  if (state.route === "home") html = renderHome();
  else if (state.route === "games") html = renderGames();
  else if (state.route === "calm") html = renderCalm();
  else if (state.route === "profile") html = renderProfile();
  else html = renderHome();

  appEl.innerHTML = html;
}

// 7) Conectar botones del nav
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => setRoute(btn.dataset.route));
});

// 8) Exponer funciones globales (para los botones inline)
window.__nidoSetRole = setRole;
window.__nidoSetStage = setStage;
window.__nidoGoHome = () => setRoute("home");
window.__nidoReset = resetProfile;

// Start
render();
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.error);
  });
}
(function () {
  const ob = document.getElementById("onboarding");
  if (!ob) return;

  const screens = Array.from(ob.querySelectorAll(".ob-screen"));
  const btnNext = ob.querySelector("[data-next]");
  const btnFinish = ob.querySelector("[data-finish]");

  // Si ya terminó onboarding antes, no lo muestres
  const done = localStorage.getItem("nido_onboarding_done");
  if (done === "yes") {
    ob.style.display = "none";
    return;
  }

  function showStep(step) {
    screens.forEach((s) => s.classList.remove("is-active"));
    const target = screens.find((s) => s.dataset.step === String(step));
    if (target) target.classList.add("is-active");
  }

  // Pantalla 1 -> 2
  if (btnNext) {
    btnNext.addEventListener("click", () => showStep(2));
  }

  // Selección de rol (Pantalla 2 -> 3)
  ob.addEventListener("click", (e) => {
    const roleBtn = e.target.closest("[data-role]");
    if (roleBtn) {
      const role = roleBtn.getAttribute("data-role");
      localStorage.setItem("nido_role", role);
      showStep(3);
      return;
    }

    // Selección de etapa (Pantalla 3 -> 4)
    const stageBtn = e.target.closest("[data-stage]");
    if (stageBtn) {
      const stage = stageBtn.getAttribute("data-stage");
      localStorage.setItem("nido_stage", stage);
      showStep(4);
      return;
    }
  });

  // Finalizar (Pantalla 4 -> entra a la app)
  if (btnFinish) {
    btnFinish.addEventListener("click", () => {
      localStorage.setItem("nido_onboarding_done", "yes");
      ob.style.display = "none";
    });
    const mensajesPorEtapa = {
  "gestacion": [
    "Tu cuerpo está creando vida. Eso ya es suficiente por hoy 🤍",
    "Respira profundo. Estás haciendo algo inmenso.",
    "Hablarle hoy también es criar.",
    "Descansar también es preparar el nido."
  ],
  "0-1": [
    "Sobrevivir hoy ya es logro suficiente 🤍",
    "No estás haciendo mal, estás aprendiendo.",
    "Dormir poco no significa amar menos.",
    "Tu calma también regula."
  ],
  "2-3": [
    "Las sonrisas empiezan a aparecer 💛",
    "Tu voz ya es hogar.",
    "No necesitas hacerlo perfecto.",
    "Mirarse también es vínculo."
  ],
  "4-6": [
    "Explorar es parte del crecimiento.",
    "Tu presencia vale más que cualquier estímulo.",
    "Cada gesto tuyo construye seguridad.",
    "Criar también es acompañarte."
  ],
  "7-9": [
    "El movimiento es descubrimiento.",
    "Separarse un poco también es crecer.",
    "Estás sembrando confianza.",
    "No todo llanto es error."
  ],
  "10-12": [
    "Nombrar el mundo es empezar a habitarlo.",
    "Los límites también son cuidado.",
    "Tu mirada sigue siendo base segura.",
    "Criar es sostener y soltar."
  ]
};
  }

  // Asegura que arranque en la pantalla 1
  showStep(1);
})();



