'use strict';

// História do começo: cenas com diálogo, personagens que falam, piscam, pulam e mudam de expressão.
// Motivo do personagem: salvar a lojinha de informática do avô, a "Inforeal", que está para fechar.

/* ---------- Personagens ---------- */

const CAST = {
  vo: { name: 'Vô Tonico', skin: '#e0b48a', hair: '#d9d9d9', style: 'careca-lados', shirt: '#8b5e3c', beard: true, glasses: true },
  mae: { name: 'Mãe', skin: '#c68642', hair: '#2b1d0e', style: 'coque', shirt: '#e05577' },
  rival: { name: 'CapivaraPro', skin: '#f1c27d', hair: '#ffb547', style: 'topete', shirt: '#111827', shades: true },
  eu: null, // você: usa o avatar que você montou
};

const who = id => (id === 'eu' ? { name: S.playerName || 'Você', ...S.avatar } : CAST[id]);

const BROWS = {
  normal: 'M34 34 L46 33 M54 33 L66 34',
  feliz: 'M34 32 Q40 28 46 32 M54 32 Q60 28 66 32',
  triste: 'M34 32 L46 36 M54 36 L66 32',
  bravo: 'M34 31 L46 36 M54 36 L66 31',
  surpreso: 'M34 28 Q40 24 46 28 M54 28 Q60 24 66 28',
};
const MOUTHS = {
  normal: 'M43 55 Q50 58 57 55',
  feliz: 'M40 53 Q50 64 60 53',
  triste: 'M42 58 Q50 52 58 58',
  bravo: 'M42 57 L58 57',
  surpreso: 'M46 55 Q50 63 54 55 Q50 50 46 55',
};

function drawCharacter(c, emo = 'normal') {
  const hair = {
    curto: `<path d="M26 40 Q26 16 50 16 Q74 16 74 40 Q66 28 50 28 Q34 28 26 40Z" fill="${c.hair}"/>`,
    longo: `<path d="M24 44 Q22 14 50 14 Q78 14 76 44 L78 74 Q70 64 70 44 Q60 28 50 28 Q40 28 30 44 Q30 64 22 74Z" fill="${c.hair}"/>`,
    moicano: `<path d="M44 10 L56 10 L58 32 L42 32Z" fill="${c.hair}"/>`,
    careca: '',
    'careca-lados': `<path d="M25 46 Q24 30 30 26 L32 44Z M75 46 Q76 30 70 26 L68 44Z" fill="${c.hair}"/>`,
    coque: `<circle cx="50" cy="12" r="10" fill="${c.hair}"/><path d="M26 40 Q26 18 50 18 Q74 18 74 40 Q64 26 50 26 Q36 26 26 40Z" fill="${c.hair}"/>`,
    topete: `<path d="M26 38 Q28 10 60 8 Q78 12 74 38 Q64 22 48 26 Q34 28 26 38Z" fill="${c.hair}"/>`,
  }[c.style] || '';
  const tear = emo === 'triste' ? '<path class="tear" d="M38 48 Q36 54 38 56 Q40 54 38 48Z" fill="#7cc4ff"/>' : '';
  return `<svg viewBox="0 0 100 100" class="st-svg" aria-hidden="true">
    <path d="M18 100 Q18 70 50 70 Q82 70 82 100Z" fill="${c.shirt}"/>
    <rect x="44" y="60" width="12" height="12" fill="${c.skin}"/>
    <g class="st-head">
      <circle cx="50" cy="42" r="24" fill="${c.skin}"/>
      ${hair}
      <g class="st-eyes"><circle cx="41" cy="43" r="3" fill="#111"/><circle cx="59" cy="43" r="3" fill="#111"/></g>
      ${c.glasses ? '<g fill="none" stroke="#333" stroke-width="1.8"><circle cx="41" cy="43" r="6"/><circle cx="59" cy="43" r="6"/><path d="M47 43 L53 43"/></g>' : ''}
      ${c.shades ? '<path d="M33 39 L48 39 L46 47 L35 47Z M52 39 L67 39 L65 47 L54 47Z" fill="#111"/>' : ''}
      <path d="${BROWS[emo] || BROWS.normal}" stroke="#222" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      ${c.beard ? `<path d="M32 52 Q50 76 68 52 Q60 62 50 62 Q40 62 32 52Z" fill="${c.hair}"/>` : ''}
      <path class="st-mouth" d="${MOUTHS[emo] || MOUTHS.normal}" stroke="#111" stroke-width="2.5" fill="${emo === 'surpreso' ? '#111' : 'none'}" stroke-linecap="round"/>
      ${tear}
      ${c.headset ? `<path d="M24 44 Q24 12 50 12 Q76 12 76 44" stroke="#15161b" stroke-width="5" fill="none"/>
        <rect x="19" y="38" width="10" height="16" rx="4" fill="#15161b"/><rect x="71" y="38" width="10" height="16" rx="4" fill="#15161b"/>` : ''}
    </g>
  </svg>`;
}

