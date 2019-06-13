
//Numerical representation of the game
// It uses numbers to represnt walls, empty space and the pacman
//creating grid of dimension 5unit*5unit
let gameData = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,2,2,2,5,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1]
];


//WALL is represented by number 1, empty ground by 2 and pacman by 5
const WALL = 1;
const GROUND = 2;
const PACMAN = 5;

// will use map to refer to game map
let map;
// will create pacman to have the x and y coordinates and the direction
let pacman = {
  x: 4,
  y: 4,
  direction: 'EAST'
};



//-------------------------------------------------------------
// Game map functions
//-------------------------------------------------------------
// converting gameData into DOM elements.
function createTiles(data) {

  let tilesArray = [];
  for (let row of data) {
    for (let col of row) {
      let tile = document.createElement('div');
      tile.classList.add('tile');
      if (col === WALL) {
        tile.classList.add('wall');

      } else if (col === GROUND) {
        tile.classList.add('ground');

      } else if (col === PACMAN) {
        tile.classList.add('pacman');
        tile.classList.add(pacman.direction);

      }
      tilesArray.push(tile);
    }

    let brTile = document.createElement('br');
    tilesArray.push(brTile);
  }

  // At the end of our function, we return the array
  // of configured tiles.
  return tilesArray;
}


//creating map element, filling the tiles and adding it to the page
function drawMap() {
  map = document.createElement('div');

  let tiles = createTiles(gameData);
  for (let tile of tiles) {
    map.appendChild(tile);
  }

  document.body.appendChild(map);
}

// This function removes the map element from the page.
function eraseMap() {
  document.body.removeChild(map);
}

//function to place the pacman
function place(x,y,direction)  {
//  if(x >=0 && y >= 0) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.x = x+1;
    pacman.y = y+1;
    pacman.direction = direction;
    gameData[pacman.y][pacman.x] = PACMAN;
    eraseMap();
    drawMap();
//  }
}

function move() {
  if(pacman.direction === 'EAST') {
    if (gameData[pacman.y][pacman.x+1] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.x = pacman.x + 1 ;
      gameData[pacman.y][pacman.x] = PACMAN;
    }

  } else if (pacman.direction === 'WEST') {
    if (gameData[pacman.y][pacman.x-1] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.x = pacman.x - 1 ;
      gameData[pacman.y][pacman.x] = PACMAN;
    }

  } else if (pacman.direction === 'NORTH') {
    if (gameData[pacman.y-1][pacman.x] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.y = pacman.y - 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }

  } else if (pacman.direction === 'SOUTH') {
    if (gameData[pacman.y+1][pacman.x] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.y = pacman.y + 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }
  }

  eraseMap();
  drawMap();
}

//Rotate left and change direction accordingly
function left() {
  var pacmanCont = document.querySelector('.pacman');
  pacmanCont.classList.add("leftPos");
  var leftPos = pacmanCont.classList.contains("leftPos");
  if(pacman.direction === 'EAST' && leftPos === true) {pacman.direction = 'NORTH';}
  else if(pacman.direction === 'WEST' && leftPos === true) {pacman.direction = 'SOUTH';}
  else if(pacman.direction === 'NORTH' && leftPos === true) {pacman.direction = 'WEST';}
  else if(pacman.direction === 'SOUTH' && leftPos === true) {pacman.direction = 'EAST';}
  eraseMap();
  drawMap();
}


//Rotate right and change direction accordingly
function right() {
  var pacmanCont = document.querySelector('.pacman');
  pacmanCont.classList.add("rightPos");
  var rightPos = pacmanCont.classList.contains("rightPos");
  if(pacman.direction === 'EAST' && rightPos === true) {pacman.direction = 'SOUTH';}
  else if(pacman.direction === 'WEST' && rightPos === true) {pacman.direction = 'NORTH';}
  else if(pacman.direction === 'NORTH' && rightPos === true) {pacman.direction = 'EAST';}
  else if(pacman.direction === 'SOUTH' && rightPos === true) {pacman.direction = 'WEST';}
  eraseMap();
  drawMap();
}

//function  to output the final position for pacman
function report() {
  var X = pacman.x-1;
  var Y = pacman.y-1;
  var dir = pacman.direction;
  var output = X + ',' + Y + ',' + dir;
  document.getElementById("output").innerHTML = "Output:" + " " + output;
}

//on blur of textbox the commands are executed
var textarea = document.getElementsByTagName("textarea").Text1;
textarea.addEventListener("blur", function (e) {
  readFromInput();
  textarea.value = "";
});

function readFromInput() {
  var textArea = document.getElementsByTagName("textarea").Text1;
  var inputCommands = textArea.value.split("\n");
  for (var i = 0; i < inputCommands.length; i++) {
    inputCommands[i] = inputCommands[i].trim();
    if(inputCommands[i].match("^PLACE")){
      var command = inputCommands[i];
      var words = command.split(' ');
      var xCord = parseInt(words[1]);
      var yCord = parseInt(words[2]);
      var direction = words[3];
      place(xCord,yCord,direction);
    }
    else if(inputCommands[i] === "MOVE"){ move(); }
    else if(inputCommands[i] === "LEFT"){ left(); }
    else if(inputCommands[i] === "RIGHT"){ right(); }
    if(inputCommands[i] === "REPORT"){ report(); }
  }
}

// Main   function
function main() {
  drawMap();
}

main();
