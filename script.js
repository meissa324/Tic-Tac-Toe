

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
                endGame();//end game after they won
                return console.log("player1 Won!");
            }

            else if( gameBoard.allWinningBoards[boardArrKey].every((element) => gameBoard.players[1].board.includes(element)) ){ //if every element of this winning board in play2 array 
                endGame();//end game after they won
                return console.log("player2 Won!");
            }

            else if(isBoardFull()===true){
                console.log("tie!");
                endGame();
            }
            
        }
    }
    
    //reset all gameBoard Properties
    function endGame(){
        //reset player's board
        gameBoard.players[0].board.splice(0, gameBoard.players[0].board.length);
        gameBoard.players[1].board.splice(0, gameBoard.players[1].board.length);
        setPlayerTurn();//sets player turn
        gameBoard.boardPosition = "";//do i need this if there is no input?
    
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
            endGame();
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
        
        //check if they won after setting this position
        whoWon()
        
        //give next player the turn
        setPlayerTurn()
    }

    return {
        createPlayer,
        gameBoard,
        whoWon,
        endGame,
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

    //target its id //i think it auto works by closes descendant id to the cursor
    domBoard.addEventListener("click",(e)=>{

        //put all the event listeners info into target
        let target = e.target;
        //get the closest descendant id
        let positionID = target.id; 

        console.log(positionID);

        
        
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
    })


    

})();


/* TODO
*query selector all(children of ul), and run a array loop to clear all their text, content
*make it so a player can't take an already taken position, its still their turn
*finish ui
*show popup at start and end of games
*
*
*
*
*/
