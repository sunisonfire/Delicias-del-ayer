import { PRODUCTS, INITIAL_REVIEWS } from './data.js';

// Let's declare our persistent state
const STATE = {
  products: [],
  cart: [],
  reviews: [],
  activeUser: null,
  selectedProduct: null,
  activeCategory: 'all',
  searchQuery: '',
  maxSweetness: 5,
  formSweetnessRating: 4,
  formImageFile: null,
  detailModalQuantity: 1,
};

let datos = [];
let reviewIdToDelete = null;

// Theme controller logic
function applyTheme() {
  const isNight = document.body.classList.contains('noche-magica');
  const themeEmoji = document.getElementById('theme-emoji');
  
  if (isNight) {
    if (themeEmoji) themeEmoji.textContent = '☀️'; // Button shows Sun to switch to Day
    localStorage.setItem('delicias_theme', 'noche-magica');
  } else {
    if (themeEmoji) themeEmoji.textContent = '🌙'; // Button shows Moon to switch to Night
    localStorage.setItem('delicias_theme', 'kawaii');
  }
}

function initTheme() {
  const storedTheme = localStorage.getItem('delicias_theme');
  if (storedTheme === 'noche-magica') {
    document.body.classList.add('noche-magica');
  } else {
    document.body.classList.remove('noche-magica');
  }
  applyTheme();
}

function toggleTheme() {
  document.body.classList.toggle('noche-magica');
  applyTheme();
}

// Dynamic store status depending on active hour
function updateStoreStatusBadge() {
  const currentHour = new Date().getHours();
  // Open between 9:00 AM (9) and 9:59 PM (21), otherwise closed
  const isOpen = currentHour >= 9 && currentHour < 22;

  const badgeDot = document.getElementById('badge-store-dot');
  const badgeText = document.getElementById('badge-store-text');
  const badgeStatus = document.getElementById('badge-store-status');

  const mobBadgeDot = document.getElementById('mob-badge-store-dot');
  const mobBadgeText = document.getElementById('mob-badge-store-text');
  const mobBadgeStatus = document.getElementById('mob-badge-store-status');

  if (isOpen) {
    if (badgeText) badgeText.textContent = 'Open';
    if (badgeDot) {
      badgeDot.className = 'w-2 h-2 bg-green-500 rounded-full animate-pulse';
    }
    if (badgeStatus) {
      badgeStatus.className = 'hidden sm:flex items-center gap-2 bg-[#ffddb9] text-[#2b1700] px-3 py-1 rounded-full border border-[#865300] text-xs font-semibold';
    }

    if (mobBadgeText) mobBadgeText.textContent = 'Open';
    if (mobBadgeDot) {
      mobBadgeDot.className = 'w-1.5 h-1.5 bg-green-500 rounded-full';
    }
    if (mobBadgeStatus) {
      mobBadgeStatus.className = 'flex items-center gap-1.5 bg-[#ffddb9] text-[#2b1700] px-2 py-0.5 rounded-full border border-[#865300] text-[10px] font-semibold';
    }
  } else {
    if (badgeText) badgeText.textContent = 'Closed';
    if (badgeDot) {
      badgeDot.className = 'w-2 h-2 bg-red-500 rounded-full';
    }
    if (badgeStatus) {
      badgeStatus.className = 'hidden sm:flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full border border-red-300 text-xs font-semibold';
    }

    if (mobBadgeText) mobBadgeText.textContent = 'Closed';
    if (mobBadgeDot) {
      mobBadgeDot.className = 'w-1.5 h-1.5 bg-red-500 rounded-full';
    }
    if (mobBadgeStatus) {
      mobBadgeStatus.className = 'flex items-center gap-1.5 bg-red-100 text-red-800 px-2 py-0.5 rounded-full border border-red-250 text-[10px] font-semibold';
    }
  }
}

// Helper to map spreadsheet rows to Products beautifully
function mapSheetRowToProduct(row, index) {
  const idVal = row['ID'] ?? row['id'] ?? index;
  const nombreVal = row['NOMBRE'] ?? row['nombre'] ?? row['Name'] ?? row['name'] ?? `Delicia #${idVal}`;
  
  // Description supports DESCRIPCION, COMENTARIO, description, etc.
  const comentarioVal = row['DESCRIPCION'] ?? row['descripcion'] ?? row['Description'] ?? row['description'] ?? row['COMENTARIO'] ?? row['comentario'] ?? row['Comment'] ?? row['comment'] ?? 'Receta retro recopilada y horneada con cariño tradicional.';

  // Flavor supports SABOR, sabor, Flavor, flavor
  const saborVal = row['SABOR'] ?? row['sabor'] ?? row['Flavor'] ?? row['flavor'] ?? 'Receta retro 🌟';

  // Image supports IMAGEN, imagen, Image, image, img, imgUrl, etc.
  let customImg = row['IMAGEN'] ?? row['imagen'] ?? row['Image'] ?? row['image'] ?? row['Img'] ?? row['img'] ?? row['imgUrl'];

  // Beautiful stock of pastel bakery images so the polaroids look incredibly cute and polished
  const backupImages = [
    'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=600', // Galletas vintage
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600', // Pan dulce artesanal
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600', // Tartas de crema
    'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600', // Pasteles de fresa
    'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600', // Cupcakes tiernos
    'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600'  // Blueberries tart
  ];
  if (!customImg || typeof customImg !== 'string' || !customImg.startsWith('http')) {
    customImg = backupImages[index % backupImages.length];
  }

  // Price supports PRECIO, precio, Price, price
  let precioVal = row['PRECIO'] ?? row['precio'] ?? row['Price'] ?? row['price'];
  if (precioVal !== null && precioVal !== undefined) {
    precioVal = parseFloat(precioVal);
  }
  const finalPrice = isNaN(precioVal) || precioVal === null ? (3.50 + (index % 5) * 0.75) : precioVal;

  // Sweetness supports DULZOR, dulzor, sweetnessRating, etc.
  let dulzorVal = row['DULZOR'] ?? row['dulzor'] ?? row['sweetnessRating'] ?? row['SweetnessRating'] ?? row['sweetness'] ?? row['Sweetness'];
  let sweetnessRating = (index % 4) + 2; // Default fallback to 2, 3, 4, 5
  if (dulzorVal !== null && dulzorVal !== undefined) {
    const parsed = parseInt(dulzorVal);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
      sweetnessRating = parsed;
    }
  }

  const sweetnessLevels = ['Low', 'Medium', 'High', 'Extreme'];
  const sweetnessLevel = sweetnessLevels[Math.min(sweetnessRating - 1, 3)];

  // Category supports CATEGORIA, categoria, category, Category
  let categoryVal = row['CATEGORIA'] ?? row['categoria'] ?? row['Category'] ?? row['category'];
  const defaultCategories = ['cake', 'donut', 'cupcake', 'macaron', 'tart', 'other'];
  let category = defaultCategories[index % defaultCategories.length];
  if (categoryVal && typeof categoryVal === 'string') {
    const cleaned = categoryVal.toLowerCase().trim();
    if (defaultCategories.includes(cleaned)) {
      category = cleaned;
    }
  }

  return {
    id: `sheet-${idVal}`,
    name: nombreVal,
    flavor: saborVal,
    sweetness: sweetnessLevel,
    sweetnessRating: sweetnessRating,
    size: 'Regular',
    img: customImg,
    description: comentarioVal,
    price: finalPrice,
    ingredients: ['Receta del ayer', 'Amor de la abuela', 'Ingredientes naturales de campo'],
    category: category,
    isBestSeller: index % 3 === 0,
    isStaffPick: index % 5 === 1,
    isFanFavorite: index % 4 === 2
  };
}

