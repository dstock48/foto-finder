// Globals
var fotos = [];
// Classes
function Foto(title, caption, path) {
  this.title = title;
  this.caption = caption;
  this.path = path;
}
// Main
// Functions
// Events
document.getElementById('save-button').addEventListener('click', function() {
  // DOM Element values
  var title = document.getElementById('input-title').value;
  var caption = document.getElementById('input-caption').value;
  // TODO: Get path from button
  var path = document.getElementById('file').files[0];

  // Create foto object
  var foto = new Foto(title ,caption , path);

  // Create Card Element
  var cardContainer = document.getElementById('card-container');
  var card = document.createElement('div');
  var cardHeader = document.createElement('h2');
  var cardFigure = document.createElement('figure');
  var cardImg = document.createElement('img');
  var cardCaption = document.createElement('figcaption');
  var iconContainer = document.createElement('div');
  var deleteIcon = document.createElement('img');
  var favoriteIcon = document.createElement('img');

  // Add Data to DOM
  cardHeader.innerText = foto.title;
  cardCaption.innerText = foto.caption;
  cardImg.setAttribute('src', 'photos/photo1.png');
  deleteIcon.setAttribute('src', 'assets/delete.svg');
  favoriteIcon.setAttribute('src', 'assets/favorite.svg');

  //Assing ID
  deleteIcon.setAttribute('id', 'delete');
  favoriteIcon.setAttribute('id', 'favorite');

  // Assign Class to Element
  card.className = 'card';
  cardImg.className = 'card-image';
  iconContainer.className = 'icons';

  // Append to Card Element
  card.appendChild(cardHeader);
  card.appendChild(cardFigure);
  cardFigure.appendChild(cardImg);
  cardFigure.appendChild(cardCaption);
  card.appendChild(iconContainer);
  iconContainer.appendChild(deleteIcon);
  iconContainer.appendChild(favoriteIcon);

  // Append to Body
  cardContainer.appendChild(card);
  fotos.push(foto);
});


// <div class="icons">
//   <img id="delete" src="assets/delete.svg" alt="">  <!-- BUG: these can't be ID's because there will be many of them on the page -->
//   <img id="favorite" src="assets/favorite.svg" alt="">  <!-------->
// </div>
