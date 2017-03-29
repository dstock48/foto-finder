// Globals
var fotos = [];
var favorites = [];
var deleteBtn = document.getElementById('delete');
var cardContainer = document.getElementById('card-container');
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

  // Container Element
  var cardContainer = document.getElementById('card-container');

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
  deleteIcon.setAttribute('src', 'assets/delete.svg');
  favoriteIcon.className = "default";

  // Assign ID to Elements
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
  card.appendChild(iconContainer);
  iconContainer.appendChild(deleteIcon);
  iconContainer.appendChild(favoriteIcon);

  // Append to Card Container
  // cardContainer.appendChild(card);
  fotos.push(card);
  refreshAlbum(cardContainer);
  document.getElementById('save-button').setAttribute("disabled", "");
  document.getElementById('file').value = '';
  titleInput.value = '';
  captionInput.value = '';
  document.querySelector('.gallery').classList.remove('message');
});

cardContainer.addEventListener('click', function(e) {
  var idAttribute = e.target.id;
  var thisCard = e.target.parentElement.parentElement;
  var favoriteIcon = e.target;

  if (idAttribute === 'delete') {
    cardContainer.removeChild(thisCard);
    if (cardContainer.children.length === 0) {
      document.querySelector('.gallery').classList.add('message');
    }
  }

  if (idAttribute === 'favorite') {
    switch (thisCard.className) {
      case 'card':
        // fotos.push(thisCard);
        var tempCard = thisCard.className;
        thisCard.classList.add('favorited');
        favoriteIcon.className = 'favorite-active';
        // sortArray(fotos, thisCard);
        // refreshAlbum(cardContainer);
        console.log(thisCard.className);
        console.log(thisCard.className.length);
        console.dir(fotos);
        // sortArray(fotos, thisCard);
        fotos.sort(function(a, b) {
          return a.className.length - b.className.length;
        });
        break;
      case 'card favorited':
        // fotos.splice(favorites.indexOf(thisCard), 1);
        thisCard.classList.remove('favorited');
        favoriteIcon.className = 'default';
        // sortArray(fotos, thisCard);

        // refreshAlbum(cardContainer);
        console.log(thisCard.className);
        console.log(thisCard.className.length);
        console.dir(fotos);
        // sortArray(fotos, thisCard);
        fotos.sort(function(a, b) {
          return a.className.length - b.className.length;
        });
        break;
      default:
      refreshAlbum(cardContainer);
    }
  }
});


function refreshAlbum(container) {
  for (var i = 0; i < fotos.length; i++) {
    container.appendChild(fotos[i]);
  }
}

function sortArray(array, icon) {
  array.sort(favoriteCompare(icon));
}

function favoriteCompare(cardDiv) {
  return cardDiv.className.length - cardDiv.className.length;
  // if(cardDiv.className ==='card favorited') {
  //   return -1;
  // }
  // if(cardDiv.className === 'card') {
  //   return 1;
  // }
  // return 0;
}
