// Preguntas
        const questions = [
            {
                question: "¿Cuál es la funcion principal de los engranajes?",
                options: ["Absorver vibraciones e impactos mecanicos", "Almacenar energía cinética.", "Transmitir movimiento y fuerza entre ejes.", "Generar electricidad."],
                answer: 2
            },
            {
                question: "La relación de transmisión depende de:",
                options: ["Número de dientes", "Material", "Color", "Temperatura"],
                answer: 0
            },
            {
                question: "Si un engranaje grande (N1 = 60 dientes), gira a 30RPM, ¿a que velocidad girará uno pequeño (N2 = 20 dientes), si están conectados?",
                options: ["90 RPM. ", "120RPM", "20RPM", "60RPM"],
                answer: 0
            },
            {
                question: "¿Que parte del engranaje determina su tamaño y esta relacionada con la distancia entre dientes?",
                options: [" Circunferencia exterior.", "Módulo", "Eje central.", "Corona."],
                answer: 1  
            },
            {
                question: "¿Qué tipo de engranaje se usa comúnmente en sistemas que requieren reducir ruido y soportar cargas pesadas (ej: cajas de cambio de autos)?",
                options: ["Engranajes rectos.", "Engranajes cónicos.", "Engranajes helicoidales.", "Tornillo sinfín."],
                answer: 2
            },
            {
                question: "Según la 'Ley de Engranaje', ¿por qué los dientes deben encajar perfectamente?",
                options: ["Para evitar el desgaste por fricción.", "Porque así lo exigen las normas industriales.", "Para garantizar una transferencia de movimiento suave y constante.", "Porque aumenta la velocidad de rotación."],
                answer: 2
            },
            {
                question: "¿En qué industria son críticos los engranajes cónicos?:",
                options: [" Industria textil.", "Industria automotriz (ej: diferenciales).", "Industria del vidrio.", " Industria farmacéutica."],
                answer: 1
            },
            {
                question: "¿Qué innovación futura se menciona para los engranajes?",
                options: ["Uso de materiales biodegradables.", "Fabricación mediante impresión 3D.", "Sustitución por correas dentadas.", "Eliminación de lubricantes."],
                answer: 1
            }
        ];

        // Variables
        let currentQuestion = 0;
        let score = 0;
        let selectedOption = null;

        // Elementos del DOM
        const startBtn = document.getElementById('start-btn');
        const nextBtn = document.getElementById('next-btn');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const currentQuestionElement = document.getElementById('current-question');
        const scoreElement = document.getElementById('score');

        // Iniciar test
        startBtn.addEventListener('click', () => {
            switchScreen('quiz-screen');
        });

        // Cambiar pantalla
        function switchScreen(screenId) {
            // Oculta todas las pantallas
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Muestra la pantalla deseada
            const nextScreen = document.getElementById(screenId);
            nextScreen.classList.add('active');
            
            // Si es el quiz, carga la primera pregunta
            if (screenId === 'quiz-screen') {
                currentQuestion = 0;
                score = 0;
                showQuestion();
            }
        }

    function typeWriter(text, element, speed = 30) {
        nextBtn.disabled = true; // Desactiva el botón
        let i = 0;
        element.innerHTML = '';
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                nextBtn.disabled = false; //reactiva el boton
            }
        }, speed);
}
        


        


        // Mostrar pregunta
        function showQuestion() {
            currentQuestionElement.textContent = currentQuestion + 1;
            typeWriter(questions[currentQuestion].question, questionText);
            optionsContainer.innerHTML = '';

            questions[currentQuestion].options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => selectOption(button, index));
                optionsContainer.appendChild(button);
            });

            selectedOption = null;
            nextBtn.style.opacity = '0.5';
        }

        // Seleccionar opción
        function selectOption(button, index) {
            document.querySelectorAll('#options-container button').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
            selectedOption = index;
            nextBtn.style.opacity = '1';
        }

        // Siguiente pregunta
        nextBtn.addEventListener('click', () => {
        if (selectedOption === null) return;
    
        if (selectedOption === questions[currentQuestion].answer) {
        score++;
        }
    
        currentQuestion++;
    
        if (currentQuestion < questions.length) {
        showQuestion();
        } else {
        showResult(); // Cambia esto (antes era switchScreen directo)
        }   
        });

        // mostrar promedio
        function showResult() {
    // Detener animación de escritura si existe
    if (typeof typingAnimation !== 'undefined') clearInterval(typingAnimation);
    questionText.innerHTML = questions[currentQuestion - 1]?.question || "";

    // Calcular resultados
    const totalQuestions = questions.length;
    const promedio = Math.round((score / totalQuestions) * 100);
    
    // Mensaje personalizado
    let mensaje = "";
    let emoji = "";
    if (promedio >= 90) {
        mensaje = "¡Nivel experto!";
        emoji = "🏆";
        // Efecto confeti (solo si saca +90%)
        const confettiScript = document.createElement('script');
        confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
        document.body.appendChild(confettiScript);
        confettiScript.onload = () => {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff6b00', '#e67e22', '#bf3f3f']
            });
        };
    } else if (promedio >= 60) {
        mensaje = "¡Buen trabajo!";
        emoji = "👍";
    } else {
        mensaje = "¡Sigue practicando!";
        emoji = "💪";
    }

    // HTML del resultado (con estilo industrial)
    scoreElement.innerHTML = `
        <div class="result-header">
            <span class="result-emoji">${emoji}</span>
            <h2 class="result-title">${mensaje}</h2>
        </div>
        <div class="result-data">
            <p class="result-score">Puntaje: <span>${score}/${totalQuestions}</span></p>
        </div>
        <div> <span class="promedio">Promedio: ${promedio}%</span> </div>

    `;
    
    switchScreen('result-screen');
}
        
    
        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            // Solo la pantalla de inicio debe estar activa al principio
            document.getElementById('start-screen').classList.add('active');
        });