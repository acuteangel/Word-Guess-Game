
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
                "Sore wa Bokutachi no Kiseki",
                "Datte Datte Aa Mujou",
                "sweet&sweet holiday",
                "Trouble Busters",
                "Bokura wa Ima no Naka de",
                "Diamond Princess no Yuutsu",
                "Donna Toki mo Zutto",
                "COLORFUL VOICE",
                "Love Novel",
                "No brand girls",
                "Shiranai Love＊Oshiete Love",
                "START：DASH!!",
                "Yume no Tobira",
                "A.no.ne.ga.nbare!",
                "SENTIMENTAL StepS",
                "Wonderful Rush",
                "Love wing bell",
                "Natsuiro egao de 1,2, Jump!",
                "Dancing stars on me!",
                "Mermaid festa vol.1",
                "Pure girls project",
                "Cutie Panther",
                "KiRa-KiRa Sensation!",
                "Mogyutto `LOVE` de Sekkin Chuu!",
                "Aishiteru Banzai!",
                "Binetsu Kara Mystery",
                "Happy maker!",
                "Shangri-La Shower",
                "Ruteshi Kisuki Shiteru"
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
            var numerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "!", "？", "＊", "`", "&", "：", ",", "-"];
            var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
            var alphabetUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            //variable which will contain the id of the corresponding audio tag, and for the starting volume
            var currentSong = "";
            var currentVolume = 0.20;
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
                $("#current-solution").text("Press Space to begin");
                $("#current-display").text("");
                $("#guesses-remaining").text("Guesses remaining: 5");
                $("#letters-guessed").text("");
                $("#toggler").toggleClass("Aquors");
                $("#toggler").toggleClass("mus");
                //starts music if none is playing yet
                if (currentSong==="") {
                    currentSong = "#mus8";                    
                    $(currentSong).get(0).play();
                    $(currentSong).get(0).volume = currentVolume;
                }

                if (version == "mus") {
                    version = "Aquors";
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
                if (currentVolume < 0.950 && currentSong !== "") {
                    currentVolume = currentVolume + 0.050;
                    $(currentSong).get(0).volume = currentVolume;
                }
            })
            //volume down
            $("#sounddown").on("click", function() {
                if (currentVolume > 0.050 && currentSong !=="") {
                    currentVolume = currentVolume - 0.050;
                    $(currentSong).get(0).volume = currentVolume;
                }
            })
            
            //interprets any keypresses
            document.onkeypress = function(event) {
                var keyPress = event.key;
                //starts a new game if none is in progress with space
                if (alphabetUpper.indexOf(event.key) > -1) {
                    keyPress = alphabet[alphabetUpper.indexOf(event.key)]
                };
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
                    updateGuessedLetters(keyPress);
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
            
            //takes the solution and turns it from a string of letters and numbers/symbols and replaces letters with "_". \xa0 = no-break space
            function wordDisplayInitial(arr) {
                var displayString = "";
                for (i=0; i<arr.length; i++) {
                    if (arr.charAt(i) == " "){
                        displayString = displayString + "\xa0\xa0";
                    }else if (numerals.indexOf(arr.charAt(i)) > -1){   
                        displayString = displayString + arr.charAt(i);
                    } else {
                        displayString = displayString + " _ "
                    }               
                }
                return displayString;
            }
            
            //used to determine if input letter has been guessed yet. if not then it's added to the list of guessed letters
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

            //similar to wordDisplayInitial, but doesn't replace letters in guessedLetters array
            function wordDisplayUpdate() {
                var displayString = "";
                for (i=0; i<solution.length; i++) {
                    if (solution.charAt(i) == " "){
                        displayString = displayString + "\xa0\xa0";
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

            //runs after each letter is guessed. ends game if no more guesses or if all "_"s are replaced. if game ends, displays text and plays the song. prompts for new game
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
                    $(currentSong).html('<source src="assets/music/'+version+'/'+solution+'.mp3" type="audio/mpeg"></source>');
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

            

        