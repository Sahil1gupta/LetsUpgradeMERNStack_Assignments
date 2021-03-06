fetch("http://localhost:3000/products").then((response) => {
  response.json().then((data) => {
    console.log(data);

    let productsString = "";

    data.forEach((product) => {
      let ratingString = "";

      let averageRating=product.rating/product.rating_count

      for (let i = 1; i <= 5; i++) {
        if (i <= averageRating) {
          ratingString += `<img src="star.png"width="20px"/>`;
        } else {
          ratingString += `<img src="graystar.png"width="20px"/>`;
        }
      }

      productsString += ` <div class="card productcard" style="width: 18rem;">

      <div class="card-body"><div class="card-title"style="font-size:50px;text-align:center">
      ${product.emoji}${product.emoji}${product.emoji}</div>
      </div>
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Price: &#8377 ${product.price}</li>
          <li class="list-group-item">${ratingString}</li>
        </ul>
        <div class="card-body">
          <a href="product.html?id=${product.id}" class="card-link btn btn-success">View</a>
        </div>
      </div>`;
    });

    document.getElementById("product_container").innerHTML = productsString;
  });
});
// .then((data)=>{console.log(data)})

//ANother method to get data using Async Await
async function sahil() {
  const data = await fetch("http://localhost:3000/products");
  const Actualdata = await data.json();
  console.log(Actualdata);
}

sahil();
