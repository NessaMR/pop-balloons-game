var timerId = null

function startGame(){
    let url = window.location.search
    let gameLevel = url.replace("?", "")
    let time = 0

    if(gameLevel == 1){
        time = 120
    }
    if(gameLevel == 2){
        time = 60
    }
    if(gameLevel == 3){
        time = 30
    }
    if(gameLevel == 4){
        time = 20
    }
    if(gameLevel == 5){
        time = 10
    }

    document.getElementById('timer').innerHTML = time

    let balloons = 30
    createBalloons(balloons)

    document.getElementById('completedBalloon').innerHTML = balloons
    document.getElementById('popBalloon').innerHTML = 0

    timer(time + 1)
}

function timer(time){

    time = time - 1;

    if(time == -1){
        clearTimeout(timerId)
        gameOver()
        return false
    }

    document.getElementById('timer').innerHTML = time
    setTimeout("timer("+time+")", 1000)
}

function gameOver(){
    alert('Fim de Jogo! Você não conseguiu estourar todos os balões a tempo!')
    window.location.href = "index.html"
}

function createBalloons(balloons){
    for (let i = 1; i <= balloons; i++){
        let balloon = document.createElement('img')
        balloon.src = 'images/balao_azul_pequeno.png'
        balloon.id = 'ballon' + i
        balloon.onclick = function(){ pop(this) }

        document.getElementById('cenario').appendChild(balloon)
    }
}

function pop(e){
    let balloonId = e.id
    document.getElementById(balloonId).src = 'images/balao_azul_pequeno_estourado.png'

    score(-1)
}

function score(action){
    let completedBalloons = document.getElementById('completedBalloon').innerHTML
    let popBalloons = document.getElementById('popBalloon').innerHTML

    completedBalloons = parseInt(completedBalloons)
    popBalloons = parseInt(popBalloons)

    completedBalloons = completedBalloons + action
    popBalloons = popBalloons - action

    document.getElementById('completedBalloon').innerHTML = completedBalloons
    document.getElementById('popBalloon').innerHTML = popBalloons

    situation(completedBalloons, popBalloons)
}

function situation(completedBalloons){
    if(completedBalloons == 0){
        alert("Parabéns, você conseguiu estourar todos os balões a tempo.")
        stop()
    }
}

function stop(){
    clearTimeout(timerId)
    window.location.href = "index.html"
}
