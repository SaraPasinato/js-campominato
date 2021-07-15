/**
 * ! Consegna
 * Il computer deve generare 16 numeri casuali tra 1 e 100, queste saranno le nostre bombe. //* OK
 * I numeri delle bombe non possono essere duplicati (i 16 numeri devono essere tutti diversi) //*OK
 * Il giocatore, deve cercare di non prendere le bombe. Gli chiederemo 100 - 16 volte di scegliere un numero, uno alla volta, sempre compreso tra 1 e 100. //*OK
 * L'utente non può inserire 2 volte lo stesso numero //*OK
 * Ogni  volta che l'utente sceglie un numero che non è presente tra le bombe, guadagna un punto e poi gli chiediamo un altro numero. //*OK
 * Se il numero scelto dall'utente è presente tra i numeri bomba, la partita termina. //*OK
 * Quando la partita termina, comunichiamo all'utente il suo punteggio. //*OK
 * ?! parti bonus >>> in cartella BONUS
 */

// ? 1: dichiarazione variabili 
// array da riempire 
const mines = [0];
const choices = [0];

//in un futuro posso gestire maxMines --> cambiando anche scope della variabile
const maxMines = 16;
const maxChoice = 100 - maxMines; //// cambiare 20 in 100 

const min = 1;
const max = 100; //// : function random 100 incluso
let point = 0;

fillArrayRandom(mines, maxMines);
console.log("********* Queste sono le mine: *********");
console.table(mines);
getUserChioice(choices, maxChoice, mines);

console.log("****** Riepilogo delle tue scelte: ******");
console.table(choices);

console.log("******* IL TUO PUNTEGGIO E': ******");
console.log("       ******** " + point + " pt. ********  ");


//funzione di riempiemnto scelte utente con maxChioce elementi da riempire + controllo duplicati
/**
 * 
 * @param {number} arr  array scelte utente
 * @param {number} arr2 array mine 
 * @param {*} maxElement  massimo numero elementi
 */
function getUserChioice(arr, maxElement, arr2) {
    let user;
    let i = 0;
    do {
        user = parseInt(prompt("inserisci un numero: (" + (i + 1) + " /" + maxElement + " ):","2"));
        //// validazione input utente
        if (user < min || user > max || isNaN(user) || user.trim() === " ") {    // controllo la input sia compreso tra 1 e 100 
            alert("hai inserito un numero non valido.");

        } else if (arr.includes(user)) {
            alert("hai inserito un numero già presente ritenta.");
        } else if (!hasBomb(user, arr2)) {
            point++;
            arr[i] = user;
            i++;
            console.log("hai guadagnato :" + point + " pt.\n ...Continua così!!");
        } else {
            arr[i] = user;
            console.log("Mi dispiace !\n... ma hai trovato una mina al numero: " + user + "\n Hai totalizzato:" + point + " pt.");
            console.log("*********** HAI VINTO *************");
            return;
        }
    }while(i < maxElement);

    console.log("*********** HAI VINTO *************");
}

/** test inclusione
 * 
 * @param {number} num  numero user  
 * @param {*} mines     array di mine
 * @returns  {boolean} ritorna se sia incluso o meno il numero nell'array mine
 */
function hasBomb(num, mines) {
    return (mines.includes(num) ? true : false);
}
//// funzione fillArrayRandom: deve riempire l'array passato di numeri casuali ,max elementi da riempire
/** riempe un array di numeri casuali 
 * 
 * @param {number} arr  di numeri casuali
 * @param {number} maxElement  elementi massimi in arr
 */
function fillArrayRandom(arr, maxElement) {
    let i = 0;
    let current = 0;
    while (i < maxElement) {
        current = getRandomNumber(max, min);
        //? controlla che il valore  sia già presente in arr 
        if (!arr.includes(current)) {
            arr[i] = current;
            i++;
        }
    }
}

/** ritorna un numero casuale estremi inclusi
 * 
 * @param {number} maxRange  massimo incluso
 * @param {number} minRange  minimo incluso
 * @returns  un numero casuale tra min e max
 */
function getRandomNumber(maxRange, minRange) {
    maxRange++;
    return Math.floor(Math.random() * (maxRange - minRange)) + minRange;
}