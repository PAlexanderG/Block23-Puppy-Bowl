// Export all data

const playerContainer = document.querySelector("#all-players-container");
const newPlayerFormContainer = document.querySelector("#new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-PT-WEB-PT-A";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT-A/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL);
    const data = await response.json();

    // if statement with Array method

    if (!Array.isArray(data.data.players)) {
      console.warn("Uh nooo, fetched player data is not an array!", data);
      return [];
    }

    return data.data.players;
  } catch (err) {
    console.error("Uh nooo, trouble fetching players!", err);
    return [];
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    // DELETE method by id witch deletes a player
    const requestOption = {
      method: "DELETE",
    };
    const response = await fetch(`${APIURL}/${playerId}`);
    const players = await response.json();
    return players;
  } catch (err) {
    console.error(`Oh nooo, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    };
    const response = await fetch(APIURL, requestOption);
    const newPlayer = await response.json();
    return newPlayer;
  } catch (err) {
    console.error(
      "Oops, there was something wrong with adding that player!",
      err
    );
  }
};

const removePlayer = async (playerId) => {
  try {
    const requestOption = {
      method: "DELETE",
    };
    const response = await fetch(`${APIURL}/${playerId}`, requestOption);
    const players = await response.json();
    return players;
  } catch (err) {
    console.error(
      `Oops, we have issues removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = async (playerList) => {
  // It takes an array of player objects, loops through them, and creates a string of HTML for each
  // player, then adds that string to a larger string of HTML that represents all the players
  try {
    playerContainer.innerHTML = "";

    if (!Array.isArray(playerList)) {
      console.warn("Uh oooh, playerList is not an array!", playerList);
      return;
    }

    playerList.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add("player");
      playerElement.innerHTML = `

          <h2>Name: ${player.name}</h2>
          <p>ID: ${player.id}</p>
          <p>Breed: ${player.breed}</p>
          <img src="${player.imageUrl}">
          <p class="hidden">Status: ${player.status}</p>
          <p class="hidden">Created At: ${player.createdAt}</p>
          <p class="hidden">Team ID: ${player.teamId}</p>
          <p class="hidden">Cohort ID: ${player.cohortId}</p>
          <button class="details-button" data-id="${player.id}">See Details</button>
          <button class="remove-button" data-id="${player.id}">Remove From Roster</button>
          `;
      playerContainer.appendChild(playerElement);

      // hideElement with class ".hidden"
      let hiddenElements = playerElement.querySelectorAll(".hidden");
      hiddenElements.forEach((element) => {
        element.style.display = "none";
      });

      // Add an event listeners for the "See details" and "Remove from roster"
      const detailsButton = playerElement.querySelector(".details-button");
      const removeButton = playerElement.querySelector(".remove-button");

      detailsButton.addEventListener("click", async (event) => {
        const playerId = event.target.dataset.id;
        const player = await fetchSinglePlayer(playerId);
        if (player) {
          //display the details if/else statement
          let hiddenElements = playerElement.querySelectorAll(".hidden");
          hiddenElements.forEach((element) => {
            if (element.style.display === "none") {
              element.style.display = "";
            } else {
              element.style.display = "none";
            }
          });
        }
      });

      removeButton.addEventListener("click", async (event) => {
        const playerId = event.target.dataset.id;
        await removePlayer(playerId);
        init(); // re-render all players after deleting one
      });
    });
  } catch (err) {
    console.error("Ups, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = async () => {
  try {
    const form = document.createElement("form");

    // make an input fields for the form
    form.innerHTML = `
            <label>
                Name:
                <input type="text" name="name" autocomplete="on">
            </label>
            <label>
                Breed:
                <input type="text" name="breed" autocomplete="on">
            </label>
            <label>
                Status:
                <input type="text" name="status" autocomplete="on">
            </label>
            <label>
                Image URL:
                <input type="text" name="imageUrl" autocomplete="on">
            </label>
            <label>
                Created At:
                <input type="text" name="createdAt" autocomplete="on">
            </label>
            <label>
                Team ID:
                <input type="text" name="teamId" autocomplete="on">
            </label>
            <label>
                Cohort ID:
                <input type="text" name="cohortId">
            </label>
            <button type="submit">Add Player</button>
        `;
    // Const form: HTMLFormElementadd an AddEventListener method
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      // craete the playerOj with thier properties form: HTMLFormElement
      const playerObj = {
        id: form.id.value,
        name: form.name.value,
        breed: form.breed.value,
        status: form.status.value,
        imageUrl: form.imageUrl.value,
        createdAt: form.createdAt.value,
        teamId: form.teamId.value,
        cohortId: form.cohortId.value,
      };

      // Validate the playerObj before adding to the database

      await addNewPlayer(playerObj);

      // re-fetch all players and render them again to show up the all players
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
    });

    newPlayerFormContainer.appendChild(form);
  } catch (err) {
    console.error(
      "Uh oh, we are having troubles rendering the new player form!",
      err
    );
  }
};

// init players promise
const init = async () => {
  const players = await fetchAllPlayers();
  console.log(players);
  renderAllPlayers(players);
  renderNewPlayerForm();
}; // Outside the funct becuase it wont duplicate the addNewPLayer form.

init();
