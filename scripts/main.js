const mainPage = document.getElementById("main-page")
const mainCategorys = document.getElementById("main-categorys")
const mainDinamic = document.getElementById("main-dinamic")
const userNameInput = document.getElementById("name-user")
const buttonStart = document.getElementById("button-start")
const formulario = document.getElementById("formulario-nombre")

var puntaje = 0
var indexQuestion;
var defectTime = 5
var chronometer;
var selectedAnswer = undefined;
var userName;

buttonStart.addEventListener("click",(event)=>{ event.preventDefault(); startTrivia()})
formulario.addEventListener("submit",(event)=>{ event.preventDefault(); startTrivia()})


const lastScore = localStorage.getItem("lastScoreTrivia")

function startTrivia(){
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
                description:"¿las peliculas de terror son lo tuyo? <br> averiguemolo",
                imgUrl:"",
                preguntas:[
                            {
                                pregunta:"en que pelicula, el protagonista se alimenta de las personas por placer?",
                                respuestas:["un chamuco","un señorito","un pirilon"],
                                respuesta:0
                            },
                            {
                                pregunta:"Si buenas hay pan?",
                                respuestas:["no sr wtf","un señorito","un pirilon"],
                                respuesta:0
                            },
                            {
                                pregunta:"quien soy yo?",
                                respuestas:["un chamuco","un señorito","un pirilon"],
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
                imgUrl:".",
                preguntas:[
                            {
                                pregunta:"quien soy yo?",
                                respuestas:["un chamuco","un señorito","un pirilon"],
                                respuesta:0
                            },
                            {
                                pregunta:"Si buenas hay pan?",
                                respuestas:["no sr wtf","un señorito","un pirilon"],
                                respuesta:0
                            }
                        ]
                
                },

                {name:"otro",
                description:"lorem papus maximus de nuevo no se que escribir aca uwu masdasda",
                imgUrl:".",
                preguntas:[
                            {
                                pregunta:"quien soy yo?",
                                respuestas:["un chamuco","un señorito","un pirilon"],
                                respuesta:0
                            },
                            {
                                pregunta:"Si buenas hay pan?",
                                respuestas:["no sr wtf","un señorito","un pirilon"],
                                respuesta:0
                            }
                        ]
                        
                },

                {name:"otro",
                description:"lorem papus maximus de nuevo no se que escribir aca uwu masdasda",
                imgUrl:".",
                preguntas:[
                            {
                                pregunta:"quien soy yo?",
                                respuestas:["un chamuco","un señorito","un pirilon"],
                                respuesta:0
                            },
                            {
                                pregunta:"Si buenas hay pan?",
                                respuestas:["no sr wtf","un señorito","un pirilon"],
                                respuesta:0
                            }
                        ]
                        
                },

                {name:"otro",
                description:"lorem papus maximus de nuevo no se que escribir aca uwu masdasda",
                imgUrl:".",
                preguntas:[
                            {
                                pregunta:"quien soy yo?",
                                respuestas:["un chamuco","un señorito","un pirilon"],
                                respuesta:0
                            },
                            {
                                pregunta:"Si buenas hay pan?",
                                respuestas:["no sr wtf","un señorito","un pirilon"],
                                respuesta:0
                            }
                        ]
                        
                }
                
            ]

    const containerCategorysCarousel = createElement("div","",{class:"categorys-carousel"})
    const containerCategorys = createElement("div","",{class:"categorys-container"})

    containerCategorysCarousel.appendChild(containerCategorys)

    let diferenType = 1
    //insertando html de categorys 

    //generar la categoria en html
    categorys.forEach(
        (category)=>{

            //creo un elemento html para el componente de categoria
            const componentCategory = createElement("div","",{class:`category category--img-${diferenType}`})
            containerCategorys.appendChild(componentCategory)

            const htmlString = `<h1 class="category__name">${category.name}</h1>
                                <div class="category__img"><img src="${category.imgUrl}" alt=""></div>
                                <div class="category__description"><p>${category.description}</p></div>`

            //agrego todos los elementos html por la propiedad innerHTML
            componentCategory.innerHTML += htmlString

            //creo un botton para no tener que hacer un selector luego de creado por innerhtml
            const componentButtonCategory = createElement("div","",{class:"category__button"})

      

            componentCategory.addEventListener("click",()=>{insertCategory({...category})})

            //debo pasar un objeto copiado del original o lo modificara
            // componentButtonCategory.addEventListener("click",()=>{insertCategory({...category})})

            componentCategory.appendChild(componentButtonCategory)

            //agrego el componente por el metodo agregarHijo ("permite no re-escribir esa parte del dom y perder referencias(eventos)")
            mainCategorys.appendChild(containerCategorysCarousel)

            diferenType == 2 ? diferenType=1: diferenType++;
    })

    
}


