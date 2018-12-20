const gameBoard = document.querySelector('.game-board'); 
const characterDiv = document.createElement('div'); 
const character = {
	posX: 0, 
	posY: 0,
	upPic: `../images/hero_up.png`, 
	downPic: `../images/hero_down.png`, 
	leftPic: `../images/hero_left.png`, 
	rightPic: `../images/hero_right.png`,
	koPic: `../images/hero_ko.png`,
};

const enemies = [
	{
		posX: 7,
		posY: 1,
	},
	{
		posX: 5,
		posY: 4, 
	}
];

const renderFloorTiles = () => {
	for(let i = 0; i < 40; i++){
		const grass = document.createElement('div'); 
		grass.style.background = `url('../images/grass_flowers.png')`;
		grass.style.border = `1px solid black`; //temp
		gameBoard.appendChild(grass);
	}
}

const convertToPix = characterObj => {
	let posArray = [];

	let posXToPix = (characterObj.posX * 100).toString() + 'px'; 
	let posYToPix = (characterObj.posY * 100).toString() + 'px'; 
	 
	posArray.push(posXToPix);
	posArray.push(posYToPix);

	return posArray;
}

const renderPlayerCharacter = () => {
	characterDiv.classList.add('player'); 
	characterDiv.style.background = `url(${character.rightPic})`; 
	characterDiv.style.backgroundSize = 'contain'; 
	characterDiv.style.width = '100px'; 
	characterDiv.style.height = '100px';
	characterDiv.style.position = 'absolute';
	let characterPos = convertToPix(character);
	characterDiv.style.left = characterPos[0]; 
	characterDiv.style.top = characterPos[1];
	gameBoard.append(characterDiv);
}

const renderEnemies  = () => { 
	for(const enemy of enemies){
		const enemyDiv = document.createElement('div'); 
		enemyDiv.classList.add('enemy');
		enemyDiv.style.background = `url(../images/enemy.png)`;
		enemyDiv.style.backgroundSize = 'contain';
		enemyDiv.style.width = '100px'; 
		enemyDiv.style.height = '100px'; 
		enemyDiv.style.position = 'absolute';
		let enemyPos = convertToPix(enemy); 
		enemyDiv.style.left = enemyPos[0];
		enemyDiv.style.top = enemyPos[1];
		gameBoard.append(enemyDiv);
	}
}

const isPosInGrid = (posX, posY) => {
	if(posX < 0 || posY < 0 || posX > 7 || posY > 4){
		return false; 
	}
	return true;
}

const enemyEncounter = (posX, posY) => {
	for(const enemy of enemies){
		if(enemy.posX == posX && enemy.posY == posY){
			return true; 
		}
	}
	return false; 
}

const moveUp = () => {
	if(isPosInGrid(character.posX, character.posY - 1)){
		characterDiv.style.background = `url(${character.upPic})`;
		characterDiv.style.backgroundSize = 'contain';
		character.posY -= 1;
		let newCharacterPos = convertToPix(character);
		characterDiv.style.top = newCharacterPos[1];
		
	}
}
const moveDown = () => {
	if(isPosInGrid(character.posX, character.posY + 1)){
		characterDiv.style.background = `url(${character.downPic})`;
		characterDiv.style.backgroundSize = 'contain';
		character.posY += 1;
		let newCharacterPos = convertToPix(character);
		characterDiv.style.top = newCharacterPos[1];
		
	}
}
const moveLeft = () => {
	if(isPosInGrid(character.posX - 1, character.posY)){
		characterDiv.style.background = `url(${character.leftPic})`;
		characterDiv.style.backgroundSize = 'contain';
		character.posX -= 1;
		let newCharacterPos = convertToPix(character);
		characterDiv.style.left = newCharacterPos[0];
		
	}
}
const moveRight = () => {
	if(isPosInGrid(character.posX + 1, character.posY)){
		characterDiv.style.background = `url(${character.rightPic})`;
		characterDiv.style.backgroundSize = 'contain';
		character.posX += 1;
		let newCharacterPos = convertToPix(character);
		characterDiv.style.left = newCharacterPos[0];
		
	}
}


renderFloorTiles();
renderPlayerCharacter(); 
renderEnemies();

document.body.addEventListener('keydown', e => {
  const keyCode = e.keyCode;
  if ([37, 38, 39, 40].includes(keyCode)) {
    e.preventDefault();
  }
  // if (gameOver) return;
  switch (keyCode) {
  	case 38:
  	case 87:
      moveUp();
      break;
    case 40:
    case 65:
      moveDown();
      break;
    case 37:
    case 83:
      moveLeft();
      break;
    case 39:
    case 68:
      moveRight();
      break;   
  }
});

