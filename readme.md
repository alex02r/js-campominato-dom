Ciao ragazzi,
Esercizio di oggi: Campo Minato
nome repo: js-campominato-dom
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git). (Non dovete ricominciare l'esercizio da capo quindi, prendete quello che avete fatto ieri, copiatelo nella repo di oggi e partite da li a lavorare)
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione: **nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
SUPER-BONUS 1:
Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
SUPER-BONUS 1:
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.
Consigli del giorno: :party_wizard:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Ad esempio: Di cosa ho bisogno per generare i numeri? Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti. Le validazioni e i controlli possiamo farli anche in un secondo momento.


**SOLUZIONE**
1 - Creiamo la funzione che genera un numero casuale in base alle celle.
    1.1 - function generateUniqueRandomNumber(numCell, array_bomb)
        1.2 - dichiariamo una variabile numero.
        1.3 - inizializziamo una variabile check_number = false;
        1.4 - assegnamo a numero un numero casueale da 1 a numCell.
        1.5 - while (!flag) //fino a quando il numero non è presente
            1.5.1 - ? !array_bomb.includes(numero)
                        1.5.1.1 - check_number = true . il numero non è presente e possiamo passare il valore. 
        1.6 - return numero;             
2 - Creaiamo una funzione che crea un array di 16 numeri casuali che rappresentano le bombe.
    2.1 - funtion createArrayBomb(numOfBomb, num_cell) gli passiamo quante bombe deve contenere e il numero di celle
        2.2 - inizializiamo l'array bombs = [].
        2.3 - for (let i=0; i < numOfBomb; i++) ciclo for per la creazione delle bombe.
            2.3.1 - bombs.push(generateUniqueRandomNumber(num_cell, bombs)) aggiungiamo all'array il numero che genere e controlla la funzione
3 - Implementiamo il controllo al click (se è una bomba o no), (controlliamo anche se abbiamo raggiunto il punteggio massimo = numero di celle - 16 bombe).
        //SIAMO NELLA FUNZIONE generateGrid()
    3.1 - Inizializziamo la costante num_bomb a 16.
    3.2 - inizializziamo una costante bombe e ci richiamiamo la funzione createArrayBomb(num_bomb, cell_row).
    3.3 - Inizializiamo una variabile gameOver = false;
    3.4 - Inizializziamo una variabile punteggio;
    3.5 - Inizializziamo una variabile punteggioMax = cell_row - num_bomb;
    //siamo al click della casella
    3.6 - ? gameOver == false 
        3.6.1 - ? punteggio < punteggioMax
            3.6.1.1 - ? !bombs.includes(i)
                3.6.1.1 - coloriamo la cella 
            3.6.1.2 - : è una bomba 
        3.6.2 - : Hai vinto ;
4 - comunichiamo il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.