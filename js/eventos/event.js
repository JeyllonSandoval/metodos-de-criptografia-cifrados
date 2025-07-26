// ============================================
// EVENTOS EN JAVASCRIPT - TUTORIAL COMPLETO
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM cargado - Iniciando tutorial de eventos');
    
    // Inicializar todos los ejemplos
    initClickEvents();
    initMouseEvents();
    initKeyboardEvents();
    initFormEvents();
    initCustomEvents();
    
    // Mostrar mensaje de bienvenida
    showWelcomeMessage();
});

// ============================================
// 1. EVENTOS DE CLICK
// ============================================

function initClickEvents() {
    const clickBtn = document.getElementById('clickBtn');
    const clickResult = document.getElementById('clickResult');
    let clickCount = 0;
    
    // Método 1: addEventListener (RECOMENDADO)
    clickBtn.addEventListener('click', function(event) {
        clickCount++;
        
        // Información del evento
        const eventInfo = {
            type: event.type,
            target: event.target.tagName,
            timestamp: new Date().toLocaleTimeString(),
            coordinates: `X: ${event.clientX}, Y: ${event.clientY}`,
            clicks: clickCount
        };
        
        // Mostrar resultado
        clickResult.innerHTML = `
            <strong>✅ Click detectado!</strong><br>
            Tipo: ${eventInfo.type}<br>
            Elemento: ${eventInfo.target}<br>
            Hora: ${eventInfo.timestamp}<br>
            Coordenadas: ${eventInfo.coordinates}<br>
            Total de clicks: ${eventInfo.clicks}
        `;
        clickResult.className = 'result success';
        
        // Cambiar color del botón temporalmente
        clickBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        setTimeout(() => {
            clickBtn.style.background = '';
        }, 300);
        
        console.log('🖱️ Click event:', eventInfo);
    });
    
    // Método 2: onclick (MÉTODO TRADICIONAL - NO RECOMENDADO)
    // clickBtn.onclick = function() { ... };
}

// ============================================
// 2. EVENTOS DEL MOUSE
// ============================================

function initMouseEvents() {
    const mouseArea = document.getElementById('mouseArea');
    const mouseResult = document.getElementById('mouseResult');
    
    // Evento mousemove - Se dispara cuando el mouse se mueve
    mouseArea.addEventListener('mousemove', function(event) {
        const rect = mouseArea.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        mouseResult.textContent = `Coordenadas: X=${Math.round(x)}, Y=${Math.round(y)}`;
        
        // Cambiar color basado en la posición
        const hue = (x / rect.width) * 360;
        mouseArea.style.background = `linear-gradient(45deg, hsl(${hue}, 70%, 60%), hsl(${hue + 30}, 70%, 50%))`;
    });
    
    // Evento mouseenter - Se dispara cuando el mouse entra al elemento
    mouseArea.addEventListener('mouseenter', function(event) {
        mouseArea.style.transform = 'scale(1.05)';
        mouseResult.textContent = '🟢 Mouse entró al área';
    });
    
    // Evento mouseleave - Se dispara cuando el mouse sale del elemento
    mouseArea.addEventListener('mouseleave', function(event) {
        mouseArea.style.transform = 'scale(1)';
        mouseArea.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        mouseResult.textContent = '🔴 Mouse salió del área';
    });
    
    // Evento dblclick - Doble click
    mouseArea.addEventListener('dblclick', function(event) {
        mouseResult.textContent = '🖱️ ¡Doble click detectado!';
        mouseArea.style.animation = 'pulse 0.5s';
    });
}

// ============================================
// 3. EVENTOS DEL TECLADO
// ============================================

function initKeyboardEvents() {
    const keyboardInput = document.getElementById('keyboardInput');
    const keyboardResult = document.getElementById('keyboardResult');
    
    // Evento keydown - Se dispara cuando se presiona una tecla
    keyboardInput.addEventListener('keydown', function(event) {
        const keyInfo = {
            key: event.key,
            code: event.code,
            keyCode: event.keyCode,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            altKey: event.altKey
        };
        
        keyboardResult.innerHTML = `
            <strong>⌨️ Tecla presionada:</strong> ${keyInfo.key}<br>
            Código: ${keyInfo.code}<br>
            KeyCode: ${keyInfo.keyCode}<br>
            Ctrl: ${keyInfo.ctrlKey ? '✅' : '❌'}<br>
            Shift: ${keyInfo.shiftKey ? '✅' : '❌'}<br>
            Alt: ${keyInfo.altKey ? '✅' : '❌'}
        `;
        keyboardResult.className = 'result info';
        
        // Prevenir comportamiento por defecto para ciertas teclas
        if (event.key === 'Enter') {
            event.preventDefault();
            keyboardResult.innerHTML += '<br><strong>⚠️ Enter presionado - Comportamiento prevenido</strong>';
        }
        
        console.log('⌨️ Keydown event:', keyInfo);
    });
    
    // Evento keyup - Se dispara cuando se suelta una tecla
    keyboardInput.addEventListener('keyup', function(event) {
        keyboardResult.innerHTML += '<br><em>Tecla soltada: ' + event.key + '</em>';
    });
    
    // Evento input - Se dispara cuando el valor del input cambia
    keyboardInput.addEventListener('input', function(event) {
        const value = event.target.value;
        const charCount = value.length;
        
        // Mostrar contador de caracteres
        if (charCount > 0) {
            keyboardResult.innerHTML += `<br><strong>📝 Caracteres: ${charCount}</strong>`;
        }
    });
}

