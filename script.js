// script.js
const rawProducts = [
  ["Amandes Maroc", "images/amandes.jpg", "DH", "Amandes biologiques cultivées dans les régions fertiles du Maroc. Croquantes et pleines de nutriments."],
  ["Miel ZCH", "images/miel.jpg", "DH", "Miel 100% naturel produit dans les montagnes de l'Atlas. Riche en antioxydants et enzymes bénéfiques."],
  ["Dattes el mejhoul", "images/dattes.jpg", "DH", "Dattes premium du Maroc, sucrées naturellement et riches en fibres. Un super aliment énergétique."],
  ["Jus Dattes el mejhoul", "images/jusdattes.jpg", "DH", "Jus pur de dattes sans additifs. Source naturelle d'énergie et de minéraux essentiels."],
  ["Huile d'Argan", "images/zitargan.webp", "DH", "L'or liquide du Maroc. Hydrate en profondeur la peau et les cheveux. Produit selon des méthodes traditionnelles."],
  ["Huile d'Olive", "images/zitzitoun.jpg", "DH", "Huile d'olive extra vierge pressée à froid. Fruitée et riche en polyphénols antioxydants."],
  ["Safran Premium", "images/safran_.jpg", "DH", "Safran de première qualité récolté à la main. Un gramme d'or rouge pour sublimer vos plats."],
  ["Eau de Rose", "images/eau.jpg", "DH", "Hydrolat de rose naturelle pour tonifier et rafraîchir la peau. Parfum délicat et propriétés apaisantes."],
  ["Thé Marocain", "images/dekkka.jpg", "DH", "Mélange exclusif de thé vert et de menthe fraîche. La boisson traditionnelle marocaine."],
  ["Couscous Fin", "images/COUSCOUS.jpg", "DH", "Semoule de blé dur de qualité supérieure. La base authentique du plat national marocain."],
  ["Tajine en Céramique", "images/tajines.png", "DH", "Tajine traditionnel pour une cuisson lente et savoureuse. Fabriqué par des artisans locaux."],
  ["Pistaches Grillées", "images/pistaches.jpg", "DH", "Pistaches grillées à sec, sans sel ajouté. Une collation saine et savoureuse."],
  ["Savon Noir", "images/savon.jpg", "DH", "Savon naturel au ghassoul et huile d'olive. Nettoyant profond pour le corps et le visage."],
  ["Parfum Royal Marocain", "images/bexor.jpg", "DH", "Un parfum exclusif inspiré des essences rares du Maroc. Notes de safran, bois de santal et fleur d'oranger."],
  ["Tapis Berbère", "images/zarbia.jpg", "DH", "Tapis tissé à la main par des artisans berbères. Motifs traditionnels et laine naturelle."],
  ["Collier fait main", "images/necklace.jpg", "DH", "Ce collier fait main présente un design traditionnel et est fabriqué avec soin à partir de matériaux naturels. C’est une pièce magnifique et unique, réalisée avec amour."],
  ["Chaussures Antigravité", "images/Kangoo.avif", "DH", "Des chaussures révolutionnaires qui réduisent l'impact sur les articulations. Parfaites pour le fitness et la rééducation."]
];

