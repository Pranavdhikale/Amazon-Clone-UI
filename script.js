document.addEventListener('DOMContentLoaded', function() {
    
    //HERO IMAGE CAROUSEL..
    const carouselImages = [
        { src: 'hero_image.jpg', alt: 'Hero Banner', caption: 'Welcome to Amazon - Biggest Sale of the Year!' },
        { src: 'h1.jpg', alt: 'Special Offer 1', caption: 'Daily Deals - Up to 70% Off' },
        { src: 'h2.jpg', alt: 'Special Offer 2', caption: 'Electronics Sale - Best Prices' },
        { src: 'h3.jpg', alt: 'Special Offer 3', caption: 'Fashion Fest - Minimum 50% Off' },
        { src: 'h4.jpg', alt: 'Special Offer 4', caption: 'Home Essentials - Great Deals' },
        { src: 'h5.jpg', alt: 'Special Offer 5', caption: 'Weekend Special - Extra Discounts' }
    ];

    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayTime = 3000; // 3 seconds..

    // Initialize carousel..
    function initCarousel() {
        if (!track) return;

        // Clear existing content..
        track.innerHTML = '';
        dotsContainer.innerHTML = '';

        // Add slides..
        carouselImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" onerror="this.src='https://via.placeholder.com/1920x500?text=Special+Offer+${index+1}'">
                <div class="slide-caption">${image.caption}</div>
            `;
            track.appendChild(slide);

            // Create dot..
            const dot = document.createElement('button');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Set initial position..
        updateCarousel();
    }

    // Update carousel positionnn..
    function updateCarousel() {
        if (!track) return;
        const slideWidth = track.children[0]?.offsetWidth || 0;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update dots..
        document.querySelectorAll('.dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Go to specific slide..
    function goToSlide(index) {
        if (index < 0) {
            index = carouselImages.length - 1;
        } else if (index >= carouselImages.length) {
            index = 0;
        }
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Start auto play
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, autoPlayTime);
    }

    // Stop auto play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Reset auto play
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event listeners for carousel controls
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');

    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            prevSlide();
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            nextSlide();
        });
    }

    // Pause auto play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Initialize carousel
    initCarousel();
    startAutoPlay();

    //PRODUCT DATA.. 
    const products = [
        { id: 1, title: "Clothes", price: 29.99, rating: 4.5, category: "fashion", img: "box1_image.jpg", description: "Trendy fashion clothes for men and women" },
        { id: 2, title: "Health & Personal Care", price: 49.99, rating: 4.3, category: "health", img: "box2_image.jpg", description: "Premium health and personal care products" },
        { id: 3, title: "Furniture", price: 199.99, rating: 4.7, category: "home", img: "box3_image.jpg", description: "Modern furniture for your home" },
        { id: 4, title: "Electronics", price: 299.99, rating: 4.8, category: "electronics", img: "box4_image.jpg", description: "Latest electronics and gadgets" },
        { id: 5, title: "Beauty picks", price: 39.99, rating: 4.4, category: "beauty", img: "box5_image.jpg", description: "Top beauty and cosmetic products" },
        { id: 6, title: "Pet care", price: 24.99, rating: 4.2, category: "pets", img: "box6_image.jpg", description: "Everything for your furry friends" },
        { id: 7, title: "New Arrival in Toys", price: 34.99, rating: 4.6, category: "toys", img: "box7_image.jpg", description: "Latest toys and games for kids" },
        { id: 8, title: "Discover Fashion Trends", price: 59.99, rating: 4.5, category: "fashion", img: "box8_image.jpg", description: "Stay trendy with new fashion arrivals" }
    ];

    // CART SYSTEM 
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Animation
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
        }
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = total.toFixed(2);
        }
    }

    function displayCartItems() {
        const cartItemsDiv = document.getElementById('cartItems');
        if (!cartItemsDiv) return;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<div class="empty-cart"><i class="fa-solid fa-cart-shopping"></i><p>Your cart is empty</p><p style="font-size:0.9rem; color:#666; margin-top:10px;">Shop now and add items to cart!</p></div>';
            document.getElementById('cartTotal').textContent = '0.00';
            return;
        }

        let html = '';
        cart.forEach(item => {
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.img}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/60'">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="window.updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="window.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <i class="fa-solid fa-trash remove-item" onclick="window.removeFromCart(${item.id})"></i>
                </div>
            `;
        });

        cartItemsDiv.innerHTML = html;
        updateCartTotal();
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                img: product.img
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`✅ Added "${product.title}" to cart`);
        
        if (document.getElementById('cartModal').style.display === 'block') {
            displayCartItems();
        }
    };

    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
        showNotification('🗑️ Item removed from cart');
    };

    window.updateQuantity = function(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                window.removeFromCart(productId);
            } else {
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                displayCartItems();
            }
        }
    };

    // SHOP SECTION 
    const shopSec = document.getElementById('shopSection');
    if (shopSec) {
        shopSec.innerHTML = ''; // clear
        
        products.forEach((product, index) => {
            const box = document.createElement('div');
            box.className = 'box';
            box.setAttribute('data-category', product.category);
            box.setAttribute('data-id', product.id);
            
            // Generate stars for rating
            const fullStars = Math.floor(product.rating);
            const halfStar = product.rating % 1 >= 0.5 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;
            
            let starsHtml = '';
            for (let i = 0; i < fullStars; i++) starsHtml += '★';
            if (halfStar) starsHtml += '½';
            for (let i = 0; i < emptyStars; i++) starsHtml += '☆';
            
            box.innerHTML = `
                <div class="box-content">
                    <h2>${product.title}</h2>
                    <div class="box-img" style="background-image: url('${product.img}'); background-size: cover; background-position: center;"></div>
                    <div class="rating">
                        ${starsHtml} <span>${product.rating}</span>
                    </div>
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); window.addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                    <p style="margin-top:10px; color:#007185;">See more <i class="fa-solid fa-arrow-right"></i></p>
                </div>
            `;
            
            // Product click for details
            box.addEventListener('click', (e) => {
                if (!e.target.classList.contains('add-to-cart-btn') && !e.target.closest('.add-to-cart-btn')) {
                    showProductDetails(product);
                }
            });
            
            shopSec.appendChild(box);
        });
    }

    // PRODUCT DETAILS MODAL
    function showProductDetails(product) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        
        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) starsHtml += '★';
        if (halfStar) starsHtml += '½';
        for (let i = 0; i < emptyStars; i++) starsHtml += '☆';
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2>${product.title}</h2>
                    <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <img src="${product.img}" alt="${product.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;" onerror="this.src='https://via.placeholder.com/600x300'">
                    <div style="margin: 20px 0;">
                        <p style="font-size:1.1rem; line-height:1.6; color:#333;">${product.description}</p>
                        <div class="rating" style="margin: 15px 0; font-size:1.2rem;">
                            ${starsHtml} <span style="font-size:1rem;">(${product.rating} stars)</span>
                        </div>
                        <div class="price" style="font-size: 2.5rem; color:#B12704;">$${product.price.toFixed(2)}</div>
                    </div>
                    <button class="auth-btn" style="background:#febd69; color:#131921; font-size:1.2rem;" onclick="window.addToCart(${product.id}); this.closest('.modal').remove();">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // SEARCH FUNCTIONALITY 
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchCategory = document.getElementById('searchCategory');

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const category = searchCategory.value;
        
        if (query === '') {
            showNotification('🔍 Please enter a search term');
            searchInput.focus();
            return;
        }

        // Filter products based on search
        const results = products.filter(product => {
            const matchesQuery = product.title.toLowerCase().includes(query) || 
                                product.description.toLowerCase().includes(query);
            const matchesCategory = category === 'all' || product.category === category;
            return matchesQuery && matchesCategory;
        });

        // Show results modal
        showSearchResults(query, results);
    }

    function showSearchResults(query, results) {
        const modal = document.getElementById('searchModal');
        const resultsDiv = document.getElementById('searchResults');
        
        if (results.length === 0) {
            resultsDiv.innerHTML = `
                <div class="empty-search">
                    <i class="fa-solid fa-search" style="font-size: 4rem; color: #febd69; margin-bottom: 20px;"></i>
                    <p style="font-size:1.3rem; font-weight:600; margin-bottom:10px;">No results found</p>
                    <p style="color: #666; margin-bottom:5px;">for "${query}"</p>
                    <p style="color: #666; margin-top: 20px;">Try checking spelling or using different keywords</p>
                </div>
            `;
        } else {
            let html = `<h3 style="margin-bottom: 20px; color:#131921;">Found ${results.length} results for "${query}"</h3>`;
            
            results.forEach(product => {
                html += `
                    <div class="search-result-item" onclick="window.addToCart(${product.id}); document.getElementById('searchModal').style.display='none';">
                        <img src="${product.img}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/60'">
                        <div class="search-result-info">
                            <h4 style="margin-bottom:5px;">${product.title}</h4>
                            <p style="color:#B12704; font-weight:600; margin-bottom:3px;">$${product.price.toFixed(2)}</p>
                            <small style="color: #666;">${product.description.substring(0, 60)}...</small>
                        </div>
                        <i class="fa-solid fa-cart-plus" style="color: #febd69; font-size: 1.5rem;"></i>
                    </div>
                `;
            });
            
            resultsDiv.innerHTML = html;
        }
        
        modal.style.display = 'block';
        
        // Clear search input
        searchInput.value = '';
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // AUTH SYSTEM 
    const authModal = document.getElementById('authModal');
    const signinBtn = document.getElementById('signinBtn');
    const closeModal = document.getElementById('closeModal');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const showSignup = document.getElementById('showSignup');
    const showSignin = document.getElementById('showSignin');

    // User session
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    function updateUserInterface() {
        if (currentUser) {
            signinBtn.innerHTML = `
                <p><span>Hello, ${currentUser.name.split(' ')[0]}</span></p>
                <p class="nav-second">Account & Lists</p>
            `;
        } else {
            signinBtn.innerHTML = `
                <p><span>Hello, sign in</span></p>
                <p class="nav-second">Account & Lists</p>
            `;
        }
    }

    // Open auth modal
    if (signinBtn) {
        signinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentUser) {
                showUserMenu();
            } else {
                authModal.style.display = 'block';
            }
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            authModal.style.display = 'none';
            // Reset forms
            signinForm.classList.add('active');
            signupForm.classList.remove('active');
            document.getElementById('modalTitle').textContent = 'Sign In';
        });
    }

    // Switch to signup
    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            signinForm.classList.remove('active');
            signupForm.classList.add('active');
            document.getElementById('modalTitle').textContent = 'Create Account';
        });
    }

    // Switch to signin
    if (showSignin) {
        showSignin.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.remove('active');
            signinForm.classList.add('active');
            document.getElementById('modalTitle').textContent = 'Sign In';
        });
    }

    // Sign In Form Submit
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signinEmail').value;
            const password = document.getElementById('signinPassword').value;
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                updateUserInterface();
                authModal.style.display = 'none';
                showNotification(`👋 Welcome back, ${user.name}!`);
                signinForm.reset();
            } else {
                showNotification('❌ Invalid email or password');
            }
        });
    }

    // Sign Up Form Submit
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;
            
            if (password !== confirm) {
                showNotification('❌ Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                showNotification('❌ Password must be at least 6 characters');
                return;
            }
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if user exists
            if (users.some(u => u.email === email)) {
                showNotification('❌ Email already registered');
                return;
            }
            
            // Create new user
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Auto login
            currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            updateUserInterface();
            authModal.style.display = 'none';
            showNotification(`✅ Welcome to Amazon, ${name}!`);
            signupForm.reset();
            
            // Reset form display
            signinForm.classList.add('active');
            signupForm.classList.remove('active');
            document.getElementById('modalTitle').textContent = 'Sign In';
        });
    }

    function showUserMenu() {
        // Remove any existing menu
        const existingMenu = document.querySelector('.user-menu');
        if (existingMenu) existingMenu.remove();
        
        const menu = document.createElement('div');
        menu.className = 'user-menu';
        menu.style.cssText = `
            position: absolute;
            top: 60px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            padding: 15px;
            min-width: 250px;
            z-index: 1000;
            animation: fadeIn 0.2s;
        `;
        
        menu.innerHTML = `
            <p style="font-weight: 700; font-size:1.1rem; margin-bottom: 5px;">Hello, ${currentUser.name}</p>
            <p style="color: #666; margin-bottom: 15px; font-size:0.9rem;">${currentUser.email}</p>
            <hr style="margin: 10px 0; border:none; border-top:1px solid #eee;">
            <div style="display:flex; flex-direction:column; gap:10px;">
                <button onclick="window.location.href='#'" style="padding:10px; text-align:left; background:none; border:none; cursor:pointer; border-radius:4px;">Your Account</button>
                <button onclick="window.location.href='#'" style="padding:10px; text-align:left; background:none; border:none; cursor:pointer; border-radius:4px;">Your Orders</button>
                <button onclick="window.location.href='#'" style="padding:10px; text-align:left; background:none; border:none; cursor:pointer; border-radius:4px;">Your Wish List</button>
                <hr style="margin:5px 0; border:none; border-top:1px solid #eee;">
                <button onclick="logout()" style="padding:10px; background:#febd69; border:none; border-radius:4px; cursor:pointer; font-weight:600;">Sign Out</button>
            </div>
        `;
        
        // Position menu
        const rect = signinBtn.getBoundingClientRect();
        menu.style.top = rect.bottom + window.scrollY + 'px';
        menu.style.left = rect.left + 'px';
        
        // Close on click outside
        function closeMenu(e) {
            if (!menu.contains(e.target) && e.target !== signinBtn && !signinBtn.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        }
        
        document.body.appendChild(menu);
        setTimeout(() => document.addEventListener('click', closeMenu), 100);
    }

    // Logout function
    window.logout = function() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateUserInterface();
        showNotification('👋 Signed out successfully');
        
        // Remove user menu if open
        const menu = document.querySelector('.user-menu');
        if (menu) menu.remove();
    };

    //  CART MODAL 
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            displayCartItems();
            cartModal.style.display = 'block';
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }

    // CHECKOUT 
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('🛒 Your cart is empty');
                return;
            }
            
            if (!currentUser) {
                showNotification('🔐 Please sign in to checkout');
                cartModal.style.display = 'none';
                authModal.style.display = 'block';
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            showNotification(`✅ Order placed successfully! Total: $${total.toFixed(2)}`);
            
            // Clear cart
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            cartModal.style.display = 'none';
        });
    }

    // NOTIFICATION SYSTEM 
    function showNotification(message) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #232f3e;
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 2000;
            animation: slideIn 0.3s ease;
            border-left: 4px solid #febd69;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }

    window.showNotification = showNotification;

    // BACK TO TOP 
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // AMAZON INDIA LINK 
    const indiaLink = document.getElementById('amazonIndiaLink');
    if (indiaLink) {
        indiaLink.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('🌏 Redirecting to Amazon India');
            setTimeout(() => {
                window.open('https://www.amazon.in', '_blank');
            }, 800);
        });
    }

    // PANEL INTERACTIONS
    document.querySelectorAll('.panel-ops p, .panel-deals').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const text = el.innerText.replace(/[🔍🛒]/g, '').trim();
            showNotification(`📋 ${text} section - Coming soon!`);
        });
    });

    // CATEGORY CLICKS 
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.querySelector('span').textContent.toLowerCase();
            if (searchCategory) {
                // Find matching category option
                const options = searchCategory.options;
                for (let opt of options) {
                    if (opt.value.toLowerCase() === category || opt.text.toLowerCase().includes(category)) {
                        searchCategory.value = opt.value;
                        break;
                    }
                }
            }
            if (searchInput) {
                searchInput.value = category;
                performSearch();
            }
        });
    });

    // CLOSE MODALS ON OUTSIDE CLICK 
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
            // Reset forms
            signinForm.classList.add('active');
            signupForm.classList.remove('active');
            document.getElementById('modalTitle').textContent = 'Sign In';
        }
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (e.target === document.getElementById('searchModal')) {
            document.getElementById('searchModal').style.display = 'none';
        }
    });

    //SEARCH MODAL CLOSE 
    const closeSearch = document.getElementById('closeSearch');
    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            document.getElementById('searchModal').style.display = 'none';
        });
    }

    // INITIALIZATION 
    updateUserInterface();
    updateCartCount();

    // Add animation styles if not present
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .empty-cart, .empty-search {
                text-align: center;
                padding: 40px;
                color: #666;
            }
            .empty-cart i, .empty-search i {
                font-size: 4rem;
                color: #febd69;
                margin-bottom: 20px;
            }
            .user-menu {
                position: fixed;
                background: white;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                padding: 15px;
                min-width: 250px;
                z-index: 1000;
                animation: fadeIn 0.2s;
            }
        `;
        document.head.appendChild(style);
    }

    console.log('PRANAVs🚀 Amazon Professional Clone — Fully Loaded with Carousel, Cart & Auth!');
});