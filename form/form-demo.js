function togglePaymentDetails(e) {
    const theForm = document.querySelector("#checkoutForm");
    const creditCardContainer = document.getElementById("creditCardNumberContainer");
    const paypalContainer = document.getElementById("paypalUsernameContainer");
  
    // Hide both payment containers initially
    creditCardContainer.classList.add("hide");
    paypalContainer.classList.add("hide");
  
    // Disable required for hidden fields
    theForm.creditCardNumber.required = false;
    theForm.paypalUsername.required = false;
  
    // Show the selected payment method
    if (theForm.paymentMethod.value === "creditCard") {
      creditCardContainer.classList.remove("hide");
      theForm.creditCardNumber.required = true;
    } else if (theForm.paymentMethod.value === "paypal") {
      paypalContainer.classList.remove("hide");
      theForm.paypalUsername.required = true;
    }
  }
  
  document
    .querySelector("#paymentMethod")
    .addEventListener("change", togglePaymentDetails);
  