// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

// PERSONAL ACCESS TOKEN : patt85hn5qn6NSDm3.ffadbcdda546c381ce054eba74e69d5909c3daa42aee0eeef18438c5c3786ee2

// https://airtable.com/appmqx3AsOPOuAddI/tblIDzvpWZes5YcMG/viw2juumuVu1243aB/recY3eLA13afIWRZS?blocks=hide

// const API_KEY =
// 'patt85hn5qn6NSDm3.ffadbcdda546c381ce054eba74e69d5909c3daa42aee0eeef18438c5c3786ee2';

// const baseId = 'appmqx3AsOPOuAddI/tblIDzvpWZes5YcMG';
// const tableId = 'tblIDzvpWZes5YcMG/viw2juumuVu1243aB'
// const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

// Try putting ids on these things like page-title and page-choices so that in your JS,
// you can use document.querySelector('#page-title') to get at this easily, and then set
// the inner text to whatever the next page should be when you click the next button.



let pageNumber = 0;
// [{name: "blue lagoon", flavors: ["lemon", "mint"]}]
// list.filter((drink) => {})
let formResponses = {

}

async function fetchData () {
	const API_KEY =
	'patt85hn5qn6NSDm3.ffadbcdda546c381ce054eba74e69d5909c3daa42aee0eeef18438c5c3786ee2';

	const baseId = 'appmqx3AsOPOuAddI';
	const tableId = 'tblIDzvpWZes5YcMG';
	const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;


	fetch(apiUrl, {
	headers: {
		'Authorization': `Bearer ${API_KEY}`
	}
	})
	.then(response => response.json())
	.then(data => {
	console.log(data); // This will log the retrieved data from your Airtable base
	})
	.catch(error => {
	console.error('Error fetching data:', error);
	});
}

const airtableDrinks = fetchData();

async function determineDrink() {
	const lime = airtableDrinks.filter(cocktail => cocktail.fields.Flavors.includes("lime"));
	console.log("lime: " + lime)
}

//determineDrink();

const title = document.querySelector("#page-title");
const martini = document.querySelector("#pink-martini")
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const baseChoice = document.querySelector(".base-choice");
const mixerChoice = document.querySelector(".mixer-choice");
const flavorChoice = document.querySelector(".flavor-choice");
const sweetnessChoice = document.querySelector (".sweetness-choice");
const potentialDrinks = document.querySelector (".potential-drinks");
const restartButton = document.querySelector("#restart");


function updateTitles () {
	if (pageNumber === 0) {
		title.innerHTML = "WONDERING WHAT YOU SHOULD ORDER AT THE BAR?";
	} else if (pageNumber === 1) {
		title.innerHTML = "ARE YOU 21 OR OLDER?";
	} else if (pageNumber === 2) {
		title.innerHTML = "SORRY, COME BACK ON YOUR 21ST BIRTHDAY!";
	} else if (pageNumber === 3) {
		title.innerHTML = "WHAT'S YOUR BASE OF CHOICE?";
	} else if (pageNumber === 4) {
		title.innerHTML = "HAVE A MIXER YOU'RE A FAN OF?";
	} else if (pageNumber === 5) {
		title.innerHTML = "ANY FLAVORS CALLING YOUR NAME?";
	} else if (pageNumber === 6) {
		title.innerHTML = "HOW SWEET DO YOU WANT YOUR POISON?";
	} else if (pageNumber === 7) {
		title.innerHTML = "YOUR POTENTIAL SIGNATURE DRINKS";
	}
}

function updateContent () {
	if (pageNumber === 0 || pageNumber === 1 || pageNumber === 2) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 3) {
		baseChoice.style.display = "block";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 4) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "block";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 5) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "block";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 6) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "block";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 7) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "grid";
	}
}

// function showCard(cardNumber) {
//       const card = document.getElementById(`card${cardNumber}`);
// 		if (card !== "undefined") {
// 			card.style.display = 'block';
// 		}
//     }

// function hideCard(cardNumber) {
//       const card = document.getElementById(`card${cardNumber}`);
// 		if (card !== "undefined") {
// 			card.style.display = 'block';
// 		}
//     }

const baseChoiceArea = document.querySelector('.base-choice');
baseChoiceArea.addEventListener('mouseover', showCard);

function showCard(event) {
	alert();
	const hovered = event.target;

	if ( hovered.classList.includes('hover-element')){
		const card = hovered.querySelector('.card');
		if (card !== "undefined") {
			card.style.display = 'block';
		}
	}
}

function updateButtons () {
	if (pageNumber === 0) {
		prevButton.style.display = "none";
		restartButton.style.display = "none";
		nextButton.style.display = "block";
		nextButton.innerHTML = "Yes!";
	} else if (pageNumber === 7) {
		prevButton.style.display = "none";
		nextButton.style.display = "none"
		restartButton.style.display = "block";
	} else {
		prevButton.style.display = "block";
		nextButton.style.display = "block";
		restartButton.style.display = "none";
		nextButton.innerHTML = "Next";
	}
}

function restartPage () {
	pageNumber = 0;
}

function nextPage() {
	pageNumber++;
	updateTitles();
	updateContent();
	updateButtons ();
	// showCard ();
	// hideCard ();
}

function yesResponse() {
	pageNumber = 3;
}

function prevPage(){
	pageNumber--;
	updateTitles();
	updateContent();
	updateButtons ();
	// showCard ();
	// hideCard ();
}

updateTitles();
updateContent();
updateButtons();
// nextPage ();
// prevPage ();
// restartPage ();

console.log (pageNumber);








