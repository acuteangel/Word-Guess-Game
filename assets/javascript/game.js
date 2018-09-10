
            // array with all available mus song titles
            var musWordBank = ["Bokura no LIVE Kimi to no LIFE",
                "Eien Friends",
                "Music S.T.A.R.T!!",
                "LOVELESS WORLD",
                "Nightingale Love Song",
                "Yuujou no Change",
                "Aki no Anata no Sora Tooku",
                "Snow halation",
                "Takaramonozu",
                "baby maybe Koi no Button",
                "Futari Happiness",
                "Paradise Live",
                "Fuyu ga Kureta Yokan",
                "Love marginal",
                "Sore wa Bokutachi no Kiseki"
                ];
            // array with all available aquors song titles
            var aquorsWordBank = ["Kimi no Kokoro wa Kagayaiteru Kai",
                "Step! ZERO to ONE",
                "Aozora Jumping Heart",
                "Genki Zenkai DAY! DAY! DAY!",
                "Koi ni Naritai AQUARIUM",
                "Strawberry Trapper",
                "Torikoriko PLEASE!!",
                "Guilty Night, Guilty Kiss!",
                "Humming Friend",
                "Mattete Ainouta",
                "Tokimeki Bunruigaku",
                "Yozora wa Nandemo Shitteru no？",
                "Todokanai Hoshida to Shite mo"];
            //variables for current word bank and version being used
            var wordBank = musWordBank;
            var version = "mus";
            //arrays for letters, uppercase letters, and numbers/symbols to be compared to
            var numerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "!", "？"];
            var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
            var alphabetUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            //variable which will contain the id of the corresponding audio tag
            var currentSong = "";
            var currentVolume = 0.2;
            //variables which reset at the end of each round
            var wins = 0;
            var losses = 0;
            var gameOver = true;
            var didYouWin;
            var guesses;
            var guessedLetters;
            var guessedLettersUpper;
            var solution;
            //index to prevent the current word to be the same as the previous word (initialized at 8 because the default music is #mus8)
            var previousSolutionIndex = 8;
            var solutionIndex = -1;
            
            //changes the version from aquors to mus, ends any game in progress
            $("#switch-edition").on("click", function() {
                gameOver = true;
                guesses = 5;
                guessedLetters = [];
                guessedLettersUpper = [];
                solution = "";
                $("#current-solution").text("");
                $("#current-display").text("Press Space to begin");
                $("#guesses-remaining").text("Guesses remaining: 5");
                $("#letters-guessed").text("");
                $("#toggler").toggleClass("aquors");
                $("#toggler").toggleClass("mus");
                //starts music if none is playing yet
                if (currentSong==="") {
                    currentSong = "#mus8";
                    $(currentSong).get(0).play();
                    $(currentSong).get(0).volume = currentVolume;
                }

                if (version == "mus") {
                    version = "aquors";
                    $("#display-edition").text("Aquor's edition!");
                    wordBank = aquorsWordBank;
                    $("#switch-edition").text("Click here to play μ's edition!");
                } else {
                    version = "mus";
                    $("#display-edition").text("μ's edition!");
                    wordBank = musWordBank;
                    $("#switch-edition").text("Click here to play Aquor's edition!");
                }
            });

            //plays/pauses music
            $("#mute").on("click", function() {
                if (currentSong==="") {
                    currentSong = "#mus8";
                    $(currentSong).get(0).play();
                    $(currentSong).get(0).volume = currentVolume;
                } else if ($(currentSong).get(0).paused){
                    $(currentSong).get(0).play();
                    $(currentSong).get(0).volume = currentVolume;
                } else {
                    $(currentSong).get(0).pause();
                }
            });

            //volume up
            $("#soundup").on("click", function() {
                if (currentVolume < 1) {
                    currentVolume = currentVolume + 0.05;
                    $(currentSong).get(0).volume = currentVolume;
                }
            })
            //volume down
            $("#sounddown").on("click", function() {
                if (currentVolume > 0) {
                    currentVolume = currentVolume - 0.05;
                    $(currentSong).get(0).volume = currentVolume;
                }
            })
            
            //interprets any keypresses
            document.onkeypress = function(event) {
                //starts a new game if none is in progress with space
                if (gameOver && event.key === " ") {
                    if (currentSong==="") {
                        currentSong = "#mus8";
                        $(currentSong).get(0).play();
                        $(currentSong).get(0).volume = currentVolume;
                    }
                    solution = wordGenerator();
                    $("#current-solution").text(wordDisplayInitial(solution));
                    $("#current-display").text("");
                    gameOver = false;
                    guessedLetters = [];
                    guessedLettersUpper = [];
                    guesses = 5;
                    $("#guesses-remaining").text("Guesses remaining: 5");
                    $("#letters-guessed").text(""); 
                //if game in progress, evaluates entry
                } else if (gameOver === false){
                    updateGuessedLetters(event.key);
                    $("#current-solution").text(wordDisplayUpdate());
                    gameEnder();
                }
                
            }
            
            //random number generator to determine the index and word of solution from the current wordbank
            function wordGenerator() {
                solutionIndex = Math.floor(Math.random() * wordBank.length);
                while (previousSolutionIndex == solutionIndex) {
                solutionIndex = Math.floor(Math.random() * wordBank.length);
                };
                return wordBank[solutionIndex];
            }
            
            //
            function wordDisplayInitial(arr) {
                var displayString = "";
                for (i=0; i<arr.length; i++) {
                    if (arr.charAt(i) == " "){
                        displayString = displayString + " - ";
                    }else if (numerals.indexOf(arr.charAt(i)) > -1){   
                        displayString = displayString + arr.charAt(i);
                    } else {
                        displayString = displayString + " _ "
                    }               
                }
                return displayString;
            }
            
            function updateGuessedLetters(arr) {
                if (guessedLetters.indexOf(arr) < 0 && alphabet.indexOf(arr) > -1) {
                guessedLetters.push(arr); 
                guessedLettersUpper.push(alphabetUpper[alphabet.indexOf(arr)]);
                $("#letters-guessed").text(guessedLettersUpper);
                if (solution.includes(arr) === false && solution.includes(alphabetUpper[alphabet.indexOf(arr)]) === false) {
                    guesses--;
                    $("#guesses-remaining").text("Guesses remaining: " + guesses);
                }
                }
            }

            function wordDisplayUpdate() {
                var displayString = "";
                for (i=0; i<solution.length; i++) {
                    if (solution.charAt(i) == " "){
                        displayString = displayString + " - ";
                    }else if (numerals.indexOf(solution.charAt(i)) > -1){   
                        displayString = displayString + solution.charAt(i);                     
                    } else if (guessedLetters.indexOf(solution.charAt(i)) > -1 || guessedLettersUpper.indexOf(solution.charAt(i)) > -1) {
                        displayString = displayString + solution.charAt(i);
                    } else {
                        displayString = displayString + " _ "
                    }               
                }
                return displayString;

            }

            function gameEnder() {
                if (guesses===0){
                    gameOver = true;
                    didYouWin = false;
                } else if ($("#current-solution").text().indexOf("_") == -1) {
                    gameOver = true;
                    didYouWin = true;
                }
                if (gameOver) {
                    if(currentSong !== ""){
                        $(currentSong).get(0).pause();
                        $(currentSong).get(0).currentTime = 0;
                        }
                    currentSong = "#" + version + wordBank.indexOf(solution);
                    $(currentSong).get(0).play();
                    $(currentSong).get(0).volume = currentVolume;
                    previousSolutionIndex = solutionIndex;

                    if (didYouWin == false) {
                        $("#current-solution").text("The song was: " + solution);
                        $("#current-display").text("You lose! Press Space to play again!");
                        losses++;
                        $("#display-losses").text("Losses: " +losses);
                    } else if (didYouWin) {
                        $("#current-display").text("You win! Press Space to play again!");
                        wins++;
                        $("#display-wins").text("Wins: " + wins);
                    }}
            }

            

        