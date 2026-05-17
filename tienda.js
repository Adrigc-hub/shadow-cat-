// --- TIENDA DE 15 HABILIDADES CON PRECIOS JUSTOS ---
const TIENDA_HABILIDADES = [
    { id: 1, nombre: "Destello Negro", precio: 150, descripcion: "Golpe crítico físico rítmico." },
    { id: 2, nombre: "Vacío Inconmensurable", precio: 1000, descripcion: "Congela el entorno por completo." },
    { id: 3, nombre: "Puño Divergente", precio: 100, descripcion: "Doble impacto desfasado en el tiempo." },
    { id: 4, nombre: "Nuevitas Sombras", precio: 200, descripcion: "Aumenta el radio de recolección." },
    { id: 5, nombre: "Corte / Desmantelar", precio: 450, descripcion: "Corta objetos cercanos automáticamente." },
    { id: 6, nombre: "Flecha de Fuego", precio: 750, descripcion: "Disparo lineal explosivo masivo." },
    { id: 7, nombre: "Azul Máximo", precio: 350, descripcion: "Atrae los elementos rítmicos hacia ti." },
    { id: 8, nombre: "Rojo Resplandor", precio: 400, descripcion: "Repele peligros con onda expansiva." },
    { id: 9, nombre: "Púrpura Imaginario", precio: 900, descripcion: "Borra todo en pantalla instantáneamente." },
    { id: 10, nombre: "Quimera Sombría", precio: 600, descripcion: "Crea duplicados flotantes automáticos." },
    { id: 11, nombre: "Golpe de Ráfaga", precio: 50, descripcion: "Pequeño impulso de velocidad fluida." },
    { id: 12, nombre: "Energía Inversa", precio: 300, descripcion: "Te recupera de un fallo rítmico." },
    { id: 13, nombre: "Paso Veloz", precio: 120, descripcion: "Teletransportación a corta distancia." },
    { id: 14, nombre: "Furia de Sangre", precio: 250, descripcion: "Multiplica los puntos por 1.5 temporalmente." },
    { id: 15, nombre: "Impacto Crítico", precio: 180, descripcion: "Rompe cajas pesadas de un solo toque." }
];

function cargarTiendaEnUI() {
    const contenedor = document.getElementById("tienda-lista");
    if (!contenedor) return;
    
    contenedor.innerHTML = TIENDA_HABILIDADES.map(h => `
        <div style="background: rgba(255,255,255,0.08); padding: 8px; border-radius: 8px; font-size: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <strong style="color: #fff;">${h.nombre}</strong><br>
            <span style="color: #aaa; font-size: 10px; display:block; min-height: 24px;">${h.descripcion}</span>
            <button style="width:100%; font-size:11px; margin-top:5px; background: #555; color: #fff; border:none; border-radius:4px; padding:3px; font-weight:bold;">$${h.precio}</button>
        </div>
    `).join('');
}
