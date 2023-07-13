// Open https://www.gog.com/feed
// Open "Games" tab
// Select game

Array.from(document.getElementsByClassName('game-achievements-matcher__row shiny-row prof-game-statistics-parent ng-scope'))
  .filter(row => !!row.getElementsByClassName('is-unlocked').length > 0)
  .map(row => ({
    name: row.getElementsByClassName('prof-achievement__name')[0].textContent,
    description: row.getElementsByClassName('prof-achievement__description')[0].textContent,
    percent: row.getElementsByClassName('prof-achievement__rarity-percent ng-binding')[0].textContent,
    date: row.getElementsByClassName('game-achievements-matcher__achievement-unlock-date')[0].textContent
  }));

// The result, collection of the achivments:
/*
{
  "name": "A Graug's Heel",
  "description": "Capitalize on a Warchief's Fear.",
  "percent": "11.8",
  "date": "11 July 2022"
}
*/
