/*
  units.js
  Handles all unit and tower creation, movement, interaction and combat.
  Extendable per unit type.
  AI-generated starter.
*/

// Stores units on field
let playerUnits = [];
let aiUnits = [];

// Add unit after a card is played
function addPlayerUnit(card) {
    // Create unit object (expand: type, stats, position, lane)
    playerUnits.push({
        name: card.name,
        image: card.image,
        health: 15, // default
        damage: 6, // default
        position: { x: Math.random() * 800, y: 400 }, // random along player field
        lane: Math.random() > 0.5 ? "left" : "right"
    });
    // You would render this unit on the board, animate, etc.
}

// Similar for AI
function addAIUnit(card) {
    aiUnits.push({
        name: card.name,
        image: card.image,
        health: 15,
        damage: 6,
        position: { x: Math.random() * 800, y: 80 }, // random along enemy field
        lane: Math.random() > 0.5 ? "left" : "right"
    });
}

// Expand: logic for movement, combat, rendering, win/lose checks...
