let rawStory =
  "One day , Öznur[n] and Ömer[n] decided to walk[v] while on their summer vacation . Ömer[n] grabbed a bicycle[n] and hit the road . Öznur[n] thought they should walk[v] which Ömer[n] thought was very wild . It is summer vacation . We have to walk[n] . Öznur[n] exclaimed . While on their journey Ömer[n] saw a red[a] squirrel[n] that scared Öznur[n] . Summertime is all about fun[a] experiences , and they wanted to make the most of it .";
//function parseStory(rawStory) {
// Your code here.

let result = rawStory.split(/[\s]/);
let posPart = /\b\w+\[(n|v|a)]/g;
let wordPart = /\b\w+\b/g;
let punctuation = /[.,]/g;

const arrOfObj = [];

result.forEach((e) => {
  let newObj = {};
  if (e.match(posPart)) {
    if (e.includes("[n]")) {
      let word = e.substring(0, e.length - 3);
      arrOfObj.push(createObjectWordAndPOS(newObj, word, "noun"));
    }
    if (e.includes("[v]")) {
      let word = e.substring(0, e.length - 3);
      arrOfObj.push(createObjectWordAndPOS(newObj, word, "verb"));
    }
    if (e.includes("[a]")) {
      let word = e.substring(0, e.length - 3);
      arrOfObj.push(createObjectWordAndPOS(newObj, word, "adjective"));
    }
  } else if (e.match(wordPart)) {
    arrOfObj.push(createObjectWord(newObj, e));
  } else if (e.match(punctuation)) {
    arrOfObj.push(createObjectWord(newObj, e));
  }
});
console.log(arrOfObj);

function createObjectWord(obj, val) {
  obj["word"] = val;
  return obj;
}
function createObjectWordAndPOS(obj, wordVal, posVal) {
  obj["word"] = wordVal;
  obj["pos"] = posVal;
  return obj;
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });

function madLibsEdit(story) {
  const editDiv = document.getElementsByClassName("madLibsEdit");
  const paragraph = document.createElement("p");
  const previewDiv = document.getElementsByClassName("madLibsPreview");
  const preParagraph = document.createElement("p");

  let inputCounter = 0;
  let spanCounter = 0;

  editDiv.appendChild(paragraph);
  previewDiv.appendChild(preParagraph);
  story.forEach((e) => {
    if (e.pos === "noun") {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "noun" + inputCounter);
      input.setAttribute("placeholder", "noun");
      inputCounter++;
      paragraph.appendChild(input);
    } else if (e.pos === "verb") {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "verb" + inputCounter);
      input.setAttribute("placeholder", "verb");
      inputCounter++;
      paragraph.appendChild(input);
    } else if (e.pos === "adjective") {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "adjective" + inputCounter);
      input.setAttribute("placeholder", "adjective");
      inputCounter++;
      paragraph.appendChild(input);
    } else {
      let span = document.createElement("span");
      span.innerText = e.word;
      preParagraph.appendChild(span);
    }
  }
)}