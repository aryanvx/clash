/*
  ai.js
  Basic AI to play cards.
  AI-generated starter.
*/

function aiMove() {
    if (!gameActive) return;
    // AI picks a random card it can afford (expand to smarter logic)
    const affordable = cards.filter(card => aiElixir >= card.elixir);
    if (affordable.length > 0) {
        const idx = Math.floor(Math.random() * affordable.length);
        const card = affordable[idx];
        aiElixir -= card.elixir;
        addAIUnit(card);
        logBattle(`AI played ${card.name}!`);
    }
}
