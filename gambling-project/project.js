const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
};
const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
};

let balance = 100;

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; ++i) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < 3; ++i) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        reels.push(symbols[randomIndex]);
    }

    return reels;
};

const updateUI = (reels) => {
    document.getElementById("reel1").textContent = reels[0];
    document.getElementById("reel2").textContent = reels[1];
    document.getElementById("reel3").textContent = reels[2];
};

const getWinnings = (reels, bet) => {
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
        return bet * SYMBOLS_VALUES[reels[0]];
    }
    return 0;
};

document.getElementById("spin-button").addEventListener("click", () => {
    const bet = 10;
    if (balance >= bet) {
        balance -= bet;
        const reels = spin();
        updateUI(reels);
        const winnings = getWinnings(reels, bet);
        balance += winnings;
        document.getElementById("balance").textContent = `Balance: $${balance}`;
        document.getElementById("result").textContent = winnings > 0 ? `You won $${winnings}!` : "You lost!";
    } else {
        document.getElementById("result").textContent = "Not enough balance!";
    }
});
