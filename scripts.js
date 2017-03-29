// Globals
var favorites = [];
// Classes
function Foto(title, caption, path) {
  this.title = title;
  this.caption = caption;
  this.path = path;
}

// Events
document.getElementById('save-button').addEventListener('click', function() {
  // DOM Element values
  var title = document.getElementById('input-title').value;
  var caption = document.getElementById('input-caption').value;
  var pathURL = "photos/" + document.getElementById('file').files[0].name;

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
  var favoriteIcon = document.createElement('img');

  // Add Data to DOM
  cardHeader.innerText = foto.title;
  cardCaption.innerText = foto.caption;
  cardImg.style.backgroundImage = 'url(' + foto.path + ')';
  deleteIcon.setAttribute('src', 'assets/delete.svg');
  favoriteIcon.setAttribute('src', 'assets/favorite.svg');

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
  cardContainer.appendChild(card);


  // TODO: clear input after button pressed

});

// TODO: Delete icon functional
var deleteBtn = document.getElementById('delete');
var cardContainer = document.getElementById('card-container');

cardContainer.addEventListener('click', function(e) {
  console.log(e.target.parentElement.parentElement);
  console.log(e);
  var idAttribute = e.target.id;
  var thisCard = e.target.parentElement.parentElement;
  var favoriteIcon = document.getElementById(idAttribute);

  if (idAttribute === 'delete') {
    cardContainer.removeChild(thisCard);
    console.log('IT WORKS!');
  }

  if (idAttribute === 'favorite') {
    switch (thisCard.className) {
      case 'card':
        // favorites.push(thisCard);
        // thisCard.classList.add('favorited');
        favoriteIcon.setAttribute('src', 'assets/favorite-active.svg');
        console.log(thisCard);
        // console.log(favorites);
        break;
      case 'card favorited':
        // favorites.pop(thisCard);
        // thisCard.classList.remove('favorited');
        favoriteIcon.setAttribute('src', 'assets/favorite.svg');
        console.log(thisCard);
        // console.log(favorites);
        break;
      default:

    }
  }

  // cardContainer.removeChild(card);
});
