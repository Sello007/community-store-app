// Global State
let products = [
  {
    id: 1,
    title: "Cisco CCNA 200-301 Guide",
    price: 350,
    category: "Textbooks",
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Scientific Calculator FX-82ZA",
    price: 180,
    category: "Electronics",
    img: "https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Java Programming Essentials",
    price: 220,
    category: "Textbooks",
    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80"
  }
];

let bulletinPosts = [
  {
    title: "ICT Hackathon 2026 Registration Open!",
    author: "CPUT Tech Club",
    content: "Sign up your team of 4 for the annual network security hackathon."
  },
  {
    title: "Second-hand Engineering Tools Needed",
    author: "Sello M.",
    content: "Looking for pre-owned breadboards and multimeter sets."
  }
];

let cart = [];
let currentUser = null;

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  renderBulletin();
});

// View Switcher Logic
function switchView(viewId) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active-view"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) targetView.classList.add("active-view");

  // Highlight corresponding nav item
  const activeNav = Array.from(document.querySelectorAll(".nav-item")).find(btn => 
    btn.getAttribute("onclick").includes(viewId)
  );
  if (activeNav) activeNav.classList.add("active");
}

// Authentication Logic
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("user-email").value;
  const statusEl = document.getElementById("auth-status");

  if (!email.toLowerCase().endsWith(".ac.za") && !email.toLowerCase().endsWith(".edu")) {
    statusEl.style.color = "red";
    statusEl.innerText = "Error: Must use a valid institutional email (.ac.za or .edu)";
    return;
  }

  currentUser = { email };
  statusEl.style.color = "green";
  statusEl.innerText = `Verified as ${email}! Redirecting...`;
  
  setTimeout(() => {
    switchView("marketplace");
  }, 1200);
}

// Product Rendering & Filtering
function renderProducts(items) {
  const container = document.getElementById("product-grid");
  container.innerHTML = items.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.title}" />
      <div class="product-info">
        <div class="product-title">${p.title}</div>
        <div class="product-price">R ${p.price.toFixed(2)}</div>
        <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

function filterProducts() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = products.filter(p => p.title.toLowerCase().includes(query));
  renderProducts(filtered);
}

function filterCategory(cat) {
  document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  event.target.classList.add("active");

  if (cat === 'all') {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.category === cat));
  }
}

// Add New Listing
function handleCreateListing(e) {
  e.preventDefault();
  const newProduct = {
    id: Date.now(),
    title: document.getElementById("prod-title").value,
    price: parseFloat(document.getElementById("prod-price").value),
    category: document.getElementById("prod-category").value,
    img: document.getElementById("prod-img").value
  };

  products.unshift(newProduct);
  renderProducts(products);
  alert("Listing published successfully!");
  switchView("marketplace");
}

// Cart Logic
function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (item) {
    cart.push(item);
    updateCartUI();
  }
}

function updateCartUI() {
  document.getElementById("cart-badge").innerText = cart.length;
  
  const container = document.getElementById("cart-items-container");
  container.innerHTML = cart.map(item => `
    <div class="bulletin-card" style="margin-bottom:8px;">
      <strong>${item.title}</strong> - R ${item.price.toFixed(2)}
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").innerText = `R ${total.toFixed(2)}`;
}

function processCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Simulating PayFast payment processing... Success!");
  cart = [];
  updateCartUI();
  switchView("marketplace");
}

// Bulletin Board Logic
function renderBulletin() {
  const container = document.getElementById("bulletin-list");
  container.innerHTML = bulletinPosts.map(post => `
    <div class="bulletin-card">
      <h3>${post.title}</h3>
      <p style="font-size:0.8rem; color:gray;">Posted by: ${post.author}</p>
      <p style="margin-top:6px;">${post.content}</p>
    </div>
  `).join("");
}