async function obtenerDatosSheets() {
  const url = "https://docs.google.com/spreadsheets/d/1_MJcTO6xAbyx_-4e_w9hk-RZj3wWY8TYWRvrfUyaQF8/gviz/tq?tqx=out:json";

  const res = await fetch(url);
  const text = await res.text();

  // Limpiar wrapper de Google.
  const jsonString = text.replace("/*O_o*/", "")
    .replace("google.visualization.Query.setResponse(", "")
    .slice(0, -2);

  const json = JSON.parse(jsonString);

  // Convertir rows + cols -> array de objetos
  return json.table.rows.map((row) => {
    const obj = {};

    row.c.forEach((cell, i) => {
      if (json.table.cols[i]) {
        obj[json.table.cols[i].label] = cell ? cell.v : null;
      }
    });
    return obj;
  });
}

function deleteReview(id) {
  reviewIdToDelete = id;
  const modal = document.getElementById('delete-confirm-modal');
  if (modal) modal.classList.remove('hidden');
}

function openStampsAlbum() {
  const modal = document.getElementById('stamps-album-modal');
  if (!modal) return;

  const container = document.getElementById('album-stamps-grid');
  const countLabel = document.getElementById('album-total-count');
  
  if (countLabel) {
    countLabel.textContent = STATE.products.length.toString();
  }

  if (container) {
    let html = '';
    STATE.products.forEach((p) => {
      const isBest = p.isBestSeller;
      const bestBadge = isBest ? '<span class="absolute top-1 left-1.5 font-mono text-[8px] bg-red-100 text-[#964261] px-1.5 py-0.5 rounded-sm border border-red-250 uppercase font-bold">TOP</span>' : '';
      
      html += `
        <div 
          class="album-stamp bg-white p-2.5 rounded-xl border-2 border-[#d8c1c6]/60 hover:border-[#964261] hover:scale-102 transition-all cursor-pointer relative flex flex-col justify-between"
          data-album-id="${p.id}"
        >
          <div>
            <div class="relative aspect-square rounded-lg bg-[#fff8f6] p-1 border border-neutral-150 mb-2 overflow-hidden">
               <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover rounded-md" referrerpolicy="no-referrer" />
              ${bestBadge}
            </div>
            <h5 class="text-xs font-extrabold text-[#2b1613] line-clamp-1" style="font-family: 'Space Mono', monospace;">
              ${p.name}
            </h5>
            <p class="text-[10px] text-[#534247]/70 font-semibold italic mt-0.5">${p.flavor}</p>
          </div>
          <div class="flex items-center justify-between mt-3 pt-1.5 border-t border-dashed border-neutral-200">
            <span class="text-[10px] font-bold text-[#964261] uppercase tracking-wider">Receta de la Abuela</span>
            <button 
              class="btn-album-buy bg-[#ffe9e5] hover:bg-[#964261] text-[#964261] hover:text-white p-1 rounded-full border border-[#964261]/25 transition-all cursor-pointer"
              data-buy-id="${p.id}"
              title="Añadir a la canasta"
            >
              <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;

    // Bind click events on stamps to open original detail modal
    container.querySelectorAll('.album-stamp').forEach(card => {
      card.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.btn-album-buy')) return;

        const id = card.getAttribute('data-album-id');
        const prod = STATE.products.find(p => p.id === id);
        if (prod) openProductDetail(prod);
      });
    });

    // Bind buy button events
    container.querySelectorAll('.btn-album-buy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-buy-id');
        const prod = STATE.products.find(p => p.id === id);
        if (prod) {
          addToCart(prod, 1);
        }
      });
    });
  }

  modal.classList.remove('hidden');
}

function closeStampsAlbum() {
  const modal = document.getElementById('stamps-album-modal');
  if (modal) modal.classList.add('hidden');
}

async function main() {
  try {
    const sheetData = await obtenerDatosSheets();
    datos = sheetData;

    console.clear();
    console.log(datos);

    if (datos && datos.length > 0) {
      // Map sheet rows to Product objects
      const sheetProducts = datos.map((row, idx) => mapSheetRowToProduct(row, idx));

      // Merge spreadsheet products with static defaults so the original delicious items are preserved
      STATE.products = [...sheetProducts, ...PRODUCTS];

      // Re-render and update UI components that display products
      renderFavourites();
      renderCatalog();

      const triedSelect = document.getElementById('form-tried-product');
      if (triedSelect) {
        const currentVal = triedSelect.value;
        let optionsHtml = '';
        STATE.products.forEach(p => {
          optionsHtml += `<option value="${p.name}" ${p.name === currentVal ? 'selected' : ''}>${p.name}</option>`;
        });
        optionsHtml += `<option value="Other">Otro bocado / Bebida</option>`;
        triedSelect.innerHTML = optionsHtml;
      }
    }
  } catch (err) {
    console.error("Error: ", err);
  }
}

// Initialize State from LocalStorage
function initLocalStorage() {
  const storedCart = localStorage.getItem('delicias_cart');
  if (storedCart) {
    try {
      STATE.cart = JSON.parse(storedCart);
    } catch (e) {
      STATE.cart = [];
    }
  }

  const storedReviews = localStorage.getItem('delicias_reviews');
  if (storedReviews) {
    try {
      STATE.reviews = JSON.parse(storedReviews);
    } catch (e) {
      STATE.reviews = INITIAL_REVIEWS;
    }
  } else {
    STATE.reviews = INITIAL_REVIEWS;
  }

  STATE.activeUser = localStorage.getItem('delicias_user');
}

function saveCartToStorage() {
  localStorage.setItem('delicias_cart', JSON.stringify(STATE.cart));
}

function saveReviewsToStorage() {
  localStorage.setItem('delicias_reviews', JSON.stringify(STATE.reviews));
}

function saveUserToStorage(user) {
  if (user) {
    localStorage.setItem('delicias_user', user);
  } else {
    localStorage.removeItem('delicias_user');
  }
}

// Render dynamic Favorite Polaroids
function renderFavourites() {
  const container = document.getElementById('favourites-carousel');
  if (!container) return;

  // Let's filter some featured favourites
  const favourites = STATE.products.filter(p => p.isBestSeller || p.isStaffPick || p.isFanFavorite);

  let html = '';
  favourites.forEach((p, index) => {
    // Generate slight tilt for realistic analog look
    const tilt = index % 2 === 0 ? 1 : -1;
    
    // Determine category badge emoji
    let badgeText = 'Favorito';
    let badgeColor = 'bg-[#ffe9e5] text-[#964261] border-[#964261]/25';
    if (p.isBestSeller) {
      badgeText = 'Best Seller 🔥';
      badgeColor = 'bg-[#ffeed9] text-[#865300] border-[#865300]/25';
    } else if (p.isStaffPick) {
      badgeText = 'Elección del Chef 👩‍🍳';
      badgeColor = 'bg-[#e4ffd9] text-[#2c661b] border-[#2c661b]/25';
    } else if (p.isFanFavorite) {
      badgeText = 'Favorito Club ⭐';
      badgeColor = 'bg-[#ffd9e2] text-[#722544] border-[#964261]/25';
    }

    html += `
      <div 
        style="transform: rotate(${tilt}deg)"
        class="fav-card bg-white p-5 rounded-sm border border-[#d8c1c6]/60 sticker-shadow flex-shrink-0 w-72 snap-center transition-all duration-300 hover:scale-[1.03] hover:rotate-0 cursor-pointer"
        data-pink-id="${p.id}"
      >
        <!-- Top washi tape effect decoration -->
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#ffe9e5]/80 border border-[#964261]/10 -rotate-1 opacity-75"></div>

        <!-- Polaroid Style Wrapper -->
        <div class="relative w-full h-48 bg-gray-100 rounded-sm overflow-hidden mb-4 border border-[#d8c1c6]/40">
          <img 
            src="${p.img}" 
            alt="${p.name}" 
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            referrerpolicy="no-referrer"
          />
          <span class="absolute top-2.5 right-2.5 text-xs font-mono font-bold px-2 py-0.5 rounded-md border text-[11px] sticker-shadow ${badgeColor}">
            ${badgeText}
          </span>
        </div>

        <!-- Content -->
        <div class="px-1 min-h-[90px] flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-base text-[#2b1613] leading-tight truncate-title" style="font-family: 'Bricolage Grotesque', sans-serif;">
              ${p.name}
            </h4>
            <p class="text-xs text-[#964261] font-bold uppercase tracking-wider mt-0.5" style="font-family: 'Space Mono', monospace;">
              &bull; ${p.flavor}
            </p>
          </div>
          
          <div class="flex items-center justify-between mt-3 pt-2.5 border-t border-dashed border-[#d8c1c6]/35 text-xs">
            <span class="font-mono font-bold text-xs text-[#964261] uppercase tracking-wider">Receta de la Casa</span>
            <span class="text-xs">🍰 x ${p.sweetnessRating}</span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Add event listeners to the favorite cards
  container.querySelectorAll('.fav-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-pink-id');
      const prod = STATE.products.find(p => p.id === id);
      if (prod) openProductDetail(prod);
    });
  });
}

