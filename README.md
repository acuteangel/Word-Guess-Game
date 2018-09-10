# Word-Guess-Game



array of words
    initialized

rng one of the words
    math.floor (math.random() * array.length)

prompt user to guess a letter
    assign letters of word to solutionArray
    declare wordDisplayArray
    loop (loops solution.length times. if letter then pushes "_" to the end of wordDisplayArray, if space then " ") then displays " " + wordDisplayArray[i] + " " + ...
    return wordDisplay

    if letter has been guessed
        if statement that compares key press to entries in guessedLettersArray

        have them guess a different letter
        
    if letter hasn't been guessed

        if letter is correct
            compares key press to letters of solution

            fill in blanks
                matches will reassign same index for wordDisplayArray
            
            add letter to list of guessed letters
                push keypress to guessedLettersArray

        if letter is incorrect
            compares key press to letters of solution

            guess counter lowers by 1

            add letter to list of guessed letters

if all letters guessed or guess counter 0, game ends
    if no entries of wordDisplayArray are "_" or if guessesCounter = 0 game ends
else, loop
    when game ends:
        if all letters guessed, display win
        if out of guesses, display loss
    add score to w-l counter
    run game again    