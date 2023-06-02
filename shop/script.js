// const product = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };
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
  var productArray = [];
  var cartItems = [];
  const men = document.getElementById('men');
  const women = document.getElementById('women');
  const electronics = document.getElementById('electronics');
  const jewelery = document.getElementById('jewelery');
  const allFilter = document.getElementById('all-filter');
  const menFilter = document.getElementById('men-filter');
  const womenFilter = document.getElementById('women-filter');
  const electronicsFilter = document.getElementById('electronics-filter');
  const jeweleryFilter = document.getElementById('jewelery-filter');
  const search = document.getElementById('search');
  const searchResults = document.getElementById('search-results');

  function checkFilter(fil) {
    if(document.querySelector(`#${fil}`).checked) {
      var arr = document.querySelectorAll('input[type="checkbox"]');
      for(var i=0;i<arr.length;i++) {
        arr[i].checked = false;
      }
      document.querySelector(`#${fil}`).checked = true;
      men.style.display = "none";
      women.style.display = "none";
      electronics.style.display = "none";
      jewelery.style.display = "none";
      searchResults.style.display = "flex";
      searchResults.innerHTML = '<title>Filter Results</title>';
      if(fil.length > 2) {
        productArray.forEach((product) => {
          if(product.colors.find(ele => ele===fil)) {
            appendSearchResults(product);
          }
        });
      } else if(fil.length > 1) {
        var x = 0; var y = 0;
        if(fil === 'aa') { y = 0; x = 25;}
        else if(fil === 'bb') { y = 26; x = 50;}
        else { y = 51; x = 1000000}
        productArray.forEach((product) => {
          if(product.price >= y && product.price <= x) {
            appendSearchResults(product);
          }
        });
      } else {
        productArray.forEach((product) => {
          if(product.sizes.split(",").find(ele => ele===fil)) {
            appendSearchResults(product);
          }
        });
      }
    } else {
      men.style.display = "flex";
      women.style.display = "flex";
      electronics.style.display = "flex";
      jewelery.style.display = "flex";
      searchResults.style.display = "none";
    }
  }

  if(userArray[currUser].cart) {
    cartItems = userArray[currUser].cart;
  }

  function addToCart(id) {
    if(!cartItems.find(ele => ele === id)) {
      cartItems.push(id);
      userArray[currUser].cart = cartItems;
      localStorage.setItem('userArray',JSON.stringify(userArray));
    }
  }

  search.addEventListener('input',() => {
    var val = search.value.toLowerCase();
    if(val === "") {
      men.style.display = "flex";
      women.style.display = "flex";
      electronics.style.display = "flex";
      jewelery.style.display = "flex";
      searchResults.style.display = "none";
    } else {
      men.style.display = "none";
      women.style.display = "none";
      electronics.style.display = "none";
      jewelery.style.display = "none";
      searchResults.style.display = "flex";
      searchResults.innerHTML = '<title>Search Results</title>';
      var count = 0;
      productArray.forEach((product) => {
        if(product.title.toLowerCase().includes(val)) {
          appendSearchResults(product);
          count++;
        }
      });
      if(count == 0) {
        searchResults.innerHTML = '<title>Search Results</title><p>Couldn’t find the product you searched for</p>';
      }
    }
  });

  function appendSearchResults(product) {
    var item = document.createElement('div');
    item.setAttribute('class','item');
    var colors = addColors(product);
    item.innerHTML = `  <img src="${product.image}" alt="Item" />
                        <div class="info">
                          <div class="row">
                            <div class="price">$${product.price}</div>
                            <div class="sized">${product.sizes.toUpperCase()}</div>
                          </div>
                          <div class="colors">
                            Colors:
                            <div class="row">
                              ${colors}
                            </div>
                          </div>
                          <div class="row">Rating: ${product.rating.rate}</div>
                        </div>
                        <button id="addBtn">Add to Cart</button>`;
    searchResults.appendChild(item);
  }

  function activeFilter(id) {
    allFilter.classList.remove('active');
    menFilter.classList.remove('active');
    womenFilter.classList.remove('active');
    electronicsFilter.classList.remove('active');
    jeweleryFilter.classList.remove('active');
    document.getElementById(id).classList.add('class','active');
    if(id === "all-filter") {
      men.style.display = "flex";
      women.style.display = "flex";
      electronics.style.display = "flex";
      jewelery.style.display = "flex";
    } else if(id === "men-filter") {
      men.style.display = "flex";
      women.style.display = "none";
      electronics.style.display = "none";
      jewelery.style.display = "none";
    } else if(id === "women-filter") {
      men.style.display = "none";
      women.style.display = "flex";
      electronics.style.display = "none";
      jewelery.style.display = "none";
    } else if(id === "electronics-filter") {
      men.style.display = "none";
      women.style.display = "none";
      electronics.style.display = "flex";
      jewelery.style.display = "none";
    } else {
      men.style.display = "none";
      women.style.display = "none";
      electronics.style.display = "none";
      jewelery.style.display = "flex";
    }
  }

  fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>productArray=json)
        .then(() => productArray.forEach((product) => {
          product.colors = generateColors();
          product.sizes = generateSizes();
        }))
        .then(() => productArray.forEach((product) => {
          if(product.category === "men's clothing") {
            appendMen(product);
          } else if(product.category === "women's clothing") {
            appendWomen(product);
          } else if(product.category === "electronics") {
            appendElectronics(product);
          } else {
            appendJewelery(product);
          } 
        }))
        .catch((err)=>console.log('error',err));

  function generateColors() {
    var colors = ['red','blue','black'];
    var num = Math.ceil(Math.random()*3);
    var res = [];
    for(var i=0;i<num;i++) {
      var ele = colors[Math.floor(Math.random()*3)];
      if(res.find((e)=>{return e===ele})){
        continue;
      }
      res.push(ele);
    }
    return res;
  }

  function generateSizes() {
    var sizes = ["s","l","m"];
    var num = Math.ceil(Math.random()*3);
    var res = [];
    for(var i=0;i<num;i++) {
      var ele = sizes[Math.floor(Math.random()*3)];
      if(res.find((e)=>{return e===ele})){
        continue;
      }
      res.push(ele);
    }
    return res.join(",");
  }

  function appendMen(product) {
    var item = document.createElement('div');
    item.setAttribute('class','item');
    var colors = addColors(product);
    item.innerHTML = `  <img src="${product.image}" alt="Item" />
                        <div class="info">
                          <div class="row">
                            <div class="price">$${product.price}</div>
                            <div class="sized">${product.sizes.toUpperCase()}</div>
                          </div>
                          <div class="colors">
                            Colors:
                            <div class="row">
                              ${colors}
                            </div>
                          </div>
                          <div class="row">Rating: ${product.rating.rate}</div>
                        </div>
                        <button id="addBtn" onclick="addToCart(${product.id})">Add to Cart</button>`;
    men.appendChild(item);
  }

  function appendWomen(product) {
    var item = document.createElement('div');
    item.setAttribute('class','item');
    var colors = addColors(product);
    item.innerHTML = `  <img src="${product.image}" alt="Item" />
                        <div class="info">
                          <div class="row">
                            <div class="price">$${product.price}</div>
                            <div class="sized">${product.sizes.toUpperCase()}</div>
                          </div>
                          <div class="colors">
                            Colors:
                            <div class="row">
                              ${colors}
                            </div>
                          </div>
                          <div class="row">Rating: ${product.rating.rate}</div>
                        </div>
                        <button id="addBtn" onclick="addToCart(${product.id})">Add to Cart</button>`;
    women.appendChild(item);
  }

  function appendElectronics(product) {
    var item = document.createElement('div');
    item.setAttribute('class','item');
    var colors = addColors(product);
    item.innerHTML = `  <img src="${product.image}" alt="Item" />
                        <div class="info">
                          <div class="row">
                            <div class="price">$${product.price}</div>
                            <div class="sized">${product.sizes.toUpperCase()}</div>
                          </div>
                          <div class="colors">
                            Colors:
                            <div class="row">
                              ${colors}
                            </div>
                          </div>
                          <div class="row">Rating: ${product.rating.rate}</div>
                        </div>
                        <button id="addBtn" onclick="addToCart(${product.id})">Add to Cart</button>`;
    electronics.appendChild(item);
  }

  function appendJewelery(product) {
    var item = document.createElement('div');
    item.setAttribute('class','item');
    var colors = addColors(product);
    item.innerHTML = `  <img src="${product.image}" alt="Item" />
                        <div class="info">
                          <div class="row">
                            <div class="price">$${product.price}</div>
                            <div class="sized">${product.sizes.toUpperCase()}</div>
                          </div>
                          <div class="colors">
                            Colors:
                            <div class="row">
                              ${colors}
                            </div>
                          </div>
                          <div class="row">Rating: ${product.rating.rate}</div>
                        </div>
                        <button id="addBtn" onclick="addToCart(${product.id})">Add to Cart</button>`;
    jewelery.appendChild(item);
  }

  function addColors(product) {
    var l = product.colors.length;
    var res = "";
    for(var i=0;i<l;i++) {
      if(product.colors[i] === 'black') {
        res += '<div class="circle" style="background-color: #000"></div>';
      } else if(product.colors[i] === 'red') {
        res += '<div class="circle" style="background-color: #FF0000"></div>';
      } else{
        res += '<div class="circle" style="background-color: #4938af"></div>';
      }
    }
    return res;
  }
} else {
  var link = document.createElement('a');
  link.href = "../login/index.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


{/* <div class="item">
  <img src="tshirt.png" alt="Item" />
  <div class="info">
    <div class="row">
      <div class="price">$100</div>
      <div class="sized">S,M,L</div>
    </div>
    <div class="colors">
      Colors:
      <div class="row">
        <div class="circle" style="background-color: #000"></div>
        <div class="circle" style="background-color: #4938af"></div>
        <div class="circle" style="background-color: #203d3e"></div>
      </div>
    </div>
    <div class="row">Rating:</div>
  </div>
  <button id="addBtn">Add to Cart</button>
</div> */}

{/* <div class="item">
  <img src="tshirt.png" alt="Item" />
  <div class="info">
    <div class="row">
      <div class="price">$100</div>
      <div class="sized">S,M,L</div>
    </div>
    <div class="colors">
      Colors:
      <div class="row">
        <div class="circle" style="background-color: #000"></div>
        <div class="circle" style="background-color: #4938af"></div>
        <div class="circle" style="background-color: #203d3e"></div>
      </div>
    </div>
    <div class="row">Rating:</div>
  </div>
  <button id="addBtn">Add to Cart</button>
</div>  */}