/*
  game.js
  Main state, loop, board rendering, hand, UI, event handling.
  Uses separate modules for units and AI.
  AI-generated MVP engine.
*/

// --- Tower Images ---
const playerKingTowerImg = 'assets/images/kingtower(1).png';
const enemyKingTowerImg = 'assets/images/kingtower(2).png';
const friendlyTowerImg = 'assets/images/friendlytower.png';
const enemyTowerImg = 'assets/images/enemytower.png';

// --- Cards ---
const cards = [
  { name: "Archer", image: "assets/images/archer.png", elixir: 3 },
  { name: "Bomber", image: "assets/images/bomber.png", elixir: 3 },
  { name: "Knight", image: "assets/images/knight.png", elixir: 3 },
  { name: "Mini P.E.K.K.A.", image: "assets/images/minipekka.png", elixir: 4 },
  { name: "Musketeer", image: "assets/images/musketeer.png", elixir: 4 },
  { name: "Fireball", image: "assets/images/fireball.png", elixir: 4 },
  { name: "Spear Goblin", image: "assets/images/speargoblin.png", elixir: 2 },
  { name: "Giant", image: "assets/images/giant.png", elixir: 5 },
  { name: "Minion", image: "assets/images/minion.png", elixir: 3 },
  { name: "Valkyrie", image: "assets/images/valkyrie.png", elixir: 4 }
];

// --- Game State ---
let gameActive = false;
let playerElixir = 5; // max 10
let aiElixir = 5;

// Units and Towers - real logic in units.js
let playerUnits = [];
let aiUnits = [];
let towers = [];

// Utilities
function updateElixirBar() {
    let fill = document.getElementById('elixir-fill');
    if (!fill) {
        let bar = document.getElementById('elixir-bar');
        fill = document.createElement('div');
        fill.id = 'elixir-fill';
        bar.appendChild(fill);
    }
    fill.style.width = (playerElixir * 10) + '%';
}

// Initial Render: Board
function initBoard() {
    const board = document.getElementById('board');
    board.innerHTML = `
        <img src="${playerKingTowerImg}" class="tower" style="bottom:22px; left:390px;" />
        <img src="${friendlyTowerImg}" class="tower" style="bottom:100px; left:190px;" />
        <img src="${friendlyTowerImg}" class="tower" style="bottom:100px; left:590px;" />
        <img src="${enemyKingTowerImg}" class="tower" style="top:22px; left:390px;" />
        <img src="${enemyTowerImg}" class="tower" style="top:100px; left:190px;" />
        <img src="${enemyTowerImg}" class="tower" style="top:100px; left:590px;" />
    `;
}

// Initial Render: Hand
function renderPlayerHand() {
    const handDiv = document.getElementById('player-hand');
    handDiv.innerHTML = '<h3>Your Cards</h3>';
    cards.forEach((card, idx) => {
        handDiv.innerHTML += `
          <div class="card" onclick="playCard(${idx})">
            <img src="${card.image}" alt="${card.name}"/>
            <div>${card.name}<br>Elixir: ${card.elixir}</div>
          </div>`;
    });
}

// Play Card Handler
window.playCard = function(idx) {
    if (!gameActive) return;
    const card = cards[idx];
    if (playerElixir < card.elixir) {
        alert('Not enough elixir!');
        return;
    }
    playerElixir -= card.elixir;
    updateElixirBar();
    addPlayerUnit(card); // units.js
    logBattle(`Player played ${card.name}!`);
    aiMove(); // ai.js
};

// Battle Log
function logBattle(msg) {
    const battleLog = document.getElementById('battle-log');
    battleLog.innerHTML = `<div>${msg}</div>`;
}

// --- Game Loop ---
function startGame() {
    gameActive = true;
    playerElixir = 5;
    aiElixir = 5;
    updateElixirBar();
    initBoard();
    renderPlayerHand();
    logBattle("Battle Started!");
    // Start elixir regen loop
    setInterval(() => {
        if (!gameActive) return;
        if (playerElixir < 10) playerElixir += 0.1;
        updateElixirBar();
    }, 250);
}
document.getElementById('start-btn').onclick = startGame;

// At page load
initBoard();
updateElixirBar();
renderPlayerHand();
