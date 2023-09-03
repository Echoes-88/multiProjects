// TO DO

// Possibilité de régler la difficulté "vitesse augmentée" setInterval(drawTest, hard: 5 // master of doom : 1);



const level1 = [
    {x:0, y:500},
    {x:100, y:500},
    {x:350, y:700},
    {x:700, y:350},
    {x:900, y:450},
    {x:1000, y:370}
 ]

let line1Pos = {x: 0, y: 450};
let line2Pos = {x: 0, y: 550};

let timer = 0;

const lvl1Points = [];

var start;
var stopIt;

let windowWith = 1000;
let windowHeight = 1000;


const yCalculation = (currentX) => {
    // Find a
    let a = (level1[stepLvl+1]?.y - level1[stepLvl]?.y) / (level1[stepLvl+1]?.x - level1[stepLvl]?.x)

    // Find b
    let b = level1[stepLvl]?.y - (a*level1[stepLvl]?.x)

    return (a*currentX)+b
}

/////////////////////////
// EVENTLISTENER KEYBOARD

let keyPressed = '';

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if(key === "ArrowUp") {keyPressed = 'ArrowUp'}
  if(key === "ArrowDown") {keyPressed = 'ArrowDown'}

  if(key === "ArrowRight") {
    start = setInterval(drawTest, 1);
    }

    // For debug
    if(key === "ArrowLeft") {
        stopIt = clearInterval(start)
      }
});

/////////////////////////
// PATTERN

stepLvl = 0

function drawPattern() {
    const canvas = document.querySelector('#canvas');
    canvas.width = windowWith;
    canvas.height = windowHeight;

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');
  
    // set line stroke and line width
    ctx.strokeStyle = '#00adff';
    ctx.lineWidth = 2;

    // Draw pattern
    ctx.beginPath();
    ctx.moveTo(level1[0].x, level1[0].y);

    level1.map((step, i)=> {
        console.log(level1[i])
        if(i !== 0) {
            ctx.moveTo(step.x - 1, step.y);
        }
        ctx.lineTo(level1[i+1]?.x, level1[i+1]?.y);
    })

    ctx.stroke();

    // GETALLPOINTS 

    for(let i=0; i<canvas.width;i++) {

        if(i === level1[stepLvl+1].x) {
            stepLvl++
        }

        let currentPos = {x: i, y: yCalculation(i)}

        lvl1Points.push(currentPos)
    }

}

/////////////////////////
// USER LINES

// Line 1
const line1Selector = document.querySelector('#line1');
line1Selector.width = windowWith;
line1Selector.height = windowHeight;

const line1 = line1Selector.getContext('2d');
line1.strokeStyle = '#12db12';
line1.lineWidth = 1;

line1.beginPath();
line1.moveTo(line1Pos.x, line1Pos.y);

// Line 2
const line2Selector = document.querySelector('#line2');
line2Selector.width = windowWith;
line2Selector.height = windowHeight;

const line2 = line2Selector.getContext('2d');
line2.strokeStyle = '#12db12';
line2.lineWidth = 1;

line2.beginPath();
line2.moveTo(line2Pos.x, line2Pos.y);



function drawTest () {

  timer++
  line1Pos.x++
  // God mode : add another line1Pos.x++
  line2Pos.x++
  // God mode : add another line2Pos.x++

  if(keyPressed === "ArrowUp") {
    line1Pos.y--
    line2Pos.y--
  } else if (keyPressed === "ArrowDown") {
    line1Pos.y++
    line2Pos.y++
  } 
   line1.lineTo(line1Pos.x, line1Pos.y);
   line1.stroke();

   line2.lineTo(line2Pos.x, line2Pos.y);
   line2.stroke();
   if(timer === canvas.width) clearInterval(start);


    if((line2Pos.y === Math.round(lvl1Points[timer].y)) || (line1Pos.y === Math.round(lvl1Points[timer].y))) {
        console.log('touché !')
        alert('perdu !')
    }
    if((line2Pos.y === Math.round(lvl1Points[timer].y)-1) || (line1Pos.y === Math.round(lvl1Points[timer].y)-1)) {
        console.log('touché !')
        alert('perdu !')
    }
    if((line2Pos.y === Math.round(lvl1Points[timer].y)+1) || (line1Pos.y === Math.round(lvl1Points[timer].y)+1)) {
        console.log('touché !')
        alert('perdu !')
    }

    if(line1Pos.x === windowWith-1) {
        alert('Gagné !')
        clearInterval(start)

    }


}

/////////////////////////
// INIT GAME

drawPattern();











//    console.log('rounded pattern', Math.round(lvl1Points[timer].y))
//    console.log('pattern', lvl1Points[timer].y)

//    console.log('ligne superieur', line1Pos.y, 'ligne inferieur', line2Pos.y)



