// --- SISTEMA MATEMÁTICO DE HITBOXES PRECISAS ---
class HitboxCircular {
    constructor(x, y, radio) {
        this.x = x;
        this.y = y;
        this.radio = radio;
    }

    actualizar(x, y) {
        this.x = x;
        this.y = y;
    }

    // Calcula la distancia matemática exacta (evita bugs de esquinas falsas)
    colisionaCon(otraHitbox) {
        let dx = this.x - otraHitbox.x;
        let dy = this.y - otraHitbox.y;
        let distancia = Math.sqrt(dx * dx + dy * dy);
        return distancia < (this.radio + otraHitbox.radio);
    }

    // Comprobación especial para hitboxes cuadradas como las de las cajas
    colisionaConCaja(bx, by, bw, bh) {
        let puntoCercanoX = Math.max(bx, Math.min(this.x, bx + bw));
        let puntoCercanoY = Math.max(by, Math.min(this.y, by + bh));
        
        let dx = this.x - puntoCercanoX;
        let dy = this.y - puntoCercanoY;
        let distancia = Math.sqrt(dx * dx + dy * dy);
        
        return distancia < this.radio;
    }
}
