function setAttributes(element,attributes={}){


    for(const [key,value] of Object.entries(attributes)){
        element.setAttribute(key,value)
    }
}


function createElement(type,text="",attributes={}){
    const element =  document.createElement(type)
    
    element.textContent = text
    setAttributes(element,attributes)

    return element

}