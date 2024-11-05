const SQUARES_WIDTH = 5;
const SQUARES_HEIGHT = 5;
const SQUARES_TOTAL = SQUARES_WIDTH * SQUARES_HEIGHT;
const NUM_CORRECT_SQUARES = 10;
const PREVIEW_TIME_MS = 3000;
const GAME_TIME_MS = 30000;
let CORRECT_SQUARES = [];

function init(){
    
    CORRECT_SQUARES = getRandNumberArray(NUM_CORRECT_SQUARES, 0, SQUARES_TOTAL - 1);
    //console.log(arr);
    let count = 0;
    document.querySelectorAll('.square').forEach(square => {
        square.id = 'square' + count;
        if(CORRECT_SQUARES.includes(count)){
            //console.log(count);
            square.classList.add('active');
        }
        count++;
    });

    
    
    //Starts preview Timer
    document.querySelector('.progress-bar').style.transition = 'width ' + PREVIEW_TIME_MS + 'ms linear';
    document.querySelector('.progress-bar').style.width = '100%';
    document.querySelector('.progress-bar').style.width = '0%';
    setTimeout(() => {
        hideActiveSquares();
        addClickListeners();
        displayErrorBars();
        startGameClock();
    }, PREVIEW_TIME_MS);
}

function displayErrorBars(){
    for(let i = 0; i < 3; i++){
        const div = document.createElement('div');
        div.classList.add('incorrect-bar');
        div.id = 'error-bar' + i;
        document.querySelector('.incorrect-container').appendChild(div);
    }
}

function addClickListeners(){
    document.querySelectorAll('.square').forEach(square => {    
        square.addEventListener('click', square_click);
    });
    
}

function hideActiveSquares() {
    document.querySelectorAll('.active').forEach(square => {
        square.classList.add('active-hidden');
        square.classList.remove('active');
    });
}

function startGameClock() {
    document.querySelector('.progress-bar').style.transition = 'width ' + GAME_TIME_MS + 'ms linear';
    document.querySelector('.progress-bar').style.width = '100%';
    setTimeout(() => {
        
    }, GAME_TIME_MS);
}

function lightUpErrorBar(){
    let errorBars = document.querySelectorAll('.incorrect-bar');
    
    if(errorBars[0].style.backgroundColor != 'red'){
        errorBars[0].style.backgroundColor = 'red';
        return;
    }

    if(errorBars[1].style.backgroundColor != 'red'){
        errorBars[1].style.backgroundColor = 'red';
        return;
    }

    if(errorBars[2].style.backgroundColor != 'red'){
        errorBars[2].style.backgroundColor = 'red';
        return;
    }
}

function check_squares(){
    let correct = 0;
    let incorrect = 0;
    for(let i = 0; i < SQUARES_TOTAL; i++){
        let square = document.getElementById('square' + i);
        if(square.classList.contains('active')){
            correct++;
        }

        if(correct == NUM_CORRECT_SQUARES){
            endGame("Hack Successful!");
            return;
        }

        if(square.classList.contains('incorrect')){
            incorrect++;
        }

        if (incorrect >= 3){
            endGame("Hack Failed!");
            return;
        }
    }
    
}

function getRandNumberArray(length, min = 0, max = 10){
    let arr = [];
    for(let i = 0; i < length; i++){
        let rand = Math.floor(Math.random() * (max - min + 1) + min)
        if (arr.includes(rand)){
            i--;
            continue;
        }
        arr.push(rand);
    }
    return arr;
}

function endGame(message){
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = message;
    document.body.appendChild(popup);   
    setTimeout(() => {
        popup.remove();
        document.querySelector('.incorrect-container').innerHTML = '';
        document.querySelector('.progress-bar').style.transition = '';
        document.querySelector('.progress-bar').style.width = '0%';
    
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('active-hidden');
            square.classList.remove('active');
            square.classList.remove('incorrect');
            square.removeEventListener('click', square_click);
        });

        displayClickToPlay();
    }, 3000);
    
    
    //init();
}

function displayClickToPlay(){
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = "Click to Play";
    document.body.appendChild(popup);
    popup.addEventListener('click', () => {
        popup.remove();
        init();
    });
}

function square_click(){
    if(this.classList.contains('active-hidden')){
        this.classList.remove('active-hidden');
        this.classList.add('active');
        
    }else{
        this.classList.add('incorrect');
        lightUpErrorBar();
    }
    this.removeEventListener('click', this);
    check_squares();
}