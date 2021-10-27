const http = require("http");
const url = require("url");
let Superheros = [
  {
    id: 1,
    name: "thor",
    age: 144,
    planet: "Asgard",
    weapon: "strombreaker",
  },
  {
    id: 2,
    name: "IronMan",
    age: 47,
    planet: "Earth",
    weapon: "Iron suit",
  },
  {
    id: 3,
    name: "Captain America",
    age: 93,
    planet: "Earth",
    weapon: "shield",
  },
  {
    id: 4,
    name: "Hulk",
    age: 43,
    planet: "Earth",
    weapon: "Swords",
  },
];

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true);
  console.log(path);
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET,PUT,PATCH,DELETE",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
  });
  if (path.pathname == "/" || path.pathname == "/superheros") {
    res.end(JSON.stringify(Superheros));
  } else if (path.pathname == "/superhero") {
    if (req.method == "OPTIONS") {
      res.end();
    }

    //Fetch or Get
    if (req.method == "GET") {
      const id = path.query.id;
      const superheo = Superheros.filter((ele) => {
        return ele.id == id;
      });
      res.end(JSON.stringify(superheo));
    }

    //Create or Post
    else if (req.method == "POST") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        console.log(body);
        let newsuperhero = JSON.parse(body);
        Superheros.push(newsuperhero);
        console.log(Superheros);
        res.end(JSON.stringify(Superheros));
      });
    }

    //Update or PUT
    else if (req.method == "PUT") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        const id = path.query.id;
        let Updatedsuperhero = JSON.parse(body);
        Superheros.forEach((ele) => {
          if (ele.id == id) {
            ele.name = Updatedsuperhero.name;
            ele.age = Updatedsuperhero.age;
            ele.planet = Updatedsuperhero.planet;
            ele.weapon = Updatedsuperhero.weapon;
          }
        });
        console.log(Superheros);
        res.end(JSON.stringify(Superheros));
      });
    }

    else if(req.method=="DELETE"){
        const id = path.query.id;
        Superheros.forEach((ele,index)=>{
            if(ele.id==id){
                Superheros.splice(index,1)
            }
        })

        res.end(JSON.stringify(Superheros));

    }
  }
});

server.listen("3000", "127.0.0.1", () => {
  console.log("server is running");
});
