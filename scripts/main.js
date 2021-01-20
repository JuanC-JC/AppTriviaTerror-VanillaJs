const mainPage = document.getElementById("main-page");
const mainCategorys = document.getElementById("main-categorys");
const mainDinamic = document.getElementById("main-dinamic");
const userNameInput = document.getElementById("name-user");
const buttonStart = document.getElementById("button-start");
const formulario = document.getElementById("formulario-nombre");

var puntaje = 0;
var indexQuestion;
var defectTime = 3;
var chronometer;
var selectedAnswer = undefined;
var userName;

formulario.addEventListener("submit", (event) => {
	event.preventDefault();
	startTrivia();
});

function startTrivia() {
	sessionStorage.clear();
	userName = userNameInput.value;
	if (userName == "") {
		alert("ingrese un nombre");
		userNameInput.focus();
	} else {
		//esconder main-page hacer aparecer main-category
		mainPage.classList.add("hidden");
		mainCategorys.classList.remove("hidden");

		insertCategorys();
	}
}

//inyect (componentCategorys "menu de categorias" to mainDinamic)
function insertCategorys() {
	htmlstringRepresentation = "";

	const categorys = [
		{
			name: "peliculas",
			description: "¿las peliculas de terror son lo tuyo? averiguemolo",
			preguntas: [
				{
					pregunta: "¿Cuantas peliculas de la franquicia saw se emitieron?",
					respuestas: [
						"5 peliculas",
						"3 peliculas",
						"7 peliculas",
						"9 peliculas",
					],
					respuesta: 3,
				},
				{
					pregunta: "¿En que pelicula el protagonista viola a su propio hijo?",
					respuestas: [
						"hanibal lecter",
						"dracula 2",
						"serbian film",
						"el hoyo",
					],
					respuesta: 2,
				},
				{
					pregunta:
						"¿La Famosa frase 'i see dead people(veo gente muerta), de que pelicula es?",
					respuestas: [
						"memorias de un eterno resplandor",
						"dracula",
						"sexto sentido",
						"alien covenant",
					],
					respuesta: 0,
				},
				{
					pregunta: "Si buenas hay pan?",
					respuestas: ["no sr wtf", "un señorito", "un pirilon"],
					respuesta: 0,
				},
			],
		},

		{
			name: "juegos",
			description: "¿que tan masoquista eres, nada como un buen scream?",
			preguntas: [
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 1,
				},
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 2,
				},
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 2,
				},
			],
		},

		{
			name: "test",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
			preguntas: [
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 3,
				},
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 0,
				},
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 2,
				},
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 2,
				},
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 2,
				},
			],
		},

		{
			name: "alguno",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
			preguntas: [
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 1,
				},
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 0,
				},
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 2,
				},
			],
		},

		{
			name: "sin ideas",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
			preguntas: [
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 3,
				},
				{
					pregunta: "lorem ipsum dolor sit amet",
					respuestas: [
						"lorem ipsum",
						"dolor sit amet",
						"consectur adpiscing elit",
						"sed do eiusmod",
					],
					respuesta: 0,
				},
			],
		},
	];

	const componentCategorys = createElement("div", "", { class: "categorys" });
	const CategorysCarousel = createElement(
		"div",
		"",
		{
			class: "categorys-carousel",
		},
		componentCategorys
	);
	const CategorysItems = createElement(
		"div",
		"",
		{
			class: "categorys-items",
		},
		CategorysCarousel
	);

	// add (htmlComponent categoryItems => htmlComponent category(title,score,description,button) )
	categorys.forEach((category) => {
		category.lastHighScore = 0;

		const componentCategory = createElement(
			"div",
			"",
			{ class: `category-item` },
			CategorysItems
		);

		const itemName = createElement(
			"h1",
			category.name,
			{ class: "category-item__name" },
			componentCategory
		);

		const itemScore = createElement(
			"div",
			`${category.lastHighScore}/${category.preguntas.length * 100}`,
			{ id: category.name, class: "category-item__score" },
			componentCategory
		);

		const itemDescription = createElement(
			"div",
			category.description,
			{ class: "category-item__description" },
			componentCategory
		);

		const itemButton = createElement(
			"div",
			"",
			{ class: "category-item__button" },
			componentCategory
		);

		componentCategory.addEventListener("click", () => {
			insertCategory(category);
		});
	});

	//add (domComponent maincategorys => htmlComponent buttonLeft)
	const buttonLeft = createElement(
		"div",
		"",
		{
			id: "carouselButtonLeft",
			class: "carousel-button carousel-button--left",
		},
		mainCategorys
	);

	// add (domElement mainCategorys => htmlComponent componentCategorys "menu categorias" )
	mainCategorys.appendChild(componentCategorys);

	//add (domComponent maincategorys => htmlComponent buttonRight)
	const buttonRight = createElement(
		"div",
		"",
		{
			id: "carouselButtonRight",
			class: "carousel-button carousel-button--right",
		},
		mainCategorys
	);

	buttonLeft.addEventListener("click", () =>
		moveCarousel(CategorysCarousel, "left")
	);
	buttonRight.addEventListener("click", () =>
		moveCarousel(CategorysCarousel, "right")
	);
}

