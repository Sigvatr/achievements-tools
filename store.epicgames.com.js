/**
 * Log in on webpage https://store.epicgames.com/
 * Find the game
 * Find the achievements page
 */
Array.from(document.getElementsByTagName('section')[0].getElementsByTagName('ul')[1].getElementsByTagName('li'))
	.map(row => {
		const imgs = row.getElementsByTagName('img');
		const isAchivmentIcon = imgs.length > 0;
		const isUnlocked = isAchivmentIcon && imgs[0].nextSibling == null;
		const spans = row.getElementsByTagName('span');

		return {
			name: spans[1].innerText,
			img: isAchivmentIcon ? imgs[0].src : null,
			isUnlocked: isUnlocked,
			description: spans[2].innerText,
			unlockDate: isUnlocked ? spans[4].innerText : null,
			xp: spans[6].innerText
		};
	});
