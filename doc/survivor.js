// survivor.js

// Flip-card toggle
const flipCard = document.querySelector('.flip-card');
flipCard.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') return;
  const front = flipCard.querySelector('.front');
  const back  = flipCard.querySelector('.back');
  front.style.display = front.style.display === 'none' ? 'block' : 'none';
  back.style.display  = back.style.display  === 'none' ? 'block' : 'none';
});

// Modal handlers
['allocate','gear','inv'].forEach(modal => {
  const btns = document.querySelectorAll(`button[title*="${modal.charAt(0).toUpperCase()+modal.slice(1)}"]`);
  const mdl  = document.getElementById(`modal-${modal}`);
  btns.forEach(btn => btn.addEventListener('click', e => {
    e.stopPropagation();
    mdl.style.display = 'block';
  }));
});

// Dynamic skills
export const skillsUnlocked = [];
export function addSkill(name) {
  if (skillsUnlocked.includes(name)) return;
  skillsUnlocked.push(name);
  const ul = document.getElementById('skills-list');
  const li = document.createElement('li');
  li.textContent = name;
  li.title = name;
  ul.appendChild(li);
}

// In survivor.js

/**
 * Create a random NPC opponent
 */
export function createNPC() {
  // Base stats from 0–3 + small random
  const base = () => Math.floor(Math.random()*4);
  const npc = {
    name: ['Snake','Razor','Ghost','Viper'][Math.floor(Math.random()*4)],
    stats: {
      end: base(),
      agi: base(),
      per: base(),
      str: base()
    },
    hp: 10 + base()*3,
    ap: 3 + base(),
  };
  return npc;
}
import { createNPC } from './survivor.js'; // or same file

let currentNPC = null;

// Open an encounter
export function startEncounter() {
  currentNPC = createNPC();
  const m = document.getElementById('modal-encounter');
  document.getElementById('npc-name').textContent = currentNPC.name;
  document.getElementById('npc-hp').textContent   = currentNPC.hp;
  document.getElementById('npc-ap').textContent   = currentNPC.ap;
  m.style.display = 'block';
}

// Close encounter
export function closeEncounter() {
  document.getElementById('modal-encounter').style.display = 'none';
}

// Player action handlers
document.getElementById('btn-npc-attack').addEventListener('click', e => {
  e.stopPropagation();
  // Simple damage: player STR vs NPC END
  const dmg = Math.max(1, state.stats.str * 2 - currentNPC.stats.end);
  currentNPC.hp -= dmg;
  alert(`You deal ${dmg} damage!`);
  updateNPCStats();
  npcTurn();
});

document.getElementById('btn-npc-defend').addEventListener('click', e => {
  e.stopPropagation();
  alert('You brace for the next hit.');
  npcTurn(true);
});

document.getElementById('btn-npc-special').addEventListener('click', e => {
  e.stopPropagation();
  // Use a skill if available
  if (!skillsUnlocked.includes('Power Strike')) {
    alert('You don’t know that skill!');
    return;
  }
  const dmg = state.stats.agi * 3;
  currentNPC.hp -= dmg;
  alert(`Power Strike hits for ${dmg}!`);
  updateNPCStats();
  npcTurn();
});

function updateNPCStats() {
  document.getElementById('npc-hp').textContent = Math.max(0, currentNPC.hp);
  if (currentNPC.hp <= 0) {
    alert(`You defeated ${currentNPC.name}!`);
    closeEncounter();
    // TODO: award loot/XP here
  }
}

function npcTurn(playerDefended = false) {
  if (currentNPC.hp <= 0) return;
  // NPC simple AI: 70% attack, else defend
  if (Math.random() < 0.7) {
    const dmg = Math.max(1, currentNPC.stats.str * 2 - (playerDefended ? state.stats.end*2 : state.stats.end));
    state.hp -= dmg;
    alert(`${currentNPC.name} hits you for ${dmg}!`);
    // TODO: update player HP display
  } else {
    alert(`${currentNPC.name} is defending.`);
  }
  if (state.hp <= 0) {
    alert('You have been defeated! Game over.');
    closeEncounter();
    // TODO: handle game over
  }
}


// Initialize empty
document.getElementById('skills-list').innerHTML = '';
