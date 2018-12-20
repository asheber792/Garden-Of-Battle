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
	character.$el = characterDiv;
	gameBoard.append(character.$el);
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
		enemy.$el = enemyDiv; 
		gameBoard.append(enemy.$el);
	}
}

const isPosInGrid = (posX, posY) => {
	if(posX < 0 || posY < 0 || posX > 7 || posY > 4){
		return false; 
	}
	return true;
}

const getIndexOfEnemyAt = (posX, posY) => {
	return enemies.findIndex(enemy => enemy.posX == posX && enemy.posY == posX)
}

const enemyEncounter = (posX, posY) => {
	for(let i = 0; i < enemies.length; i++){
		if(enemies[i].posX == posX && enemies[i].posY == posY){
			enemies[i].posX = 4;
			enemies[i].posY = 2;
			let enemyBattlePos = convertToPix(enemies[i]);
			enemies[i].$el.style.left = enemyBattlePos[0];
			enemies[i].$el.style.top = enemyBattlePos[1];

			let otherEnemies = enemies.filter(enemy => enemy != enemies[i]); 
			
			for(const enemy of otherEnemies){
				enemy.$el.style.display = 'none';
			}

			return true;
		}

	}
	return false; 
}

const battleMode = () => {
	if(enemyEncounter(character.posX, character.posY)){
		const mode_title = document.querySelector('.mode-title');
		mode_title.textContent = "Battle Mode";
		
		let originalXPos = character.posX;
		let originalYPos = character.posY;  
		
		character.$el.style.background = `url(${character.rightPic})`;
		character.$el.style.backgroundSize = 'contain';

		character.posX = 3;
		character.posY = 2; 

		
		let characterBattlePos = convertToPix(character);
		character.$el.style.left = characterBattlePos[0]; 
		character.$el.style.top = characterBattlePos[1];

		document.body.removeEventListener('keydown', movementKeys);
	}
}

const moveUp = () => {
	if(isPosInGrid(character.posX, character.posY - 1)){
		character.$el.style.background = `url(${character.upPic})`;
		character.$el.style.backgroundSize = 'contain';
		
		character.posY -= 1;
		let newCharacterPos = convertToPix(character);
		character.$el.style.top = newCharacterPos[1];
		
		battleMode();
	}
}
const moveDown = () => {
	if(isPosInGrid(character.posX, character.posY + 1)){
		character.$el.style.background = `url(${character.downPic})`;
		character.$el.style.backgroundSize = 'contain';
		
		character.posY += 1;
		let newCharacterPos = convertToPix(character);
		character.$el.style.top = newCharacterPos[1];
		
		battleMode();
	}
}
const moveLeft = () => {
	if(isPosInGrid(character.posX - 1, character.posY)){
		character.$el.style.background = `url(${character.leftPic})`;
		character.$el.style.backgroundSize = 'contain';
		
		character.posX -= 1;
		let newCharacterPos = convertToPix(character);
		character.$el.style.left = newCharacterPos[0];
		
		battleMode();
	}
}
const moveRight = () => {
	if(isPosInGrid(character.posX + 1, character.posY)){
		character.$el.style.background = `url(${character.rightPic})`;
		character.$el.style.backgroundSize = 'contain';
		
		character.posX += 1;
		let newCharacterPos = convertToPix(character);
		character.$el.style.left = newCharacterPos[0];
		
		battleMode();
	}
}

const movementKeys = e => {
	const keyCode = e.keyCode;
  if ([37, 38, 39, 40, 65, 68, 39].includes(keyCode)) {
    e.preventDefault();
  }

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
}


renderFloorTiles();
renderPlayerCharacter(); 
renderEnemies();

document.body.addEventListener('keydown', movementKeys);