//inyect (category "categoria seleccionada" to mainDinamic)
function insertCategory(category) {
	//reiniciar valores, puntaje
	puntaje = 0;
	indexQuestion = 0;

	//mainCategory hide and mainDinamic visible
	mainCategorys.classList.add("hidden");
	mainDinamic.classList.remove("hidden");

	//add  (htmlComponent category => htmlComponents  counter,timer,title,questionContainer,nexquestionButton)
    const categoryComponent = createElement(
        "div", 
        "", 
        {
		id: "category",
		class: "category",
        }
    );
    
	const categoryCounter = createElement(
		"div",
		`1/${category.preguntas.length}`,
		{
			id: "categoryCounter",
			class: "category__contador",
		},
		categoryComponent
	);

	const categoryTimer = createElement(
		"div",
		"",
		{
			id: "categoryTimer",
			class: "category__timer",
		},
		categoryComponent
	);

	const categoryTitle = createElement(
		"h2",
		category.name,
		{
			class: "category__title",
		},
		categoryComponent
	);

	const categoryQuestionContainer = createElement(
		"div",
		"",
		{
			id: "categoryQuestion",
			class: "category__question",
		},
		categoryComponent
	);

	const nextQuestionButton = createElement(
		"div",
		"next",
		{
			id: "categoryNextQuestion",
			class: "category__next-question button hidden",
		},
		categoryComponent
	);

	nextQuestionButton.addEventListener("click", () => {
		nextQuestion(category);
	});

	//add (domElement mainDinamic  => htmlComponent categoryComponent)
	mainDinamic.appendChild(categoryComponent);

	//inicio de preguntas
	nextQuestion(category);
}

//inyect (question to category)
function nextQuestion(category, availableTime = defectTime) {
        
    const lengthQuestions = category.preguntas.length;

	//si existen preguntas disponibles
	if (indexQuestion < lengthQuestions) {

        const categoryComponent = document.getElementById("category");
        const categoryCounter = document.getElementById("categoryCounter");
        const categoryTimer = document.getElementById("categoryTimer");
        const categoryQuestionContainer = document.getElementById("categoryQuestion");
        const nextQuestionButton = document.getElementById("categoryNextQuestion");

    
        //cada pregunta debe hacer que el boton este visible de nuevo
        nextQuestionButton.classList.add("hidden");
    
        //cambiar el contador de preguntas
        categoryCounter.textContent = `${indexQuestion + 1}/${lengthQuestions}`;
    

		//resetear la variable del button almacenado
		selectedAnswer = undefined;

		//actualizar el mensaje de tiempo disponible
		categoryTimer.textContent = availableTime;

		//crear pregunta
		const newQuestion = createQuestion(category, indexQuestion);

		//remuevo la pregunta anterior
		if (categoryQuestionContainer.hasChildNodes()) {
			categoryQuestionContainer.firstChild.remove();
		}

		//add (component newQuestion(answers) => domElement categoryquestionContainer)
		categoryQuestionContainer.appendChild(newQuestion);

		// iniciar timer
		setTimer(availableTime, category);

		//aumentar el indice de la pregunta
		indexQuestion++;
	} else {
		insertResultado(category);
	}
}

