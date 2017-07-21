const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

// Params
let cell = [
    [0, 0],
    [100,0],
    [200, 0],
    [0, 100],
    [100, 100],
    [200, 100],
    [0, 200],
    [100, 200],
    [200, 200]
];
let map = [];

let user1 = {
    'name': 'User1',
    'figure': 'cross'
};
let user2 = {
    'name': 'User2',
    'figure': 'nought'
};

let player = user1;

createCells();
ctx.strokeRect(0,0,300,300);

function detectCoord(x, y) {
    for(let i = 0; i < cell.length; i++) {
        let cellX = cell[i][0],
            cellY = cell[i][1];
        if(x >= cellX && x <= cellX + 100 && y >= cellY && y <= cellY + 100) {
            return i;
        }
    }
}

function createCells() {
    for(let i=0; i < cell.length; i++) {
        let currentCell = cell[i];
        ctx.strokeRect(currentCell[0], currentCell[1], 100, 100);
    }
}

function createCross(x, y) {
    let position = {
        x: x + 10,
        y: y + 10
    };
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(position.x + 80, position.y + 80);
    ctx.moveTo(position.x + 80, position.y);
    ctx.lineTo(position.x, position.y + 80);
    ctx.stroke();
}

function createNought(x, y) {
    let position = {
        x: x + 50,
        y: y + 50
    };
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgb(0, 0, 255)";
    ctx.arc(position.x, position.y, 40, 0, Math.PI*2);
    ctx.stroke();
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function createFigure(index) {

    let currentX = cell[index][0],
        currentY = cell[index][1];

    if(player.figure == 'cross') {
        createCross(currentX, currentY);
        map[index] = 'cross';

    } else {
        createNought(currentX, currentY);
        map[index] = 'nought';
    }
    checkLine();
}
function changeUser(currentUser) {
    player = player == user1 ? user2 : user1;
}
function checkLine() {
    let figure = player.figure;
    if (map[0] == figure && map[1] ==  figure && map[2] ==  figure) {
        console.log(`${player.name} on ${figure} is winner`);
    } else if (map[3] == figure && map[4] ==  figure && map[5] ==  figure) {
        console.log(`${player.name} on ${figure} is winner`);
    } else if (map[6] == figure && map[7] ==  figure && map[8] ==  figure) {
        console.log(`${player.name} on ${figure} is winner`);
    } else if (map[0] == figure && map[3] ==  figure && map[6] ==  figure) {
        console.log(`${player.name} on ${figure} is winner`);
    } else if (map[1] == figure && map[4] ==  figure && map[7] ==  figure) {
        console.log(`${player.name} on ${figure} is winner`);
    } else if (map[2] == figure && map[5] ==  figure && map[8] ==  figure) {
        console.log(`${player.name} on ${figure} is winner`);
    } else if (map[0] == figure && map[4] ==  figure && map[8] ==  figure) {
        console.log(`${player.name} on ${figure} is winner`);
    } else if (map[2] == figure && map[4] ==  figure && map[6] ==  figure) {
        console.log(`${player.name} on ${figure} is winner`);
    } else {
        changeUser();
    }
}

canvas.addEventListener('mouseup', function(evt) {
    let mousePos = getMousePos(canvas, evt);

    let promise = new Promise(function(resolve, reject){
        resolve(detectCoord( mousePos.x,  mousePos.y));
    });
    promise
        .then(result => {createFigure(result)});


}, false);



