// --- MINIJUEGO 1: DANCE OF FIRE (RÍTMICO FUNCIONAL) ---
class MinijuegoDanceOfFire {
    constructor() {
        this.activo = false;
        this.angulo = 0;
        this.velocidadOrbita = 0.06;
        // Camino de baldosas
        this.baldosas = [
            {x: 200, y: 300}, {x: 280, y: 300}, {x: 360, y: 300}, 
            {x: 360, y: 220}, {x: 440, y: 220}, {x: 440, y: 140}
        ];
        this.baldaActual = 0;
        this.planetaX = 0;
        this.planetaY = 0;
        this.radioOrbita = 45;
    }

    iniciar() {
        this.activo = true;
        this.baldaActual = 0;
        this.angulo = 0;
    }

    actualizarYDibujar() {
        if (!this.activo) return;

        // Movimiento orbital ultra fluido alrededor de la baldosa actual
        this.angulo += this.velocidadOrbita;
        let centro = this.baldosas[this.baldaActual];
        this.planetaX = centro.x + Math.cos(this.angulo) * this.radioOrbita;
        this.planetaY = centro.y + Math.sin(this.angulo) * this.radioOrbita;

        // Dibujar el camino rítmico
        for (let i = 0; i < this.baldosas.length; i++) {
            let b = this.baldosas[i];
            if (i === this.baldaActual) {
                fill(0, 255, 200, 150); // Baldosa activa iluminada
                stroke(255);
                ellipse(b.x, b.y, 40, 40);
            } else {
                fill(255, 255, 255, 50);
                noStroke();
                ellipse(b.x, b.y, 30, 30);
            }
        }

        // Dibujar línea de conexión rítmica
        stroke(255, 255, 255, 100);
        strokeWeight(2);
        line(centro.x, centro.y, this.planetaX, this.planetaY);

        // Dibujar el planeta en órbita
        fill(255, 50, 100);
        noStroke();
        ellipse(this.planetaX, this.planetaY, 18, 18);
    }

    presionarRitmo() {
        if (!this.activo) return;

        let siguienteBalda = this.baldosas[this.baldaActual + 1];
        if (!siguienteBalda) {
            this.baldaActual = 0; // Reiniciar nivel al completar
            return;
        }

        // Hitbox de ritmo: Distancia matemática entre el planeta y la siguiente Baldosa
        let dx = this.planetaX - siguienteBalda.x;
        let dy = this.planetaY - siguienteBalda.y;
        let error = Math.sqrt(dx*dx + dy*dy);

        if (error < 35) { // Ventana de tiempo justa (Hitbox rítmica arreglada)
            this.baldaActual++;
            // Ajustar el ángulo de órbita dinámicamente para que no dé saltos bruscos
            this.angulo = Math.atan2(this.planetaY - siguienteBalda.y, this.planetaX - siguienteBalda.x);
        }
    }
}

// --- MINIJUEGO 2: SHOOT THE BOX (FÍSICAS Y CAÍDA) ---
class MinijuegoShootTheBox {
    constructor() {
        this.activo = false;
        this.cajas = [];
        this.puntaje = 0;
    }

    iniciar() {
        this.activo = true;
        this.cajas = [];
        this.puntaje = 0;
    }

    actualizarYDibujar() {
        if (!this.activo) return;

        // Generar cajas basándose en los frames de p5 de manera fluida
        if (frameCount % 45 === 0) {
            let tam = random(30, 50);
            this.cajas.push({
                x: random(50, width - 100),
                y: -50,
                w: tam,
                h: tam,
                velY: random(1.5, 4),
                gravedad: 0.08
            });
        }

        // Renderizado y físicas frame por frame
        for (let i = this.cajas.length - 1; i >= 0; i--) {
            let c = this.cajas[i];
            c.velY += c.gravedad; // Aceleración física real
            c.y += c.velY;

            // Renderizar la caja estilo neón espacial
            fill(255, 150, 0);
            stroke(255);
            strokeWeight(2);
            rect(c.x, c.y, c.w, c.h, 5);

            // Verificar si tocó el suelo de la pantalla
            if (c.y > height) {
                this.cajas.splice(i, 1);
                this.puntaje = Math.max(0, this.puntaje - 5); // Penalización
            }
        }

        // Mostrar puntaje en pantalla
        fill(255);
        noStroke();
        textSize(22);
        textAlign(LEFT);
        text(`Puntos: ${this.puntaje}`, 30, height - 40);
    }

    disparar(tx, ty) {
        if (!this.activo) return;

        // Detectar si el tap/click está exactamente dentro del cuadrado de la caja
        for (let i = this.cajas.length - 1; i >= 0; i--) {
            let c = this.cajas[i];
            if (tx >= c.x && tx <= c.x + c.w && ty >= c.y && ty <= c.y + c.h) {
                this.cajas.splice(i, 1); // ¡Caja eliminada!
                this.puntaje += 10;
                break;
            }
        }
    }
}