// Render dynamic Filterable Catalog of Stamp Cards
function renderCatalog() {
  const container = document.getElementById('catalog-grid');
  if (!container) return;

  // Apply search query, category, and sweetness filters
  const filtered = STATE.products.filter(p => {
    const matchesCategory = STATE.activeCategory === 'all' || p.category === STATE.activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(STATE.searchQuery.toLowerCase()) || 
                          p.flavor.toLowerCase().includes(STATE.searchQuery.toLowerCase()) ||
                          p.ingredients.some(ing => ing.toLowerCase().includes(STATE.searchQuery.toLowerCase()));
    const matchesSweetness = p.sweetnessRating <= STATE.maxSweetness;

    return matchesCategory && matchesSearch && matchesSweetness;
  });

  // Stamp Count
  const countSpan = document.getElementById('stamps-count');
  if (countSpan) {
    countSpan.textContent = `Estampas encontradas (${filtered.length})`;
  }

  // Reset Filters trigger
  const btnReset = document.getElementById('btn-reset-filters');
  if (btnReset) {
    if (STATE.searchQuery || STATE.activeCategory !== 'all' || STATE.maxSweetness !== 5) {
      btnReset.classList.remove('hidden');
    } else {
      btnReset.classList.add('hidden');
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 bg-[#fff0ee]/40 rounded-3xl border border-dashed border-[#d8c1c6]">
        <span class="text-5xl select-none">🥨</span>
        <h4 class="text-lg font-bold text-[#6b5a60] mt-3" style="font-family: 'Bricolage Grotesque', sans-serif;">Ninguna estampa coincide</h4>
        <p class="text-xs text-[#534247] mt-1 max-w-sm mx-auto">Prueba limpiando tu búsqueda o deslizando la barra de nivel dulce para ver más delicias.</p>
        <button id="btn-no-results-clear" class="mt-4 bg-[#964261] text-white px-5 py-2 rounded-full font-bold text-xs border-2 border-white sticker-shadow cursor-pointer">Restablecer Todo</button>
      </div>
    `;

    document.getElementById('btn-no-results-clear')?.addEventListener('click', resetFilters);
    return;
  }

  let html = '';
  filtered.forEach((p, index) => {
    // Generate beautiful postage stamp mockup with subtle dashed borders
    const isBest = p.isBestSeller;
    const bestIndicator = isBest ? '<span class="absolute top-1 right-1 uppercase font-mono text-[9px] font-extrabold tracking-wider bg-[#ffe9e5] text-[#964261] px-1.5 py-0.5 rounded-sm border border-[#964261]/20">Most Wanted 🚀</span>' : '';

    html += `
      <div 
        class="catalog-item bg-[#fffcfb] p-3 rounded-2xl border-2 border-[#d8c1c6]/80 hover:bg-white hover:border-[#964261] transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between"
        data-pink-id="${p.id}"
      >
        <div>
          <!-- Stamp image frame -->
          <div class="relative aspect-square bg-[#fff8f6] rounded-xl overflow-hidden border border-[#d8c1c6]/30 p-1 mb-3.5">
            <img 
              src="${p.img}" 
              alt="${p.name}" 
              class="w-full h-full object-cover rounded-lg"
              referrerpolicy="no-referrer"
            />
            ${bestIndicator}
          </div>

          <!-- Description text -->
          <span class="text-[10px] uppercase font-mono tracking-widest text-[#964261]/80 font-bold block mb-0.5">&bull; ${p.flavor.split(' ')[0]}</span>
          <h4 class="font-bold text-sm text-[#2b1613] leading-tight font-display-sm truncate-title" style="font-family: 'Bricolage Grotesque', sans-serif;">
            ${p.name}
          </h4>
          <!-- Tiny description snippet -->
          <p class="text-[11px] text-[#534247] mt-1.5 line-clamp-2 leading-relaxed font-mono opacity-80">
            ${p.description}
          </p>
        </div>

        <div class="flex items-center justify-between mt-3.5 pt-2 border-t border-dashed border-[#d8c1c6]/30">
          <div class="flex">
            ${'🍰'.repeat(p.sweetnessRating)}
          </div>
          <!-- Shopping basket add action -->
          <button 
            class="btn-quick-add-to-cart p-2 rounded-full bg-[#964261] hover:bg-[#ffe9e5] text-white hover:text-[#964261] transition-all duration-200 cursor-pointer sticker-shadow active:translate-y-0.5 active:shadow-none"
            title="Agregar a la canasta"
            data-add-id="${p.id}"
          >
            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Add click handlers for stamps to trigger popup detail
  container.querySelectorAll('.catalog-item').forEach(card => {
    card.addEventListener('click', (e) => {
      // Avoid triggering when hitting quick add button
      const target = e.target;
      if (target.closest('.btn-quick-add-to-cart')) return;

      const id = card.getAttribute('data-pink-id');
      const prod = STATE.products.find(p => p.id === id);
      if (prod) openProductDetail(prod);
    });
  });

  // Add quick addition button listeners
  container.querySelectorAll('.btn-quick-add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-add-id');
      const prod = STATE.products.find(p => p.id === id);
      if (prod) {
        addToCart(prod, 1);
      }
    });
  });
}

