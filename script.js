let cells = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let winner = "";
let scoreO = scoreX = 0

function restart() {
    // Write your code here to restart the game
    cells = ["", "", "", "", "", "", "", "", ""];
    clear();
    render();
    document.getElementById("result").style.display = "none";
}

function cellClick(id) {
    if (cells[id] !== "") return;  // If this cell was clicked/played then ignore it
    cells[id] = turn;
    render();
    turn = (turn === "X" ? "O" : "X");
    winner = evaluate();
    if (winner === "draw") {
        const resElement = document.getElementById("result");
        resElement.innerHTML = "Draw :-( <br/> <button onclick='restart()'>Restart!</button>";
        resElement.style.display = "flex";
    } else if (winner) {
        const resElement = document.getElementById("result");
        resElement.innerHTML = "Winner is " + winner + "<br/> <button onclick='restart()'>Restart!</button>";
        resElement.style.display = "flex";

        if (winner === "X") scoreX++;
        if (winner === "O") scoreO++;
    }
    
    updateInfo();
}

function updateInfo() {
    document.getElementById("scorex").innerText = `X: ${scoreX}`;
    document.getElementById("scoreo").innerText = `O: ${scoreO}`;
    document.getElementById("currentTurn").innerText = `${turn} Turn`;
}

function render() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] !== "") {  // If this cell was clicked (played)
            const element = document.getElementById("c" + i);
            element.innerText = cells[i];
            element.classList.add(cells[i]);
        }
    }
}

function clear() {
    for (let i = 0; i < cells.length; i++) {
        const element = document.getElementById("c" + i);
        element.innerText = "";
        element.classList.remove("X");
        element.classList.remove("O");
    }
}

function evaluate() {
    // Winner in rows
    if (cells[0] !== "" && cells[0] === cells[1] && cells[1] === cells[2]) {
        return cells[0];
    }
    if (cells[3] !== "" && cells[3] === cells[4] && cells[4] === cells[5]) {
        return cells[3];
    }
    if (cells[6] !== "" && cells[6] === cells[7] && cells[7] === cells[8]) {
        return cells[6];
    }

    // winner in columns
    if (cells[0] !== "" && cells[0] === cells[3] && cells[3] === cells[6]) {
        return cells[0];
    }
    if (cells[1] !== "" && cells[1] === cells[4] && cells[4] === cells[7]) {
        return cells[1];
    }
    if (cells[2] !== "" && cells[2] === cells[5] && cells[5] === cells[8]) {
        return cells[2];
    }

    // winner in diagnoal
    if (cells[0] !== "" && cells[0] === cells[4] && cells[4] === cells[8]) {
        return cells[0];
    }
    if (cells[2] !== "" && cells[2] === cells[4] && cells[4] === cells[6]) {
        return cells[2];
    }

    // if there is an empty cell, then return no winner yet
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] === "") return undefined;
    }

    return "draw";
}