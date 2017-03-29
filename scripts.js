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

function validateInput(e) {
  // console.log(e);
  var title = document.getElementById('input-title').value;
  var caption = document.getElementById('input-caption').value;
  var file = document.getElementById('file').files[0];

  if (title !== "" && caption !== "" && file !== undefined) {
    document.getElementById('save-button').removeAttribute("disabled", "");
  } else {
    document.getElementById('save-button').setAttribute("disabled", "");
  }
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
  document.getElementById('save-button').setAttribute("disabled", "");
  document.getElementById('file').value = '';
  titleInput.value = '';
  captionInput.value = '';
  document.querySelector('.gallery').classList.remove('message');
});

photoModal.addEventListener('click', function() {
  var documentBody = document.querySelector('body');
  documentBody.removeChild(photoModal);
})

cardContainer.addEventListener('click', function(e) {
  var idAttribute = e.target.id;
  var classAttribute = e.target.className;
  var thisCard = e.target.parentElement.parentElement;
  var favoriteIcon = e.target;
  var documentBody = document.querySelector('body');

  // Card Image is clicked
  if (classAttribute === 'card-image') {
    var modalCloseIcon = document.createElement('p');
    console.log(e);
    photoModal.className = 'photo-modal';
    photoModal.style.backgroundImage = e.target.style.backgroundImage;
    photoModal.style.backgroundRepeat = 'no-repeat'
    modalCloseIcon.textContent = 'Close (x)';
    modalCloseIcon.className = 'close-modal';
    photoModal.appendChild(modalCloseIcon);
    documentBody.appendChild(photoModal);
  }

  // Delete icon is clicked
  if (idAttribute === 'delete') {
    cardContainer.removeChild(thisCard);
    fotos.splice(fotos.indexOf(thisCard), 1);
    if (cardContainer.children.length === 0) {
      document.querySelector('.gallery').classList.add('message');
    }
  }

  // Favorite Icon is clicked
  if (idAttribute === 'favorite') {
    switch (thisCard.className) {
      case 'card':
        thisCard.classList.add('favorited');
        favoriteIcon.className = 'favorite-active';
        break;
      case 'card favorited':
        thisCard.classList.remove('favorited');
        favoriteIcon.className = 'default';
        break;
      default:
    }
    fotos = sortFotos(fotos);
    refreshAlbum(cardContainer, fotos);
  }
});

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
  deleteIcon.setAttribute('id', 'delete');
  favoriteIcon.setAttribute('id', 'favorite');

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


// TODO: Changes - sort function - done
// TODO: Delete - favoriteCompare() - done
// TODO: Add - create card function - done