/* ---------- Cenas ---------- */

// Cada fala: quem fala, expressão, ação (pula, treme, chega, sai), texto e escolhas opcionais.
const INTRO = [
  { bg: 'loja', place: '🏪 Loja Inforeal, bairro da Vila Nova — 19h', left: 'eu', right: 'vo', lines: [
    { who: 'vo', emo: 'feliz', act: 'chega', text: 'Aí está {nome}, minha pessoa favorita! Veio me ajudar a arrumar as prateleiras de novo?' },
    { who: 'eu', emo: 'feliz', text: 'Claro, vô! Mas... cadê as placas de vídeo que ficavam na vitrine?' },
    { who: 'vo', emo: 'triste', text: 'Vendi. Tive que vender. Chegou isso aqui hoje de manhã...' },
    { who: 'vo', emo: 'triste', act: 'treme', text: '📄 "Aviso de despejo. Prazo: 90 dias." Quarenta anos consertando computador nesse bairro, e agora ninguém mais vem aqui.' },
    { who: 'eu', emo: 'surpreso', act: 'pula', text: 'DESPEJO?! Vô, por que você não me contou antes?' },
    { who: 'vo', emo: 'triste', text: 'Não queria te preocupar. Hoje a molecada compra tudo pela internet, assistindo aqueles... como chama? Estrímers.' },
  ] },
  { bg: 'loja', place: '🏪 Loja Inforeal — alguns minutos depois', left: 'eu', right: 'rival', lines: [
    { who: 'rival', emo: 'feliz', act: 'chega', text: 'Ih, olha só, a loja do vovô ainda tá aberta? Achei que já tinha virado museu. KKKK' },
    { who: 'eu', emo: 'bravo', act: 'treme', text: 'CapivaraPro... O que você quer aqui?' },
    { who: 'rival', emo: 'normal', text: 'Relaxa. Só vim gravar um vídeo: "Visitei a loja mais ultrapassada da cidade". Vai dar uns 500 mil views fácil.' },
    { who: 'rival', emo: 'feliz', text: 'Meu canal tem 2 milhões de seguidores. E você? Tem o quê? Um PC de 2009 e uma capivara?' },
    { who: 'eu', emo: 'bravo', text: 'Pois é...', choice: [
      { label: '😤 "Um dia eu passo você."', reply: 'Você? KKKKKK. Tá bom, campeão. Te espero lá em cima.', emo: 'feliz', effect: () => { S.introStyle = 'raiva'; } },
      { label: '😏 "Pelo menos minha capivara é de verdade."', reply: 'Ei! A minha é... digital. Mas é mais bonita. Tchau!', emo: 'surpreso', effect: () => { S.introStyle = 'humor'; } },
    ] },
    { who: 'rival', emo: 'feliz', act: 'sai', text: 'Tchauzinho, loja do vovô! Não esquece de dar like no meu vídeo! 👋' },
  ] },
  { bg: 'quarto', place: '🏠 Casa da sua mãe — 23h', left: 'eu', right: 'mae', lines: [
    { who: 'mae', emo: 'bravo', act: 'chega', text: 'Ainda acordado?! Amanhã tem escola... que cara é essa?' },
    { who: 'eu', emo: 'triste', text: 'Mãe, a loja do vô vai fechar. Ele precisa de muito dinheiro em 90 dias. E o CapivaraPro ainda veio zoar ele.' },
    { who: 'mae', emo: 'triste', text: 'Eu sei, {nome}. Seu avô é teimoso, não quis aceitar ajuda de ninguém.' },
    { who: 'eu', emo: 'surpreso', act: 'pula', text: 'Espera... O CapivaraPro ganha dinheiro fazendo LIVE. E se EU fizer live? Eu entendo de PC. O vô me ensinou tudo!' },
    { who: 'mae', emo: 'surpreso', text: 'Você? Streamer? Com aquele computador que nem liga?' },
    { who: 'eu', emo: 'feliz', text: 'Eu monto um! Peça por peça. E cada vez que eu falar da loja na live, mais gente vai conhecer a Inforeal.' },
    { who: 'mae', emo: 'normal', text: 'Hm... Tenho R$ 1.500 guardados. É seu. MAS: se a nota cair, eu tiro o cabo da tomada. Combinado?' },
    { who: 'eu', emo: 'feliz', act: 'pula', text: 'COMBINADO! Obrigado, mãe! 💜', choice: [
      { label: '🤗 Dar um abraço', reply: 'Tá, tá... vai dormir, streamer. Te amo.', emo: 'feliz' },
      { label: '💻 Já abrir a loja de peças', reply: 'Nem um abraço? Tá bom... mas vai dormir antes da meia-noite!', emo: 'bravo' },
    ] },
  ] },
  { bg: 'loja', place: '🏪 Loja Inforeal — no dia seguinte', left: 'eu', right: 'vo', lines: [
    { who: 'eu', emo: 'feliz', act: 'chega', text: 'Vô! Tenho um plano. Vou virar streamer e salvar a loja!' },
    { who: 'vo', emo: 'surpreso', text: 'Estrímer? Você?' },
    { who: 'vo', emo: 'feliz', act: 'pula', text: 'HAHAHA! Essa é a garra de {nome}! Então leva a capivara da loja, ela dá sorte. E lembra da regra de ouro...' },
    { who: 'vo', emo: 'normal', text: 'NUNCA compre fonte genérica. Ela explode. Eu vi acontecer em 1998. Até hoje o teto tem a marca.' },
    { who: 'eu', emo: 'feliz', text: 'Pode deixar, vô. Em 90 dias essa loja vai estar lotada. Eu prometo! 🦫' },
  ] },
];

