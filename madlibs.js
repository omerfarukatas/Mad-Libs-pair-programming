/**
 * Complete the implementation of parseStory.
    * 
    * parseStory retrieves the story as a single string from story.txt
    * (I have written this part for you).
    * 
    * In your code, you are required (please read this carefully):
    * - to return a list of objects
    * - each object should definitely have a field, `word`
    * - each object should maybe have a field, `pos` (part of speech)
    * 
    * So for example, the return value of this for the example story.txt
    * will be an object that looks like so (note the comma! periods should
    * be handled in the same way).
    * 
    * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
    * Output: [
    *  { word: "Louis", pos: "noun" },
    *  { word: "went", pos: "verb", },
    *  { word: "to", },
    *  { word: "the", },
    *  { word: "store", pos: "noun" }
    *  { word: "," }
    *  ....
    * 
    * There are multiple ways to do this, but you may want to use regular expressions.
    * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
    */
function parseStory(rawStory) {

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
return arrOfObj;
}

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
    // console.log(processedStory)
    madLibsEdit(processedStory);
    madLibsPreview()
    hotKey()
  });

function madLibsEdit(story) {
  const editDiv = document.querySelector(".madLibsEdit");
  const paragraph = document.createElement("p");
  const previewDiv = document.querySelector(".madLibsPreview");
  const preParagraph = document.createElement("p");

  let inputCounter = 0;
  let spanCounter = 0;

  editDiv.appendChild(paragraph);
  previewDiv.appendChild(preParagraph);
  
  story.forEach((e) => {
    if (e.pos === "noun") {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "input" + inputCounter);
      input.setAttribute("class", "input");
      input.setAttribute("placeholder", "noun");
      input.setAttribute("maxlength", "20");
      inputCounter++;
      paragraph.appendChild(input);
      const span = document.createElement("span");
      span.setAttribute("id", "span" + spanCounter);
      span.innerHTML = "_____"; // 5 underscores
      spanCounter++;
      preParagraph.appendChild(span);
    } else if (e.pos === "verb") {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "input" + inputCounter);
      input.setAttribute("class", "input");
      input.setAttribute("placeholder", "verb"); // FIX THIS
      input.setAttribute("maxlength", "20");
      inputCounter++;
      paragraph.appendChild(input);
      const span = document.createElement("span");
      span.setAttribute("id", "span" + spanCounter);
      span.innerHTML = "_____"; // 5 underscores
      spanCounter++;
      preParagraph.appendChild(span);
    } else if (e.pos === "adjective") {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "input" + inputCounter);
      input.setAttribute("class", "input");
      input.setAttribute("placeholder", "adjective");
      input.setAttribute("maxlength", "20");
      inputCounter++;
      paragraph.appendChild(input);
      const span = document.createElement("span");
      span.setAttribute("id", "span" + spanCounter);
      span.innerHTML = "_____"; // 5 underscores
      spanCounter++;
      preParagraph.appendChild(span);
    } else { //THIS PART IS MESSY
      let spanWord = document.createElement("span");
      spanWord.innerText = e.word + ' ';
      let spanWord1 = document.createElement("span");
      spanWord1.innerText = e.word + " ";
      paragraph.appendChild(spanWord1)
      preParagraph.appendChild(spanWord);
    }
  }
)}

function madLibsPreview() {
  const inputLength = document.querySelectorAll("input").length
  for (let i = 0; i < inputLength; i++) {
    const input = document.querySelector(`#input${i}`);
    input.addEventListener("input", () => {
      localStorage.setItem(input.id, input.value)
      
      const span = document.querySelector(`#span${i}`);

      if (input.value){
        span.innerHTML = " " + input.value + " ";
      } else {
        span.innerHTML = "_____";
      }
    })
  }
}

function hotKey (){
  let allInput = document.querySelectorAll(".input")

  for (let i = 0; i < allInput.length; i++) {
    
    allInput[i].addEventListener("keydown", function(event){

      if (event.keyCode === 13){

        event.preventDefault();
        if (allInput[i+1]){
          allInput[i+1].focus();
        }
      } else if (i === allInput.length-1){ //THIS IS NOT WORKING
        document.querySelector(`#input0`).focus();
      }
    })
  }
}