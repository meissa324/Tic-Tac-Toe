

const gameFunctions = (function(){

    //function factory
    function createPlayer(name){
        const board = [];
        return {name, board};
    }

    //check if any players has a winning board
    function whoWon(){
        for(const boardArrKey in gameBoard.allWinningBoards){//for every allWinningBoard property 
            
            if( gameBoard.allWinningBoards[boardArrKey].every((element) => gameBoard.players[0].board.includes(element)) ){ //if every element of this winning board in play1 array 
                resetGame();//end game after they won
                gameDomManipulation.setResult("player 1 won");
                console.log(player1.name+"player1 Won!");
            }

            else if( gameBoard.allWinningBoards[boardArrKey].every((element) => gameBoard.players[1].board.includes(element)) ){ //if every element of this winning board in play2 array 
                resetGame();//end game after they won
                gameDomManipulation.setResult("player 2 won");
                console.log("player2 Won!");
            }

            else if(isBoardFull()===true){
                console.log("tie!");
                gameDomManipulation.setResult("It was a Tie!");
                resetGame();
            }
            
        }
    }
    
    //reset all gameBoard Properties
    function resetGame(){
        //reset player's board
        gameBoard.players[0].board.splice(0, gameBoard.players[0].board.length);
        gameBoard.players[1].board.splice(0, gameBoard.players[1].board.length);

        //reset gameBoard
        gameBoard.board.splice(0,gameBoard.board.length);
        //reset player turns
        setPlayerTurn();

        gameDomManipulation.resetBoard();//should i reset board automatically?
    
    }
    
    //check if board is full
    function isBoardFull(){
        if(gameBoard.players[0].board.length + gameBoard.players[1].board.length === 9){//if player1 and 2 take all 9 positions on the board then 
            return true;
        }
        //if not full then return false
        else{
            return false;
        }
    
    }
    
    //gameBoard Object, holds the properties we need to know for the game
    const gameBoard = {
        isFull: false,
    
        allWinningBoards: {//every possible winning board
            // row/column
            
            //diagonal
            win1: ['1/1','2/2','3/3'],
            win2: ['1/3','2/2','3/1'],
            //full rows
            win3: ['1/1','1/2','1/3'],
            win4: ['2/1','2/2','2/3'],
            win5: ['3/1','3/2','3/3'],
            //full column
            win6: ['1/1','2/1','3/1'],
            win7: ['1/2','2/2','3/2'],
            win8: ['1/3','2/3','3/3'],
        },
        
        players:[],
        
        turn:"",
        
        winner: "",

        board: [],
    };
    //sets the player's turn
    function setPlayerTurn(){
        if( isBoardFull() === true ){//if board is full on next turn, then end the game
            resetGame();
        }
        else if (gameBoard.players[0].board.length === 0 && gameBoard.players[1].board.length === 0){//if both player1 and 2 haven't made a move, the game starts w/ player1's turn
            return gameBoard.turn = gameBoard.players[0];
        }
        else if(gameBoard.players[0].board.length <= gameBoard.players[1].board.length){//player1 turn if he doesn't have more positions than player2
            return gameBoard.turn = gameBoard.players[0];
        }
        else{//otherwise player2's turn
            return gameBoard.turn = gameBoard.players[1];
        }
    }

    //sets the players position
    function setPlayerPosition(position){//sets position and continues the game
        //add position to player board
        gameBoard.turn.board.push(position);//turn returns/holds the player object
        gameBoard.board.push(position);//add it to gameBoard's board
        
        //check if they won after setting this position
        whoWon()
        
        //give next player the turn
        setPlayerTurn()

        //!urgent
        gameDomManipulation.highlightPlayer();
    }

    return {
        createPlayer,
        gameBoard,
        whoWon,
        resetGame,
        isBoardFull,
        setPlayerTurn,
        setPlayerPosition,
    };


})();

// gameFunction is immedietly invoked so you can use it's functions anywhere(as in it creates everything in itself)

//create player Objects
const player1 = gameFunctions.createPlayer("Meissa");
const player2 = gameFunctions.createPlayer("Sada");

//add players to gameBoard
gameFunctions.gameBoard.players.push(player1);
gameFunctions.gameBoard.players.push(player2);

//set first turn
gameFunctions.setPlayerTurn();
// console.log("First turn",gameFunctions.gameBoard.turn);
//gameFunctions.gameBoard.turn -> to get who's turn it is



const gameDomManipulation = (function(){
    
    //get the board element from dom
    let domBoard = document.querySelector(".board-container");
    let resetButton = document.querySelector(".reset");

    //target board position id
    domBoard.addEventListener("click",(e)=>{
        
        //put all the event listeners info into target
        let target = e.target;
        //get the closest descendant id
        let positionID = target.id; 

        console.log(positionID);

        
        if(!gameFunctions.gameBoard.board.includes(positionID) ){//if the position is not already on the board
                // let position = document.querySelector("#"+positionID);
            let position = document.getElementById(positionID);

            //set that position's icon
            if(gameFunctions.gameBoard.turn === gameFunctions.gameBoard.players[0]){
                position.textContent = "X";

            }
            else{
                position.textContent = "O";

            }

            //set player position based where clicked
            gameFunctions.setPlayerPosition(positionID);//this changes turn
        }
        
    })

    //reset dom board visual
    //select all the li elements as an array
    //loop though the array and reset each of their textContent to and empty string

    function resetBoard(){
        //dont forget to call resetBoard in resetGame()//it should really be called reset game
        allBoardPositions = document.querySelectorAll("ul>li");//creates node list
        boardPositionsArr = Array.from(allBoardPositions);//turn to an array

        boardPositionsArr.forEach((position)=>{
            position.textContent = "";
        })

    }

    //target reset button
    resetButton.addEventListener("click",()=>{
        gameFunctions.resetGame();
    })

    //select player1 and player2 element
    let player1Element= document.querySelector(".player1");
    let player2Element= document.querySelector(".player2");
    let result = document.querySelector(".game-result")

    player1Element.setAttribute("style","background-color:#EF5A6F;");//start the game by highlighting player1 element

    function highlightPlayer(){//highlights the current player's div, if its their turn
        //when its player1's turn,take the first child and make its background color blue
        if(gameFunctions.gameBoard.turn === gameFunctions.gameBoard.players[0]){
            player1Element.setAttribute("style","background-color:#EF5A6F;")//highlight player1
            player2Element.setAttribute("style","background-color: transparent;")//don't highlight player2
            console.log("player1's turn");
        }
        else if(gameFunctions.gameBoard.turn === gameFunctions.gameBoard.players[1]){
            player2Element.setAttribute("style","background-color:#EF5A6F;")//highlight player2
            player1Element.setAttribute("style","background-color: transparent;")//don't highlight player1
            console.log("player2's turn");

        }
    }

    function setResult(message){
        result.textContent = message;
    }

    //on game reset, set the result?

    return { 
        resetBoard,
        highlightPlayer,
        setResult,
    }

})();


/* TODO
* show popup at start and end of games
* let players input name
* if no name, give default of player1 and player2
*
*
*/
