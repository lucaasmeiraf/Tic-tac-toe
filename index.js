const gameBoard = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnplayer = ''

function updateTitle(){
    const playerInput = document.getElementById(turnplayer)
    document.querySelector('#turnPlayer').innerText = playerInput.value
}

function initialize(){
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnplayer = 'player1'
    document.querySelector('h2').innerHTML = 'Your turn: <span id="turnPlayer"></span>'
    updateTitle()
    gameBoard.forEach((element) =>{
        element.classList.remove('win')
        element.innerText = ''
        element.addEventListener('click', handleBoardClick)
    })
}

function handleBoardClick(ev){
    const span = ev.currentTarget
    const region = span.dataset.region
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if(turnplayer === 'player1'){
        span.innerText = 'X'
        vBoard[row][column] = 'X'
    }else{
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }

    console.clear()
    console.table(vBoard)
    disableRegion(span)
}

function disableRegion(element){
    element.style.cursor = 'default'
    element.removeEventListener('click', handleBoardClick)
}

document.querySelector('#start').addEventListener('click', initialize)