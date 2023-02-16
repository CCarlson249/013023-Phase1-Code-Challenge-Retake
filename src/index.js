// Your code here
const charApi = 'http://localhost:3000/characters'
const firstCharApi = 'http://localhost:3000/characters/1';
function el (id) {
return document.getElementById(id);
}
const charListTop = el('character-bar');

fetch(firstCharApi)
.then(res => res.json())
.then(char => charInfo(char));


fetch(charApi)
.then(res => res.json())
.then(char => renderList(char));


function renderList(char) {
    char.forEach(displayList);
}


function displayList(characters) {
const charElement = document.createElement('span');
charElement.textContent = characters.name;
charElement.addEventListener('click', () => charInfo(characters))
charListTop.append(charElement);
}

function charInfo(characters) {
    el('image').src = characters.image;
    el('name').textContent = characters.name;
    el('vote-count').textContent = characters.votes;
    const votesForm = el('votes-form');
    const votesInput = el('votes');
    el('votes-form').addEventListener('submit', (e) => {
      e.preventDefault();
      let enteredVotes = 0;
      enteredVotes = parseInt(votesInput.value);
      if (!isNaN(enteredVotes)) {
        characters.votes += enteredVotes;
        el('vote-count').textContent = characters.votes;
        votesInput.value ='';
      }
    });
  }
