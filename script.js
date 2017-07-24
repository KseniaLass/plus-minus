const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
const reload = document.getElementById('reload');

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

const line = ['012', '345', '678', '036', '147', '258', '048', '246'];

const user1 = {
    'name': 'User1',
    'figure': 'cross',
    'player': 'user'
};
const user2 = {
    'name': 'User2',
    'figure': 'nought',
    'player': 'bot'
};

let player = user1;

let blockMap = false;

// Create PlayGround

createCells();
ctx.strokeRect(0,0,300,300);

// Draw's function

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
function createFigure(index) {
    let currentX = cell[index][0],
        currentY = cell[index][1];

    if(cell[index][2] === 'block') {
        return false
    } else {
        if(player.figure == 'cross') {
            createCross(currentX, currentY);
            map[index] = 'cross';

        } else {
            createNought(currentX, currentY);
            map[index] = 'nought';
        }
        checkLine();
        cell[index].push('block');
    }
}

// Helpers

function detectCoord(x, y) {
    for(let i = 0; i < cell.length; i++) {
        let cellX = cell[i][0],
            cellY = cell[i][1];
        if(x >= cellX && x <= cellX + 100 && y >= cellY && y <= cellY + 100) {
            return i;
        }
    }
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function changeUser() {
    player = player == user1 ? user2 : user1;
    if(player['player'] == 'bot') {
        //makeBotStrokeRandom();
        makeBotStrokeIntel();
    }
}

function getRandomInArray() {
    return Math.floor(Math.random() * cell.length);
}

// Bot Stroke

function makeBotStrokeRandom() {
    let random = getRandomInArray();
    while(map[random] != undefined) {
        random = getRandomInArray();
    }
    blockMap = true;
    setTimeout(function(){
        createFigure(random);
        blockMap = false;
    }, 500);
}

function makeBotStrokeIntel() {
    var botChanceToWinner = checkHalfLine(user2.figure),
        userChanceToWinner = checkHalfLine(user1.figure);

    if(botChanceToWinner && map[botChanceToWinner] == undefined) {
        createFigure(botChanceToWinner);
    } else if (userChanceToWinner && map[userChanceToWinner] == undefined) {
        createFigure(userChanceToWinner);
    } else {
        if (map[4] == undefined) {
            createFigure(4);
        } else if (map[0] == undefined) {
            createFigure(0);
        } else if (map[2] == undefined) {
            createFigure(2);
        } else if (map[6] == undefined) {
            createFigure(6);
        } else if (map[8] == undefined) {
            createFigure(8);
        } else {
            makeBotStrokeRandom();
        }
    }

}


// Check winner

function checkHalfLine(figure) {
    for(let i =0; i < line.length; i++) {
        let first = line[i].substr(0, 1),
            second = line[i].substr(1, 1),
            thrid = line[i].substr(2, 1);
        if(map[first] == figure && map[second] == figure) {
            return thrid;
        } else if (map[second] == figure && map[thrid] == figure) {
            return first;
        } else if (map[first] == figure && map[thrid] == figure) {
            return second;
        }
    }
}

function checkLine() {
    let figure = player.figure;
    let countOfFigure = map.filter(function(value) { return value !== undefined }).length;
    console.log(countOfFigure);
    if (map[0] == figure && map[1] ==  figure && map[2] ==  figure
        || map[3] == figure && map[4] ==  figure && map[5] ==  figure
        || map[6] == figure && map[7] ==  figure && map[8] ==  figure
        || map[0] == figure && map[3] ==  figure && map[6] ==  figure
        || map[1] == figure && map[4] ==  figure && map[7] ==  figure
        || map[2] == figure && map[5] ==  figure && map[8] ==  figure
        || map[0] == figure && map[4] ==  figure && map[8] ==  figure
        || map[2] == figure && map[4] ==  figure && map[6] ==  figure) {
        blockMap = true;
        GameOver();
    } else if (countOfFigure === 9) {
        GameOver('draw');
    } else {
        changeUser();
    }
}

// Game Over

function GameOver(draw) {
    var result =  document.getElementById('result');
    if(draw) {
        result.innerHTML = 'DRAW!';
    } else {
        result.innerHTML = player.name + ' on ' + player.figure + ' is winner!!';
    }
    reload.style('display', 'block');
}

// Events

reload.addEventListener('mouseup', function(){
   location.reload()
});

canvas.addEventListener('mouseup', function(evt) {
    if(blockMap) {
        return false;
    }
    let mousePos = getMousePos(canvas, evt);

    let promise = new Promise(function(resolve, reject){
        resolve(detectCoord( mousePos.x,  mousePos.y));
    });
    promise
        .then(result => {createFigure(result)});

}, false);

