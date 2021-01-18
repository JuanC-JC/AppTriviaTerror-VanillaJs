function setAttributes(element,attributes={}){


    for(const [key,value] of Object.entries(attributes)){
        element.setAttribute(key,value)
    }
}


//asignacion de padre solo con elementos que no estan en el dom
function createElement(type,text="",attributes={},parent=undefined){
    const element =  document.createElement(type)

    if(parent instanceof Element || parent instanceof HTMLDocument){
        parent.appendChild(element)
    }
    
    // element.textContent = createtext
    element.appendChild(document.createTextNode(text))
    setAttributes(element,attributes)

    return element

}