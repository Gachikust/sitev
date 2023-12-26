"use strict";
let answerQuestionArray=[
    {
        question:"Если человека назвали мордофиля, то это…",
        answers:[
            {answer:"Значит, что он тщеславный.",isRight:true,expanded:"Ну зачем же вы так... В Этимологическом словаре русского языка Макса Фасмера поясняется, что мордофилей называют чванливого человека. Ну а «чванливый» — это высокомерный, тщеславный."},
            {answer:"Значит, что у него лицо как у хряка.",isRight:false},
            {answer:"Значит, что чумазый.",isRight:false},
        ]
    },
    {
        question:"«Да этот Ярополк — фуфлыга!» Что не так с Ярополком?",
        answers:[
            {answer:"Он маленький и невзрачный.",isRight:true,expanded:"Точно! Словарь Даля говорит, что фуфлыгой называют невзрачного малорослого человека. А еще так называют прыщи."},
            {answer:"Он тот еще алкоголик.",isRight:false},
            {answer:"Он не держит свое слово.",isRight:false},
        ]
    },
    {
        question:"Если человека прозвали пятигузом, значит, он…",
        answers:[
            {answer:"Не держит слово.",isRight:true,expanded:"Может сесть сразу на пять стульев. Согласно Этимологическому словарю русского языка Макса Фасмера, пятигуз — это ненадежный, непостоянный человек."},
            {answer:"Изменяет жене",isRight:false},
            {answer:"Без гроша в кармане.",isRight:false},
        ]
    },
    {
        question:"Кто такой шлындра?",
        answers:[
            {answer:"Бродяга.",isRight:true,expanded:"Да! В Словаре русского арго «шлындрать» означает бездельничать, шляться."},
            {answer:"Нытик.",isRight:false},
            {answer:"Обманщик.",isRight:false},
        ]
    },
]

let rightCount =0;
let isEnd=false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
shuffle(answerQuestionArray);

answerQuestionArray.forEach((item=>{
    shuffle(item.answers);
}))

let root = document.getElementsByClassName('question-answer-container')[0];

for(let i =0;i<answerQuestionArray.length;i++){

    let ques = answerQuestionArray[i];

    let ansContainer = createAnswerContainer(i,ques);

    let question = createQuestion(i);

    let qaContainer = document.createElement('div');
    qaContainer.classList.add('question-container');
    qaContainer.id = 'question' + (i+1);

    qaContainer.append(question);
    qaContainer.append(ansContainer);

    root.append(qaContainer);
}

function createAnswerContainer(quesId,ques){
    let ansContainer = document.createElement('div');
    ansContainer.className = "answer-container";
    ques.answers.forEach((item,index)=>{
        let answer = document.createElement('div');
        answer.className='answer';
        answer.innerHTML = index + 1 + '. ' + item.answer;
        ansContainer.append(answer);
        answer.setAttribute('data-ansId',index);
        answer.setAttribute('data-quesId',quesId);
        answer.addEventListener("click",answerSelected);
    })

    return ansContainer;
}

function createQuestion(i){
    let question = document.createElement('div');
    question.className = 'question';
    question.innerHTML =i+1+'. ' + answerQuestionArray[i].question;
    question.setAttribute('data-quesId',i);
    question.addEventListener("click",questionSelected);
    return question;
}

function questionSelected(){
    let quesId = Number(this.getAttribute('data-quesId'));
    let answerSelector = 'question'+(quesId+1);
    if(isEnd){
        let ringhtAnswer;
        answerQuestionArray[quesId].answers.forEach((item)=>{
            if(item.isRight){
                ringhtAnswer=item.answer;
            }
        })
        let ansElemnt = document.getElementById(answerSelector).getElementsByClassName("answer")[0];
        ansElemnt.style.display='block';
        ansElemnt.classList.remove('answer-selected');
        ansElemnt.classList.remove('answer-disappear');
        ansElemnt.innerHTML = ringhtAnswer;
        ansElemnt.style.backgroundColor='rgb(227 193 146)';
    }
}

function answerSelected(){
    let quesId = Number(this.getAttribute('data-quesId'));
    let ansId = Number(this.getAttribute('data-ansId'));

    let selector = '#question'+(quesId+1)+' .question';

    let question = document.querySelector(selector);
    if(answerQuestionArray[quesId].answers[ansId].isRight){
        rightCount++;
        this.style.backgroundColor = "green";
        question.style.backgroundColor = "green";
        this.innerHTML = this.innerHTML + answerQuestionArray[quesId].answers[ansId].expanded;
    }else{
        this.style.backgroundColor = "red";
        question.style.backgroundColor = "red";
    }

    this.classList.add("answer-selected");
    setStyleToAllAnswer(quesId,'pointerEvents','none');

    setTimeout(()=>{
        let answerSelector = 'question'+(Number(quesId)+1);
        let ansList = document.getElementById(answerSelector).getElementsByClassName("answer");
        for (let ans of ansList){
            ans.classList.add("answer-disappear");
            setTimeout(()=>{
            setStyleToAllAnswer(quesId,'display','none');
            if(quesId==answerQuestionArray.length-1){
                isEnd=true;
                document.getElementsByClassName("result")[0].innerHTML=''+rightCount+'/'+answerQuestionArray.length;
                document.getElementsByClassName("end-text")[0].style.display='block';
            }else{
            viewNextQues(quesId+1)}
        },1000,this,quesId,ansId)
        }
    },1000,quesId,this,ansId)
}

function setStyleToAllAnswer(quesId,style,value){
    let answerSelector = '#question'+(Number(quesId)+1);
    document.querySelector(answerSelector).querySelectorAll(".answer").forEach((currentValue,currentIndex)=>{
        currentValue.style[style] =value;
    })
}

function viewNextQues(quesId){
    let quesSelector = "#question"+(Number(quesId)+1)
    document.querySelector(quesSelector).querySelector(".question").style.display='block';
    setStyleToAllAnswer(quesId,'display','block');
}

viewNextQues(0);


