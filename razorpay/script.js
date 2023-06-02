// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

if(localStorage.getItem('userArray')) {
  const userArray = JSON.parse(localStorage.getItem('userArray'));
  const currUser = userArray.findIndex(ele => ele.accessToken);
  if(userArray[currUser].accessToken) {
    if(userArray[currUser].cart && userArray[currUser].cart.length > 0) {
      const orderTotal = Math.floor(userArray[currUser].amount);
      console.log(userArray[currUser].amount);
      delete userArray[currUser].amount;
      delete userArray[currUser].cart;
      localStorage.setItem('userArray',JSON.stringify(userArray));

      var options = {
        key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
        amount: orderTotal * 100 * 80, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "MyShop Checkout",
        description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        theme: {
          color: "#000",
        },
        callback_url: "../cart/index.html",
        image:
          "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
      };

      var rzpy1 = new Razorpay(options);
      rzpy1.open();

      setTimeout(() => {
        var link = document.createElement('a');
        link.href = "../cart/index.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },10000 * 10);
    }
  }
}
