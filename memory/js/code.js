let numberCards = 16;
let cards = []
let count = 0;
let list = []
let picture = ["./img/baljeet.png", "./img/buford.png", "./img/doofenschmirtz.png", "./img/ferb.png", "./img/isabella.png", "./img/perry.png", "./img/phineas.png", "./img/Candice.png"]
let found = 0


let firstClick = 0
let countTime = 0
let timeractive = false
let playInterval

createDeck(numberCards)

function createDeck(numberCards) {
    let width = Math.sqrt(numberCards);

    let container = document.querySelector('#container');
    container.innerHTML = "";

    for (let index = 0; index < numberCards / 2; index++) {
        cards.push(index);
        cards.push(index);
    }

    cards = shuffle(cards);

    for (let i = 0; i < width; i++) {
        let divBox = document.createElement('div');
        divBox.className = "box";
        container.appendChild(divBox);

    }
    let rows = document.getElementsByClassName('box')    
    for (let i = 0; i < rows.length; i++) {
        for (let n = i * width; n < (i + 1) * width; n++) {
            let div = document.createElement('div');
            let img = document.createElement('img');
            div.type = cards[n];
            div.className = "mem";
            img.className = "hiddenImage";
            img.src = picture[cards[n]];
            div.appendChild(img);
            rows.item(i).appendChild(div);
        }
    }    
}

function shuffle(cards) {
    let ctr = cards.length;
    while(ctr > 0){
        let randNr = Math.floor(Math.random() * ctr);
        ctr--;
        let temp = cards[ctr];
        cards[ctr] = cards[randNr];
        cards[randNr] = temp;
    }
    return cards;
}


const divs = document.querySelectorAll('.mem')
divs.forEach(div => {
    div.addEventListener('click', () => {
        count++;
        firstClick = 1
        if (firstClick == 1){
            document.querySelector('#countdown').innerHTML = 'Time: ' + countTime + 's'
            if(!timeractive){
                timeractive = true
                playInterval = setInterval(function myCallback(){
                    countTime++
                    document.querySelector('#countdown').innerHTML = 'Time: ' + countTime + 's'
                }, 1000)
            }
        }
        if (count < 3){     
        div.classList.toggle('flipped')
        div.querySelector('.hiddenImage').style.visibility = "visible"
        if (count == 1){
            list.push(div)
        }
        else if (count == 2){
            list.push(div)
            compareCards(list)
            count = 0
            list = []
        }
    }     
    })    
})

function compareCards(list){
    if (list[0].type == list[1].type){
        found ++
        if (numberCards == 16){
            if (found == 8){            
                clearInterval(playInterval)
                timeractive = false
                firstClick = 0
                setTimeout(() => {
                    document.querySelectorAll('.mem').forEach(div => {
                        div.classList.toggle("flipped")
                        div.querySelector('.hiddenImage').style.visibility = "hidden"
                        countTime = 0
                        document.querySelector('#countdown').innerHTML = 'Time: ' + countTime + 's'
                    })
                }, 2000)
                found = 0
                
            }
        }
    }

    else{
        setTimeout(() => {
            list[0].classList.toggle("flipped")
            list[1].classList.toggle("flipped")
            list[0].querySelector('.hiddenImage').style.visibility = "hidden"
            list[1].querySelector('.hiddenImage').style.visibility = "hidden"
        }, 600)     
    }
}