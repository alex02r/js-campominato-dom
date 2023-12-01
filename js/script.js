//funzione che crea un numero unico da 1 al numero delle celle della griglia
function generateUniqueRandomNumber(numOfCell, array_bomb) {
    let num = 0;
    check_number = false;
    while (!check_number) {
        num = Math.floor(Math.random()* numOfCell + 1);
        if (!array_bomb.includes(num)) {
            check_number = true;
        }
    }
    return num;
}

//funzione che crea un array di bombe
function createArrayBomb(numOfBomb, num_cell) {
    let bombs = [];

    for (let i = 0; i < numOfBomb; i++) {
        bombs.push(generateUniqueRandomNumber(num_cell, bombs));
    }

    return bombs;
}


//funzione per creare la cella 
function createCell() {
    //aggiungiamo uun div con classe "cell" nell'html
    const elemento = document.createElement('div');
    elemento.classList.add('cell');

    return elemento;
}

//funzione che crea la griglia
function generateGrid(container) {
    container.innerHTML="";
    container.classList.add('grid');

    //creaiamo il div del punteggio
    const top_container = document.createElement('div');
    top_container.classList.add('content');
    top_container.classList.add('d-flex');
    top_container.classList.add('justify-content-between');

    const text_score = document.createElement('p');
    text_score.classList.add('text-content');
    text_score.innerText = "Score: 0"
    top_container.appendChild(text_score);

    //CREAIAMO PULSANTE DI CONFERMA
    const validate = document.createElement('button');
    validate.classList.add('cell');
    validate.innerText = "Fine";
    top_container.appendChild(validate);

    //creiamo  l'elemento griglia
    const content = document.createElement('div');
    content.classList.add('content'); 
    content.classList.add('d-flex'); 
    content.classList.add('flex-wrap'); 

    
    //controlliamo il livello di difficoltà
    const select = document.getElementById('difficulty');
    let difficulty = select.value;
    let cell_row = 0;

    switch (difficulty) {
        case "1":
            //difficoltà facile
            //10 caselle per 10 righe
            cell_row = 10;
            break;
        case "2":
            //difficoltà normale
            //9 caselle per 9 righe
            cell_row = 9;
            break;
        case "3":
            //difficoltà facile
            //7 caselle per 7 righe
            cell_row = 7;
            break;
        default:
            //di defoult è facile
            cell_row = 10;
    }

    //calcoliamo che la griglia deve essere un quadrato di n * n
    let cellLength = cell_row * cell_row;

    //creaiamo l'array con le bombe
    const num_bomb = 16;
    const bombe = createArrayBomb(num_bomb, cellLength);

    console.log(bombe.sort());

    let gameOver = false;
    let score = 0;
    let scoreMax = cellLength - num_bomb;

    for (let i = 0; i < cellLength; i++) {
        //creiamo la cella
        let cell = createCell();
        //la aggiungiamo a element
        let numCell = i+1;
        cell.innerText = numCell;

        let checked = false;
        cell.addEventListener('click', function(){
            if(score < scoreMax){
                if (!gameOver) {
                    if (!bombe.includes(numCell)) {
                        this.classList.add('clicked');
                        
                        if (!checked) {
                            console.log('safe');
                            score++;
                            text_score.innerText = `Score: ${score}`;
                            checked = true;
                        }
                    }else{
                        //far apparire tutte le bombe
                        const cell = document.querySelectorAll('.cell');

                        for (let i = 0; i < cell.length; i++) {
                            if (bombe.includes(parseInt(cell[i].innerText))) {
                                cell[i].classList.add('bomb');
                            }
                        }
                        this.classList.add('bomb');
                        gameOver = true;
                        text_score.innerText += " BOOM!! hai perso. Riprova";
                        console.log('BOOM!!');
                    }
                }
            }
        });
        content.appendChild(cell);
    }
    
    validate.addEventListener('click', function () {
        if (score == scoreMax) {
            text_score.innerText += "WIN!! Complimenti hai vinto";
            console.log('Hai vinto!!');
        }
    })


    //caclolare la dimensione della width della griglia
    content.style.setProperty('width', `calc(100px * ${cell_row} + 10px)`);
    //aggiungiamo la griglia creata al div grid
    container.appendChild(top_container);
    container.appendChild(content);

}

const grid = document.getElementById('grid');
//chiamiamo la funzione per creare la griglia
const paly = document.getElementById('play');

paly.addEventListener('click', function(){
    //quando clicchiamo su play si deve creare la griglia
    
    generateGrid(grid);
});