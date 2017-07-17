var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");

// Params
var field = [300, 300];
var cellSize = field[0]/3;
var cell = [
    [0, 0, 100, 100],
    [100,0,100,100],
    [200, 0, 100, 100],
    [0, 100, 100, 100],
    [100, 100, 100, 100],
    [200, 100, 100, 100],
    [0, 200, 100, 100],
    [100, 200, 100, 100],
    [200, 200, 100, 100]
];

createCells();

ctx.strokeRect(0,0,300,300);


// Support
function createCells() {
    for(var i=0; i < cell.length; i++) {
        var currentCell = cell[i];

        ctx.strokeRect(currentCell[0], currentCell[1], currentCell[2], currentCell[3]);
    }
}

canvas.onmousemove = function(e) {
    var rect = this.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top,
        i = 0, r;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0; i < cell.length; i++) {

        ctx.beginPath();
        ctx.rect(i.x, i.y, i.w, i.h);
        ctx.fillStyle = ctx.isPointInPath(x, y) ? "blue":"yellow";
        ctx.fill();
    }
};