// Cenas curtas que aparecem conforme você cresce (a história continua).
const STORY_BEATS = [
  { at: 1000, id: 'beat1', bg: 'loja', place: '📞 Ligação do Vô Tonico', left: 'eu', right: 'vo', lines: [
    { who: 'vo', emo: 'feliz', act: 'pula', text: '{nome}! Entraram três moleques aqui hoje dizendo "vi na sua live"! Vendi dois mouses!' },
    { who: 'eu', emo: 'feliz', text: 'Tá funcionando, vô! Mil seguidores! Isso é só o começo.' },
  ] },
  { at: 20000, id: 'beat2', bg: 'loja', place: '🏪 Loja Inforeal', left: 'eu', right: 'rival', lines: [
    { who: 'rival', emo: 'bravo', act: 'chega', text: 'Então você é o tal que tá roubando meus inscritos? Tão falando de você no meu chat.' },
    { who: 'eu', emo: 'feliz', text: 'Eu te disse que um dia chegava lá.' },
    { who: 'rival', emo: 'bravo', act: 'sai', text: 'Isso não acabou! Nos vemos no ranking.' },
  ] },
  { at: 100000, id: 'beat3', bg: 'loja', place: '🏪 Loja Inforeal — fila na porta', left: 'eu', right: 'vo', lines: [
    { who: 'vo', emo: 'triste', text: 'Olha essa fila... Paguei o aluguel atrasado inteirinho. A loja está salva.' },
    { who: 'vo', emo: 'feliz', act: 'pula', text: 'Tô chorando de alegria, viu? Obrigado, {nome}. Agora vai lá e conquista o mundo!' },
    { who: 'eu', emo: 'feliz', act: 'pula', text: 'A Inforeal nunca vai fechar, vô! 🦫💜' },
  ] },
];

/* ---------- Tocador de cenas ---------- */

let story = null;

function playStory(scenes, onEnd) {
  story = { scenes, s: 0, l: 0, onEnd, typing: null, choosing: false };
  $('#story').hidden = false;
  showLine();
}

