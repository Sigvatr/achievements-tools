// Open you Steam profile page with all achievements for you
// Click "View global achievement stats" for more data
// Run following console

Array.from(document.getElementsByClassName('achieveRow'))
	.map(row => {
		const descriptionTag = row.getElementsByTagName('h5');
		return {
			img: row.querySelector('div.achieveImgHolder img').src,
			unlocked: row.classList.length > 1 && row.classList[1] === 'unlocked',
			percentage: row.getElementsByClassName('achievePercent')[0].innerText,
			name: row.getElementsByTagName('h3')[0].innerText,
			description: descriptionTag ? descriptionTag[0].innerText : null
		}
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

