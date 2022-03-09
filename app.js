//Define UI Variables
const form = document.querySelector('#moke-form');
const mokeList = document.querySelector('#moke-list');
const totalMokemons = document.getElementById('total');

let mokeMonsArr = [];
let mokeDexArr = [];
// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  mokeList.addEventListener('click', deleteMokemon);
  mokeList.addEventListener('click', flipMe);
  mokeList.addEventListener('click', saveMeToDex);
}

//Column heading color
const tableHeading = document.getElementsByClassName('column-heading');
tableHeading[0].bgColor = "#ccc";

function Moke(name) {
  this.name = name;
}

// UI Constructor
function UI() {
}

UI.prototype.fetchKantoPokemon = function (moke) {
  let mokeFront = '';
  let mokeBack = '';
  let mokeName = '';

  const url = `https://pokeapi.co/api/v2/pokemon/` + moke.name;

  fetch(url)
  .then(response =>
      response.json()
  )
  .then(allDetails => {

        mokeName = allDetails.name;
        mokeFront = allDetails.sprites.front_default;
        mokeBack = allDetails.sprites.back_default;

        let mokeMonExists = false;
        const ui = new UI();

        mokeMonsArr.forEach((mokeMon) => {
          if (mokeName === mokeMon.name) {
            mokeMonExists = true;
          }
        });
        if (mokeMonExists) {
          ui.showAlert('Mokemon already exists!!', 'error');
        } else {
          mokeMonsArr.push({
            name: mokeName,
            front: mokeFront,
            back: mokeBack
          });

          // Create tr element
          const row = document.createElement('tr');
          row.style.color = 'green';
          // Insert columns
          row.innerHTML = `<td class="moke-name" style="font-family: Verdana; font-size:large;">${mokeName.toUpperCase()}</td>
<td id="moke-image"><img class="flip-me" src=${mokeFront} width="70" height="70"/></td>
<td id="moke-save"><button class="save-mokemon" id='actionsave' type="button" style="background: aquamarine">Save</button></td>
<td id="moke-remove"><a href="#" class='delete-mokemon'>Remove</a></td>`

          mokeList.appendChild(row);

          ui.showAlert('Mokemon successfully added', 'success');

          totalMokemons.innerText = "Total MOKEMONS choosen = "
              + mokeList.childElementCount;

        }
        ;
      }
  )
  .catch(() => {
    const ui = new UI();
    ui.showAlert('Sorry character not found', 'error');
  });

}

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('name').value = '';
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form

  //Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 500);

};

// add Mokemon Listeners
document.getElementById('moke-form').addEventListener("submit",
    function (e) {
      const name = document.getElementById('name').value;

      // Instantiate moke
      const moke = new Moke(name);

      const ui = new UI();

      // Validate
      if (name === '') {
        ui.showAlert('Please fill in value for search field', 'error');
      } else {
        ui.fetchKantoPokemon(moke);
        // Clear fields
        ui.clearFields();
      }

      e.preventDefault();
    });

// Remove Mokemon
function deleteMokemon(e) {
  if (e.target.classList.contains('delete-mokemon')) {
    const mokeMonRow = e.target.parentElement.parentElement;
    const mokeMonTd = mokeMonRow.getElementsByClassName('moke-name')

    if (confirm('You sure want to delete?')) {
      e.target.parentElement.parentElement.remove();
      const mokeMonDeleted = mokeMonTd[0].innerHTML;
      mokeMonsArr.forEach((mokeMon, index) => {
        if (mokeMonDeleted === mokeMon.name.toUpperCase()) {
          mokeMonsArr.splice(index, 1);
        }
      });

      totalMokemons.innerText = "Total MOKEMONS choosen = "
          + mokeList.childElementCount;
    }
  }
}

// Flip Mokemon
function flipMe(e) {
  if (e.target.classList.contains('flip-me')) {
    const mokeMonImageTd = e.target.parentElement;
    const flippingMokemonName = mokeMonImageTd.parentElement.firstElementChild.innerHTML;
    const originalImageSrc = mokeMonImageTd.firstElementChild.getAttribute(
        'src');

    mokeMonsArr.forEach((mokeMon) => {
      if (flippingMokemonName === mokeMon.name.toUpperCase()) {
        const flippedTd = document.createElement('td');
        flippedTd.id = 'moke-image';

        let flippedImage = document.createElement("img");
        if (originalImageSrc === mokeMon.back) {
          flippedImage.src = mokeMon.front;
        } else {
          flippedImage.src = mokeMon.back;
        }

        flippedImage.className = "flip-me";
        flippedImage.width = "70";
        flippedImage.height = "70";
        flippedTd.appendChild(flippedImage);
        mokeMonImageTd.parentNode.replaceChild(flippedTd,
            mokeMonImageTd);
        flippedImage.parentElement.style.textAlign = "center";

      }
    });
  }
  ;

}

//Save Mokemon to deck
const dexDiv = document.createElement('div');
dexDiv.id = "deckwrapper";

function saveMeToDex(e) {
  const mokeDexDiv = document.getElementsByClassName('moke-dex');
  const dexDivAlreadyExist = document.getElementById('deckwrapper');
  if (!dexDivAlreadyExist) {
    mokeDexDiv[0].appendChild(dexDiv);
  }
  // mokeDexDiv[0].appendChild(dexDiv);
  const dexItemDiv = document.createElement('div');
  dexItemDiv.id = "deckitem";

  if (e.target.classList.contains('save-mokemon')) {
    const saveThisMokeMonName = e.target.parentElement.parentElement.firstElementChild.innerHTML;
    const mokeMonImageSrc = e.target.parentElement.parentElement.children[1].firstElementChild.getAttribute(
        'src');

    let mokeMonExistInDex = false;
    mokeDexArr.forEach((mokeMon) => {
      if (saveThisMokeMonName === mokeMon.name) {
        mokeMonExistInDex = true;
      }
    });

    if (mokeMonExistInDex) {
      const ui = new UI();
      ui.showAlert('Mokemon you are trying to add already exist in the deck',
          'error');
    } else {
      const dexImage = document.createElement('img');
      const dexImageDeleteLink = document.createElement('a');

      dexDiv.appendChild(dexItemDiv);
      dexImageDeleteLink.href = "#";
      dexImageDeleteLink.className = "delete-me-from-dex";
      dexImageDeleteLink.innerText = 'Delete Me';

      dexImage.src = mokeMonImageSrc;
      dexItemDiv.appendChild(dexImage)
      // dexImage.innerHTML = dexImageDeleteLink;
      dexDiv.appendChild(dexItemDiv);
      // mokeDexDiv[0].appendChild(dexImageDeleteLink);

      mokeDexArr.push({
        name: saveThisMokeMonName,
        front: mokeMonImageSrc,
      })
    }
  }
}
