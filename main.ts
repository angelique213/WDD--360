// Get elements from the HTML
const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetails = document.querySelector("#pokemon-details");

const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=40";

// Type for Pokemon from the list
interface PokemonListItem {
    name: string;
    url: string;
}

// Type for Pokemon details
interface PokemonDetails {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
}

// Create the HTML for one Pokemon in the list
function pokemonListTemplate(item: PokemonListItem) {
    return `<li><button data-url="${item.url}">${item.name}</button></li>`;
}

// Create the HTML for Pokemon details
function pokemonDetailsTemplate(item: PokemonDetails) {
    return `
        <h2>${item.name}</h2>
        <p>Height: ${item.height}</p>
        <p>Weight: ${item.weight}</p>
        <img src="${item.sprites.front_default}" alt="${item.name}">
    `;
}

// Display the Pokemon list
function renderPokemonList(pokemon: PokemonListItem[]) {
    const pokemonListHtml = pokemon.map(pokemonListTemplate).join("");

    if (!pokemonList) return;

    pokemonList.insertAdjacentHTML("afterbegin", pokemonListHtml);
}

// Get data from the API
async function getData(url: string) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Handle clicking a Pokemon
async function pokeListHandler(event: Event) {
    const target = event.target as HTMLElement;

    // Make sure we clicked a button
    if (!target.matches("button")) return;

    const pokemonUrl = target.dataset.url;

    if (!pokemonUrl) return;

    const pokemon = await getData(pokemonUrl);

    if (!pokemon || !pokemonDetails) return;

    const detailsHtml = pokemonDetailsTemplate(pokemon);

    pokemonDetails.innerHTML = "";
    pokemonDetails.insertAdjacentHTML("afterbegin", detailsHtml);
}

// Load the Pokemon list
async function init() {
    const data = await getData(apiUrl);

    if (!data) return;

    const pokemon: PokemonListItem[] = data.results;

    renderPokemonList(pokemon);
}

// Add click event
if (pokemonList) {
    pokemonList.addEventListener("click", pokeListHandler);
}

// Start the application
init();