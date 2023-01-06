// Getting achievment list with DLC which is used by it
// https://steamcommunity.com/sharedfiles/filedetails/?id=1607969704

Array.from(document.getElementsByClassName('subSection'))
	.map(e => ({
		title: e.getElementsByClassName('subSectionTitle')[0].textContent.trim(),
		element: e
	}))
	.filter(e => e.title !== 'Grinding, tricks & tips')
	.reduce(
		(result, subSection) => result.concat(
			Array.from(subSection.element.getElementsByTagName('u'))
				.filter(e => {
					// skipping all <u><b>, which don't have <br/> before, 
					if (!e.previousSibling) {
						e = e.parentElement;
					}

					return e.previousSibling.tagName == 'BR'
				})
				.map(e => ({
					game: subSection.title
						.replace(/ achievements|- part \d+/g, '')
						.trim(),
					name: e.textContent.trim()
				}))
		),
		[]
	);


// You recieve collection of that objects:​
/*
{
	game: "Civilization VI - regular game",​
	name: "Here's Looking At You Kid"
}
*/
// you can use the map function


// Getting achievment list with DLC which is used by it
// https://civilization.fandom.com/wiki/Steam_achievements_in_Civ6

Array.from(document.getElementsByClassName('mw-parser-output')[0].children)
    .reduce(
        function(actual, item) {
            if (item.nodeName === 'TABLE' && item.className === "steam-achievement-container") {
                actual.results.push({
                    name: item.getElementsByClassName('steam-achievement-name')[0].textContent.trim(),
                    dlc: actual.header + (!actual.subHeader ? '' : ': ' + actual.subHeader),
                    note: item.getElementsByTagName('dd')[0].textContent.trim()
                });
            }

            if (item.nodeName === 'H2') {
                actual.header = item.getElementsByTagName('span')[0].textContent.trim();
                actual.subHeader = null;
            }

            if (item.nodeName === 'H3') {
                actual.subHeader = item.getElementsByClassName('mw-headline')[0].textContent.trim();
            }

            return actual;
        },
        {
            header: null,
            subHeader: null,
            results: []
        }
    )
    .results

// You recieve collection of that objects:
/*
{
	dlc: "Achievements in the base game"
	name: "100th Anniversary"
	note: "2016, the year that Civilization VI was released, was the 100th anniversary of the National Park Service, which manages national parks in the United States."
}
*/
