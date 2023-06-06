const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-PT-WEB-PT-A";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
console.log(APIURL);

// It fetches all players from the API and returns them

const fetchAllPlayers = async () => {
  try {
    const PLAYERS_API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
    const response = await fetch(PLAYERS_API_URL);
    // console.log(response);
    const players = await response.json();
    return players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const singlePlayer_API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${playerId}/`;
    const response = await fetch(singlePlayer_API_URL);
    const singlePlayer = await response.json(playerId);
    return singlePlayer;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

//  It takes an array of player objects, loops through them, and creates a string of HTML for each
//  player, then adds that string to a larger string of HTML that represents all the players.

const renderAllPlayers = (playerList) => {
  const allPlayers = renderAllPlayers;
  playerList.data.players.forEach((allPlayers) => {
    const allPlayersElement = document.createElement("div");
    const playerDetailsElement = document.createElement("div"); // method
    playerDetailsElement.classList.add("players");
    playerDetailsElement.classList.add("player");
    playerDetailsElement.innerHTML = `
<h2>${allPlayers.id}</h2>
<p>${allPlayers.name}</p>
<p>${allPlayers.breed}</p>
<p>${allPlayers.imageUrl}</p>
<p>${allPlayers.teamId}</p>
<p>${allPlayers.cohortId}</p>

<button class="close-button">Close</button>
`;
    try {
    } catch (err) {
      console.error("Uh oh, trouble rendering players!", err);
    }
  });
};

//  Then it takes that larger string of HTML and adds it to the DOM.

//  * It also adds event listeners to the buttons in each player card.

//  * The event listeners are for the "See details" and "Remove from roster" buttons.
//  *
//  * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
//  * API to get the details for a single player.
//  *
//  * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
//  * the API to remove a player from the roster.
//  *
//  * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
//  * @param playerList - an array of player objects
//  * @returns the playerContainerHTML variable.

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
