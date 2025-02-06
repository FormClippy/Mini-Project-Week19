let slideIndex = 1;

function showSlides(n) {

    const slides = document.getElementsByClassName('banner-wrapper')
    
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "flex";

}

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}




let productDesc = document.getElementsByClassName('all-grid-item-desc');
let productBtn = document.getElementsByClassName('all-grid-item-btn');
let productClose = document.getElementsByClassName('all-grid-item-desc-x');

for (let i = 0; i < productBtn.length; i++) {
    productBtn[i].addEventListener('click', function () {
        productDesc[i].style.display = 'block';
    
        productDesc[i].classList.add('popup'); // เพิ่ม class "show"
    });
}

for (let i = 0; i < productClose.length; i++) {
    productClose[i].addEventListener('click', function () {
        productDesc[i].style.display = 'none';
    });
}

function searchProducts() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const products = document.getElementsByClassName("all-grid-item");

    Array.from(products).forEach(product => {
        const productName = product.querySelector("h4").innerText.toLowerCase();
        if (productName.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // โหลดข้อมูลตะกร้า

    function updateCartCount() {
        $(".cartCount").text(cart.length);
    }

    function addToCart(productName, price, imgSrc) {
        let product = {
            name: productName,
            price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
            img: imgSrc,
            quantity: 1
        };

        let existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    function updateCart() {
        let cartList = $(".cartlist");
        cartList.empty();

        let total = 0;
        cart.forEach((item, index) => {
            let totalPrice = item.price * item.quantity;
            total += totalPrice;
            let cartItem = `
                <div class="cartlist-items">
                    <div class="cartlist-left">
                        <img src="${item.img}" alt="#">
                        <div class="cartlist-detail">
                            <h3>${item.name}</h3>
                            <p>ราคา: <span>${totalPrice.toLocaleString()} บาท</span></p>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <button class="btnc decrement" data-index="${index}">-</button>
                        <p style="margin: 0 20px">${item.quantity}</p>
                        <button class="btnc increment" data-index="${index}">+</button>
                        
                    </div>
                </div>
            `;
            cartList.append(cartItem);
        });
        $(".cartlist").append(`<h3 class="total-price">ราคารวม: ${total.toLocaleString()} บาท</h3>`);
        updateCartCount();
    }

    $(".buy-btn button").click(function () {
        let product = $(this).closest(".all-grid-item, .banner-wrapper");
        let name = product.find("h4, .banner-left-title").text();
        let price = product.find(".all-grid-item-price, .spec h4").text();
        let image = product.find("img").attr("src");
        addToCart(name, price, image);
    });

    $(".cartlist").on("click", ".increment", function () {
        let index = $(this).data("index");
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });

    $(".cartlist").on("click", ".decrement", function () {
        let index = $(this).data("index");
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });

    $(".cartlist").on("click", ".remove", function () {
        let index = $(this).data("index");
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });

    $(".cart").click(function () {
        $(".modal").fadeIn();
    });

    $(".modal-bg, .btn").click(function () {
        $(".modal").fadeOut();
    });

    $(".btn-checkout").click(function () {
        // ดึงข้อมูลตะกร้าจาก localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // ถ้าตะกร้าไม่มีข้อมูลก็ให้เป็น array ว่าง
    
        // ตรวจสอบว่าตะกร้าว่างหรือไม่
        if (cart.length === 0) {
            alert("ตะกร้าของคุณว่าง กรุณาเพิ่มสินค้าก่อนที่จะทำการชำระเงิน");
            return; // ถ้าตะกร้าว่าง ไม่ให้ไปหน้า checkout
        } else {
            // ถ้ามีสินค้าในตะกร้า ให้ไปหน้า checkout
            window.location.href = '/Home/checkout.html'; 
        }
    });

    updateCart(); // โหลดข้อมูลตะกร้าเมื่อเปิดหน้า
});
