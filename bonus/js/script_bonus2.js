/**
 * ! Consegna
 * Il computer deve generare 16 numeri casuali tra 1 e 100, queste saranno le nostre bombe. //* OK
 * I numeri delle bombe non possono essere duplicati (i 16 numeri devono essere tutti diversi) //*OK
 * Il giocatore, deve cercare di non prendere le bombe. Gli chiederemo 100 - 16 volte di scegliere un numero, uno alla volta, sempre compreso tra 1 e 100. //*OK
 * L'utente non può inserire 2 volte lo stesso numero //*OK
 * Ogni  volta che l'utente sceglie un numero che non è presente tra le bombe, guadagna un punto e poi gli chiediamo un altro numero. //*OK
 * Se il numero scelto dall'utente è presente tra i numeri bomba, la partita termina. //*OK
 * Quando la partita termina, comunichiamo all'utente il suo punteggio. //*OK
 * ?! parte bonus in cartella BONUS  //**OK
 *  !BONUS 1#: (da fare solo se funziona tutto il resto) //* OK
 * All’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
 * con difficoltà 0 => tra 1 e 100
 * con difficoltà 1 => tra 1 e 80
 * con difficoltà 2 => tra 1 e 50
 * TODO: Bonus #2: Stampa in pagina in file separato ma solo dopo che l'esercizio base sia corretto //* OK
 * TODO: Bonus #3: Validazioni e i controlli in un secondo momento input pagina  //*OK
 */


// ? 1: dichiarazione variabili 
// array da riempire 
let mines = [0];
let choices = [0];

//in un futuro posso gestire maxMines --> cambiando anche scope della variabile
const maxMines = 16;
const maxChoice = 100 - maxMines; //// TODO cambiare 20 in 100 
// difficoltà 0 inpostata default 
const min = 1;
let max = 50;

let point = 0; //punteggio user

//? Inizializzo element html tag
const level = document.getElementById("level");
const btnPlay = document.getElementById("btn-play");
const btnReset = document.getElementById("btn-reset");
const result = document.getElementById("result");
const mineList = document.getElementById("mine-list");
const userList = document.getElementById("user-list");
const responseSectionElement = document.getElementById("response-section");


//? Envent onclick buttno Gioca!
btnPlay.addEventListener("click", function () {

    console.log("------------ CAMPO MINATO ----------");
    max.value = getLevel(level.value);

    fillArrayRandom(mines, maxMines);
    var strMine = stampArrayString(mines, maxMines);
    console.log("********* Queste sono le mine: *********");
    console.table(mines);
    getUserChioice(choices, maxChoice, mines);
    var strUser = stampArrayString(choices, maxChoice);
    console.log("****** Riepilogo delle tue scelte: ******");
    console.table(choices);

    console.log("******* IL TUO PUNTEGGIO E': ******");
    console.log("       ******** " + point + " pt. ********  ");
    result.innerText = "Hai totalizzato : " + point + " pt.";
    //? write on html 
    mineList.innerHTML = strMine;
    userList.innerHTML = strUser;

    responseSectionElement.classList.remove("d-none");
    btnPlay.classList.add("disabled");
});

btnReset.addEventListener("click", function () {
    mines = [0];
    choices = [0];
    level.value = "0";
    responseSectionElement.classList.add("d-none");
    btnPlay.classList.remove("disabled");
});

/**
 *  setta il livello della partita
 */
function getLevel(user) {
    if (user < 0 || user > 2 || !user || user == " " || isNaN(user)) {
        alert("hai inserito un valore non valido.")
    }
    switch (user) {
        case 0:
            return max = 100;
        case 1:
            return max = 80;
        case 2:
            return max = 50;
    }
}
//funzione di riempiemnto scelte utente con maxChioce elementi da riempire + controllo duplicati
/**
 * 
 * @param {number} arr  array scelte utente
 * @param {*} maxElement  massimo numero elementi
 */
function getUserChioice(arr, maxElement, arr2) {

    let user = 0;
    let i = 0;
    while (i < maxElement) {
        user = parseInt(prompt("inserisci un numero: (" + (i + 1) + " /" + maxElement + " ):", "2").trim());
        //// validazione input utente
        if (arr.includes(user)) {
            alert("hai inserito un numero già presente ritenta.");
        } else if (user < min || user > max || isNaN(user) || user === " ") {    // controllo la input sia compreso tra 1 e 100 
            alert("hai inserito un numero non valido.");
        } else if (!hasBomb(user, arr2)) {
            point++;
            arr[i] = user;
            i++;
            console.log("hai guadagnato :" + point + " pt.\n Bravo...Continua così!!");
        } else {
            console.log("Mi dispiace !\n... ma hai trovato una mina al numero: " + user + "\n Hai totalizzato:" + point + " pt.");
            //comunque lo inserico perché voglio vedere il risultato nella lista di elementi anche se blocco l'esecuzione
            arr[i] = user;
            return;
        }
    }
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
    let current = 0;
    for (let i = 0; i < maxElement; i++) {
        current = getRandomNumber(max, min);
        //? controlla che il valore non sia già presente in arr in caso contrario estrae un altro numero casuale
        if (arr.includes(current)) {
            current = getRandomNumber(max, min);
        }
        arr[i] = current;
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

/** ritorna una stringa con i valori dell'array
 * 
 * @param {array: namber} arr 
 * @param {number} len  lunghezza arr
 * @returns 
 */
function stampArrayString(arr, len) {
    let msg = "";
    for (let i = 0; i < len; i++) {
        if (isNaN(arr[i])) return msg += " ";
        msg += "<li> " + arr[i] + " </li>\n";
    }
    return msg;
}