// Render dynamic Scrapbook Review list
function renderReviews() {
  const container = document.getElementById('scrapbook-wall');
  if (!container) return;

  let html = '';
  STATE.reviews.forEach((review) => {
    const rotationStyle = `transform: rotate(${review.tilt}deg);`;
    const imageContainer = review.imageFile 
      ? `<div class="w-16 h-16 rounded-sm bg-[#fff8f6] border border-[#d8c1c6]/40 p-1 flex-shrink-0 sticker-shadow">
          <img src="${review.imageFile}" alt="Recuerdo de ${review.name}" class="w-full h-full object-cover rounded-sm" referrerpolicy="no-referrer" />
         </div>`
      : `<div class="w-12 h-12 rounded-full bg-[#ffd9e2] text-[#722544] border border-[#964261]/20 flex items-center justify-center font-bold font-mono shadow-sm">
          ${review.name.slice(0, 2).toUpperCase()}
         </div>`;

    html += `
      <div 
        style="${rotationStyle}"
        class="bg-white p-6 rounded-sm border border-[#d8c1c6]/60 sticker-shadow relative transition-transform duration-300 hover:scale-[1.02] hover:rotate-0"
      >
        <!-- Retro physical washi adhesive tape layout overlay -->
        <div class="absolute -top-4 left-6 w-24 h-7 -rotate-[10deg] opacity-75 border border-amber-200/50 bg-[#fffcd2] shadow-xs"></div>
        
        <!-- Delete Button (Top-Right coordinates) -->
        <button 
          class="btn-delete-review absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#fff5f5] hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors cursor-pointer border border-[#d8c1c6]/30 sticker-shadow-small focus:outline-none"
          title="Eliminar este recuerdo permanentemente"
          data-review-id="${review.id}"
        >
          <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>

        <!-- User profile with Polaroid-styled image frame if exists -->
        <div class="flex gap-4 items-start mb-4">
          ${imageContainer}
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2 mr-6">
              <h4 class="text-sm font-bold text-[#6b5a60] truncate" style="font-family: 'Space Mono', monospace;">
                ${review.name}
              </h4>
              <span class="font-mono text-[10px] text-[#534247] font-medium shrink-0">
                ${review.date}
              </span>
            </div>
            <div class="flex items-center gap-1.5 mt-0.5">
              <span class="text-[10px] uppercase font-mono tracking-wider text-[#534247] bg-[#fff8f6] px-2 py-0.5 rounded-md border border-[#d8c1c6]/30 font-semibold text-center">
                Probó: ${review.triedProduct}
              </span>
            </div>
          </div>
        </div>

        <!-- Testimonial message content -->
        <p class="italic text-base md:text-lg leading-relaxed mb-3 text-[#2b1613]" style="font-family: 'Epilogue', sans-serif;">
          "${review.comment}"
        </p>

        <!-- Bottom sweet specs detail -->
        <div class="flex items-center justify-between pt-2 border-t border-[#d8c1c6]/30 text-xs font-mono text-[#534247]">
          <span class="text-[10px]">📍 ${review.findUsMethod === 'Walk-in by chance' ? 'Por casualidad' : review.findUsMethod === "Friend's recommendation" ? 'Por recomendación' : review.findUsMethod === 'Social Media magic' ? 'Redes sociales' : 'En sueños'}</span>
          <div class="flex gap-0.5 text-[#964261] text-base">
            ${'🍰'.repeat(review.sweetnessRating)}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Bind click event listeners for deletion buttons
  container.querySelectorAll('.btn-delete-review').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-review-id');
      if (id) {
        deleteReview(id);
      }
    });
  });
}

// Render dynamic Shopping Cart rows & prices
function renderCart() {
  const badge = document.getElementById('cart-badge');
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');

  const count = STATE.cart.reduce((acc, item) => acc + item.quantity, 0);

  // Update Badge
  if (badge) {
    if (count > 0) {
      badge.textContent = count.toString();
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  if (!body) return;

  if (STATE.cart.length === 0) {
    body.innerHTML = `
      <div class="text-center py-20">
        <p class="text-5xl mb-4 select-none">🧺</p>
        <h4 class="text-base font-bold mb-1 text-[#6b5a60]" style="font-family: 'Bricolage Grotesque', sans-serif;">
          Tu canasta está lista para rellenar
        </h4>
        <p class="text-xs text-[#534247] max-w-xs mx-auto leading-relaxed" style="font-family: 'Be Vietnam Pro', sans-serif;">
          Explora nuestro menú interactivo de estampas de repostería y agrega unas dulces galletas, donas o pasteles para tu merienda.
        </p>
        <button 
          id="btn-cart-close-explore"
          class="mt-6 inline-flex items-center gap-1 bg-[#964261] text-white font-mono text-xs font-bold px-5 py-2.5 rounded-full border-2 border-white sticker-shadow cursor-pointer"
        >
          Ir a la Pastelería
        </button>
      </div>
    `;

    document.getElementById('btn-cart-close-explore')?.addEventListener('click', toggleCartDrawer);
    if (footer) footer.classList.add('hidden');
    return;
  }

  // Cart has items, display them
  if (footer) footer.classList.remove('hidden');

  let html = '<div class="space-y-4">';
  STATE.cart.forEach(item => {
    html += `
      <div class="flex items-stretch gap-4 p-3 bg-white rounded-xl border border-[#d8c1c6]/50 sticker-shadow hover:scale-[1.01] transition-transform">
        <!-- Item Polaroid Thumbnail -->
        <div class="w-20 h-20 bg-[#fff8f6] rounded-lg overflow-hidden border border-[#d8c1c6]/30 flex-shrink-0">
          <img 
            src="${item.product.img}" 
            alt="${item.product.name}" 
            class="w-full h-full object-cover"
            referrerpolicy="no-referrer"
          />
        </div>

        <!-- Item Meta & Controls -->
        <div class="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h4 class="text-xs font-bold text-[#6b5a60] truncate" style="font-family: 'Space Mono', monospace;">
              ${item.product.name}
            </h4>
            <p class="text-[10px] text-[#534247] font-mono uppercase mt-0.5">
              ${item.product.flavor}
            </p>
          </div>

          <!-- Controls Panel -->
          <div class="flex items-center justify-between mt-2">
            <!-- Quantity increments -->
            <div class="flex items-center gap-1 bg-[#fff2f0] -my-1 py-0.5 px-2 rounded-full border border-[#d8c1c6]/50">
              <button 
                class="btn-qty-minus p-1 text-[#2b1613] hover:text-[#964261] transition-colors focus:outline-none"
                data-id="${item.product.id}"
                ${item.quantity <= 1 ? 'disabled style="opacity:0.4"' : ''}
              >
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
              </button>
              <span class="font-mono text-xs font-bold px-1.5 text-[#6b5a60]">
                ${item.quantity}
              </span>
              <button 
                class="btn-qty-plus p-1 text-[#2b1613] hover:text-[#964261] transition-colors focus:outline-none"
                data-id="${item.product.id}"
              >
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" x2="12" y1="5" y2="19"></line>
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
              </button>
            </div>

            <!-- Price and Delete action -->
            <div class="flex items-center gap-2">
              <span class="text-[10px] uppercase font-mono tracking-wider bg-[#ffe9e5] text-[#964261] px-1.5 py-0.5 rounded-sm">
                Agregado
              </span>
              <button 
                class="btn-remove-item p-1 hover:text-red-500 text-[#867277] transition-colors cursor-pointer"
                title="Eliminar delicia"
                data-id="${item.product.id}"
              >
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';

  body.innerHTML = html;

  // Calculate pricing bills
  const subtotal = STATE.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const packaging = subtotal > 0 ? 1.50 : 0.00;
  const total = subtotal + packaging;

  const subtotalSpan = document.getElementById('cart-subtotal');
  const packagingSpan = document.getElementById('cart-packaging');
  const totalSpan = document.getElementById('cart-total');

  if (subtotalSpan) subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
  if (packagingSpan) packagingSpan.textContent = `$${packaging.toFixed(2)}`;
  if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;

  // Bind cart modifiers
  body.querySelectorAll('.btn-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) updateCartQuantity(id, -1);
    });
  });

  body.querySelectorAll('.btn-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) updateCartQuantity(id, 1);
    });
  });

  body.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) removeCartItem(id);
    });
  });
}

