document.addEventListener("DOMContentLoaded", async function() {
    let totalAmount = parseFloat(localStorage.getItem("totalPrice")) || 0;
    document.getElementById("total-price").innerText = "Total Amount: ₹" + totalAmount;

    document.getElementById("pay-btn").addEventListener("click", async function() {
        let response = await fetch("http://localhost:5000/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalAmount })
        });

        let orderData = await response.json();

        var options = {
            "key": "YOUR_RAZORPAY_KEY", // Replace with your Razorpay API Key
            "amount": orderData.amount,
            "currency": "INR",
            "name": "Quick Bazaar",
            "description": "Purchase Transaction",
            "order_id": orderData.id,
            "handler": function (response) {
                alert("Payment Successful! 🎉 Payment ID: " + response.razorpay_payment_id);
                localStorage.removeItem("cart");
                localStorage.removeItem("totalPrice");
                window.location.href = "order-success.html";
            },
            "theme": { "color": "#3399cc" }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    });
});
