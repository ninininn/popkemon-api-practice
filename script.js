//get DOM Elements
let searchBtn = document.getElementById("search-button");
let searchInput = document.getElementById("search-input");
let pokemonName = document.getElementById("pokemon-name");
let pokemonId = document.getElementById("pokemon-id");
let pokemonWeight = document.getElementById("weight");
let pokemonHeight = document.getElementById("height");
let pokemonTypes = document.getElementById("types");
let pokemonImage = document.getElementById("pokemon-image");
let hp = document.getElementById("hp");
let attack = document.getElementById("attack");
let defense = document.getElementById("defense");
let specialAttack = document.getElementById("special-attack");
let specialDefense = document.getElementById("special-defense");
let speed = document.getElementById("speed");

//get pokemon-stats
let pokeStatus = (res) => {
  console.log("status()");
  for (stats of res.stats) {
    let title = stats.stat.name;
    let basic = stats.base_stat;
    console.log(stats, title, basic);
    switch (title) {
      case "hp":
        hp.textContent = basic;
      case "attack":
        attack.textContent = basic;
      case "defense":
        defense.textContent = basic;
      case "special-attack":
        specialAttack.textContent = basic;
      case "special-defense":
        specialDefense.textContent = basic;
      case "speed":
        speed.textContent = basic;
    }
  }
};

//define types
let pokeType = (res) => {
  for (type of res.types) {
    console.log(type);
    let ty = document.createElement("span");
    ty.textContent = type.type.name.toUpperCase();
    pokemonTypes.appendChild(ty);
  }
};

//get pokemon-infos
let infos = (res) => {
  console.log("infos()");
  pokemonName.textContent = res.name.toUpperCase();
  pokemonId.textContent = "#" + `${res.id}`;
  pokemonWeight.textContent = "Weight:" + `${res.weight}`;
  pokemonHeight.textContent = "Height:" + `${res.height}`;
  pokemonImage.setAttribute("src", `${res.sprites["front_default"]}`);
  // pokemonTypes.textContent = res.types[0].type.name.toUpperCase();
  pokeStatus(res);
  pokeType(res);
};

//clear All
let clear = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  pokemonWeight.textContent = "";
  pokemonHeight.textContent = "";
  pokemonTypes.innerHTML = ``;
  pokemonImage.setAttribute("src", "");
};

//fetch API
let goSearch = () => {
  let inputValue = searchInput.value.toLowerCase();
  let basicUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
  let apiUrl = basicUrl + `/${inputValue}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      clear();
      infos(res);
      // stats(res);
    })
    .catch((err) => {
      console.log(err);
      alert("Pokémon not found");
      return;
    });
};

//EventListeners
searchBtn.addEventListener("click", goSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    goSearch();
  }
});
