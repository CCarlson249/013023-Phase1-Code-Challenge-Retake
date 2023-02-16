
const charApi = 'http://localhost:3000/characters';
const firstCharApi = 'http://localhost:3000/characters/1';

function el(id) {
  return document.getElementById(id);
}

const charListTop = el('character-bar');
let selectedCharacter;

fetch(firstCharApi)
  .then(res => res.json())
  .then(char => charInfo(char));

fetch(charApi)
  .then(res => res.json())
  .then(char => renderList(char));

function renderList(char) {
  char.forEach(displayList);
}

function displayList(character) {
  const charElement = document.createElement('span');
  charElement.textContent = character.name;
  charElement.addEventListener('click', () => {
    selectedCharacter = character;
    charInfo(selectedCharacter);
  });
  charListTop.append(charElement);
}

function charInfo(character) {
  el('image').src = character.image;
  el('name').textContent = character.name;
  el('vote-count').textContent = parseInt(character.votes);
}

const votesForm = el('votes-form');
const votesInput = el('votes');
votesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (selectedCharacter && !isNaN(parseInt(votesInput.value))) {
    selectedCharacter.votes += parseInt(votesInput.value);
    el('vote-count').textContent = selectedCharacter.votes;
    votesInput.value = '';
  }
});