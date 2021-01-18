const mainPage = document.getElementById("main-page")
const mainCategorys = document.getElementById("main-categorys")
const mainDinamic = document.getElementById("main-dinamic")
const userNameInput = document.getElementById("name-user")
const buttonStart = document.getElementById("button-start")
const formulario = document.getElementById("formulario-nombre")

var puntaje = 0
var indexQuestion;
var defectTime = 3;
var chronometer;
var selectedAnswer = undefined;
var userName;



formulario.addEventListener("submit",(event)=>{ event.preventDefault(); startTrivia()})


function startTrivia(){
    sessionStorage.clear()
    userName =  userNameInput.value
    if(userName == ""){
        alert("ingrese un nombre")
        userNameInput.focus();
    }else{
        //esconder main-page hacer aparecer main-category
        mainPage.classList.add("hidden")
        mainCategorys.classList.remove("hidden")
        
        insertCategorys()
    }

}


function insertCategorys(){

    const categorys = [{name:"peliculas",
                description:"¿las peliculas de terror son lo tuyo? averiguemolo",
                preguntas:[
                            {
                                pregunta:"¿Cuantas peliculas de la franquicia saw se emitieron?",
                                respuestas:["5 peliculas","3 peliculas","7 peliculas","9 peliculas"],
                                respuesta:3
                            },
                            {
                                pregunta:"¿En que pelicula el protagonista viola a su propio hijo?",
                                respuestas:["hanibal lecter","dracula 2","serbian film","el hoyo"],
                                respuesta:2
                            },
                            {
                                pregunta:"¿La Famosa frase 'i see dead people(veo gente muerta), de que pelicula es?",
                                respuestas:["memorias de un eterno resplandor","dracula","sexto sentido","alien covenant"],
                                respuesta:0
                            },
                            {
                                pregunta:"Si buenas hay pan?",
                                respuestas:["no sr wtf","un señorito","un pirilon"],
                                respuesta:0
                            }
                        ]
                        
                        
                },

                {name:"juegos",
                description:"¿que tan masoquista eres, nada como un buen scream?",
                preguntas:[
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:1
                            },
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:2
                            },
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:2
                            }
                        ]
                
                },

                {name:"test",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
                preguntas:[
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:3
                            },
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:0
                            },
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:2
                            },
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:2
                            },
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:2
                            }
                        ]
                        
                },

                {name:"alguno",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
                preguntas:[
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:1
                            },
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:0
                            },
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:2
                            }
                        ]
                        
                },

                {name:"sin ideas",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
                preguntas:[
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:3
                            },
                            {
                                pregunta:"lorem ipsum dolor sit amet",
                                respuestas:["lorem ipsum","dolor sit amet","consectur adpiscing elit","sed do eiusmod"],
                                respuesta:0
                            }
                        ]
                        
                }
                
            ]

    const componentCategorys = createElement("div","",{class:"categorys"})
    const CategorysCarousel = createElement("div","",{class:"categorys-carousel"},componentCategorys)
    const CategorysItems = createElement("div","",{class:"categorys-items"},CategorysCarousel)

    //add  (component category-item = title,score,description,button) to category-items
    categorys.forEach(
        (category)=>{ 
            
            category.lastHighScore = 0;

            //creo un elemento html para el componente de categoria
            const componentCategory = createElement("div","",{class:`category-item`},CategorysItems)
                
                const itemName = createElement("h1",
                                                category.name,
                                                {class:"category-item__name"},
                                                componentCategory)

                const itemScore = createElement("div",
                                                `${category.lastHighScore}/${category.preguntas.length*100}`,
                                                {id:category.name,class:"category-item__name"},
                                                componentCategory)
                
                const itemDescription = createElement("div",
                                                category.description,
                                                {class:"category-item__description"},
                                                componentCategory)

                const itemButton = createElement("div",
                                                "",
                                                {class:"category-item__button"},
                                                componentCategory)

            componentCategory.addEventListener("click",()=>{insertCategory(category)})


    })

    //add (component categorys-buttons-scroll = left- rigth) to main component categorys
    const categorysButtonsScroll = createElement("div","",{class:"categorys-carousel-buttons"},componentCategorys)
        const buttonLeft = createElement("div",
                                        "",
                                        {class:"carousel-button carousel-button--left"},
                                        categorysButtonsScroll)
        const buttonRight = createElement("div",
                                        "",
                                        {class:"carousel-button carousel-button--right"},
                                        categorysButtonsScroll)


    

    // agreagado manual para evitar que en cada componente el dom se recargue
    mainCategorys.appendChild(componentCategorys)

}


function insertCategory(category){

    //reiniciar el puntaje
    puntaje = 0
    //indice de pregunta
    indexQuestion = 0
    categoryActual = category.name

    //esconder categorias
    mainCategorys.classList.add("hidden")
    mainDinamic.classList.remove("hidden")


    //creation component category
    const categoryComponent = createElement("div","",{id:"category",class:"category"})

        //add  (component category = counter,timer,title,questionContainer) to category             
        const categoryCounter = createElement("div",
                                            `1/${category.preguntas.length}`,
                                            {
                                                id:"categoryCounter",
                                                class:"category__contador"
                                            },
                                            categoryComponent)

        const categoryTimer = createElement("div",
                                            "",
                                            {
                                                id:"categoryTimer",
                                                class:"category__timer"
                                            },
                                            categoryComponent)

        const categoryTitle = createElement("h2",
                                            category.name,
                                            {class:"category__title"},
                                            categoryComponent)

        const categoryQuestionContainer = createElement("div",
                                            "",
                                            {
                                                id:"categoryQuestion",
                                                class:"category__question"
                                            },
                                            categoryComponent)
        
        const nextQuestionButton = createElement("div",
                                                "next",
                                                {
                                                    id:"categoryNextQuestion",
                                                    class:"category__next-question button hidden"
                                                },
                                                categoryComponent)
    
       
            nextQuestionButton.addEventListener("click",()=> {
                nextQuestion(category)
            })


    //se agrega al final por cuestiones de rendimiento
    mainDinamic.appendChild(categoryComponent)

    //inicio de preguntas
    nextQuestion(category)


}

