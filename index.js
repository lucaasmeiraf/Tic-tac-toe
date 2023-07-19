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
        element.classList.remove('lost')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick)
    })
}

function getWinRegions() {
    const winRegions = []
    if(vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2]) {
        winRegions.push('0.0', '0.1', '0.2')
    }
    if(vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2]) {
        winRegions.push('1.0', '1.1', '1.2')
    }
    if(vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2]) {
        winRegions.push('2.0', '2.1', '2.2')
    } 
    if(vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0]) {
        winRegions.push('0.0', '1.0', '2.0')
    }
    if(vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1]) {
        winRegions.push('0.1', '1.1', '2.1')
    }
    if(vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2]) {
        winRegions.push('0.2', '1.2', '2.2')
    } 
    if(vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2]) {
        winRegions.push('0.0', '1.1', '2.2')
    } 
    if(vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0]) {
        winRegions.push('0.2', '1.1', '2.0')
    }
    return winRegions
    
}

function handleWin(regions){
    regions.forEach((region) =>{
        //Para cada região dentro do retorno da função winregions, vamos add a class win
        document.querySelector('[data-region="'+ region +'"]').classList.add('win')
    })

    // Tentativa de desablitar os campos em branco quando um jogador ganhar.
    gameBoard.forEach((region) => {
        if(!region.value){
            disableRegion(region)
        }
    })

    // Tentativa de marcar as regiões que não formaram uma sequência de vitória
    gameBoard.forEach((region) =>{
        if(!region.classList.contains('win') && region.innerText !== ''){
            region.classList.add('lost')
        }
    })

    const playerName = document.getElementById(turnplayer).value
    document.querySelector('h2').innerHTML = playerName + ' venceu!'
    
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
    const winRegions = getWinRegions()
    if(winRegions.length > 0){
        handleWin(winRegions)
    }else if(vBoard.flat().includes('')){
        turnplayer = turnplayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    }else{
        document.querySelector('h2').innerHTML = 'Empate!'
    }
}

function disableRegion(element){
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', handleBoardClick)
}

document.querySelector('#start').addEventListener('click', initialize)