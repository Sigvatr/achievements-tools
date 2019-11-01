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