function showLine() {
  const st = story;
  const scene = st.scenes[st.s];
  const line = scene.lines[st.l];
  const box = $('#story');
  box.className = 'story bg-' + scene.bg;
  const side = line.who === scene.left ? 'left' : 'right';
  const other = side === 'left' ? scene.right : scene.left;
  const c = who(line.who);
  const prevEmo = st.emos && st.emos[other] || 'normal';
  st.emos = { ...(st.emos || {}), [line.who]: line.emo };
  box.innerHTML = `<div class="st-place">${scene.place}</div>
    <button class="btn ghost small st-skip" data-action="story-skip">Pular ⏭</button>
    <div class="st-stage">
      ${[scene.left, scene.right].map((id, i) => {
        const me = id === line.who;
        const pos = i === 0 ? 'left' : 'right';
        const act = me && line.act ? ' act-' + line.act : '';
        return `<div class="st-char ${pos} ${me ? 'talking' : 'listening'}${act}">${drawCharacter(who(id), me ? line.emo : prevEmo)}
          <div class="st-name">${who(id).name}</div></div>`;
      }).join('')}
    </div>
    <div class="st-box ${side}">
      <b>${c.name}</b>
      <p id="st-text"></p>
      <div class="st-choices" id="st-choices"></div>
      <div class="st-next muted">toque para continuar ▶</div>
    </div>`;
  typeText(line.text.replace(/\{nome\}/g, who('eu').name));
}

function typeText(text) {
  const el = $('#st-text');
  clearInterval(story.typing);
  let i = 0;
  story.full = text;
  story.typing = setInterval(() => {
    i += 2;
    el.textContent = text.slice(0, i);
    if (i >= text.length) finishTyping();
  }, 22);
}

function finishTyping() {
  clearInterval(story.typing);
  story.typing = null;
  $('#st-text').textContent = story.full;
  document.querySelector('.st-char.talking')?.classList.add('done');
  const line = story.scenes[story.s].lines[story.l];
  if (line.choice && !story.answered) {
    story.choosing = true;
    $('#st-choices').innerHTML = line.choice.map((o, i) => `<button class="btn small" data-action="story-choice" data-i="${i}">${o.label}</button>`).join('');
  }
}

function storyNext() {
  if (!story || story.choosing) return;
  if (story.typing) return finishTyping();
  story.answered = false;
  const scene = story.scenes[story.s];
  if (++story.l >= scene.lines.length) {
    story.l = 0;
    story.emos = {};
    if (++story.s >= story.scenes.length) return endStory();
  }
  showLine();
}

function storyChoice(i) {
  const scene = story.scenes[story.s];
  const line = scene.lines[story.l];
  const o = line.choice[i];
  if (o.effect) o.effect();
  story.choosing = false;
  story.answered = true;
  // Quem responde é o outro personagem da cena.
  const other = line.who === scene.left ? scene.right : scene.left;
  scene.lines.splice(story.l + 1, 0, { who: 'eu', emo: line.emo, text: o.label.replace(/^\S+\s/, '').replace(/"/g, '') }, { who: other, emo: o.emo, act: 'treme', text: o.reply });
  storyNext();
}

function endStory() {
  clearInterval(story && story.typing);
  const cb = story && story.onEnd;
  story = null;
  $('#story').hidden = true;
  if (cb) cb();
  saveGame();
}

function startIntro() {
  // Copia as cenas para as escolhas poderem inserir falas sem mudar o original.
  playStory(INTRO.map(s => ({ ...s, lines: [...s.lines] })), () => {
    S.introSeen = true;
    toast('🏪 Objetivo: salvar a loja do Vô Tonico! Chegue a 100 mil seguidores.', 'goal');
    changed();
  });
}

function askName() {
  const n = prompt('Qual é o nome do seu personagem?', S.playerName || '');
  if (n && n.trim()) S.playerName = n.trim().slice(0, 16);
}

Hooks.on('daily', () => {
  if (!S.introSeen) return;
  S.beats = S.beats || [];
  const b = STORY_BEATS.find(x => S.followers >= x.at && !S.beats.includes(x.id));
  if (!b || navigator.webdriver && !window.TEST_STORY) return;
  S.beats.push(b.id);
  setTimeout(() => playStory([{ ...b, lines: [...b.lines] }]), 600);
});

Hooks.on('action', d => {
  if (d.action === 'story-choice') storyChoice(Number(d.i));
  if (d.action === 'story-skip') endStory();
  const fresh = S.stats.lives === 0 && !S.pcOn && S.day === 1;
  if ((d.action === 'title-continue' || d.action === 'title-new') && fresh && !S.introSeen && (!navigator.webdriver || window.TEST_STORY)) { askName(); startIntro(); }
});

document.addEventListener('click', e => {
  const box = $('#story');
  if (!box || box.hidden || e.target.closest('[data-action]')) return;
  if (box.contains(e.target)) storyNext();
});
document.addEventListener('keydown', e => {
  if (story && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); storyNext(); }
});

// Quem já jogava antes da história não precisa vê-la.
if (S.introSeen === undefined) S.introSeen = !(S.stats.lives === 0 && !S.pcOn && S.day === 1);
