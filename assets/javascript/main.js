'use strict';

const number = document.getElementById('number');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
const type = document.getElementById('type');

var correctAnswers = [];
var answers = [];
var questions = [];
var container = document.getElementById("question-container0");
var containerButtonSend = document.getElementById("send-button");


function loadApi() {
    fetch(getURL())
        .then((response) => response.json())
        .then(data => saveAndPrint(data.results));
}

function getURL() {
    let url = `https://opentdb.com/api.php?amount=${number.value}`;

    if (category.value != 'any') {
        url += `&category= ${category.value}`;
    }

    if (difficulty.value != 'any') {
        url += `&difficulty=${difficulty.value}`;
    }

    if (type.value != 'any') {
        url += `&type=${type.value}`;
    }

    return url;
}


function saveAndPrint(datos) {
    alert("you'll need to select a response by card");
    let containerForm = document.getElementById("settings-container");
    containerForm.classList.add("d-none");
    containerButtonSend.classList.remove("d-none");
    let bodyContainer = document.getElementById("body");
    bodyContainer.classList.add("background-animate");


    for (let i = 0; i < datos.length; i++) {
        if (datos[i].type === "multiple") {
            questions.push(datos[i].question);
            answers.push([datos[i].incorrect_answers[0], datos[i].incorrect_answers[1], datos[i].incorrect_answers[2], datos[i].correct_answer]);
            correctAnswers.push([datos[i].correct_answer]);
            container.innerHTML += `
            <div class="cards mt-5 align-items-center" aria-label="Basic radio toggle button group">

            <h5 class="pt-3 pb-3">${questions[i]}</h5>

            <div class="pt-2">
                <input hidden="true" type="radio" class="btn-check" name="${i}" id="btn-${i}" autocomplete="off" required>
                <label class="btn btn-outline-primary" for="btn-${i}"> ${answers[i][0]} </label>
            </div>

            <div class="pt-2">
                <input hidden="true" type="radio" class="btn-check" name="${i}" id="btn--${i}" autocomplete="off" required> 
                <label class="btn btn-outline-primary" for="btn--${i}"> ${answers[i][1]}</label>
            </div>
            <div class="pt-2">
                <input hidden="true" type="radio" class="btn-check" name="${i}" id="btn---${i}" autocomplete="off" required>
                <label class="btn btn-outline-primary" for="btn---${i}">${answers[i][2]}</label>
            </div>
            <div class="pt-2 pb-4">
                <input hidden="true" type="radio" class="btn-check" name="${i}" id="btn----${i}" autocomplete="off" required>
                <label class="btn btn-outline-primary" for="btn----${i}"> ${answers[i][3]} </label>
            </div>

        </div>`
        } else if (datos[i].type === "boolean") {
            questions.push(datos[i].question);
            answers.push([datos[i].incorrect_answers[0], datos[i].correct_answer]);
            correctAnswers.push([datos[i].correct_answer]);
            container.innerHTML += `
                    <div class="cards mt-5 align-items-center" aria-label="Basic radio toggle button group">
        
                    <h5 class="pt-3 pb-3">${questions[i]}</h5>
        
                    <div class="pt-2">
                        <input hidden="true" type="radio" class="btn-check" name="${i}" id="btn-${i}" autocomplete="off" required>
                        <label class="btn btn-outline-primary" for="btn-${i}"> ${answers[i][0]} </label>
                    </div>
        
                    <div class="mt-2 pb-2 pb-4">
                        <input hidden="true" type="radio" class="btn-check" name="${i}" id="btn--${i}" autocomplete="off required"> 
                        <label class="btn btn-outline-primary" for="btn--${i}"> ${answers[i][1]}</label>
                    </div>
                </div>`
        }
    }
}

function compare() {
    let containerWin = document.getElementById("win-box");
    let pointWin = document.getElementById("pointWin");
    let containerLose = document.getElementById("lose-box");
    let pointLose = document.getElementById("pointLose");
    var contador = 0;

    let inputs = [];
    inputs.push(document.querySelectorAll("input:checked"));

    for (let i = 0; i < number.value; i++) {
        if (inputs[0][i].labels[0].innerText === correctAnswers[i][0]) {
            contador++;
        }
    }

    if (contador > Math.floor(number.value / 2)) {
        container.classList.add("d-none");
        containerButtonSend.classList.add("d-none");
        containerWin.classList.remove("d-none");
        pointWin.innerText = contador;
    } else {
        container.classList.add("d-none");
        containerButtonSend.classList.add("d-none");
        containerLose.classList.remove("d-none");
        pointLose.innerText = contador;
    }
}