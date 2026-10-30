
// DISPLAY PRODUCTS ON WEBSITE

function displayProducts(category) {
    const productList = document.getElementById("product-list");

    if (!productList) return;

    productList.innerHTML = "";

    const filteredProducts = products.filter(
        product => product.category === category
    );

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "Rs. " + product.price;

        const description = document.createElement("p");
        description.textContent = product.description;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.onclick = () => addToCart(product);

        card.append(image, name, price, description, button);
        productList.appendChild(card);
    });
    }