function getRandomPrice(min = 20, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomRating() {
      return (Math.random() * 1 + 4).toFixed(1); // par contre le 1er cas on va prendre un seul chiffre apres la , 7it note (3,4 ) 
  }
function getVotersRandom() {
  return Math.floor(Math.random() * 100) + 1; //katn9ss ra9m mn virgule 7.4 ==> 7
}

const products = rawProducts.map(product => ({
  name: product[0],
  image_url: product[1],
  currency: product[2],
  description: product[3],
  price: getRandomPrice(),
  rating: getRandomRating(),
  voters: getVotersRandom()
}));

const cart = [];
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const ButtoncartTotal = document.getElementById("ButtoncartTotal");
const notification = document.getElementById("notification");
const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
let filteredProducts = [...products];
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
console.log(sortSelect);
//console.log();
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm)
  );
  renderProducts();
}
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = ""; // Clear current products
  filteredProducts.forEach(product => grid.appendChild(createProductCard(product)));
}
function sortProducts() {
  const sortValue = sortSelect.value;
  filteredProducts.sort((a, b) => {
    switch (sortValue) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-asc':
        return a.rating - b.rating;
      case 'rating-desc':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  renderProducts();
}
searchInput.addEventListener("input", filterProducts);
sortSelect.addEventListener("change", sortProducts);
/*old function that handles the cart 
function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} DH`;
    cartItemsContainer.appendChild(li);
    total += item.price;
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = `${total} DH`;
}
*/
/*
new function that handles the cart
*/
/*new code after adding the delete items 
function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} DH`;
    cartItemsContainer.appendChild(li);
    total += item.price;
  });
  
  cartCount.textContent = cart.length;
  cartTotal.textContent = `${total} DH`;
  
  // Enable/disable order button based on cart content
  const orderButton = document.getElementById("ButtoncartTotal");
  orderButton.disabled = cart.length === 0;
  
  // Add click handler if not already added
  if (!orderButton.hasAttribute('data-listener-added')) {
    orderButton.addEventListener('click', proceedToCheckout);
    orderButton.setAttribute('data-listener-added', 'true');
  }
}

function proceedToCheckout() {
  if (cart.length > 0) {
    // Your checkout logic here
    alert('Redirection vers la page de commande...');
    //window.location.href = `buy1.html?n=${}&p=${total}`; fix this adapt it to the buy1 it might contain more than one product 
  }
}
*/
// the start of the new code
function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.className = "empty-cart-msg";
    emptyMsg.textContent = "Votre panier est vide";
    cartItemsContainer.appendChild(emptyMsg);
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      
      // Product info
      const itemInfo = document.createElement("span");
      itemInfo.textContent = `${item.name} - ${item.price} DH`;
      
      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-item";
      deleteBtn.innerHTML = "&times;";
      deleteBtn.title = "Supprimer";
      deleteBtn.addEventListener("click", () => removeFromCart(index));
      
      li.appendChild(itemInfo);
      li.appendChild(deleteBtn);
      cartItemsContainer.appendChild(li);
      total += item.price;
    });
  }

  cartCount.textContent = cart.length;
  cartTotal.textContent = `${total} DH`;
  
  const orderButton = document.getElementById("ButtoncartTotal");
  orderButton.disabled = cart.length === 0;
  
  // Remove previous event listener to avoid duplicates
  orderButton.replaceWith(orderButton.cloneNode(true));
  
  // Add new event listener
  document.getElementById("ButtoncartTotal").addEventListener("click", proceedToCheckout);
}
function proceedToCheckout() {
  if (cart.length === 0) return;

  // Créer les paramètres URL
  const params = new URLSearchParams();
  
  cart.forEach((item, index) => {
    params.append(`products[${index}][name]`, encodeURIComponent(item.name));
    params.append(`products[${index}][price]`, item.price);
  });
  
  params.append('total', cart.reduce((sum, item) => sum + item.price, 0));
  function initiateCart(){
    
  }
  // Redirection vers la page de commande
  window.location.href = `buyPanier.html?${params.toString()}`;
}
function removeFromCart(index) {
  // Remove item from cart array
  const removedItem = cart.splice(index, 1)[0];
  
  // Update display
  updateCartDisplay();
  
  // Show notification
  showNotification(`${removedItem.name} a été supprimé du panier`);
  
  // Optional: Add animation
  animateCartUpdate();
}

function animateCartUpdate() {
  const cartIcon = document.getElementById("cart-toggle");
  cartIcon.classList.add("animate-bounce");
  setTimeout(() => {
    cartIcon.classList.remove("animate-bounce");
  }, 1000);
}

//end of it 
function showNotification(message) {
  notification.textContent = message;
  notification.classList.remove("hidden");
  setTimeout(() => {
    notification.classList.add("hidden");
  }, 2500);
}
function openProductModal(product) {
  modalContent.innerHTML = `
    <span id="closeModal" class="close-button">&times;</span>
    <img src="${product.image_url}" alt="${product.name}" class="modal-img">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>Prix: ${product.price} ${product.currency}</p>
    <p>Note: ${product.rating} ⭐ (${product.voters} votes)</p>
    <button class="buyItem" id="buyItemID">Passer la commande</button>
  `;
  function GetItem(n, p){
    console.log(n+" "+p);
  }
  document.getElementById("buyItemID").onclick = () => {
    window.location.href = `buy1.html?n=${product.name}&p=${product.price}`;
  };
  productModal.classList.remove("hidden");
  // Fix: Stop event propagation and ensure the button is clickable
  document.getElementById("closeModal").onclick = (e) => {
    e.stopPropagation();  
    productModal.classList.add("hidden");
  };
  modalContent.querySelector(".add-cart-btn").addEventListener("click", () => {
    cart.push(product);
    updateCartDisplay();
    showNotification(`${product.name} a été ajouté au panier`);
    productModal.classList.add("hidden");
  });
}
function createProductCard(product) {
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${product.image_url}" alt="${product.name}" class="product-img">
    <h3>${product.name}</h3>
    <p>${product.price} ${product.currency}</p>
    <p>${product.rating} ⭐ (${product.voters})</p>
    <button class="buy-btn">Voir</button> <!--modifitha--> 
    <button class="add-cart-btn">Ajouter au panier</button>
  `;
  div.querySelector(".product-img").addEventListener("click", () => openProductModal(product));
  div.querySelector(".buy-btn").addEventListener("click", () => openProductModal(product));
  div.querySelector(".add-cart-btn").addEventListener("click", () => {
    cart.push(product);
    updateCartDisplay();
    showNotification(`${product.name} a été ajouté au panier`);
  });
  div.addEventListener("mouseenter", () => {
    div.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
    div.style.transform = "scale(1.02)";
  });
  div.addEventListener("mouseleave", () => {
    div.style.boxShadow = "none";
    div.style.transform = "scale(1)";
  });
  
  return div;
};
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid");
  products.forEach(product => grid.appendChild(createProductCard(product)));

  document.getElementById("cart-toggle").addEventListener("click", () => {
    document.getElementById("cartModal").classList.toggle("hidden");
  });

  document.getElementById("closeCart").addEventListener("click", () => {
    document.getElementById("cartModal").classList.add("hidden");
  });
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    document.getElementById("themeToggle").textContent = isDark ? "☀️" : "🌙";
  });
  
});