// Render dynamic elements matching Login State
function renderLoginState() {
  const headerBtnText = document.getElementById('header-user-text');
  const mobLoginBtn = document.getElementById('btn-mobile-login');

  if (STATE.activeUser) {
    if (headerBtnText) headerBtnText.textContent = `${STATE.activeUser} (Salir)`;
    if (mobLoginBtn) mobLoginBtn.textContent = `${STATE.activeUser} (Cerrar Sesión)`;

    // pre-fill Scrapbook name smoothly
    const formNameInput = document.getElementById('form-name');
    if (formNameInput && !formNameInput.value) {
      formNameInput.value = STATE.activeUser;
    }
  } else {
    if (headerBtnText) headerBtnText.textContent = 'Iniciar Sesión';
    if (mobLoginBtn) mobLoginBtn.textContent = 'Iniciar Sesión';

    const formNameInput = document.getElementById('form-name');
    if (formNameInput && formNameInput.value) {
      formNameInput.value = '';
    }
  }
}

// Modify cart state
function addToCart(product, quantity) {
  const existing = STATE.cart.find(item => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    STATE.cart.push({ product, quantity });
  }

  saveCartToStorage();
  renderCart();

  // Highlight cart basket
  openCartDrawer();
}

function updateCartQuantity(productId, increment) {
  const item = STATE.cart.find(it => it.product.id === productId);
  if (item) {
    item.quantity += increment;
    if (item.quantity <= 0) {
      STATE.cart = STATE.cart.filter(it => it.product.id !== productId);
    }
  }
  saveCartToStorage();
  renderCart();
}

