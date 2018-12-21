const $gameBoard = document.querySelector('.game-board');
const $mode_title = document.querySelector('.mode-title'); 

const keyInfoBox = document.createElement('div');
const keyRequest = document.createElement('h3');
let timer = document.createElement('h4'); 
let attack = document.createElement('div');

const attackCharacterPos = {posX: 3, posY: 2};
const attackEnemyPos = {posX: 4, posY: 2};
let randomKey = (Math.floor(Math.random()* 26)) + 65; 
let posXBeforeBattle = 0;
let posYBeforeBattle = 0; 
let otherEnemies = [];

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
		grass.style.border = `1px solid black`; //temp ?
		$gameBoard.append(grass);
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
	const characterDiv = document.createElement('div'); 
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
	$gameBoard.append(character.$el);
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
		$gameBoard.append(enemy.$el);
	}
}

const isPosInGrid = (posX, posY) => {
	if(posX < 0 || posY < 0 || posX > 7 || posY > 4){
		return false; 
	}
	return true;
}

const gameOver = () => {
	setTimeout(() => {
		if(confirm("You died. GAME OVER. Want to play again?")){
			location.reload(); 
		} 
		else{
			alert('This is the End.'); 
			document.body.removeEventListener('keydown', quickTimeKeyBattle);
			document.body.removeEventListener('keydown', movementKeys);

		}
	}, 1000);
}

const checkForWin = () => {
	if(enemies.length == 0){
		if(confirm('All enemies defeated. YOU WIN!!! Play again?')){
			location.reload(); 
		}
		else{
			alert('This is the End.'); 
			document.body.removeEventListener('keydown', quickTimeKeyBattle);
			document.body.removeEventListener('keydown', movementKeys);
		}
		document.body.removeEventListener('keydown', movementKeys);
	}
}

const movementKeys = e => {
	const keyCode = e.keyCode;
  	if ([37, 38, 39, 40, 65, 68, 83, 87].includes(keyCode)) {
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

const enemyEncounter = (posX, posY) => {
	for(let i = 0; i < enemies.length; i++){
		if(enemies[i].posX == posX && enemies[i].posY == posY){
			enemies[i].posX = 4;
			enemies[i].posY = 2;
			let enemyBattlePos = convertToPix(enemies[i]);
			enemies[i].$el.style.left = enemyBattlePos[0];
			enemies[i].$el.style.top = enemyBattlePos[1];

			otherEnemies = enemies.filter(enemy => enemy != enemies[i]); 
			
			for(const enemy of otherEnemies){
				enemy.$el.style.display = 'none';
			}

			return true;
		}

	}
	return false; 
}

const slashAttack = pos => {
	let slashEnemy = convertToPix(pos);
	attack.style.left = slashEnemy[0]; 
	attack.style.top = slashEnemy[1]; 
	$gameBoard.append(attack);
}

const characterDeath = () => {
	setTimeout(() => {
			character.$el.style.background = `url(${character.koPic})`;
			character.$el.style.backgroundSize = 'contain';
			$gameBoard.removeChild(attack);
			document.body.removeEventListener('keydown', quickTimeKeyBattle);
		}, 500);

		gameOver(); 
}

const enemyDeath = () => {
	setTimeout(() => {
		for(const enemy of enemies){
			attack.remove();
			document.body.removeEventListener('keydown', quickTimeKeyBattle);

			if(enemy.posX == attackEnemyPos.posX && enemy.posY == attackEnemyPos.posY){
				setInterval(() => {
					enemy.$el.classList.toggle('blink-death'); 
				}, 500); 
				setTimeout(() => {
					enemy.$el.style.display = 'none'; //enemy.$el.remove();
					enemies.splice(enemies.indexOf(enemy), 1);
					returntoRoamMode(); 
					$mode_title.textContent = "Roam Mode";
					keyInfoBox.removeChild(keyRequest);
					$gameBoard.removeChild(keyInfoBox); 
					document.body.addEventListener('keydown', movementKeys);
					setTimeout(() => {
						checkForWin(); 
					}, 300);
				}, 2000)
			}
		}
	}, 800);
}

const returntoRoamMode = () => {
	const previousCharacterPos = {posX: posXBeforeBattle, posY: posYBeforeBattle};
	let backInPos = convertToPix(previousCharacterPos); 
	character.$el.style.left = backInPos[0]; 
	character.$el.style.top = backInPos[1];

	for(const enemy of otherEnemies){
		enemy.$el.style.display = 'block';
	}
}

const quickTimeKeyBattle = e => {
	const keyCode = e.keyCode; 
	
	attack.classList.add('attack'); 
	attack.style.background = `url(../images/blue_slash.gif)`;
	attack.style.backgroundSize = 'contain';
	attack.style.width = '100px'; 
	attack.style.height = '100px'; 
	attack.style.position = 'absolute'; 

	let keyArray = []; 

	for(let i = 65; i <= 90; i++){
		keyArray.push(i); 
	}

	if(keyArray.includes(keyCode)){
		e.preventDefault(); 
	}

	if(keyCode != randomKey){
		slashAttack(attackCharacterPos);	
		characterDeath(); 
	}
	else{
		slashAttack(attackEnemyPos);
		enemyDeath(); 
	}

}

const battleMode = () => {
	if(enemyEncounter(character.posX, character.posY)){
		$mode_title.textContent = "Battle Mode";
		randomKey = (Math.floor(Math.random()* 26)) + 65; 
	
		posXBeforeBattle = character.posX;
		posYBeforeBattle = character.posY;  
		
		character.$el.style.background = `url(${character.rightPic})`;
		character.$el.style.backgroundSize = 'contain';

		character.posX = 3;
		character.posY = 2; 
		
		let characterBattlePos = convertToPix(character);
		character.$el.style.left = characterBattlePos[0]; 
		character.$el.style.top = characterBattlePos[1];

		document.body.removeEventListener('keydown', movementKeys);
		document.body.addEventListener('keydown', quickTimeKeyBattle);

		keyInfoBox.classList.add('keyInfoBox'); 
		keyInfoBox.style.backgroundColor = '#d7be82';
		keyInfoBox.style.opacity = "0.8";
		keyInfoBox.style.position = 'absolute'; 
		keyInfoBox.style.top = '1%'; 
		keyInfoBox.style.left = '1%';
		keyInfoBox.style.height = '10%'; 
		keyInfoBox.style.width = '30%';
		keyInfoBox.style.paddingTop = '3%'; 

		let keyChar = String.fromCharCode(randomKey); 

		keyInfoBox.classList.add('keyRequest'); 
		keyRequest.textContent = `Press [${keyChar}] to Attack`;
		keyRequest.style.textAlign = 'center'; 
		keyRequest.style.fontSize = '18pt'; 

		timer.classList.add('timer'); 
		timer.textContent = '3000'; 
		timer.style.color = 'white'; 
		timer.style.fontSize = '16pt';
		timer.style.position = 'absolute'; 
		timer.style.top = '-5%'; 
		timer.style.left = '1%'; 
		timer.style.height = '10%';
		timer.style.width = '25%';  

		setInterval(() => {
			let countDown = Number(timer.textContent);
			if(countDown != 0){
				countDown--; 
				timer.textContent = countDown; 
			}
		}, 1);

		keyInfoBox.appendChild(keyRequest); 
		$gameBoard.appendChild(keyInfoBox); 
		$gameBoard.appendChild(timer); 
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

renderFloorTiles();
renderPlayerCharacter(); 
renderEnemies();

document.body.addEventListener('keydown', movementKeys);

