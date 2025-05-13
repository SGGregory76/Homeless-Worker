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

// Initialize empty
document.getElementById('skills-list').innerHTML = '';
