const instrucBtn = document.querySelector('.control-instruc-btn'); 
const closeBtn = document.querySelector('.close'); 
const instruc = document.querySelector('.instruc');

instrucBtn.addEventListener('click', () => {
  instruc.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
	instruc.style.display = 'none';
});