// ============================================
// 4. EVENTOS DE FORMULARIO
// ============================================

function initFormEvents() {
    const testForm = document.getElementById('testForm');
    const formResult = document.getElementById('formResult');
    const inputs = testForm.querySelectorAll('input');
    
    // Evento submit - Se dispara cuando se envía el formulario
    testForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir envío real del formulario
        
        const formData = new FormData(testForm);
        const data = {};
        
        // Recopilar datos del formulario
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Validar datos
        let isValid = true;
        let errors = [];
        
        if (!data.name || data.name.trim() === '') {
            errors.push('El nombre es requerido');
            isValid = false;
        }
        
        if (!data.email || !data.email.includes('@')) {
            errors.push('El email debe ser válido');
            isValid = false;
        }
        
        if (isValid) {
            formResult.innerHTML = `
                <strong>✅ Formulario enviado correctamente!</strong><br>
                Nombre: ${data.name}<br>
                Email: ${data.email}<br>
                Timestamp: ${new Date().toLocaleString()}
            `;
            formResult.className = 'result success';
            
            // Limpiar formulario
            testForm.reset();
        } else {
            formResult.innerHTML = `
                <strong>❌ Errores de validación:</strong><br>
                ${errors.join('<br>')}
            `;
            formResult.className = 'result error';
        }
        
        console.log('📝 Form submit event:', { data, isValid, errors });
    });
    
    // Eventos de focus y blur para cada input
    inputs.forEach(input => {
        // Focus - Cuando el input recibe el foco
        input.addEventListener('focus', function(event) {
            event.target.style.borderColor = '#3498db';
            event.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)';
        });
        
        // Blur - Cuando el input pierde el foco
        input.addEventListener('blur', function(event) {
            event.target.style.borderColor = '#e9ecef';
            event.target.style.boxShadow = 'none';
            
            // Validación en tiempo real
            validateInput(event.target);
        });
        
        // Change - Cuando el valor cambia
        input.addEventListener('change', function(event) {
            console.log('📝 Input changed:', event.target.name, event.target.value);
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    switch (input.type) {
        case 'email':
            if (value && !value.includes('@')) {
                isValid = false;
                message = 'Email inválido';
            }
            break;
        case 'text':
            if (value && value.length < 2) {
                isValid = false;
                message = 'Mínimo 2 caracteres';
            }
            break;
    }
    
    if (!isValid) {
        input.style.borderColor = '#e74c3c';
        input.title = message;
    } else {
        input.style.borderColor = '#27ae60';
        input.title = '';
    }
}

// ============================================
// 5. EVENTOS PERSONALIZADOS
// ============================================

function initCustomEvents() {
    const customEventBtn = document.getElementById('customEventBtn');
    const customEventResult = document.getElementById('customEventResult');
    
    // Crear un evento personalizado
    const customEvent = new CustomEvent('miEventoPersonalizado', {
        detail: {
            mensaje: '¡Hola desde mi evento personalizado!',
            timestamp: new Date().toISOString(),
            datos: {
                usuario: 'Desarrollador',
                accion: 'click en botón personalizado'
            }
        },
        bubbles: true, // El evento se propaga hacia arriba en el DOM
        cancelable: true // El evento puede ser cancelado
    });
    
    // Escuchar el evento personalizado
    document.addEventListener('miEventoPersonalizado', function(event) {
        const data = event.detail;
        
        customEventResult.innerHTML = `
            <strong>🎉 Evento personalizado disparado!</strong><br>
            Mensaje: ${data.mensaje}<br>
            Timestamp: ${new Date(data.timestamp).toLocaleString()}<br>
            Usuario: ${data.datos.usuario}<br>
            Acción: ${data.datos.accion}
        `;
        customEventResult.className = 'result success';
        
        // Animación especial
        customEventBtn.style.animation = 'pulse 1s';
        setTimeout(() => {
            customEventBtn.style.animation = '';
        }, 1000);
        
        console.log('🎉 Custom event triggered:', data);
    });
    
    // Disparar el evento personalizado al hacer click
    customEventBtn.addEventListener('click', function(event) {
        // Disparar el evento personalizado
        document.dispatchEvent(customEvent);
        
        // También podemos disparar eventos en elementos específicos
        const btnEvent = new CustomEvent('botonClick', {
            detail: { elemento: 'customEventBtn' }
        });
        customEventBtn.dispatchEvent(btnEvent);
    });
    
    // Escuchar el evento específico del botón
    customEventBtn.addEventListener('botonClick', function(event) {
        console.log('🎯 Botón específico clickeado:', event.detail);
    });
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function showWelcomeMessage() {
    console.log(`
    🎯 TUTORIAL DE EVENTOS EN JAVASCRIPT
    =====================================
    
    📚 Conceptos principales:
    - Los eventos son acciones que ocurren en el navegador
    - Se pueden escuchar con addEventListener()
    - Cada evento tiene información útil (coordenadas, teclas, etc.)
    - Los eventos se propagan en el DOM (bubbling)
    
    🧪 Ejemplos disponibles:
    1. Click events - Interactúa con el botón
    2. Mouse events - Mueve el mouse sobre el área roja
    3. Keyboard events - Escribe en el input
    4. Form events - Llena y envía el formulario
    5. Custom events - Dispara eventos personalizados
    
    💡 Tips:
    - Usa addEventListener() en lugar de onclick
    - Siempre prevén comportamientos por defecto cuando sea necesario
    - Los eventos personalizados son muy útiles para comunicación entre componentes
    - Usa event.preventDefault() para controlar el comportamiento del navegador
    `);
}

// ============================================
// EVENTOS ADICIONALES DEL DOCUMENTO
// ============================================

// Evento cuando la ventana cambia de tamaño
window.addEventListener('resize', function(event) {
    console.log('🔄 Ventana redimensionada:', {
        width: window.innerWidth,
        height: window.innerHeight
    });
});

// Evento cuando se hace scroll
window.addEventListener('scroll', function(event) {
    const scrollY = window.scrollY;
    const scrollPercent = (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > 50) {
        console.log('📜 Scroll más allá del 50%:', Math.round(scrollPercent) + '%');
    }
});

// Evento cuando la página se oculta/muestra
document.addEventListener('visibilitychange', function(event) {
    if (document.hidden) {
        console.log('👁️ Página oculta');
    } else {
        console.log('👁️ Página visible');
    }
});

// ============================================
// ANIMACIONES CSS
// ============================================

// Agregar animación de pulso
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ============================================
// INFORMACIÓN ADICIONAL
// ============================================

/*
📖 RESUMEN DE EVENTOS EN JAVASCRIPT:

1. ¿QUÉ SON LOS EVENTOS?
   - Son acciones que ocurren en el navegador web
   - Pueden ser generados por el usuario (click, teclado, mouse)
   - O por el navegador (carga de página, redimensionamiento)
   - Permiten crear aplicaciones interactivas

2. CÓMO ESCUCHAR EVENTOS:
   
   MÉTODO MODERNO (RECOMENDADO):
   elemento.addEventListener('tipoEvento', funcion);
   
   MÉTODO TRADICIONAL:
   elemento.onclick = funcion;

3. TIPOS DE EVENTOS MÁS COMUNES:
   
   🖱️ MOUSE:
   - click: Click simple
   - dblclick: Doble click
   - mouseenter: Mouse entra al elemento
   - mouseleave: Mouse sale del elemento
   - mousemove: Mouse se mueve sobre el elemento
   
   ⌨️ TECLADO:
   - keydown: Tecla presionada
   - keyup: Tecla soltada
   - keypress: Tecla presionada (solo caracteres)
   
   📝 FORMULARIOS:
   - submit: Formulario enviado
   - change: Valor cambiado
   - input: Input modificado
   - focus: Elemento recibe foco
   - blur: Elemento pierde foco
   
   🌐 DOCUMENTO:
   - DOMContentLoaded: DOM cargado
   - load: Página completamente cargada
   - resize: Ventana redimensionada
   - scroll: Scroll de la página

4. INFORMACIÓN DEL EVENTO:
   Cada evento contiene información útil:
   - event.type: Tipo de evento
   - event.target: Elemento que disparó el evento
   - event.clientX/clientY: Coordenadas del mouse
   - event.key: Tecla presionada
   - event.preventDefault(): Prevenir comportamiento por defecto

5. BUENAS PRÁCTICAS:
   - Usa addEventListener() en lugar de onclick
   - Siempre prevén comportamientos por defecto cuando sea necesario
   - Usa event.preventDefault() para controlar el navegador
   - Los eventos personalizados son útiles para comunicación
   - Limpia los event listeners cuando ya no sean necesarios
*/