function removeCartItem(productId) {
  STATE.cart = STATE.cart.filter(it => it.product.id !== productId);
  saveCartToStorage();
  renderCart();
}

function resetFilters() {
  STATE.searchQuery = '';
  STATE.activeCategory = 'all';
  STATE.maxSweetness = 5;

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const sweetnessSlider = document.getElementById('sweetness-slider');
  if (sweetnessSlider) sweetnessSlider.value = '5';

  const sweetnessBadge = document.getElementById('sweetness-badge');
  if (sweetnessBadge) sweetnessBadge.textContent = 'Extremo 🍯';

  // Toggle active category chip classes
  document.querySelectorAll('.category-chip').forEach(btn => {
    const cat = btn.getAttribute('data-category');
    if (cat === 'all') {
      btn.className = 'category-chip px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border bg-[#964261] text-[#ffffff] border-[#964261] shadow-sm scale-102';
    } else {
      btn.className = 'category-chip px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border bg-white text-[#534247] hover:text-[#964261] hover:bg-[#fff0ee] border-[#d8c1c6]/50';
    }
  });

  renderCatalog();
}

// Cart Drawer Toggles
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer-overlay');
  if (drawer) drawer.classList.remove('hidden');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer-overlay');
  if (drawer) drawer.classList.add('hidden');
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer-overlay');
  if (drawer) {
    drawer.classList.toggle('hidden');
  }
}

// Product Detail Modal operations
function openProductDetail(product) {
  STATE.selectedProduct = product;
  STATE.detailModalQuantity = 1;

  const modal = document.getElementById('detail-modal');
  const emoji = document.getElementById('detail-emoji');
  const cardNumber = document.getElementById('detail-card-number');
  const img = document.getElementById('detail-img');
  const price = document.getElementById('detail-price');
  const title = document.getElementById('detail-title');
  const flavor = document.getElementById('detail-flavor');
  const description = document.getElementById('detail-description');
  const ingredientsContainer = document.getElementById('detail-ingredients-container');
  const counterVal = document.getElementById('detail-qty-value');

  if (!modal) return;

  // Determine standard categories emoji
  let catEmoji = '🍰';
  switch (product.category) {
    case 'cake': catEmoji = '🍰'; break;
    case 'donut': catEmoji = '🍩'; break;
    case 'cupcake': catEmoji = '🧁'; break;
    case 'macaron': catEmoji = '🍬'; break;
    case 'tart': catEmoji = '🥧'; break;
    default: catEmoji = '🍪'; break;
  }

  if (emoji) emoji.textContent = catEmoji;
  if (cardNumber) cardNumber.textContent = `Coleccionable #${product.id.slice(0, 4).toUpperCase()}`;
  if (img) {
    img.src = product.img;
    img.alt = product.name;
  }
  if (price) {
    price.classList.add('hidden');
  }
  if (title) title.textContent = product.name;
  if (flavor) flavor.textContent = product.flavor;
  if (description) description.textContent = product.description;
  if (counterVal) counterVal.textContent = '1';

  // Build ingredients chips
  if (ingredientsContainer) {
    let ingHtml = '';
    product.ingredients.forEach(ing => {
      ingHtml += `
        <span class="text-[10px] font-mono text-[#534247] bg-[#fff8f6] px-2 py-0.5 rounded border border-[#d8c1c6]/30 font-medium">
          ✨ ${ing}
        </span>
      `;
    });
    ingredientsContainer.innerHTML = ingHtml;
  }

  updateDetailAddButtonPrice();

  modal.classList.remove('hidden');
}

function closeProductDetail() {
  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.add('hidden');
  STATE.selectedProduct = null;
}

function updateDetailQuantity(delta) {
  STATE.detailModalQuantity = Math.max(1, STATE.detailModalQuantity + delta);
  const counterVal = document.getElementById('detail-qty-value');
  if (counterVal) counterVal.textContent = STATE.detailModalQuantity.toString();

  updateDetailAddButtonPrice();
}

function updateDetailAddButtonPrice() {
  const btn = document.getElementById('btn-add-detail-to-cart');
  if (!btn || !STATE.selectedProduct) return;

  btn.innerHTML = `<span>Agregar a la canasta (${STATE.detailModalQuantity} unidades)</span>`;
}

// Login Modal
function openLoginModal() {
  // If user is already logged in, let's treat the click as a logout
  if (STATE.activeUser) {
    if (confirm(`¿Quieres cerrar la sesión de ${STATE.activeUser}?`)) {
      STATE.activeUser = null;
      saveUserToStorage(null);
      renderLoginState();
    }
    return;
  }

  const modal = document.getElementById('login-modal');
  const formBox = document.getElementById('login-form-container');
  const successBox = document.getElementById('login-success-container');

  if (modal) {
    modal.classList.remove('hidden');
    if (formBox) formBox.classList.remove('hidden');
    if (successBox) successBox.classList.add('hidden');
  }
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) modal.classList.add('hidden');
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-dropdown');
  
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// Scroll navigation helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // Close mobile dropdown if open
  document.getElementById('mobile-dropdown')?.classList.add('hidden');
}

