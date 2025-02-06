document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".shipping-info form");
    const formInputs = document.querySelectorAll(".shipping-info input");
    const submitButton = document.querySelector(".btn-submit");

    // ตรวจสอบการกรอกข้อมูล
    function checkInputs() {
        let allFilled = true;
        formInputs.forEach(input => {
            if (input.value.trim() === "") {
                allFilled = false;
            }
        });

        // เปิดหรือปิดปุ่มตามสถานะการกรอกข้อมูล
        submitButton.disabled = !allFilled;
    }

    // ตรวจสอบเมื่อมีการพิมพ์ข้อมูล
    formInputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    // เมื่อกดปุ่มให้แจ้งเตือนและรีเซ็ตข้อมูล
    submitButton.addEventListener("click", function () {
        alert("คำสั่งซื้อเสร็จสิ้น!");
        form.reset(); // รีเซ็ตค่าของฟอร์ม
        checkInputs(); // ตรวจสอบปุ่มใหม่หลังรีเซ็ต
    });

    // ปิดปุ่มเริ่มต้น (ถ้ายังไม่ได้กรอกอะไร)
    checkInputs();
});
