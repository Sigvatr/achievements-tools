// https://ck2.paradoxwikis.com/Achievements

const difficultyDictionary = {
	VE: 'Very Easy',
	E: 'Easy',
	M: 'Medium',
	H: 'Hard',
	VH: 'Very Hard',
	I: 'Insane',
	UC: 'Uncategorized'
};

Array
	.from(document.querySelectorAll('table.mildtable tbody tr'))
	.map(tr => {
		const achievmentColumn = tr.querySelector('td:nth-child(1)');

		return {
			name: achievmentColumn.querySelector('div > div > div').innerText.trim(),
			description: achievmentColumn.querySelector('div > div:nth-child(2)').innerText.trim(),
			elementId: achievmentColumn.querySelector('span[id]').id,
			startingConditions: tr.querySelector('td:nth-child(2)').innerText.trim().replace(/\s+/g, ' '),
			requirements: tr.querySelector('td:nth-child(3)').innerText.trim().replace(/\s+/g, ' '),
			religion: Array.from(tr.querySelectorAll('td:nth-child(4) a img')).map(r => r.alt.replace('.png', '')),
			notes: tr.querySelector('td:nth-child(5)').innerText.trim().replace(/\s+/g, ' '),
			dlc: Array.from(tr.querySelectorAll('td:nth-child(6) a')).map(r => r.title),
			version: tr.querySelector('td:nth-child(7)').innerText.trim(),
			difficulty: tr.querySelector('td:nth-child(8)').innerText.trim(),
			image: tr.querySelector('div > a.image img').src
		};
	})
	.map(item => {
		const result = {
				...item,
				religion: item.religion.join(', '),
				dlc: item.dlc.join(', '),
				difficulty: difficultyDictionary[item.difficulty],
				link: 'https://ck2.paradoxwikis.com/Achievements#' + item.elementId,
			};

		delete result.elementId;

		return result;
	})

// You recieve collection of that objects:
/*
	{
		description: "All Three Popes\nPlay a game where there are two simultaneous antipopes",
​​​		difficulty: "Very Easy",
​​​		dlc: "",
​​​		image: "https://ck2.paradoxwikis.com/images/a/a3/Achievement-03.png",
		​​​link: "https://ck2.paradoxwikis.com/Achievements#All_Three_Popes",​​​
		name: "All Three Popes",
		​​​notes: "Start in the High Middle Ages bookmark as an independent ruler. Wait for someone to create an antipope, then create your own.",
		​​​religion: "",
		​​​requirements: "There are 2 people with a claim on the Papacy",
		​​​startingConditions: "",
		​​​version: "2.0"
	}
*/
// you can use the map function
