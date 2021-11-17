// REMINDER: This is a global variable! We are allowed to use only one! 
let id = null;

// function myMove() {
//     const my_ball = document.getElementById("my_ball");
//     const board = document.getElementById("main_board");
//     let dir_x = Math.random() > 0.5 ? 1 : -1;
//     let dir_y = Math.random() > 0.5 ? 1 : -1;
    
//     clearInterval(id);
//     id = setInterval(frame, 10);
//     randomizeStartLocation(my_ball, board);
//     function frame() {
        
//         my_ball.style.top = my_ball.offsetTop + dir_y + 'px';
//         my_ball.style.left = my_ball.offsetLeft + dir_x + 'px';
        
//         if(my_ball.offsetTop + my_ball.offsetHeight == board.offsetHeight || my_ball.offsetTop == 0)
//             dir_y = -1 * dir_y

//         if(my_ball.offsetLeft + my_ball.offsetWidth == board.offsetWidth || my_ball.offsetLeft == 0)
//             dir_x = -1 * dir_x
//     }
// }

function BouncingBall(init_axis)
{
    ball.call(this);
    this.init_axis = init_axis;
    direction_x = init_axis != 4 && ((Math.random() < 0.5) || (init_axis == 2)) ? -1 : 1;
    direction_y = init_axis != 3 && ((Math.random() < 0.5) || (init_axis == 1)) ? -1 : 1;
    velocity = 1;
}
BouncingBall.prototype = new BouncingBall();

function allMove() {
    let ballList = [];
    const board = document.getElementById("main_board");

    for(let i = 1; i <= 4 ; i++) {
        // ballList[i] = new BouncingBall(i);

        ballList[i] = {
            element: document.getElementById(`ball${i}`),
            dir_x: Math.random() > 0.5 ? 1 : -1,
            dir_y: Math.random() > 0.5 ? 1 : -1,
            init_axis: i
        }

        switch(ballList[i].init_axis)
        {
            case 1:
                ballList[i].dir_y = -1;
                break;
            case 2:
                ballList[i].dir_x = -1;
                break;
            case 3:
                ballList[i].dir_y = 1;
                break;
            case 4:
                ballList[i].dir_x = 1;
                break;
            default:
                break;
        }

        randomizeStartLocation(ballList[i], board);
    }

    clearInterval(id);
    id = setInterval(frame, 10);

    function frame() {
        
        for(let i = 1 ; i <= 4 ; i++) {
            let currentBall = ballList[i].element;

            currentBall.style.top = currentBall.offsetTop + ballList[i].dir_y + 'px';
            currentBall.style.left = currentBall.offsetLeft + ballList[i].dir_x + 'px';
            
            if(currentBall.offsetTop + currentBall.offsetHeight == board.offsetHeight || currentBall.offsetTop == 0)
                ballList[i].dir_y = -1 * ballList[i].dir_y
    
            if(currentBall.offsetLeft + currentBall.offsetWidth == board.offsetWidth || currentBall.offsetLeft == 0)
                ballList[i].dir_x = -1 * ballList[i].dir_x
        }
    }
}

function randomizeStartLocation(ball_data, board) {
    let ball = ball_data.element;
    if(Math.floor(Math.random() * 2)) {
        ball.style.top = 0;
        ball.style.left = board.offsetWidth - ball.offsetWidth;
        // ball.style.top = Math.floor(Math.random() * (board.offsetHeight - ball.offsetHeight - 1));
        // ball.style.left = Math.random > 0.5 ? 1 : (board.offsetWidth - ball.offsetWidth - 1);
    }
    else {
        ball.style.left = Math.floor(Math.random() * (board.offsetWidth - ball.offsetWidth - 1));
        ball.style.top = Math.random > 0.5 ? 1 : (board.offsetHeight - ball.offsetHeight - 1);
    }

    switch(ball_data.init_axis) {
        case 1:
            // ball.style.top = 0;
            ball.style.top = 0;
            console.log("offsetHeight: " + (board.offsetHeight - ball.offsetHeight))
            console.log("offsetTop: " + (board.offsetTop - ball.offsetTop))
            break;
        case 2:
            // ball.style.right = 0;
            ball.style.left = board.offsetWidth - ball.offsetWidth;
            break;
        case 3:
            ball.style.top = board.offsetHeight - ball.offsetHeight;
            // ball.style.top = board...
            break;
        case 4:
            ball.style.left = 0;
            break;
        default:
            break;
    }
}


const button = document.getElementById('btn1');
console.log(button)
button.addEventListener('click', allMove)