//return => htmlComponent ( question (title,answers))
function createQuestion(category, index) {
	var question = category.preguntas[indexQuestion];
	var answerButtons = [];

	//add (component componentQuestion <= title)
	const componentQuestion = createElement("div", "", { class: "question" });

	const questionTitle = createElement(
		"h4",
		question.pregunta,
		{ class: "question__title" },
		componentQuestion
	);

	//add (component componentQuestion => component answers)
	question.respuestas.forEach((respuesta) => {
		const questionAnswer = createElement(
			"button",
			respuesta,
			{ 
                class: "question__answer button" 
            },
			componentQuestion
		);

		answerButtons.push(questionAnswer);
        
        //event of answer -> validate the answer and remove answer events 
		questionAnswer.onclick = () => {
			validateAnswer(question, questionAnswer);
			_removeEventClick(answerButtons);
		};


	});

	return componentQuestion;
}

//validar seleccion
function validateAnswer(question, buttonSelect) {
	//detiene el tiempo por que ya no lo requiero
	clearInterval(chronometer);

	if (question.respuestas[question.respuesta] == buttonSelect.textContent) {
		buttonSelect.classList.add("answer--correct");
		puntaje += 100;
	} else {
		buttonSelect.classList.add("answer--incorrect");
	}

	//remover eventos
	const buttonNext = document.getElementById("categoryNextQuestion");
	buttonNext.classList.remove("hidden");
}

//insertar resultados
function insertResultado(category) {
	let listQuestions = category.preguntas;

	let mensaje;
	if (puntaje / (listQuestions.length * 100) < 1) {
		mensaje = "puedes hacerlo mejor!";
	} else {
		mensaje = "puntaje perfecto, felicitaciones!!, ve a por otra categoria";
	}

	const htmlString = `<div class="resultado">
                            <h2 class="resultado__title">has obtenido un puntaje de ${puntaje}/${
		listQuestions.length * 100
	} </h2>
                            <h4 class="resultado__mensaje">${mensaje}</h4>
                            <div id="play-againg" class="button resultado__button resultado__button--again" >Play Againg!</div>
                            <div id="new-player" class="button resultado__button resultado__button--new" >New Player</div>
                        </div>`;

	mainDinamic.innerHTML = htmlString;

	const playAgain = document.getElementById("play-againg");
	const newPlayer = document.getElementById("new-player");

	//nuevo menu
	playAgain.addEventListener("click", () => {
		mainCategorys.classList.remove("hidden");

		const lastHighScore = category.lastHighScore;
		const newScore = puntaje;

		if (newScore > lastHighScore) {
			category.lastHighScore = newScore;
			document.getElementById(category.name).textContent = `${newScore}/${
				category.preguntas.length * 100
			}`;
		}

		mainDinamic.innerHTML = "";
		mainDinamic.classList.add("hidden");
	});

	//nuevo jugador
	newPlayer.addEventListener("click", () => {
		userNameInput.value = "";
		mainPage.classList.remove("hidden");
		mainDinamic.classList.add("hidden");
		mainDinamic.innerHTML = "";
		mainCategorys.innerHTML = "";
		userNameInput.focus();
	});
}

function setTimer(time, category) {
	//si llegan a declararme de nuevo debo lipiarme antes
	clearInterval(chronometer);
	clearTimeout()

	listQuestions = category.preguntas;

	const componentCategoryTimer = document.getElementById("categoryTimer");

	chronometer = setInterval(() => {
		time--;

		//actualizo el tiempo
		componentCategoryTimer.textContent = time;

		//si se acaba el tiempo
		if (time == 0) {

			//clean the timer 
			clearInterval(chronometer);

			//visible categoryNextQuestion
			document
				.getElementById("categoryNextQuestion")
				.classList.remove("hidden");

            //remove events of buttons (answer)
			const answerButtons = [
				...document.getElementsByClassName("question__answer"),
			];
			_removeEventClick(answerButtons);

			//crea una nueva pregunta
			// nextQuestion(category)
		}
	}, 1000);

}
