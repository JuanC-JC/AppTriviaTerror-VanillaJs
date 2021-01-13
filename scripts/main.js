const mainPage = document.getElementById("main-page")
const mainCategorys = document.getElementById("main-categorys")
const mainDinamic = document.getElementById("main-dinamic")
const userName = document.getElementById("name-user")
const buttonStart = document.getElementById("button-start")

var puntaje = 0

var indexQuestion;

var defectTime = 5


var chronometer;

var selectedAnswer;

buttonStart.addEventListener("click",startTrivia)


function startTrivia(){
    //esconder main-page hacer aparecer main-category
    mainPage.classList.add("hidden")
    mainCategorys.classList.remove("hidden")
    insertCategorys()
}



//dinamico por que no se cuantas categorias quiero


function insertCategorys(){

    const categorys = [{name:"peliculas",
                description:"lorem papus maximus uwu no se que escribir aca pero yolo",
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

                {name:"geografia",
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

    //generar la categoria en html
    categorys.forEach(
        (category)=>{

            //creo un elemento html para el componente de categoria
            const componentCategory = document.createElement("div")
            componentCategory.classList.add("category")

            const htmlString = `<h1 class="category__title">${category.name}</h1>
                                <div class="category__img"><img src="${category.imgUrl}" alt=""></div>
                                <div class="category__description"><p>${category.description}</p></div>`

            //agrego todos los elementos html por la propiedad innerHTML
            componentCategory.innerHTML += htmlString

            //creo un botton para no tener que hacer un selector luego de creado por innerhtml
            const componentButtonCategory = createElement("button","pepe",{type:"button",class:"category__button button"})

            //debo pasar un objeto copiado del original o lo modificara
            componentButtonCategory.addEventListener("click",()=>{insertCategory({...category})})

            componentCategory.appendChild(componentButtonCategory)

            //agrego el componente por el metodo agregarHijo ("permite no re-escribir esa parte del dom y perder referencias(eventos)")
            mainCategorys.appendChild(componentCategory)



    })

    
    //inyectar las categorias

    
}


function insertCategory(category){

    //esconder categorias
    mainCategorys.classList.add("hidden")
    mainDinamic.classList.remove("hidden")

    //indice de pregunta
    indexQuestion = 0

    //creo el componente categoria 
    const categoryComponent = createElement("div","",{id:"category",class:"category"})

         //componentes de la categoria
        const categoryCounter = createElement("div",`1/${category.preguntas.length}`,{id:"categoryCounter",class:"category_contador"})
        const categoryTimer = createElement("div","",{id:"categoryTimer",class:"category__timer"})
        const categoryTitle = createElement("h2",category.name,{class:"category__title"})
        const categoryQuestionContainer = createElement("div","",{id:"question-container",class:"category__question"})
        
            categoryComponent.appendChild(categoryCounter)
            categoryComponent.appendChild(categoryTimer)
            categoryComponent.appendChild(categoryTitle)    
            categoryComponent.appendChild(categoryQuestionContainer)

            
    //creo la primer pregunta

    nextQuestion(categoryComponent,categoryQuestionContainer,categoryCounter,categoryTimer,category.preguntas)

    //componente boton siguente
    const nextQuestionComponent = createElement("div","next!",{class:"button"})
    categoryComponent.appendChild(nextQuestionComponent)
       
    nextQuestionComponent.addEventListener("click",()=> {
        nextQuestion(categoryComponent,categoryQuestionContainer,categoryCounter,categoryTimer,category.preguntas)
    })
    
    //añade la categoria al mainDinamic
    mainDinamic.appendChild(categoryComponent)

}



//esto solo ocurre la primera vez que o con la presion del boton next
function nextQuestion(componentCategory,categoryQuestionContainer,categoryCounter,categoryTimer,listQuestions,availableTime=defectTime){

    const question = listQuestions[indexQuestion];

    const question2 =  listQuestions[indexQuestion-1];

    if(indexQuestion<listQuestions.length){
        //si tiene una seleccion 
        if(selectedAnswer!==undefined){
            //seleccion correcta
            if(question2.respuestas[question2.respuesta] == selectedAnswer.textContent){
                selectedAnswer.classList.add("answer--correct")
                console.log("true validado por boton")
                puntaje += 100
            
            //seleccion incorrecta
            }else{
                selectedAnswer.classList.add("answer--incorrect")
                console.log("false validado por boton")
            }

            //cerrar el tiempo
            clearInterval(chronometer)

        }

    }



    //si hay mas preguntas y tiene alguna selecionada
    if(indexQuestion==0 || (indexQuestion<listQuestions.length && selectedAnswer!==undefined)){

        clearInterval(chronometer)

        //cambiar el contador de preguntas
        categoryCounter.textContent = `${indexQuestion+1}/${listQuestions.length}`
        categoryTimer.textContent = availableTime

        //iniciar timer
        setTimer(categoryTimer,availableTime,question)

        //crear pregunta
        const newQuestion = createQuestion(listQuestions,indexQuestion)
        if(categoryQuestionContainer.hasChildNodes()){
            categoryQuestionContainer.firstChild.remove()
        }
        
        //agregar la pregunta en el cotnenedor de pregunta
        categoryQuestionContainer.appendChild(newQuestion)
    
        indexQuestion ++

    
    }

    if(indexQuestion>=listQuestions.length){
        console.log("No mas preguntas")
    }

    




}



//crea el componente de la pregunta, la lista category va eliminando las preguntas a si que es recursiva..
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

        const questionAnswer = createElement("div",respuesta,{class:"question__answer button",name:"answer"})

        //funcion real, controlador
        questionAnswer.addEventListener("click",()=>selectAnswer(questionAnswer))

        componentQuestion.appendChild(questionAnswer)

    })

    return componentQuestion

}


//solo debe seleccionar 
function selectAnswer(buttonSelect){

    //si hay tiempo disponible puedo seleccionar 
    if(document.getElementById("categoryTimer").textContent > 0){

        //botones respuestas
        const buttonsAnswer = document.getElementsByName("answer")

        //si selecciono uno desseleciono a todos
        buttonsAnswer.forEach(
            (answer)=>{
                if(answer !== buttonSelect){
                    answer.classList.remove("answer--select")
                }
            }
        )

        buttonSelect.classList.add("answer--select")

        selectedAnswer = buttonSelect
    }



    // if(question.respuestas[question.respuesta] == buttonSelect.textContent ){
    //     buttonSelect.classList.add("answer--select")
    //     console.log("correcta")
    // }else{
    //     console.log("incorrecta")
    // }

    //solo selecciona el boton

}


function setTimer(timerComponent,time,question){

    chronometer =  setInterval(() => {
        time--
        timerComponent.textContent = time

    
        //si se acaba el tiempo
        if(time==0){

            clearInterval(chronometer)

            //en caso de que halla sido selecionado un boton
           if(selectedAnswer !== undefined){
                if(question.respuestas[question.respuesta] == selectedAnswer.textContent){
                    selectedAnswer.classList.add("answer--correct")
                    puntaje += 100
                }else{
                    selectedAnswer.classList.add("answer--incorrect")
                    console.log("false validado por tiempo")
                }

           }else{
               
                console.log("no selecciono nada validado por tiempo")

                //botones respuestas
                const buttonsAnswer = document.getElementsByName("answer")

                buttonsAnswer.forEach((answer)=>{

                    if(answer.textContent == question.respuestas[question.respuesta]){
                        answer.classList.add("answer--correct")
                    }   


                })
           }
            
        }



    }, 1000);

}
