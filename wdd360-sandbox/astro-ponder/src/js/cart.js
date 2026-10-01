const cart = [
  { id: 1, name: "Item 1", price: "10" },
  { id: 2, name: "Item 2", price: "15" },
  { id: 3, name: "Item 3", price: "12" }
];

// Get the cart section from the page
const cartElement = document.querySelector("#cart");

// Build the HTML for the cart items
const cartHtml = cart
  .map((item) => {
    return `
      <div>
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
      </div>
    `;
  })
  .join("");

// Display the cart items
cartElement.innerHTML = cartHtml;