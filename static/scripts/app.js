
const nameIn = document.getElementById("myInput")
const jokeIn = document.getElementById("j-input")
const subutton = 
document.getElementById("btnAdd")
const jokeDisp = document.getElementById("joke-display")
getJokes();

jokeArr=["Why don't scientists trust atoms? Because they make up everything!","What did the ocean say to the beach? Nothing, it just waved.","Why did the bicycle fall over? Because it was two-tired!","How do you organize a space party? You planet!", "What do you call a snowman with a six-pack? An abdominal snowman!", "What's the best time to go to the dentist? Tooth-hurty!"]

function getRandomNumber() {
  let randomiser = Math.floor(Math.random() * (0, jokeArr.length + 1));
  return jokeArr[randomiser];
}
console.log(getRandomNumber(jokeArr))

document.getElementById("randomDisplay").innerHTML = String(getRandomNumber())

subutton.addEventListener("click", function(event) {
  event.preventDefault();
  let { name, content } = collectJoke()
  
})

function collectJoke() {
  name = nameIn.value;
  content = jokeIn.value;
  nameIn.value="";
  jokeIn.value="";
  console.log(content)
  console.log(name)
  let jokeUpload = {};
  jokeUpload.jokes = [];
  const jokeContent = {
    name:name,
    joke:content
  }
  //pushes to the json
  jokeUpload.jokes.push(jokeContent);
  save(jokeUpload);
  getJokes();
  return { name, content }
}

function load(callback) {
    let xhr = new XMLHttpRequest(); 
  xhr.open("GET", "/jokes.json")
  xhr.setRequestHeader("Content-Type", "application/json")
  let data = JSON.stringify(jokes);
  xhr.send(data);
  xhr.onload = function () {
    callback(xhr.response)
  }
}
function getJokes(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log("success");
    if (this.readyState == 4 && this.status == 200) { 
      let jokeResult = JSON.parse(this.responseText);
      let jokeList = "";
      //runs through jokes file and converts items to a string
      for (let item of jokeResult.jokes) {
        jokeList = jokeList + "<p>" + String(item.name) + ":"+" " + String(item.joke) + "</p>";
        console.log(jokeList);
      }

    document.getElementById("joke-display").innerHTML = jokeList;

    }
    else{
      console.log("xhttp request problem occurred")
    }
  }
  xhttp.open("GET", "/jokes.json", true);
  xhttp.send();
}

function save(jokes) { 
  let xhr = new XMLHttpRequest(); 
  xhr.open("PUT", "/jokes.json", true);
  let data = JSON.stringify(jokes);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  getJokes();
}
