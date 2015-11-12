// Global game parameters. These will be set based on the form input.
// They should be set in readQueryParams.
var GLOBALS = {};
    
// Global references to DOM elements
// These will get initialized when window.onload is called
var scoreBoard;
var gameStartButton;
var gameCurrentlyActive;
//
// Main entry point:
// Read the input paramaters,
// Build the Mole Field of Dreams
// Start the game
//
window.onload = function(){
    // Read and save the query parameters from your form 
    // HINT: Fill out and use the function readQueryParams 
    /* YOUR CODE HERE */
    readQueryParams();
  
    // Create the mole field 
    // HINT: Fill out and use the function createMoleField 
    /* YOUR CODE HERE */
    createMoleField(3,3);

    // Get the score-board dom element, and save it into 
    // our variable scoreBoard
    /* YOUR CODE HERE */
    scoreBoard = $('#score-board');

    // Get the game-starter button dom element and save it
    // into our variable gameStartButton
    /* YOUR CODE HERE */
    gameStartButton = $('#game-starter');

    // Add an event listener to the gameStartButton. 
    // It should call the startGame function when the 
    // 'click' event is triggered
    /* YOUR CODE HERE */
    gameStartButton.click(function() {
        startGame();
    })
};

// Examine document.location.search and extract the info 
// from our form. Store each key/value pair as a property in GLOBALS.
// GLOBALS should have number values from the form for each of these
// keys:
//   MOLE_UP_MIN (in seconds)
//   MOLE_UP_MAX (in seconds)
//   NUMBER_OF_ROUNDS
//   MOLES_PER_ROUND
//   ROUND_COOLDOWN (in seconds)
function readQueryParams() {
    /* YOUR CODE HERE */
    function readParams() {
        var queryParams = document.location.search.replace('?', '');
        paramArr = queryParams.split('&');
        var splitParams = [];
        for (i = 0; i < paramArr.length; i++) {
            var parts = paramArr[i].split('=');
            splitParams.push(parts);
        }
        var paramValues = [];
        for (i = 0; i < splitParams.length; i++) {
            var value = splitParams[i][1];
            paramValues.push(value);
        }
        return paramValues;
    }
    GLOBALS.MOLE_UP_MIN = readParams()[0];
    GLOBALS.MOLE_UP_MAX = readParams()[1];
    GLOBALS.NUMBER_OF_ROUNDS = readParams()[2];
    GLOBALS.MOLES_PER_ROUND = readParams()[3];
    GLOBALS.ROUND_COOLDOWN = readParams()[4];
}

// Create and insert a 3x3 HTML table.
// Use createSingleMoleHole() to create the <td> elements
function createMoleField(x, y) {
    /* YOUR CODE HERE */
    for (var row = 0; row < x; row++) {
        $('table').append('<tr>');
    }
    for (var cell = 0; cell < y; cell++) {
        createSingleMoleHole();
    }
}

// Create a complex HTML snippet and return it. 
// The element returned from this function should look exactly like this
// <td><div data-hole-occupied="false" class="mole-hole"></div></td>
function createSingleMoleHole() {
    /* YOUR CODE HERE */
    return $('tr').append("<td><div data-hole-occupied='false' class='moleHole'></div></td>");
}

///
/// Game logic for rounds and restarting.
///

/**
 * Reset the score and start round 0
 */
function startGame() {
    // Make sure a game isn't already in progress before starting a game
    // set the game to be in progress if its not.
    if(gameCurrentlyActive){
        return;
    }
    else {
        gameCurrentlyActive = true;    
    }

    // Set the scoreboard back to zero
    scoreBoard.attr('data-score', '0');
    scoreBoard.html(0);

    // Hide the 
    gameStartButton.hide();
    initiateRound(0);
}
// Everything working as expected up to this point

/////////////////////////


/**
* Use a closure and the event loop to act every ROUND_COOLDOWN seconds
WHAT DOES THIS MEAN?
*/
function initiateRound(roundNumber) {
    // Closing over roundNumber in this context is confusing - but important.

    // Without access to the environment variable roundNumber the rounds would not advance properly.
    // It's recursive, but also in an anonymous function, sent on "timeout", 
    // only to return after ROUND_COOLDOWN seconds. 
    var closureFunction = function() {

        if(roundNumber < GLOBALS.NUMBER_OF_ROUNDS) {
            
            // Create the moles 
            for(var i = 0; i < GLOBALS.MOLES_PER_ROUND; i++) {
                new Mole(GLOBALS.MOLE_UP_MIN*1000, GLOBALS.MOLE_UP_MAX*1000);
            }

            // Next round, using our precious closed-over parameter 
            initiateRound(roundNumber + 1);
        }
        else {
            endGame();
        }
    };

    // Set it and forget it.
    setTimeout(closureFunction, GLOBALS.ROUND_COOLDOWN * 1000);
}

/**
 * When we're sure the last moles are done, let the user try again
 */
function endGame() {
    //what is MOLE_ANIMATE_TIME?
    var maxTimeUp = GLOBALS.MOLE_ANIMATE_TIME + GLOBALS.MOLE_UP_MAX;

    // Wait a little while after final round, then put the 
    // gameStartButton back on the screen.
    setTimeout(function(){
        gameStartButton.show();
    }, maxTimeUp * 1000);
}