// Core setup bindings
document.addEventListener('DOMContentLoaded', () => {
  initLocalStorage();
  initTheme();
  updateStoreStatusBadge();
  
  // Set default products state
  STATE.products = [...PRODUCTS];
  
  // Render views
  renderFavourites();
  renderCatalog();
  renderReviews();
  renderCart();
  renderLoginState();

  // Populate form tried products selection list
  const triedSelect = document.getElementById('form-tried-product');
  if (triedSelect) {
    let optionsHtml = '';
    STATE.products.forEach(p => {
      optionsHtml += `<option value="${p.name}">${p.name}</option>`;
    });
    optionsHtml += `<option value="Other">Otro bocado / Bebida</option>`;
    triedSelect.innerHTML = optionsHtml;
  }

  // Bind simple links
  document.getElementById('nav-logo')?.addEventListener('click', () => scrollToSection('hero-section'));
  document.getElementById('link-hero')?.addEventListener('click', () => scrollToSection('hero-section'));
  document.getElementById('link-favourites')?.addEventListener('click', () => scrollToSection('favourites-section'));
  document.getElementById('link-catalog')?.addEventListener('click', () => scrollToSection('catalog-section'));
  document.getElementById('link-scrapbook')?.addEventListener('click', () => scrollToSection('scrapbook-section'));

  document.getElementById('mob-link-hero')?.addEventListener('click', () => scrollToSection('hero-section'));
  document.getElementById('mob-link-favourites')?.addEventListener('click', () => scrollToSection('favourites-section'));
  document.getElementById('mob-link-catalog')?.addEventListener('click', () => scrollToSection('catalog-section'));
  document.getElementById('mob-link-scrapbook')?.addEventListener('click', () => scrollToSection('scrapbook-section'));

  document.getElementById('footer-link-hero')?.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('hero-section'); });
  document.getElementById('footer-link-favourites')?.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('favourites-section'); });
  document.getElementById('footer-link-catalog')?.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('catalog-section'); });
  document.getElementById('footer-link-scrapbook')?.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('scrapbook-section'); });

  // Buttons triggers
  document.getElementById('btn-toggle-theme')?.addEventListener('click', toggleTheme);
  document.getElementById('btn-discover')?.addEventListener('click', () => scrollToSection('catalog-section'));
  document.getElementById('btn-open-cart')?.addEventListener('click', toggleCartDrawer);
  document.getElementById('btn-close-cart')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer-backdrop')?.addEventListener('click', closeCartDrawer);

  document.getElementById('btn-header-login')?.addEventListener('click', openLoginModal);
  document.getElementById('btn-mobile-login')?.addEventListener('click', openLoginModal);
  document.getElementById('btn-close-login')?.addEventListener('click', closeLoginModal);
  document.getElementById('login-modal-backdrop')?.addEventListener('click', closeLoginModal);

  document.getElementById('btn-close-detail')?.addEventListener('click', closeProductDetail);
  document.getElementById('detail-modal-backdrop')?.addEventListener('click', closeProductDetail);

  document.getElementById('btn-mobile-menu')?.addEventListener('click', toggleMobileMenu);

  // Detail Modal Actions
  document.getElementById('btn-detail-qty-minus')?.addEventListener('click', () => updateDetailQuantity(-1));
  document.getElementById('btn-detail-qty-plus')?.addEventListener('click', () => updateDetailQuantity(1));
  document.getElementById('btn-add-detail-to-cart')?.addEventListener('click', () => {
    if (STATE.selectedProduct) {
      addToCart(STATE.selectedProduct, STATE.detailModalQuantity);
      closeProductDetail();
    }
  });

  // Filters Events
  const searchInput = document.getElementById('search-input');
  searchInput?.addEventListener('input', (e) => {
    STATE.searchQuery = e.target.value;
    renderCatalog();
  });

  const sweetnessSlider = document.getElementById('sweetness-slider');
  const sweetnessBadge = document.getElementById('sweetness-badge');
  sweetnessSlider?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    STATE.maxSweetness = val;
    
    // Categorize sweetness descriptions
    if (sweetnessBadge) {
      let btext = 'Extremo 🍯';
      if (val === 4) btext = 'Elevado 🍰';
      if (val === 3) btext = 'Perfecto 🍩';
      if (val === 2) btext = 'Equilibrado 🍪';
      sweetnessBadge.textContent = btext;
    }
    renderCatalog();
  });

  document.getElementById('btn-reset-filters')?.addEventListener('click', resetFilters);

  // Bind Category selector chips
  document.querySelectorAll('.category-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category') || 'all';
      STATE.activeCategory = cat;

      // Class toggles active/inactive
      document.querySelectorAll('.category-chip').forEach(innerBtn => {
        const innerCat = innerBtn.getAttribute('data-category');
        if (innerCat === cat) {
          innerBtn.className = 'category-chip px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border bg-[#964261] text-[#ffffff] border-[#964261] shadow-sm scale-102';
        } else {
          innerBtn.className = 'category-chip px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border bg-white text-[#534247] hover:text-[#964261] hover:bg-[#fff0ee] border-[#d8c1c6]/50';
        }
      });

      renderCatalog();
    });
  });

  // Carousel controls
  const carousel = document.getElementById('favourites-carousel');
  document.getElementById('carousel-prev')?.addEventListener('click', () => {
    if (carousel) carousel.scrollLeft -= 320;
  });
  document.getElementById('carousel-next')?.addEventListener('click', () => {
    if (carousel) carousel.scrollLeft += 320;
  });

  // Login execution
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nicknameInput = document.getElementById('login-nickname');
    const emailInput = document.getElementById('login-email');

    if (!nicknameInput || !emailInput) return;

    const name = nicknameInput.value.trim();
    if (name) {
      const formBox = document.getElementById('login-form-container');
      const successBox = document.getElementById('login-success-container');
      const successTitle = document.getElementById('login-success-title');

      STATE.activeUser = name;
      saveUserToStorage(name);
      renderLoginState();

      if (successTitle) {
        successTitle.textContent = `¡Bienvenido de vuelta, ${name}!`;
      }

      if (formBox) formBox.classList.add('hidden');
      if (successBox) successBox.classList.remove('hidden');

      // Auto close/dismiss login flow
      setTimeout(() => {
        closeLoginModal();
        // Reset input fields
        nicknameInput.value = '';
        emailInput.value = '';
      }, 1600);
    }
  });

  // Stamp Album Modal Actions
  document.getElementById('btn-open-stamps-album')?.addEventListener('click', openStampsAlbum);
  document.getElementById('btn-close-stamps-album-header')?.addEventListener('click', closeStampsAlbum);
  document.getElementById('btn-close-stamps-album-bottom')?.addEventListener('click', closeStampsAlbum);
  document.getElementById('stamps-album-modal-backdrop')?.addEventListener('click', closeStampsAlbum);

  // Review deletion modal callbacks
  document.getElementById('btn-close-delete-modal')?.addEventListener('click', () => {
    const modal = document.getElementById('delete-confirm-modal');
    if (modal) modal.classList.add('hidden');
    reviewIdToDelete = null;
  });

  document.getElementById('btn-cancel-delete')?.addEventListener('click', () => {
    const modal = document.getElementById('delete-confirm-modal');
    if (modal) modal.classList.add('hidden');
    reviewIdToDelete = null;
  });

  document.getElementById('btn-confirm-delete')?.addEventListener('click', () => {
    if (reviewIdToDelete) {
      // Remove review from in-memory state
      STATE.reviews = STATE.reviews.filter(rev => rev.id !== reviewIdToDelete);
      saveReviewsToStorage();
      renderReviews();
    }

    const modal = document.getElementById('delete-confirm-modal');
    if (modal) modal.classList.add('hidden');
    reviewIdToDelete = null;
  });

  // Scrapbook Form image file uploader & Drag-Drop helpers
  const imgInput = document.getElementById('form-image');
  const dragZone = document.getElementById('drag-drop-zone');
  const dragPlaceholder = document.getElementById('drag-drop-placeholder');
  const previewBox = document.getElementById('form-image-preview');
  const imgEl = document.getElementById('form-image-preview-img');

  function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        STATE.formImageFile = event.target.result;
        
        // Show interactive polaroid preview tag and hide placeholder
        if (imgEl) imgEl.src = STATE.formImageFile;
        if (previewBox) previewBox.classList.remove('hidden');
        if (dragPlaceholder) dragPlaceholder.classList.add('hidden');
      };
      reader.readAsDataURL(file);
    }
  }

  if (imgInput) {
    imgInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      handleFile(file);
    });
  }

  if (dragZone) {
    // Click zone triggers file selection
    dragZone.addEventListener('click', (e) => {
      // Prevent click loop if the click originated on the remove/clear button or input itself
      if (e.target.closest('#btn-clear-preview') || e.target === imgInput) {
        return;
      }
      imgInput?.click();
    });

    // Drag-drop events
    ['dragenter', 'dragover'].forEach(eventName => {
      dragZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dragZone.classList.add('bg-[#ffe9e5]', 'border-[#964261]');
      }, false);
    });

    ['dragleave', 'dragend'].forEach(eventName => {
      dragZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dragZone.classList.remove('bg-[#ffe9e5]', 'border-[#964261]');
      }, false);
    });

    dragZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dragZone.classList.remove('bg-[#ffe9e5]', 'border-[#964261]');
      const dt = e.dataTransfer;
      const file = dt.files[0];
      handleFile(file);
    }, false);
  }

  // Dismiss picture snapshot preview
  document.getElementById('btn-clear-preview')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    STATE.formImageFile = null;
    if (previewBox) {
      previewBox.classList.add('hidden');
    }
    if (dragPlaceholder) {
      dragPlaceholder.classList.remove('hidden');
    }
    if (imgInput) imgInput.value = '';
  });

  // Adding reviews flow
  document.getElementById('scrapbook-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('form-name');
    const methodSelect = document.getElementById('form-method');
    const triedSelect = document.getElementById('form-tried-product');
    const commentArea = document.getElementById('form-comment');

    if (!nameInput || !methodSelect || !triedSelect || !commentArea) return;

    const name = nameInput.value.trim();
    const comment = commentArea.value.trim();

    if (!name || !comment) {
      alert('Por favor rellena tu nombre y comparte un dulce recuerdo.');
      return;
    }

    // Insert new review
    const newRev = {
      id: `review-${Date.now()}`,
      name: name,
      findUsMethod: methodSelect.value,
      triedProduct: triedSelect.value === 'Other' ? 'Otras Delicias' : triedSelect.value,
      sweetnessRating: STATE.formSweetnessRating,
      comment: comment,
      imageFile: STATE.formImageFile,
      date: 'Reciente',
      tilt: Math.random() * 4 - 2 // tilt between -2 and 2 degrees
    };

    STATE.reviews.unshift(newRev);
    saveReviewsToStorage();
    renderReviews();

    // Reset fields
    commentArea.value = '';
    STATE.formImageFile = null;
    const previewBox = document.getElementById('form-image-preview');
    if (previewBox) previewBox.classList.add('hidden');
    const dragPlaceholderBox = document.getElementById('drag-drop-placeholder');
    if (dragPlaceholderBox) dragPlaceholderBox.classList.remove('hidden');
    const fileInput = document.getElementById('form-image');
    if (fileInput) fileInput.value = '';

    // Scroll back to scrapbook cards view
    scrollToSection('scrapbook-section');
  });

  // Rating sweetness star/cake clicks inside the testimonial form
  const rateCakes = document.querySelectorAll('.form-rate-cake');
  rateCakes.forEach(cake => {
    cake.addEventListener('click', () => {
      const rate = parseInt(cake.getAttribute('data-rate'));
      STATE.formSweetnessRating = rate;

      // Toggle visual indicators colors
      rateCakes.forEach(innerCake => {
        const innerRate = parseInt(innerCake.getAttribute('data-rate'));
        if (innerRate <= rate) {
          innerCake.classList.replace('opacity-40', 'opacity-100');
          innerCake.classList.add('scale-110');
        } else {
          innerCake.classList.replace('opacity-100', 'opacity-40');
          innerCake.classList.remove('scale-110');
        }
      });
    });
  });

  // Checkout order placement drawer submission confirmation
  document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const customerNameInput = document.getElementById('checkout-name');
    const customerPhoneInput = document.getElementById('checkout-phone');
    const customerCommentsInput = document.getElementById('checkout-notes');

    if (!customerNameInput || !customerPhoneInput) return;

    const customerName = customerNameInput.value.trim();
    const customerPhone = customerPhoneInput.value.trim();
    const customerComments = customerCommentsInput ? customerCommentsInput.value.trim() : '';

    if (!customerName || !customerPhone) {
      alert('Por favor indícanos tu nombre y whatsapp para enviarte el pedido.');
      return;
    }

    // Generate beautiful WhatsApp message
    const orderItems = STATE.cart.map(item => `- ${item.quantity}x ${item.product.name} (${item.product.flavor})`).join('\n');
    const waText = `¡Hola Delicias del Ayer! 🍰✨\n\nQuiero hacer un pedido nostálgico:\n${orderItems}\n\n*A nombre de:* ${customerName}\n*Contacto:* ${customerPhone}\n*Notas:* ${customerComments}\n\n¡Muchas gracias por mantener vivos los dulces recuerdos! 🕰️`;
    const waUrl = `https://api.whatsapp.com/send?phone=5491112345678&text=${encodeURIComponent(waText)}`;

    // Open WhatsApp link
    window.open(waUrl, '_blank');

    // Reset shopping cart state
    STATE.cart = [];
    saveCartToStorage();
    renderCart();

    // Close checkout sheet drawer
    closeCartDrawer();

    // Clear form fields
    form.reset();

    alert('¡Pedido enviado de ensueño! Te redirigimos para coordinar los detalles nostálgicos del horneado.');
  });

  // Set footer copyright year dynamically
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear().toString();
  }
});

// Start dynamic Google Sheets sync
setInterval(main, 5000);
main();
