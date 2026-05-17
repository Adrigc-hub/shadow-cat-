// --- MOTOR CENTRAL DEL JUEGO (SKETCH.JS) ---
let modoJuego = "menu"; // Modos: menu, ritmo, disparos
let jfFire;
let jfBox;

// Configuración de los fondos espaciales dinámicos por personaje activo
const FONDOS_ESPACIALES = {
    Gojo: [10, 15, 45],       // Azul espacial oscuro
    Itadori: [45, 10, 15],    // Rojizo cósmico oscurecido
    Megumi: [10, 35, 25],      // Verde místico oscuro
    Sukuna: [30, 5, 20]        // Purpura/Malva maligno
};

let personajeActual = "Gojo";
let personajesLista = ["Gojo", "Itadori", "Megumi", "Sukuna"];
let indicePersonaje = 0;

// Variables de animación fluida para "Existir"
let anguloExistir = 0;

function setup() {
    // Vincular el lienzo de p5 al contenedor HTML correcto
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    
    // Instanciar los sistemas de minijuegos independientes
    jfFire = new MinijuegoDanceOfFire();
    jfBox = new MinijuegoShootTheBox();
    
    // Cargar visualmente la tienda
    cargarTiendaEnUI();
}

function draw() {
    // 1. Fondo Espacial Dinámico suave que cambia según el personaje que "existe"
    let colorFondo = FONDOS_ESPACIALES[personajeActual] || [10, 10, 10];
    background(colorFondo[0], colorFondo[1], colorFondo[2]);

    // 2. Controladores de renderizado de pantallas
    if (modoJuego === "menu") {
        dibujarPersonajeExistiendo();
    } else if (modoJuego === "ritmo") {
        jfFire.actualizarYDibujar();
    } else if (modoJuego === "disparos") {
        jfBox.actualizarYDibujar();
    }
}

// --- ANIMACIÓN FLUIDA PARA EXISTIR (IDLE) ---
function dibujarPersonajeExistiendo() {
    push();
    translate(width / 2, height / 2 - 80);
    
    // Frecuencia matemática continua para la oscilación del sprite base
    anguloExistir += 0.05;
    let factorRespiracionY = 1 + sin(anguloExistir) * 0.05;
    let factorRespiracionX = 1 - sin(anguloExistir) * 0.02;
    scale(factorRespiracionX, factorRespiracionY);

    // Dibujar el aura fluida de energía cósmica
    noStroke();
    fill(255, 255, 255, 20 + sin(anguloExistir) * 10);
    ellipse(0, 0, 130, 130);

    // Color del personaje activo
    if (personajeActual === "Gojo") fill(100, 180, 255);
    else if (personajeActual === "Itadori") fill(255, 100, 100);
    else if (personajeActual === "Megumi") fill(80, 220, 150);
    else if (personajeActual === "Sukuna") fill(200, 40, 90);

    ellipse(0, 0, 90, 90); // Cuerpo del avatar
    
    pop();

    // Texto interactivo en pantalla para cambiar de personaje (Skins)
    fill(255, 200);
    textSize(14);
    textAlign(CENTER);
    text("Haz tap arriba en el personaje para cambiar de Skin", width / 2, height / 2 + 30);
    
    fill(255);
    textSize(22);
    text(`Skin Activa: ${personajeActual}`, width / 2, height / 2 + 65);
}

// --- CONTROLES DE INTERFAZ HTML ---
function cambiarModo(nuevoModo) {
    modoJuego = nuevoModo;
    document.getElementById("ui-menu").style.display = "none";
    document.getElementById("btn-volver").style.display = "block";
    
    if (nuevoModo === "ritmo") jfFire.iniciar();
    if (nuevoModo === "disparos") jfBox.iniciar();
}

function volverAlMenu() {
    modoJuego = "menu";
    jfFire.activo = false;
    jfBox.activo = false;
    document.getElementById("ui-menu").style.display = "flex";
    document.getElementById("btn-volver").style.display = "none";
}

// Redimensionar de forma fluida el lienzo si giras el móvil o la tablet
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Captura de pantallas táctiles e interactividad de hitboxes nativa de p5.js
function touchStarted() {
    if (modoJuego === "menu") {
        // Al tocar al personaje en el centro, rota la skin
        let d = dist(mouseX, mouseY, width / 2, height / 2 - 80);
        if (d < 60) {
            indicePersonaje = (indicePersonaje + 1) % personajesLista.length;
            personajeActual = personajesLista[indicePersonaje];
        }
    } else if (modoJuego === "ritmo") {
        jfFire.presionarRitmo();
    } else if (modoJuego === "disparos") {
        jfBox.disparar(mouseX, mouseY);
    }
    return false; // Crucial en Android/iPad para que la pantalla no rebote al arrastrar el dedo
}
