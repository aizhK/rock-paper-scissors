const game = ()=> {
    let pScore = 0;
    let cScore = 0;

    //beginning of the game
     const gameBegin = ()=> {
         const playButton = document.querySelector('.begin button');
         const introScreen = document.querySelector('.begin');
         const match = document.querySelector('.match');

         playButton.addEventListener('click', ()=>{
             introScreen.classList.add('fadeOut');
             match.classList.add('fadeIn');
         });
     };

     //the Match start
     const playGame = ()=> {
         const options = document.querySelectorAll('.options button');
         const playerHand = document.querySelector('.player-hand');
         const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        for (const hand of hands){
            hand.addEventListener('animationend', () =>{
                hand.style.animation = '';
            });
        };

        //Options given to the computer
         const computerOptions = ['rock', 'paper', 'scissors'];

         for (const option of options) {
            option.addEventListener('click', ()=> {
                //console.log(option);
            
         
             const computerNumber = Math.floor(Math.random() * 3);
             const computerChoice = computerOptions[computerNumber];
             //console.log(computerNumber);
             //console.log(computerChoice);
        
            setTimeout(() => {
                //gives the playerHand image that was chosen and computerHand image at random
                playerHand.src = `./project/${option.textContent}.png`;
                computerHand.src =  `./project/${computerChoice}.png`;

                //compares the outcomes and displays the text
                compareOutcomes(option.textContent, computerChoice);
                
                SomeoneToTen();
                
                

            }, 2000);

            playerHand.style.animation = 'playerHandShake 2s ease';
            computerHand.style.animation = 'computerHandShake 2s ease';

            });
        };
     };

     const newScores = () => {
         const playerScore = document.querySelector('.player-score p');
         const computerScore = document.querySelector('.computer-score p');
         playerScore.textContent = pScore;
         computerScore.textContent = cScore;
     };

     let winHist = [];

     const compareOutcomes = (playerChoice, computerChoice) => {
         const win = document.querySelector('.win');

         //Checks whether the computer and the player have a tie
         if(playerChoice === computerChoice) {
             win.textContent = 'It is a tie';
             winHist.push('t');
             console.log('win history', winHist);
             a();
        //Ends the function
             return;
         }

         

        //if/else functions to check how the computer choices and player choices interact and who ends up winning/losing
         if(playerChoice === 'rock'){
            if(computerChoice === 'scissors'){
                win.textContent = 'Player got the point';
                winHist.push('p');
                pScore++;
                newScores();
                console.log('win history', winHist);
                a();
                return;
            } 
            else {
                win.textContent = 'Computer got the point';
                winHist.push('c');
                cScore++;
                newScores();
                console.log('win history', winHist);
                a();
                return;
            }
         }

         if(playerChoice === 'paper'){
            if(computerChoice === 'scissors'){
                win.textContent = 'Computer got the point';
                winHist.push('c');
                cScore++;
                newScores();
                console.log('win history', winHist);
                a();
                return;
            } 
            else {
                win.textContent = 'Player got the point';
                winHist.push('p');
                pScore++;
                newScores();
                console.log('win history', winHist);
                a();
                return;
            }
         }  

         if(playerChoice === 'scissors'){
            if(computerChoice === 'rock'){
                win.textContent = 'Computer got the point';
                winHist.push('c');
                cScore++;
                newScores();
                console.log('win history', winHist);
                a();
                return;
            } 
            else {
                win.textContent = 'Player got the point';
                winHist.push('p');
                pScore++;
                newScores();
                console.log('win history', winHist);
                a();
                return;
            }
        }
     }

//will restart the game once it is over
     const playAgain = () => {
        const gameOverScreen = document.querySelector('.gameOver');
        const match = document.querySelector('.match');
        const playAgainBtn = document.querySelector('.gameOver button');
        //const playerScore = document.querySelector('.player-score p');
        //const computerScore = document.querySelector('.computer-score p');
        playAgainBtn.addEventListener('click', () => {
            gameOverScreen.classList.remove('fadeIn');
            gameOverScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
            pScore = 0;
            cScore = 0;
            winHist = [];
            winHist.push();
            const playerScore = document.querySelector('.player-score p');
            const computerScore = document.querySelector('.computer-score p');
            playerScore.textContent = pScore;
            computerScore.textContent = cScore;
        });
     };

//if there are 3 wins in a row for computer, then the gameOver screen fades in
    const winsInARow = (numOfWins) => {
        const gameOver3WinsInARowC = () => {
            //const gameOverBtn = document.querySelector('.gameOver button');
            const gameOverScreen = document.querySelector('.gameOver');
            const gameOverText = document.querySelector('.gameOver h2');
            const match = document.querySelector('.match');
                match.classList.remove('fadeIn');
                match.classList.add('fadeOut');
                gameOverScreen.classList.add('fadeIn');
                gameOverText.textContent = 'Computer got three wins in a row!';
                playAgain();
        };

//if there are 3 wins in a row for player, then the gameOver screen fades in        
        const gameOver3WinsInARowP = () => {
            //const gameOverBtn = document.querySelector('.gameOver button');
            const gameOverScreen = document.querySelector('.gameOver');
            const gameOverText = document.querySelector('.gameOver h2');
            const match = document.querySelector('.match');
                match.classList.remove('fadeIn');
                match.classList.add('fadeOut');
                gameOverScreen.classList.add('fadeIn');
                gameOverText.textContent = 'Player got three wins in a row!';
                playAgain();
        };

        
// a code that checks whether there are 3 wins in a row and for who
        if (winHist.length < numOfWins) {
            return false;
        }
        const compareItems = winHist.slice(winHist.length-numOfWins);
        console.log(compareItems);

        const final = compareItems[numOfWins-1];
        console.log('final', final);

        let counter = 1;
        
        for (let i=numOfWins-2; i>=0; i--) {
            console.log(compareItems[i]);
            if (compareItems[i] === final) {
                counter++;
                console.log(counter + ' win in a row');
                
            } else {
                break;
            }

            if (counter === numOfWins) {

                if (final === 'c') {
                    gameOver3WinsInARowC();
                    return numOfWins + ' wins in a row for computer'; 
                }
                if (final === 'p') {
                    gameOver3WinsInARowP();
                    return numOfWins + ' wins in a row for player';          

                }
            }
        }
        return false;
    };

const a = () => {
    if (winsInARow(3)) {
        console.log('game over');
    } else {
        console.log('game continues');
    }
}

//checks who reaches 10 points first and when someone does, game over screen fades in
    const SomeoneToTen = () => {
        if (pScore == 10) {
            //const gameOverBtn = document.querySelector('.gameOver button');
            const gameOverScreen = document.querySelector('.gameOver');
            const gameOverText = document.querySelector('.gameOver h2');
            const match = document.querySelector('.match');
            match.classList.remove('fadeIn');
            match.classList.add('fadeOut');
            gameOverScreen.classList.add('fadeIn');
            gameOverText.textContent = 'Player is the winner!';
            playAgain();
            return;
        } 
        else if (cScore == 10) {
            //const gameOverBtn = document.querySelector('.gameOver button');
            const gameOverScreen = document.querySelector('.gameOver');
            const gameOverText = document.querySelector('.gameOver h2');
            const match = document.querySelector('.match');
            match.classList.remove('fadeIn');
            match.classList.add('fadeOut');
            gameOverScreen.classList.add('fadeIn');
            gameOverText.textContent = 'Computer is the winner!';
            playAgain();
            return;
        }
        else{
            return;
        }
    }
    
     gameBegin();
     playGame();

};

game();