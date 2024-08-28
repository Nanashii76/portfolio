// 1. Despot some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the winner their present
// 7. play again

const prompt = require("prompt-sync")();

// global variables
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
}
const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
}


const deposit = () => {
    let depositAmount = prompt("Enter a deposit amount: ");
    let numberDeposit = parseFloat(depositAmount);

    while(numberDeposit <= 0 || isNaN(numberDeposit)) {
        depositAmount =  prompt("Enter a valid deposit amount: ");
        numberDeposit = parseFloat(depositAmount);
    }

    return numberDeposit;
}

const getNumberLines = () => {
    let numberLines = prompt("Enter a number of lines to bet on(1-3): ");
    let finalLines = parseInt(numberLines);

    while(finalLines <= 0 || isNaN(finalLines) || finalLines > 3) {
        numberLines = prompt("Enter a valid number of lines: ");
        finalLines = parseInt(numberLines)
    }

    return finalLines;
}

const getBet = (balance, lines) => {

    let bet = prompt("Enter the total bet per line: ");
    let totalBet = parseFloat(bet);

    while(totalBet > (balance / lines) || isNaN(totalBet) || totalBet <= 0) {
        bet = prompt("Enter a valid bet: ");
        totalBet = parseFloat(bet);
    }

    return totalBet;
}

const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
       for(let i = 0; i < count; ++i) {
        symbols.push(symbol);
       }
    }

    const reels = [];
    for(let i = 0; i < COLS; ++i) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; ++j) {
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i < ROWS; ++i) {
        rows.push([]);
        for(let j = 0; j < COLS; ++j) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows = (rows) => {

    for(const row of rows) {
        let rowString = "";
        for(const [i, symbol] of row.entries()) {
            rowString += symbol;
            if(i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }

}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row = 0; row < lines; ++row) {
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols) {
            if(symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if(allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
}

const game = () => {

    let balance = deposit();

    while(true) {

        console.log("Your balance: $ " + (balance));

        const numberLines = getNumberLines();
        const bet = getBet(balance, numberLines);

        balance -= bet * numberLines;

        const reels = spin();
        const rows = transpose(reels);

        printRows(rows);
        const winnings = getWinnings(rows, bet, numberLines);
        balance += winnings;
        console.log("You won, $ " + winnings.toString());

        if(balance <= 0) {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Want to play again? (y/n)");
        if(playAgain != 'y') break;

    }

}

game();


