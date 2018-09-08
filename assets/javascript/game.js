
            // Creates an array with the available words
            var wordBank = ["word one","word 2two", "word3", "w o r d f o u r", "wo rd fi ve"];
            var numerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
            
            //Creating variables for wins, losses, whether or not a game is in progress, whether or not a game is won
            var wins = 0;
            var losses = 0;
            var gameOver = true;
            var didYouWin;

            //Creates variables which will be reset after each round
            var guesses;
            var guessedLetters;
            var solution;

            // Create variables that hold references to the places in the HTML where we want to display things.
            var displayWins = document.getElementById("display-wins");
            var displayLosses = document.getElementById("display-losses")
            var currentDisplay = document.getElementById("current-display");
            var currentSolution = document.getElementById("current-solution");
            var guessesRemaining = document.getElementById("guesses-remaining");
            var lettersGuessed = document.getElementById("letters-guessed")
            
            document.onkeypress = function(event) {
                if (gameOver && event.key === " ") {
                    solution = wordGenerator();
                    currentSolution.textContent = wordDisplayInitial(solution);
                    currentDisplay.textContent = "";
                    gameOver = false;
                    guessedLetters = [];
                    guesses = 5;
                    guessesRemaining.textContent = 5;
                    lettersGuessed.textContent = "";    
                } else if (gameOver === false){
                    updateGuessedLetters(event.key);
                    currentSolution.textContent = wordDisplayUpdate();
                    gameEnder();
                }
                
            }
            
            function wordGenerator() {
                return wordBank[Math.floor(Math.random() * wordBank.length)];
            }

            function wordDisplayInitial(arr) {
                var displayString = " ";
                for (i=0; i<arr.length; i++) {
                    if (arr.charAt(i) == " "){
                        displayString = displayString + "- ";
                    }else if (numerals.indexOf(arr.charAt(i)) > -1){   
                        displayString = displayString + arr.charAt(i) + " ";
                    } else {
                        displayString = displayString + "_ "
                    }               
                }
                return displayString;
            }
            
            function updateGuessedLetters(arr) {
                if (guessedLetters.indexOf(arr) < 0 && alphabet.indexOf(arr) > -1) {
                guessedLetters.push(arr); 
                lettersGuessed.textContent = guessedLetters;
                if (solution.includes(arr) === false) {
                    guesses--;
                    guessesRemaining.textContent = guesses;
                }
                }
            }

            function wordDisplayUpdate() {
                var displayString = " ";
                for (i=0; i<solution.length; i++) {
                    if (solution.charAt(i) == " "){
                        displayString = displayString + "- ";
                    }else if (numerals.indexOf(solution.charAt(i)) > -1){   
                        displayString = displayString + solution.charAt(i) + " ";                     
                    } else if (guessedLetters.indexOf(solution.charAt(i)) > -1) {
                        displayString = displayString + solution.charAt(i) + " ";
                    } else {
                        displayString = displayString + "_ "
                    }               
                }
                return displayString;

            }

            function gameEnder() {
                if (guesses===0) {
                    currentSolution.textContent = "The song was: " + solution;
                    currentDisplay.textContent = "You lose! Press Space to play again!"
                    losses++;
                    displayLosses.textContent = losses;
                    gameOver = true;
                    didYouWin = false;
                } else if (currentSolution.textContent.includes("_") === false) {
                    currentDisplay.textContent = "You win! Press Space to play again!";
                    wins++;
                    displayWins.textContent = wins;
                    gameOver = true;
                    didYouWin = true;
                }
            }

            

        