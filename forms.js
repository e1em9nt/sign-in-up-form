'use strict'

// Selecting elements
const signUpForm = document.getElementById('sign-up-form');
const nameInput = document.querySelector('#input-name');
const emailInput = document.querySelector('#input-email');
const notValidEmail = document.querySelector('.email-not-valid');
const pswdInput = document.querySelector('#input-pswd');
const confirmPswd = document.getElementById('confirm-pswd');
const pswdSrength = document.querySelector('.pswd-strength');
const pswdContain = document.querySelectorAll('.pswd-contain');
const easyPswd = document.querySelector('.easy-pswd');
const mediumPswd = document.querySelector('.medium-pswd');
const strongPswd = document.querySelector('.strong-pswd');
const bodyEl = document.querySelector('body');
const btn = document.querySelector('.btn');
const warn = document.querySelector('.confirm-pswd-warn');

/*const btnSignIn = document.querySelector('.btnSignIn');
const inputSignInName = document.querySelector('#input-sign-in-name');
const inputSignInPswd = document.querySelector('#input-sign-in-pswd');*/

let accounts = [];

const changePswdContainColor = function (color) {
    pswdContain.forEach(pswdContain => {
		pswdContain.style.color = color;
	});
}

const createNewAccount = function(username, email, pswd) {
	let account = {
		username,
		email,
		pswd
	};
	accounts.push(account);
}    

pswdInput.addEventListener('input', function() {
	pswdSrength.classList.remove('hidden');
	signUpForm.style.top = '10%';

	// Starting conditions
	const minLength = 8;
	let pswdValue = pswdInput.value;
	const isLetters = /^[a-zA-Z]+$/.test(pswdValue);
	const isNumbers = /^\d+$/.test(pswdValue);
	const isSymbols = /^[^a-zA-Z0-9]+$/.test(pswdValue);

	const isLettersAndNumbers = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(pswdValue);
	const isNumbersAndSymbols = /^(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/.test(pswdValue);
	const isLettersAndSymbols = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).+$/.test(pswdValue);
	const isAll = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/.test(pswdValue);

	// Check for password strength 
	if(pswdValue.length > 0 && pswdValue.length < minLength) {
		changePswdContainColor("#d7415e");
	} else if (isAll) {
		changePswdContainColor("#84bc9c");
	} else if (isLetters || isNumbers || isSymbols) {
		easyPswd.style.color = "#d7415e";
		mediumPswd.style.color = "";
		strongPswd.style.color = "";
	} else if (isLettersAndSymbols || isNumbersAndSymbols || isLettersAndNumbers) {
		easyPswd.style.color = "#ffda5f";
		mediumPswd.style.color = "#ffda5f";
		strongPswd.style.color = "";
	} else changePswdContainColor('');
});


emailInput.addEventListener('input', function(e) {
	e.preventDefault();
	notValidEmail.classList.remove('hidden')

	const isEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emailInput.value);

	if(isEmail) notValidEmail.classList.add('hidden')
})

bodyEl.addEventListener('click', function() {
	pswdSrength.classList.add('hidden');
	signUpForm.style.top = '';
});

btn.addEventListener('click', function(e) {
	e.preventDefault();

	const username = nameInput.value;
	const email = emailInput.value;
	const pswd = pswdInput.value;

	if(username && email && pswd) {

	// Check for passwords matches
	if(pswd === confirmPswd.value) {
		const isUserExists = accounts.some(account => account.username === username || account.email === email);
		if(!isUserExists) {
			createNewAccount(username, email, pswd);
			warn.textContent = '';
			console.log(accounts);
			alert('Реєстрація успішна!');

			nameInput.value = '';
			emailInput.value = '';
            pswdInput.value = '';
            confirmPswd.value = '';
		} else alert('Користувач з таким іменем або електронною поштою вже існує.');
	} else warn.textContent = 'Passwords do not match!';
} else alert('Заповніть всі поля'); });


/*btnSignIn.addEventListener('submit', function() {
	const currentAcc = accounts.find(acc => acc.username === inputSignInName.value);

	if(currentAcc?.pswd === Number(inputSignInPswd.value)) console.log('SIGN IN');
});*/