//ingreso de pregunta
function nextQuestion(category,availableTime=defectTime){

    //obtengo todas las variables
    const categoryComponent = document.getElementById("category")
    const categoryCounter = document.getElementById("categoryCounter")
    const categoryTimer = document.getElementById("categoryTimer")
    const categoryQuestionContainer = document.getElementById("categoryQuestion")
    const nextQuestionButton = document.getElementById("categoryNextQuestion")

    const listQuestions = category.preguntas

    //cada pregunta debe hacer que el boton este visible de nuevo
    nextQuestionButton.classList.add("hidden")

    //cambiar el contador de preguntas
    categoryCounter.textContent = `${indexQuestion+1}/${listQuestions.length}`


    //si existen preguntas disponibles
    if(indexQuestion<listQuestions.length){

        //limpiar el cronometro
        clearInterval(chronometer)

        //actualizar el mensaje de tiempo disponible
        categoryTimer.textContent = availableTime

        //crear pregunta
        const newQuestion = createQuestion(category,indexQuestion)
        if(categoryQuestionContainer.hasChildNodes()){
            categoryQuestionContainer.firstChild.remove()
        }
        
        //agregar la pregunta en el contenedor de pregunta
        categoryQuestionContainer.appendChild(newQuestion)

        //iniciar timer
        setTimer(availableTime,category)
        
        //aumentar el indice de la pregunta
        indexQuestion ++

    }else{
        insertResultado(category)

    }


}

//crea el componente de la pregunta
function createQuestion(category,index){

    //resetear la variable del button almacenado
    selectedAnswer = undefined;

    //pregunta
    var question = category.preguntas[indexQuestion]

    const componentQuestion = createElement("div","",{class:"question"})
    
    { //componentes de pregunta "titulo"
        let questionTitle = createElement("h4",question.pregunta,{class:"question__title"})
        componentQuestion.appendChild(questionTitle)
    }
    

    //agregar respuestas
    question.respuestas.forEach(respuesta=>{

        const questionAnswer = createElement("button",respuesta,{class:"question__answer button"})

        //funcion real, controlador
        questionAnswer.addEventListener("click",()=>validateAnswer(question,questionAnswer))

        componentQuestion.appendChild(questionAnswer)

    })

    return componentQuestion

}

//validar seleccion
function validateAnswer(question,buttonSelect){

    clearInterval(chronometer)

    if(selectedAnswer == undefined){
        if(question.respuestas[question.respuesta] == buttonSelect.textContent){
            buttonSelect.classList.add("answer--correct")
            puntaje += 100
            
        }
        else{
            buttonSelect.classList.add("answer--incorrect")
        }

        const buttonNext = document.getElementById("categoryNextQuestion")
        buttonNext.classList.remove("hidden")

        //para no dejar seleccionar de nuevo la respuesta
        selectedAnswer = buttonSelect;
    }



}

//insertar resultados
function insertResultado(category){


    let listQuestions = category.preguntas;

    let mensaje;
    if(puntaje/(listQuestions.length*100) < 1){
        mensaje = "puedes hacerlo mejor!"
    }else{
        mensaje = "puntaje perfecto, felicitaciones!!, ve a por otra categoria"
    }
    
    const htmlString =  `<div class="resultado">
                            <h2 class="resultado__title">has obtenido un puntaje de ${puntaje}/${listQuestions.length*100} </h2>
                            <h4 class="resultado__mensaje">${mensaje}</h4>
                            <div id="play-againg" class="button resultado__button resultado__button--again" >Play Againg!</div>
                            <div id="new-player" class="button resultado__button resultado__button--new" >New Player</div>
                        </div>`



    mainDinamic.innerHTML = htmlString


    const playAgain = document.getElementById("play-againg")
    const newPlayer = document.getElementById("new-player")


    //nuevo menu
    playAgain.addEventListener("click",()=>{
        mainCategorys.classList.remove("hidden")

        

        const lastHighScore = category.lastHighScore;
        const newScore = puntaje;

        if(newScore > lastHighScore){
            category.lastHighScore = newScore;
            document.getElementById(category.name).textContent = `${newScore}/${category.preguntas.length*100}`;
        }

        mainDinamic.innerHTML = ""
        mainDinamic.classList.add("hidden")

    })



    //nuevo jugador
    newPlayer.addEventListener("click",()=>{
        userNameInput.value = ""
        mainPage.classList.remove("hidden")
        mainDinamic.classList.add("hidden")
        mainDinamic.innerHTML = ""
        mainCategorys.innerHTML = ""
        userNameInput.focus();
    })



}


function setTimer(time,category){

    clearInterval(chronometer)

    listQuestions = category.preguntas

    const componentCategoryTimer = document.getElementById("categoryTimer")

    chronometer =  setInterval(() => {
        time--

        //como esto es asyncrono, puedo acceder a cualqueir varibale declarada en su funcion superior WTF
        //NO HACERLO
        componentCategoryTimer.textContent = time

    
        //si se acaba el tiempo
        if(time==0){
            console.log("creando nueva pregunta")

            clearInterval(chronometer)

            //crea una nueva pregunta
            nextQuestion(category)
            

        }
    }, 1000);

}
