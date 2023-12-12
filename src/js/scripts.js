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

let airData = [];
let rankedData = [];

async function fetchData() {
	return new Promise((resolve, reject) => {
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
			airData = data;
			console.log(airData);
			console.log(baseChoiceValues);
			console.log(mixerChoiceValues);
			console.log(flavorChoiceValues);
			console.log(sweetnessChoiceValue);
			resolve(); // Resolve the promise when data is fetched successfully
		 })
		 .catch(error => {
			console.error('Error fetching data:', error);
			reject(error); // Reject the promise if there is an error
		 });
	});
 }




async function determineDrink() {
	await fetchData();

	// obtain list of OUR items
	let userSelections = [sweetnessChoiceValue]

	// iterate over remaing
	for (const [key, value] of Object.entries(baseChoiceValues)) {
		if (value) {
			userSelections.push(key)
		}
	}
	for (const [key, value] of Object.entries(mixerChoiceValues)) {
		if (value) {
			userSelections.push(key)
		}
	}
	for (const [key, value] of Object.entries(flavorChoiceValues)) {
		if (value) {
			userSelections.push(key)
		}
	}


	const scoreList = []
	// iterate over each row in airData (grab one drink at a time)
	for (let i = 0; i < airData.records.length; i++) {
		const row = airData.records[i]
		const name = row.fields.Name
		const notes = row.fields.Notes
		// keep track of the ingredients/characteristics of this drink
		let options = [row.fields.Sweetness]
		options = options.concat(row.fields.Base)
		options = options.concat(row.fields.Flavors)
		options = options.concat(row.fields.Mixer)


		// iterate over options, count how many options match our userSelections
		let count = 0
		for (let i = 0; i < options.length; i++) {
			if (userSelections.includes(options[i])) {
				count++
			}
		}

		scoreList.push([count, name, notes])
	 }

	console.log("list of scores:", scoreList)
	// sort scoreList by count of each drink
	scoreList.sort((a, b) => b[0] - a[0])
	console.log("sorted:", scoreList)

	const firstFour = scoreList.slice(0,4);
	let cards = "";

	for (let i = 0; i < 4; i++) {
		cards +=
		`
		<div class="drink-cards">
			<h2>${firstFour[i][1]}</h2>
			<p>${firstFour[i][2]}</p>
			<a href="https://www.delish.com/cooking/recipe-ideas/a26556220/penne-alla-vodka-recipe/">Recipe</a>
		</div>

		`
	}

	potentialDrinks.innerHTML=cards;


}



const title = document.querySelector("#page-title");
const martini = document.querySelector("#pink-martini")
const champagne = document.querySelector("#champagne-img")
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
	if (pageNumber === 0) {
		martini.style.display = "block";
		champagne.style.display = "none";
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 1) {
		martini.style.display = "block";
		champagne.style.display = "none";
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 2) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
		martini.style.display = "none";
	} else if (pageNumber === 3) {
		baseChoice.style.display = "flex";
		champagne.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
		martini.style.display = "none";
	} else if (pageNumber === 4) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "flex";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 5) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "flex";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 6) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "flex";
		potentialDrinks.style.display = "none";
	} else if (pageNumber === 7) {
		baseChoice.style.display = "none";
		mixerChoice.style.display = "none";
		flavorChoice.style.display = "none";
		sweetnessChoice.style.display = "none";
		potentialDrinks.style.display = "grid";
		determineDrink();
	}
}

function showCard(cardNumber) {
      const card = document.getElementById(`card${cardNumber}`);
		console.log(card);
		if (card !== null && card !== undefined) {
			card.style.display = "flex";
		}
}

function hideCard(cardNumber) {
      const card = document.getElementById(`card${cardNumber}`);
		if (card !== null && card !== undefined) {
			card.style.display = "none";
		}
}

let baseChoiceValues = {};
let mixerChoiceValues = {};
let flavorChoiceValues = {};
let sweetnessChoiceValue = 'none';

function updateChoices(form, checkboxId, isChecked) {
	switch(form) {
		case "base":
			baseChoiceValues[checkboxId] = isChecked;
			break;
		case "mixer":
			mixerChoiceValues[checkboxId] = isChecked;
			break;
		case "flavor":
			flavorChoiceValues[checkboxId] = isChecked;
			break;
		case "sweetness":
			sweetnessChoiceValue = checkboxId;
			break;
	}
}

function updateButtons () {
	if (pageNumber === 0) {
		prevButton.style.display = "none";
		restartButton.style.display = "none";
		nextButton.style.display = "block";
		nextButton.innerHTML = "Yes!";
		prevButton.innerHTML = "Back";
	} else if (pageNumber === 1){
		restartButton.style.display = "none";
		prevButton.style.display = "block";
		nextButton.style.display = "block";
		nextButton.innerHTML = "Of Course!";
		prevButton.innerHTML = "Not Yet!";
	} else if (pageNumber === 2){
		restartButton.style.display = "none";
		prevButton.style.display = "none";
		nextButton.style.display = "none";
		prevButton.innerHTML = "Back";
	} else if (pageNumber === 3){
		restartButton.style.display = "none";
		prevButton.style.display = "none";
		nextButton.style.display = "block";
		nextButton.innerHTML = "Next";
	}  else if (pageNumber === 7) {
		prevButton.style.display = "none";
		nextButton.style.display = "none"
		restartButton.style.display = "block";
		prevButton.innerHTML = "Back";
	} else {
		prevButton.style.display = "block";
		nextButton.style.display = "block";
		restartButton.style.display = "none";
		nextButton.innerHTML = "Next";
		prevButton.innerHTML = "Back";
	}
}

function restartPage () {
	pageNumber = 0;
	updateTitles();
	updateContent();
	updateButtons();
}

function nextPage() {
	if (pageNumber === 1) {
		pageNumber = 3;
	} else {
		pageNumber++;
	}

	updateTitles();
	updateContent();
	updateButtons();
	showCard();
}

function yesResponse() {
	pageNumber = 3;
}

function prevPage() {
	if (pageNumber === 1) {
		pageNumber = 2;
	} else {
		pageNumber--;
	}

	updateTitles();
	updateContent();
	updateButtons();
	showCard();
}

updateTitles();
updateContent();
updateButtons();










