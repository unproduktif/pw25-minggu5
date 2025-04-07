// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbarNav = document.querySelector('.navbar-nav');
    
    hamburgerMenu.addEventListener('click', function(e) {
        e.preventDefault();
        navbarNav.classList.toggle('active');
    });
    
    // Search functionality
    const searchButton = document.getElementById('search');
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = prompt("Masukkan kata kunci pencarian:");
        if(searchTerm && searchTerm.trim() !== '') {
            alert(`Anda mencari: ${searchTerm}`);
        } else {
            alert('Masukkan kata kunci yang valid');
        }
    });
    
    // Shopping cart functionality
    const shoppingCart = document.getElementById('shopping-cart');
    shoppingCart.addEventListener('click', function(e) {
        e.preventDefault();
        const cartContainer = document.getElementById('cartContainer');
        if(cartContainer) {
            cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
        }
    });
    
    feather.replace();
});

// Cart functionality
let cartItems = [];
let cartTotal = 0;

function addToCart(productName, price) {
    let size = '';
    const sizeRadios = document.querySelectorAll('input[name^="size"]:checked');
    if(sizeRadios.length > 0) {
        size = sizeRadios[0].value;
    } else {
        alert('Pilih ukuran terlebih dahulu!');
        return;
    }
    
    // Add item to cart
    cartItems.push({
        name: productName,
        size: size,
        price: price
    });
    
    // Update cart display
    updateCart();
    
    // Show cart container
    document.getElementById('cartContainer').style.display = 'block';
    
    alert(`${productName} (${size}) telah ditambahkan ke keranjang!`);
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    cartTotal = 0;
    
    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>Rp ${item.price.toLocaleString('id-ID')}</td>
            <td><button class="remove-item" onclick="removeFromCart(${index})">Hapus</button></td>
        `;
        cartItemsElement.appendChild(row);
        cartTotal += item.price;
    });
    
    document.getElementById('cart-total').textContent = `Rp ${cartTotal.toLocaleString('id-ID')}`;
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Form validation
document.getElementById('checkoutForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validate name
    const name = document.getElementById('name');
    if(name.value.trim() === '') {
        document.getElementById('name-error').textContent = 'Nama harus diisi';
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.value)) {
        document.getElementById('email-error').textContent = 'Email tidak valid';
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone');
    const phoneRegex = /^[0-9]{10,13}$/;
    if(!phoneRegex.test(phone.value)) {
        document.getElementById('phone-error').textContent = 'Nomor telepon tidak valid (10-13 digit)';
        isValid = false;
    }
    
    // Validate address
    const address = document.getElementById('address');
    if(address.value.trim() === '') {
        document.getElementById('address-error').textContent = 'Alamat harus diisi';
        isValid = false;
    }
    
    // Validate payment method
    const payment = document.getElementById('payment');
    if(payment.value === '') {
        document.getElementById('payment-error').textContent = 'Pilih metode pembayaran';
        isValid = false;
    }
    
    if(isValid) {
        // Process checkout
        alert('Pembelian berhasil diproses!\nTotal: Rp ' + cartTotal.toLocaleString('id-ID'));
        
        // Reset form and cart
        this.reset();
        cartItems = [];
        updateCart();
        document.getElementById('cartContainer').style.display = 'none';
    }
});