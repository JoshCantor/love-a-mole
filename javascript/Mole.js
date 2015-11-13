/**
 * @constructor
 * A mole object represents a mole in the game.
 *
 * Moles need 3 variables
 *  - this.timeSpentUp: the amount of time a mole spends on the board before being removed
 *
 *  - this.occupiedHole: A DOM element representing the hole that a mole occupies
 *
 *  - this.moleElement: A DOM element that is created when a mole is created. This element
 *                 should be appended to occupiedHole when a mole emerges
 *
 */
function Mole(minUpTime, maxUpTime){
    // Give this.timeSpentUp a number value between minUpTime and maxUpTime.
    // HINT: use Mole.prototype.getRandomBetween
    /* YOUR CODE HERE */
    this.timeSpentUp = this.getRandomBetween(minUpTime, maxUpTime);
    // this.removed needs a value
    /* YOUR CODE HERE */
    this.removed = false;
    // this.occupiedHole needs a value. it should be a DOM element
    // HINT: use Mole.prototype.selectHole
     // YOUR CODE HERE 
    var hole = this.selectHole();
    this.occupiedHole = hole;
    // Create an HTML element to represent the Mole
    // and save it into this.moleElement
    // Don't forget to give our mole a proper css class!
    // Don't forget to call whackThisMole if the mole is clicked!
    /* YOUR CODE HERE */
    this.moleElement = $('<img src="images/mole.png" alt=\'mole\' class=\'mole\'>');
    // this.moleElement.on('click', whackThisMole());
    // Moles always emerge when they are created.
    this.emerge();
    this.isWhacked = 'false';
    this.whackThisMole();
}

/**
 * A mole emerges from it's mole hole!
 * This function must:
 *   mark that hole as occupied using the data-hole-occupied attribute.
 *   add the mole to the DOM. 
 *   use setTimeout() to remove the mole after this.timeSpentUp milliseconds
 *
 */
Mole.prototype.emerge = function() {
 /* YOUR CODE HERE */
    var currentHole = this.selectHole();
    if (currentHole !== undefined) {
        this.currentHole = currentHole;
        console.log(currentHole);
        $(currentHole).attr('data-hole-occupied', 'true');
        $(currentHole).append(this.moleElement);
        $(currentHole).append(this.heartElement);
        moleImg = this.moleElement;
        setTimeout(this.removeMole.bind(this), Math.floor(this.timeSpentUp));
        // moleImg.delay(Math.floor(this.timeSpentUp)).removeMole();
    }
}

/**
 * This function should change a mole from the default state, to the
 * whacked state.
 * 
 * It should use the global variable scoreBoard to update the score.
 * This should change the data-score attribute, as well as what the 
 * user can see on the screen.
 *
 * It should cause the foundLove.png heart to appear behind the mole.
 * 
 * Then after one second it should remove the mole from the DOM.
 */
Mole.prototype.whackThisMole = function() {
    console.log("this");
    var mole = this.moleElement;
    var _this = this;
    mole.on('click', function() {
        console.log(_this);
        if (_this.isWhacked === 'false') {
            scoreBoard.attr('data-score', Number(scoreBoard.attr('data-score')) + 1);
            scoreBoard.html(Number(scoreBoard.html()) + 1);
        }
        _this.isWhacked = 'true';
        console.log(_this.isWhacked)
        
        _this.moleElement.addClass('in-love');
        setTimeout(_this.removeMole.bind(_this), 1000);
    })
}

/**
 * This function should remove the moleElement from the DOM.
 * It should also change the data-hole-occupied attribute back to
 * false so that other moles can occupy the hole. 
 */
Mole.prototype.removeMole = function() {
    var mole = this.moleElement;
    var _this = this;
    mole.removeClass('in-love');
    // mole.fadeOut();
    var currentHole = $(_this.currentHole)
    currentHole.attr('data-hole-occupied', 'false');
    console.log(mole);
    currentHole.empty();
}
/**
 * Select an element from the DOM. The element must be one of the 
 * mole holes and it must have an attriute data-hole-occupied with
 * a value of false. 
 * 
 * If all those conditions are met, return an HTML element. 
 * If those conditions cannot be met (i.e. every hole is already occupied)
 * then return undefined.
 */
Mole.prototype.selectHole = function() {
    /* YOUR CODE HERE */
    var moleHoles = $('.moleHole');
    var i = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    if (moleHoles[i].getAttribute('data-hole-occupied') === 'false') {
        return moleHoles[i];
    }
    return undefined;
};

/**
 * This must return a random number in between min and max.
 */
Mole.prototype.getRandomBetween = function(min, max) {
    /* YOUR CODE HERE */
    return Math.random() * (max - min) + min + 1;
};

/**
 * This must return an integer in between min and max
 */
Mole.prototype.getRandomIntBetween = function(min, max) {
    /* YOUR CODE HERE */
    console.log('randIntBtwn');
    return Math.floor(Math.random() * (max - min + 1)) + min;

};
