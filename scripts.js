// Globals
var fotos = [];
var cardContainer = document.getElementById('card-container');
var photoModal = document.createElement('div');

// Classes
function Foto(title, caption, path) {
  this.title = title;
  this.caption = caption;
  this.path = path;
}

// Events
document.getElementById('input-title').addEventListener('input', validateInput);
document.getElementById('input-caption').addEventListener('input', validateInput);
document.getElementById('file').addEventListener('change', validateInput);

document.getElementById('save-button').addEventListener('click', function() {

  // DOM Element values
  var title = document.getElementById('input-title').value;
  var caption = document.getElementById('input-caption').value;
  var pathURL = "photos/" + document.getElementById('file').files[0].name;
  var titleInput = document.getElementById('input-title');
  var captionInput = document.getElementById('input-caption');
  var fileInput = document.getElementById('file');

  // Create foto object
  var foto = new Foto(title, caption, pathURL);

  // Create card Element
  var card = createCard(foto);

  fotos.push(card);
  refreshAlbum(cardContainer, fotos);

  // Clear Data from Input
  clearInputs(titleInput, captionInput);
});

cardContainer.addEventListener('click', function(e) {
  var thisCard = e.target.parentElement.parentElement;
  var dataAttribute = e.target.attributes.dataButtonType.value;
  var classAttribute = e.target.className;
  var eventTarget = e.target;

  // Card Image is clicked
  if (classAttribute === 'card-image') {
    // create close icon
    var modalCloseIcon = document.createElement('p');
    // add class
    modalCloseIcon.className = 'close-modal';
    photoModal.className = 'photo-modal';
    // updating data
    photoModal.style.backgroundImage = e.target.style.backgroundImage;
    photoModal.style.backgroundRepeat = 'no-repeat';
    modalCloseIcon.textContent = 'X';
    // appending elements
    photoModal.appendChild(modalCloseIcon);
    document.body.appendChild(photoModal);
  }

  // Delete icon is clicked
  if (dataAttribute === 'delete') {
    cardContainer.removeChild(thisCard);
    fotos.splice(fotos.indexOf(thisCard), 1);
    if (cardContainer.children.length === 0) {
      document.querySelector('.gallery').classList.add('message');
    }
  }

  // Favorite Icon is clicked
  if (dataAttribute === 'favorite') {
    switch (thisCard.className) {
      case 'card':
        thisCard.classList.add('favorited');
        // thisCard.style.backgroundColor = '#E26D5A'; <-- Disabled this feature because it looked dumb
        eventTarget.className = 'favorite-active';
        break;
      case 'card favorited':
        thisCard.classList.remove('favorited');
        // thisCard.style.backgroundColor = 'white'; <-- Disabled this feature because it looked dumb
        eventTarget.className = 'default';
        break;
      default:
    }
    fotos = sortFotos(fotos);
    refreshAlbum(cardContainer, fotos);
  }
});

photoModal.addEventListener('click', function() {
  document.body.removeChild(photoModal);
});

// functions

function validateInput() {
  var title = document.getElementById('input-title').value;
  var caption = document.getElementById('input-caption').value;
  var file = document.getElementById('file').files[0];
  var saveButton = document.getElementById('save-button');

  if (title !== "" && caption !== "" && file !== undefined) {
    saveButton.removeAttribute("disabled", "");
  } else {
    saveButton.setAttribute("disabled", "");
  }
}

function clearInputs(title, caption) {
  document.getElementById('save-button').setAttribute("disabled", "");
  document.getElementById('file').value = '';
  title.value = '';
  caption.value = '';
  document.querySelector('.gallery').classList.remove('message');
}

// Refresh Container Children from Foto Array
function refreshAlbum(container, array) {
  for (var i = 0; i < array.length; i++) {
    container.appendChild(array[i]);  }
}

// Sort Array based on Class Length
function sortFotos(array) {
  return array.sort(function(a, b) {
    return b.className.length - a.className.length;
  });
}

function createCard(foto) {
  // Create Card Element
  var card = document.createElement('div');
  var cardHeader = document.createElement('h2');
  var cardFigure = document.createElement('figure');
  var cardImg = document.createElement('div');
  var cardCaption = document.createElement('figcaption');
  var iconContainer = document.createElement('div');
  var deleteIcon = document.createElement('img');
  var favoriteIcon = document.createElement('div');

  // Add Data to DOM
  cardHeader.innerText = foto.title;
  cardCaption.innerText = foto.caption;
  cardImg.style.backgroundImage = 'url(' + foto.path + ')';
  favoriteIcon.className = "default";

  // Set Attributes to Elements
  deleteIcon.setAttribute('src', 'assets/delete.svg');
  deleteIcon.setAttribute('dataButtonType', 'delete');
  favoriteIcon.setAttribute('dataButtonType', 'favorite');
  cardImg.setAttribute('dataButtonType', 'card-image');
  cardHeader.setAttribute('dataButtonType', 'cardHeader');
  cardCaption.setAttribute('dataButtonType', 'cardCaption');
  iconContainer.setAttribute('dataButtonType', 'iconContainer');

  // Assign Class to Elements
  card.className = 'card';
  cardImg.className = 'card-image';
  iconContainer.className = 'icons';

  // Append to Card Elements
  card.appendChild(cardHeader);
  card.appendChild(cardFigure);
  cardFigure.appendChild(cardImg);
  cardFigure.appendChild(cardCaption);
  iconContainer.appendChild(deleteIcon);
  iconContainer.appendChild(favoriteIcon);
  card.appendChild(iconContainer);
  return card;
}

function populateGallery() {

  for (var i = 1; i < 11; i++) {

    var title = "Photo " + i;
    var caption = "Lorem ipsum dolor sit amet, consectetur adipiscing sua elit.";
    var pathURL = "photos/Photo" + i + ".jpg";
    var titleInput = document.getElementById('input-title');
    var captionInput = document.getElementById('input-caption');
    var fileInput = document.getElementById('file');

    // Create foto object
    var foto = new Foto(title, caption, pathURL);

    // Create card Element
    var card = createCard(foto);

    fotos.push(card);
  }
  document.querySelector('.gallery').classList.remove('message');
  refreshAlbum(cardContainer, fotos);
}
