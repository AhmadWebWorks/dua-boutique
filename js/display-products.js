
/*
 * DUA BOUTIQUE
 * SHARED PRODUCT DISPLAY SYSTEM
 */

function displayProducts(category) {

    const productList = document.getElementById("product-list");

    if (!productList) {
        return;
    }

    productList.innerHTML = "";

    if (!Array.isArray(products)) {
        productList.textContent =
            "Products are temporarily unavailable.";
        return;
    }

    const filteredProducts = products.filter(product => {

        return (
            product.category === category &&
            typeof product.name === "string" &&
            Number.isFinite(Number(product.price)) &&
            Number(product.price) >= 0 &&
            typeof product.image === "string" &&
            product.image.trim() !== ""
        );

    });

    if (filteredProducts.length === 0) {

        const message = document.createElement("div");

        message.className = "category-card";

        const icon = document.createElement("div");
        icon.className = "home-icon";
        icon.textContent = category === "boutique" ? "🧣" : "💄";

        const heading = document.createElement("h3");
        heading.textContent = "New Arrivals Coming Soon";

        const description = document.createElement("p");
        description.textContent =
            "Our product collection is being updated. " +
            "Please contact us on WhatsApp for current availability.";

        const contact = document.createElement("a");

        contact.className = "btn";
        contact.textContent = "Ask on WhatsApp";

        const messageText =
            category === "boutique"
                ? "Hello! I would like to ask about available dupattas."
                : "Hello! I would like to ask about available cosmetics.";

        contact.href =
            "https://wa.me/923294781014?text=" +
            encodeURIComponent(messageText);

        contact.target = "_blank";
        contact.rel = "noopener";

        message.append(icon, heading, description, contact);

        productList.appendChild(message);

        return;
    }

    filteredProducts.forEach(product => {

        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");

        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function () {
            this.style.display = "none";
        };

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");

        price.textContent =
            "Rs. " + Number(product.price).toLocaleString("en-PK");

        const description = document.createElement("p");
        description.textContent = product.description || "";

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = "Add to Cart";

        button.addEventListener("click", function () {

            if (typeof addToCart === "function") {

                addToCart(product);

            } else {

                alert("Shopping cart is temporarily unavailable.");

            }

        });

        card.append(
            image,
            name,
            price,
            description,
            button
        );

        productList.appendChild(card);

    });

}
