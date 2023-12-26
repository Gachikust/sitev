"use strict";
let words=[];
let wordsAppear = document.getElementById('words-appear');

document.getElementById('disassemble').addEventListener('click',()=>{
    wordsAppear.innerHTML ='';
    words=[];
    dragTarget.innerHTML='';
    textTarget.innerHTML='';

    let wordsString = document.getElementById('words-input').value;
    let wordsArray = wordsString.split('-');
    let wordId=1;
    let numberId=1;
    for(let i in wordsArray){
        if(wordsArray[i].trim()!=''){
            if(isNaN(wordsArray[i])){
                words.push({
                    key:'a'+(wordId++),
                    value:wordsArray[i]
                })
            }else{
                words.push({
                    key:'n'+(numberId++),
                    value:wordsArray[i]
                })
            }
        }
        
    }
    words.sort(wordsSort);
    console.log(words);
    setWords();
})

function wordsSort(a,b){
    if(a.key[0]>b.key[0]){
        return 1;
    }
    if(a.key[0]<b.key[0]){
        return -1;
    }
    if(isNaN( a.value)){
        return a.value.localeCompare(b.value);
    }else{
        return a.value - b.value;
    }
    
}

function setWords(){
    words.forEach(wordContent=>{
        let word = document.createElement('div');
        word.className='word';
        word.innerHTML = wordContent.key + ' ' +wordContent.value;
        word.setAttribute('data-text',wordContent.value);
        addDraggable(word);
        wordsAppear.append(word)
    })
    
}

let currentDraggElement = null;
let dragTarget = document.getElementById('word-tartget');
let isDragging = false;

function addDraggable(element){
    element.draggable = true;
    element.addEventListener('dragstart',(event)=>{
        currentDraggElement=event.target;
        isDragging = true;
    })
    element.addEventListener('drop',(event)=>{
        console.log(event);
        isDragging = false;
        currentDraggElement.remove();
        console.log(event.offsetX);
        console.log(event.target.offsetWidth+10);
        if(event.offsetX < (event.target.offsetWidth+10)/2){
            element.parentNode.insertBefore(currentDraggElement, element);
        }else{
            element.parentNode.insertBefore(currentDraggElement, element.nextSibling);
        }
        
        
        event.preventDefault();
    })
    element.addEventListener('dragend',(event)=>{
    })
}

dragTarget.addEventListener('dragover',(e)=>{
    e.preventDefault();
})

let textTarget = document.getElementById('text-target');

dragTarget.addEventListener('drop',(event)=>{
    if(isDragging){
        isDragging = false;
        currentDraggElement.remove();
        dragTarget.append(currentDraggElement);
        event.preventDefault();
    }
    let text ='';
    Array.from(dragTarget.getElementsByClassName('word')).forEach(item=>{
        console.log(item);
        text+=item.getAttribute('data-text')+' ';
        textTarget.innerHTML=text;
    })
   
})