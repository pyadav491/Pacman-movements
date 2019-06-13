
//Numerical representation of the game
// It uses numbers to represnt walls, empty space and the pacman
let gameData = [
  [1,1,1,1,1,1,1],
  [1,2,2,2,2,2,1],
  [1,2,2,2,2,2,1],
  [1,2,2,5,2,2,1],
  [1,2,2,2,2,2,1],
  [1,2,2,2,2,2,1],
  [1,1,1,1,1,1,1]
];

var gridHeight = gameData.length - 2; //2 is for walls on both sides
//WALL is represented by number 1, empty ground by 2 and pacman by 5
const WALL = 1;
const GROUND = 2;
const PACMAN = 5;

// will use map to refer to game map
let map;
// will create pacman to have the x and y coordinates and the direction
let pacman = {
  x: 3,
  y: 3,
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

// This function redraws the map element from the page.
function reDrawMap() {
  document.body.removeChild(map);
  drawMap();
}

//function to place the pacman
function place(x,y,direction)  {
  if((x >=0 && y >= 0) && (x <= gridHeight-1 && y <= gridHeight-1)) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.x = x+1;
    pacman.y = gridHeight - y;
    pacman.direction = direction;
    gameData[pacman.y][pacman.x] = PACMAN;
    reDrawMap();
  }
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

  reDrawMap();
}

//Rotate left and change direction accordingly
function left() {
  var pacmanCont = document.querySelector('.pacman');
  pacmanCont.classList.add("leftPos");
  if(pacman.direction === 'EAST') {pacman.direction = 'NORTH';}
  else if(pacman.direction === 'WEST') {pacman.direction = 'SOUTH';}
  else if(pacman.direction === 'NORTH') {pacman.direction = 'WEST';}
  else if(pacman.direction === 'SOUTH') {pacman.direction = 'EAST';}
  reDrawMap();
}


//Rotate right and change direction accordingly
function right() {
  var pacmanCont = document.querySelector('.pacman');
  pacmanCont.classList.add("rightPos");
  if(pacman.direction === 'EAST') {pacman.direction = 'SOUTH';}
  else if(pacman.direction === 'WEST') {pacman.direction = 'NORTH';}
  else if(pacman.direction === 'NORTH') {pacman.direction = 'EAST';}
  else if(pacman.direction === 'SOUTH') {pacman.direction = 'WEST';}
  reDrawMap();
}

//function  to output the final position for pacman
function report() {
  var X = pacman.x-1;
  var Y = gridHeight-pacman.y;
  var dir = pacman.direction;
  var output = X + ',' + Y + ',' + dir;
  document.getElementById("output").innerHTML = "Output:" + " " + output;
}

//on blur of textbox the commands are executed
var textarea = document.getElementById("textarea");
textarea.addEventListener("blur", function (e) {
  readFromInput();
  textarea.value = "";
});

function readFromInput() {
  var textArea = document.getElementById("textarea");
  var inputCommands = textArea.value.split("\n");
  function firstOccurrence(element) {
    return element.match("^PLACE");
  }
  var firstOccurrenceIndex = inputCommands.findIndex(firstOccurrence);
  if(firstOccurrenceIndex >= 0) {
    var validCommands = inputCommands.slice(firstOccurrenceIndex);
    for (var i = 0; i < validCommands.length; i++) {
      validCommands[i] = validCommands[i].trim();
      if(validCommands[i].match("^PLACE")){
        var command = validCommands[i];
        var words = command.split(' ');
        var args = words[1].split(',');
        var xCord = parseInt(args[0]);
        var yCord = parseInt(args[1]);
        var direction = args[2];
        place(xCord,yCord,direction);
      }

      else if(validCommands[i] === "MOVE"){ move(); }
      else if(validCommands[i] === "LEFT"){ left(); }
      else if(validCommands[i] === "RIGHT"){ right(); }
      if(validCommands[i] === "REPORT"){ report(); }
    }
  }
}

// Main   function
function main() {
  drawMap();
}

main();
