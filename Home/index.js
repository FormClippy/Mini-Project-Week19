$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // ดึงข้อมูลตะกร้าจาก localStorage

    // อัปเดตจำนวนสินค้าในตะกร้า
    function updateCartCount() {
        $(".cartCount").text(cart.length);
    }

    // ฟังก์ชันเพิ่มสินค้าเข้าไปในตะกร้า
    function addToCart(productName, price, imgSrc) {
        let product = {
            name: productName,
            price: parseFloat(price.replace(",", "")), // แปลงราคาเป็นตัวเลข
            img: imgSrc,
            quantity: 1
        };

        // ตรวจสอบว่าสินค้านี้มีในตะกร้าแล้วหรือไม่
        let existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        // บันทึกข้อมูลลง localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCart();
    }

    // อัปเดตรายการสินค้าในตะกร้า
    function updateCart() {
        let cartList = $(".cartlist");
        cartList.empty();

        cart.forEach((item, index) => {
            let totalPrice = item.price * item.quantity; // คำนวณราคารวมต่อสินค้า
            let cartItem = `
                <div class="cartlist-items">
                    <div class="cartlist-left">
                        <img src="${item.img}" alt="#">
                        <div class="cartlist-detail">
                            <h3>${item.name}</h3>
                            <p>ราคา <span class="item-price" data-index="${index}">${totalPrice.toLocaleString()}</span></p>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <p class="btnc decrement" data-index="${index}">-</p>
                        <p style="margin: 0 20px">${item.quantity}</p>
                        <p class="btnc increment" data-index="${index}">+</p>
                    </div>
                </div>
            `;
            cartList.append(cartItem);
        });

        updateCartCount();
        updateTotalPrice();
    }

    // อัปเดตราคารวมทั้งหมด
    function updateTotalPrice() {
        let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        $(".cartlist").append(`<h3 class="total-price">ราคารวม: ${total.toLocaleString()} บาท</h3>`);
    }

    // คลิกปุ่ม "Add to cart"
    $(".buy-btn button").click(function () {
        let product = $(this).closest(".blog-items, .header-info, .all-footer-info");
        let productName = product.find("h1, h2").first().text().trim();
        let productPrice = product.find(".spec h3, .price").text().replace("ราคา ", "").trim();
        let productImg = product.find("img").first().attr("src");

        addToCart(productName, productPrice, productImg);
    });


    // เพิ่ม / ลด จำนวนสินค้า
    $(".cartlist").on("click", ".increment", function () {
        let index = $(this).data("index");
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart)); // อัปเดตข้อมูลลง localStorage
        updateCart();
    });

    $(".cartlist").on("click", ".decrement", function () {
        let index = $(this).data("index");
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1); // ลบสินค้าออกจากตะกร้า
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // อัปเดตข้อมูลลง localStorage
        updateCart();
    });

    // เปิด / ปิด Modal ตะกร้าสินค้า
    $(".cart").click(function () {
        $(".modal").fadeIn();
    });

    $(".modal-bg, .btn").click(function () {
        $(".modal").fadeOut();
    });

    // ตรวจสอบเมื่อกด Checkout
    $(".btn-checkout").click(function () {
        // ดึงข้อมูลตะกร้าจาก localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // ถ้าตะกร้าไม่มีข้อมูลก็ให้เป็น array ว่าง
    
        // ตรวจสอบว่าตะกร้าว่างหรือไม่
        if (cart.length === 0) {
            alert("ตะกร้าของคุณว่าง กรุณาเพิ่มสินค้าก่อนที่จะทำการชำระเงิน");
            return; // ถ้าตะกร้าว่าง ไม่ให้ไปหน้า checkout
        } else {
            // ถ้ามีสินค้าในตะกร้า ให้ไปหน้า checkout
            window.location.href = 'checkout.html'; 
        }
    });
    
});


