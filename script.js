//gameboard object

//create a constructor or function factory that creates a gameboard array

//create a module(iife) for anythign your going to invoke once.


// const gameBoard ={
//     player1: [],
//     player2: [],
//     no need for constructors, its only 2 players
// };


/* player1{
    name: player1, //gave it a default
    board:[],
}
*/

const player1 = ['1/3','2/3','3/3'];
const player2 = ['1/1','1/2','1/3'];//has winning board
let turn = player1.name;//start if off by giving the turn to player1

const allWinningBoards ={//every possible winning board
    // row/column

    //diagonal
    win1: ['3/1','2/2','1/3'],
    win2: ['1/3','2/2','3/1'],
    //full rows
    win3: ['1/1','1/2','1/3'],
    win4: ['2/1','2/2','2/3'],
    win5: ['3/1','3/2','3/3'],
    //full column
    win6: ['1/1','2/1','3/1'],
    win7: ['1/2','2/2','3/2'],
    win8: ['1/3','2/3','3/3'],

}


function whoWon(){
    for(const boardArr in allWinningBoards){//for every allWinningBoard property 
        
        if( allWinningBoards[boardArr].every((element) => player1.includes(element)) ){ //if every element of this winning board in play1 array 
            return console.log("player1 Won!");
        }
        else if( allWinningBoards[boardArr].every((element) => player2.includes(element)) ){ //if every element of this winning board in play2 array 
            return console.log("player2 Won!");
        }
        else{ //if none of above conditions met, then next player turn
            nextPlayerTurn();
        }
        
    }
}



function nextPlayerTurn(){
    if( isBoardFull() === true ){//if board is full on next turn, then end the game
        endGame();
    }
    else if(turn === player1.name){
        return turn = player2.name
    }
    else if(turn === player2.name){
        return turn = player1.name
    }

}

function endGame(){
    player1.splice(0, player1.length);
    player2.splice(0, player2.length);

}

function isBoardFull(){

    if(player1.length + player2.length >= 9){//if player1 and 2 take all 9 positions on the board then 
        return true;
    }
    else{
        return false;
    }

}
