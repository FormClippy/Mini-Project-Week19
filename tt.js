const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.arrow-left');
const nextButton = document.querySelector('.arrow-right');

let currentIndex = 0;

function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 20; // ความกว้างของสินค้า + margin
    const maxTranslateX = (items.length * itemWidth) - carousel.parentElement.offsetWidth; // ความกว้างรวม - ความกว้าง container

    // ตรวจสอบขอบเขตของ currentIndex
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > items.length - 1) currentIndex = items.length - 1;

    // แปลง carousel ตาม currentIndex แต่ไม่เกิน maxTranslateX
    const translateX = Math.min(currentIndex * itemWidth, maxTranslateX);
    carousel.style.transform = `translateX(-${translateX}px)`;

    updateButtons(); // อัปเดตสถานะปุ่ม
}


function updateButtons() {
    // ปิดใช้งานปุ่มซ้ายถ้าอยู่ที่สินค้าแรก
    prevButton.disabled = currentIndex === 0;
    // ปิดใช้งานปุ่มขวาถ้าอยู่ที่สินค้าสุดท้าย
    nextButton.disabled = currentIndex === items.length - 1;

    // เพิ่มหรือเอา class "disabled" ไปยังปุ่ม (เพื่อปรับแต่ง UI เพิ่ม)
    prevButton.classList.toggle('disabled', currentIndex === 0);
    nextButton.classList.toggle('disabled', currentIndex === items.length - 1);
}

// เมื่อคลิกปุ่มเลื่อนซ้าย
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// เมื่อคลิกปุ่มเลื่อนขวา
nextButton.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// เรียกอัปเดตปุ่มครั้งแรกตอนโหลดหน้า
updateCarousel();