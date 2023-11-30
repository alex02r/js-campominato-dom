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
    //creiamo  l'elemento griglia
    const content = document.createElement('div');
    content.classList.add('content-grid'); 

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

    console.log(bombe);

    let gameOver = false;
    let score = 0;
    let scoreMax = cellLength - num_bomb;

    for (let i = 0; i < cellLength; i++) {
        //creiamo la cella
        let cell = createCell();
        //la aggiungiamo a element
        let numCell = i+1;
        cell.innerText = numCell;

        cell.addEventListener('click', function(){
            if(score < scoreMax){
                if (!gameOver) {
                    if (!bombe.includes(i)) {
                        this.classList.add('clicked');
                        console.log('safe');
                        score++;
                    }else{
                        this.classList.add('bomb');
                        gameOver = true;
                        console.log('BOOM!!');
                    }
                }else{
                    console.log('Hai vinto!!');
                }
            }

        });

        content.appendChild(cell);
    }


    //caclolare la dimensione della width della griglia
    content.style.setProperty('width', `calc(100px * ${cell_row})`);
    //aggiungiamo la griglia creata al div grid
    container.appendChild(content);

}

const grid = document.getElementById('grid');
//chiamiamo la funzione per creare la griglia
const paly = document.getElementById('play');

paly.addEventListener('click', function(){
    //quando clicchiamo su play si deve creare la griglia
    
    generateGrid(grid);
});