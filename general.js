// ----------------------------------------------------------------------------------------
// Get all data about achievments for the game
//  1. Find you game
//  2. Open its achievemnts page
//  3. Click the "View global achievement stats"
//  4. Run following console
Array.from(document.getElementsByClassName('achieveRow'))
	.map(row => {
		const descriptionTag = row.getElementsByTagName('h5');
		return {
			img: row.querySelector('div.achieveImgHolder img').src.trim(),
			unlocked: row.classList.length > 1 && row.classList[1] === 'unlocked',
			percentage: row.getElementsByClassName('achievePercent')[0].innerText.trim(),
			name: row.getElementsByTagName('h3')[0].innerText.trim(),
			description: descriptionTag ? descriptionTag[0].innerText.trim() : null
		};
	});

// You recieve collection of that objects:
/*
	{
	  "img": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/289070/6858293f2952c7fb17a94667b0d823e67445dc4c.jpg",
	  "unlocked": true,
	  "percentage": "84.7%",
	  "name": "If You Build It, They Will Come",
	  "description": "Have 6 Improvements at one time."
	}
*/
// you can use the map function


// ----------------------------------------------------------------------------------------
// Get users achievments sorted by get-date
//  1. Open your Steam profile page.
//  2. Find the game
//  3. Enter the game stats
//  4. Run following code in console:
Array.from(document.getElementsByClassName('achieveRow'))
	.map(row => ({
		name: row.getElementsByTagName('h3')[0].innerText.trim(),
		img: row.querySelector('div.achieveImgHolder img').src.trim(),
		date: new Date (row.querySelector('div.achieveUnlockTime').textContent.trim().replace('Unlocked ', '').replace(' @', '').replace(/([a|p]m)$/, ' $1'))
	}))
	.sort((a, b) => a.date - b.date);


// ----------------------------------------------------------------------------------------
function toCSVRow(datum, columns = null) {
	return (columns || Object.keys(datum))
		.map(column => {
			if (typeof datum[column] === "string") {
				return '"' + datum[column].replace(/\"/g, '""') + '"';
			}

			return datum[column];
		})
		.join(',');
}


// ----------------------------------------------------------------------------------------
function displayOnWholePage(text) {
	document
		.getElementsByTagName('body')[0]
		.innerHTML = `<pre>${text}</pre>`;
}


// ----------------------------------------------------------------------------------------
function arrayToDictionary(array, keyColumn) {
	return array.reduce((r, i) => { r[i[keyColumn]] = i; return r; }, {});
}

