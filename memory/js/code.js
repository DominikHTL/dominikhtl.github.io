let openCards = [];
let numberCards = 16;
let count = 0;

createDeck(numberCards)

function createDeck(numberCards) {
    let width = Math.sqrt(numberCards);

    let container = document.querySelector('#container');
    container.innerHTML = "";

    let cards = []
    for (let index = 0; index < numberCards / 2; index++) {
        cards.push(index + 1);
        cards.push(index + 1);       
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
            div.innerHTML = cards[n];
            div.type = cards[n];
            div.className = "mem";
            rows.item(i).appendChild(div);
            div.addEventListener('click', flipp(div))
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


function flipp(div) {
    count++;
    console.log(count)
    if (count < 3){        
        console.log("Count:" + count)
        div.style.background = "green";
        if (count == 2){
            console.log("count is 2")
        }
    }               
}