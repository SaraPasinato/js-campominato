/**
 * ! Consegna
 * Il computer deve generare 16 numeri casuali tra 1 e 100, queste saranno le nostre bombe. //* OK
 * I numeri delle bombe non possono essere duplicati (i 16 numeri devono essere tutti diversi)
 * Il giocatore, deve cercare di non prendere le bombe. Gli chiederemo 100 - 16 volte di scegliere un numero, uno alla volta, sempre compreso tra 1 e 100.
 * L'utente non può inserire 2 volte lo stesso numero
 * Ogni  volta che l'utente sceglie un numero che non è presente tra le bombe, guadagna un punto e poi gli chiediamo un altro numero.
 * Se il numero scelto dall'utente è presente tra i numeri bomba, la partita termina.
 * Quando la partita termina, comunichiamo all'utente il suo punteggio.
 * !BONUS 2#: (da fare solo se funziona tutto il resto)
 * All’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
 * con difficoltà 0 => tra 1 e 100
 * con difficoltà 1 => tra 1 e 80
 * con difficoltà 2 => tra 1 e 50
 * TODO: Bonus #1: Validazioni e i controlli in un secondo momento
 * TODO: Bonus #3: Stampa in pagina in file separato ma solo dopo che l'esercizio base sia corretto 
 */

// ? 1: dichiarazione variabili 

const mines =[0];

//in un futuro posso gestire maxMines --cambiando anche scope della variabile
const maxMines=16; 
let maxChoice= 100 - maxMines; 
const min=1;
const max=100; //// : function random 100 incluso

fillArrayRandom(mines,maxMines);
console.log("********* Queste sono le mine: *********");
console.table(mines);











//TODO:funzione di riempiemnto scelte utente con maxChioce elementi da riempire + controllo duplicati
//TODO:validazione input utente

//// funzione fillArrayRandom: deve riempire l'array passato di numeri casuali ,max elementi da riempire
/** riempe un array di numeri casuali 
 * 
 * @param {number} arr  di numeri casuali
 * @param {number} maxElement  elementi massimi in arr
 */
 function fillArrayRandom(arr,maxElement){
     let current=0;
    for(let i=0;i<maxElement;i++){
        current=getRandomNumber(max,min);
        //? controlla che il valore non sia già presente in arr in caso contrario estrae un altro numero casuale
        if (arr.includes(current)){
            current=getRandomNumber(max,min);
        }
        arr[i]=current;
    }
 }

/** ritorna un numero casuale estremi inclusi
 * 
 * @param {number} maxRange  massimo incluso
 * @param {number} minRange  minimo incluso
 * @returns  un numero casuale tra min e max
 */
function getRandomNumber(maxRange,minRange){
    maxRange++;
    return Math.floor(Math.random()*(maxRange - minRange))+minRange;
}