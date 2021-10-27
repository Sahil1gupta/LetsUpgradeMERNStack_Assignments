const http = require("http");
const fs = require("fs");
const url = require("url");

//reading the  JSON file  synchronously
const productsString = fs.readFileSync("./products.json", "utf-8");
const products = JSON.parse(productsString);

//create server

const server = http.createServer((req, res) => {
  // const path=req.url;
  console.log(req.method); //we are seeing that what type of request we are getting.
  const path = url.parse(req.url, true);
  console.log(path);

  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET,PUT,PATCH,DELETE",
    "Access-Control-Allow-Headers": "*", 
    "Content-Type": "application/json",
  });

  if (req.method == "OPTIONS") {    //handle option for everything/all requests
    res.end();
  }

  if (path.pathname == "/" || path.pathname == "/products") {
    res.end(productsString);
  } else if (path.pathname == "/product") {
 
    if (req.method == "GET") {
      const id = path.query.id; //get the id from url

      const singleData = products.find((ele) => {
        //NOTE:if you want to find only single element from an array then use find method insted of filter.
        return ele.id == id;
      });
      res.end(JSON.stringify(singleData));
    } else if (req.method == "POST") {
      // NOTE: data hum log isonomina se post kr rhe h
      let body = ""; //handling the post data, there is two function to handle post req.on(data) and req.on(end)
      req.on("data", (data) => {
        //req.on me jo on function hai vo handle karega jo bhi data mai post kr rha hu  vo sare data packets ke form aate hai to vo body me save krte jayega
        body += data;
      });

      req.on("end", () => {
        console.log(body);
        let newproduct = JSON.parse(body);
        products.push(newproduct);
        fs.writeFile("./products.json", JSON.stringify(products), (err) => {
          res.end(JSON.stringify({ message: "product added" }));
        });
      });
    } else if (req.method == "PUT") {
      const id = path.query.id;

      let body = "";
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => {
        // console.log(body);
        let newproduct = JSON.parse(body);
        // console.log(newproduct,id);
        // res.end("I am PUT")

        products.forEach((element) => {
          if (element.id == id) {
            element.title = newproduct.title;
            element.type = newproduct.type;
            element.description = newproduct.description;
            element.filename = newproduct.filename;
            element.height = newproduct.height;
            element.width = newproduct.width;
            element.price = newproduct.price;
          }
        });
      
        // console.log(products);
        fs.writeFile("./products.json", JSON.stringify(products), (err) => {

          const updatedProduct=products.find((ele)=>{
            return ele.id==id;
          })
          console.log(updatedProduct);
          res.end(JSON.stringify(updatedProduct));
        });  
      });
    } else if (req.method == "DELETE") {
      //product id
      const id = path.query.id;

      products.forEach((element, index) => {
        if (element.id == id) {
          products.splice(index, 1);
        }
      });
      console.log(products);
      fs.writeFile("./products.json", JSON.stringify(products), (err) => {
        res.end(JSON.stringify({ message: "product deleted by admin" }));
      });
      // res.end("going to delete")
    }
  }
  else if(path.pathname=="/updateRating"){

        
    if(req.method=="PUT"){

    
        // product id 
        const id=path.query.id;
        console.log(id);

        // product data
        let body="";
        req.on('data',(data)=>{
            body+=data;
        })

        req.on('end',()=>{
            let product=JSON.parse(body);
        


        products.forEach((ele)=>{
            if(ele.id==id){

               ele.rating=Number(ele.rating)+Number(product.rating);
               ele.rating_count=Number(ele.rating_count)+1;
                

            }
        })

         
        
        fs.writeFile("./products.json",JSON.stringify(products),(err)=>{

            const updatedProduct=products.find((ele)=>{

                    return ele.id==id;
            })

            res.end(JSON.stringify(updatedProduct));
        });

    });


  }
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" }); //it will send status
    res.end("<h1>404 Server is not Found</h1>");
  }
});

server.listen("3000", "127.0.0.1", () => {
  console.log("server is running");
});
