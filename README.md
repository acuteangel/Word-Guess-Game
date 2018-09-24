# Word-Guess-Game

https://acuteangel.github.io/Word-Guess-Game/

This simple Love Live hangman game comes in 2 versions: Aquors and mu's. It includes music which by default won't play until the player starts a game, presses play, or switches versions. 

How it works:
Among other initialized variables, there are arrays for both word banks, which contain all the available song titles. When the game is started, a random number generator selects the index for the solution. A loop displays the solution using blanks in place of each letter. 

When a user types in a letter the event adds the word to the list of guessed letters, unless it's already been guessed. A different version of the loop runs which updates the solution, but any guessed letters are displayed instead of being blanks.

After each guess, a function checks to see if the game is over. If there are no more guesses, the game ends at a loss. If there are no more blanks, the game ends as a win. The song currently playing will be stopped and the solution will be played. 