function insertCategory(category){

    //reiniciar el puntaje
    puntaje = 0
    //indice de pregunta
    indexQuestion = 0

    //esconder categorias
    mainCategorys.classList.add("hidden")
    mainDinamic.classList.remove("hidden")


    //creo el componente categoria 
    const categoryComponent = createElement("div","",{id:"category",class:"category-item"})

         //componentes de la categoria
        const categoryCounter = createElement("div",`1/${category.preguntas.length}`,{id:"categoryCounter",class:"category__contador"})
        const categoryTimer = createElement("div","",{id:"categoryTimer",class:"category__timer"})
        const categoryTitle = createElement("h2",category.name,{class:"category__title"})
        const categoryQuestionContainer = createElement("div","",{id:"question-container",class:"category__question"})
        
            categoryComponent.appendChild(categoryCounter)
            categoryComponent.appendChild(categoryTimer)
            categoryComponent.appendChild(categoryTitle)    
            categoryComponent.appendChild(categoryQuestionContainer)

    
    //añade la categoria al mainDinamic
    mainDinamic.appendChild(categoryComponent)

    //componente boton
    const nextQuestionButton = createElement("div","next",{id:"categoryNextQuestion",class:"category__next-question button hidden"})
    categoryComponent.appendChild(nextQuestionButton)
       
    nextQuestionButton.addEventListener("click",()=> {
        nextQuestion(category.preguntas)
    })

    //creo la primer pregunta
    nextQuestion(category.preguntas)


}


//ingreso de pregunta
function nextQuestion(listQuestions,availableTime=defectTime){

    const categoryComponent = document.getElementById("category")
    const categoryCounter = document.getElementById("categoryCounter")
    const categoryTimer = document.getElementById("categoryTimer")
    const categoryQuestionContainer = document.getElementById("question-container")
    const nextQuestionButton = document.getElementById("categoryNextQuestion")


    const question = listQuestions[indexQuestion];

    //esconder el boton de siguiente
    nextQuestionButton.classList.add("hidden")

    //cambiar el contador de preguntas
    categoryCounter.textContent = `${indexQuestion+1}/${listQuestions.length}`


    //si aun tengo preguntas
    if(indexQuestion<listQuestions.length){

        console.log(indexQuestion)

        clearInterval(chronometer)


        categoryTimer.textContent = availableTime

        //crear pregunta
        const newQuestion = createQuestion(listQuestions,indexQuestion)
        if(categoryQuestionContainer.hasChildNodes()){
            categoryQuestionContainer.firstChild.remove()
        }
        
        //agregar la pregunta en el contenedor de pregunta
        categoryQuestionContainer.appendChild(newQuestion)

        //iniciar timer
        setTimer(availableTime,listQuestions)
    
        indexQuestion ++

    }else{
        localStorage.setItem("lastScoreTrivia",puntaje)
        insertResultado(listQuestions)

    }


}

//crea el componente de la pregunta
function createQuestion(listQuestions,index){

    //resetear la variable del button almacenado
    selectedAnswer = undefined;

    //copia de mi parametro de entrada
    const questions = [...listQuestions];

    //pregunta
    var question = questions[index]

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


function setTimer(time,listQuestions){

    clearInterval(chronometer)

    const componentCategoryTimer = document.getElementById("categoryTimer")

    chronometer =  setInterval(() => {
        time--

        console.log("ejecutando")

        //como esto es asyncrono, puedo acceder a cualqueir varibale declarada en su funcion superior WTF
        //NO HACERLO
        componentCategoryTimer.textContent = time

    
        //si se acaba el tiempo
        if(time==0){
            console.log("creando nueva pregunta")

            clearInterval(chronometer)

            //crea una nueva pregunta
            nextQuestion(listQuestions)
            

        }
    }, 1000);

}

function insertResultado(listQuestions){
    let mensaje;
    if(puntaje/(listQuestions.length*100) < 1){
        mensaje = "Puedes hacerlo mejor!"
    }else{
        mensaje = "Puntaje perfecto, Felicitaciones!!, ve a por otra categoria"
    }
    
    const htmlString =  `<div class="resultado">
                            <h2 class="resultado__title">${userName} has obtenido un puntaje de ${puntaje}/${listQuestions.length*100} </h2>
                            <h4 class="resultado__mensaje">${mensaje}</h4>
                            <div class="button" id="play-againg">Play Againg!</div>
                            <div class="button" id="new-player">New Player</div>
                        </div>`



    mainDinamic.innerHTML = htmlString


    const playAgain = document.getElementById("play-againg")
    const newPlayer = document.getElementById("new-player")


    //nuevo menu
    playAgain.addEventListener("click",()=>{
        
        mainCategorys.classList.remove("hidden")
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

