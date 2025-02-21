const preguntaContainer = document.getElementById("pregunta");
const respuestasContainer = document.getElementById("respuestas");
const siguienteBtn = document.getElementById("siguiente");
const puntajeDisplay = document.getElementById("puntaje");

let puntaje = 0;
let preguntaActual = {};
let respuestas = [];

async function obtenerPregunta() {
    const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    const data = await res.json();
    const pregunta = data.results[0];

    preguntaActual = pregunta;
    respuestas = [...pregunta.incorrect_answers, pregunta.correct_answer];
    respuestas.sort(() => Math.random() - 0.5);

    mostrarPregunta();
}

function mostrarPregunta() {
    preguntaContainer.innerHTML = preguntaActual.question;
    respuestasContainer.innerHTML = "";

    respuestas.forEach(respuesta => {
        const btn = document.createElement("button");
        btn.classList.add("respuesta");
        btn.innerText = respuesta;
        btn.onclick = () => verificarRespuesta(respuesta);
        respuestasContainer.appendChild(btn);
    });

    siguienteBtn.disabled = true;
}

function verificarRespuesta(respuestaSeleccionada) {
    const botones = document.querySelectorAll(".respuesta");
    botones.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === preguntaActual.correct_answer) {
            btn.classList.add("correcto");
        } else if (btn.innerText === respuestaSeleccionada) {
            btn.classList.add("incorrecto");
        }
    });

    if (respuestaSeleccionada === preguntaActual.correct_answer) {
        puntaje++;
        puntajeDisplay.innerText = `Puntaje: ${puntaje}`;
    }

    siguienteBtn.disabled = false;
}

siguienteBtn.addEventListener("click", obtenerPregunta);

obtenerPregunta();
