var userArray = [];

if(!localStorage.getItem('userArray')) {
    var link = document.createElement('a');
    link.href = "../login/index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} else if(JSON.parse(localStorage.getItem('userArray')).find((user) => { return user.accessToken})) {
    userArray = JSON.parse(localStorage.getItem('userArray'));
    const currUser = userArray.findIndex((user) => { return user.accessToken });
    const cartItems = document.getElementById('cart-items');
    const itemList = document.getElementById('item-list');
    const checkout = document.getElementById('checkout-btn');
    var addTotal = 0;

    checkout.addEventListener('click',() => {
        if(addTotal !== 0) {
            userArray[currUser].amount = addTotal;
            var link = document.createElement('a');
            link.href = "../razorpay/index.html";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } 
    });

    if(userArray[currUser].cart && userArray[currUser].cart.length > 0) {
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then((json) => {
            var l = userArray[currUser].cart.length;
            for(var i=0;i<l;i++) {
                json.find(element => {
                    if(element.id === userArray[currUser].cart[i]) {
                        appendCartItems(element);
                    }
                });
            }
            document.querySelector('#total > span').textContent = `$${addTotal}`;
        })
        .catch(err => console.log('error',err));
    } else {
        cartItems.innerHTML = "<p>No items in your cart</p>";
        itemList.innerHTML = "<sub>Empty Cart</sub>";
    }

    function appendCartItems(product) {
        var item = document.createElement('div');
        item.setAttribute('class','item');
        item.innerHTML = `  <img src="${product.image}" alt="Item" />
                            <div class="row">Title: ${product.title}</div>
                            <div class="row">Price: $${product.price}</div>
                            <button id="addBtn" onclick="removeItem(${product.id})">Remove From Cart</button>`;
        cartItems.appendChild(item);
        var list = document.createElement('div');
        list.setAttribute('class','row');
        list.innerHTML = ` <span>&#8226; ${product.title}</span>
                            <span>$${product.price}</span>`;
        itemList.appendChild(list);
        addTotal += product.price;
    }

    function removeItem(id) {
        var i = userArray[currUser].cart.findIndex(ele => ele === id);
        userArray[currUser].cart.splice(i,1);
        localStorage.setItem('userArray',JSON.stringify(userArray));
        location.reload();
    }

} else {
    var link = document.createElement('a');
    link.href = "../login/index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
