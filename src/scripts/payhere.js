// export function pay(){
//      // Called when user completed the payment. It can be a successful payment or failure
//      payhere.onCompleted = function onCompleted(orderId) {
//         console.log("Payment completed. OrderID:" + orderId);
//         //Note: validate the payment and show success or failure page to the customer
//     };

//     // Called when user closes the payment without completing
//     payhere.onDismissed = function onDismissed() {
//         //Note: Prompt user to pay again or show an error page
//         console.log("Payment dismissed");
//     };

//     // Called when error happens when initializing payment such as invalid parameters
//     payhere.onError = function onError(error) {
//         // Note: show an error page
//         console.log("Error:"  + error);
//     };

//     // Put the payment variables here
//     var payment = {
//         "sandbox": true,
//         "merchant_id": "1213034",       // Replace your Merchant ID
//         "return_url": "http://localhost:4200/organizer-notification",
//         "cancel_url": "http://localhost:4200/organizer-home",
//         "notify_url": "http://localhost:4200/organizer-home",
//         "order_id": "ob5d67668",
//         "items": "Door bell wireles",
//         "amount": "1000.00",
//         "currency": "LKR",
//         "first_name": "Saman",
//         "last_name": "Perera",
//         "email": "samanp@gmail.com",
//         "phone": "0771234567",
//         "address": "No.1, Galle Road",
//         "city": "Colombo",
//         "country": "Sri Lanka",
//         "delivery_address": "No. 46, Galle road, Kalutara South",
//         "delivery_city": "Kalutara",
//         "delivery_country": "Sri Lanka",
//         "custom_1": "",
//         "custom_2": ""
//     };

//     payhere.startPayment(payment)

//     // Show the payhere.js popup, when "PayHere Pay" is clicked
//     // document.getElementById('payhere-payment').onclick = function (e) {
//     //     payhere.startPayment(payment);
//     // };
// }