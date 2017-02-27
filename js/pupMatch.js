// var main = function() {
var handlers = {

    init: function() {
        this.hamburgerHandlers();
        this.gameHandlers();
    },

    hamburgerHandlers: function() {
        var $primaryNav = $(".primary-nav");
        var $hamburgerWrapper = $(".hamburger-wrapper");
        var $menuTxt = $(".menu-txt");

        $hamburgerWrapper.on("click", function() {
            console.log('click');
            $primaryNav.slideToggle("normal", function() {
                if ($primaryNav.is(":visible")) {
                    $menuTxt.text("Hide Menu");
                } else {
                    $menuTxt.text("Show Menu");
                }
            });
        });
    },

    gameHandlers: function() {
        var $playGameBtn = $(".play-game-btn");
        var $gameWrapper = $(".game-wrapper");

        $playGameBtn.on("click", function() {
            console.log('click play game');
            $gameWrapper.slideToggle("normal", function() {
                if ($gameWrapper.is(":visible")) {
                    $playGameBtn.text("Hide Game");
                } else {
                    $playGameBtn.text("Play Game");
                }
            });
        });
    }

};
handlers.init();

var app = {
    cards: [
        "images/gamePics/yorkie-beach-footprints.jpg", "images/gamePics/yorkie-beach-footprints.jpg",
        "images/gamePics/yorkie-clothes-shoes.jpg", "images/gamePics/yorkie-clothes-shoes.jpg",
        "images/gamePics/yorkie-driving.jpg", "images/gamePics/yorkie-driving.jpg",
        "images/gamePics/yorkie-next-to-flowers.jpg", "images/gamePics/yorkie-next-to-flowers.jpg",
        "images/gamePics/yorkie-sitting.jpg", "images/gamePics/yorkie-sitting.jpg",
        "images/gamePics/yorkie-sleeping.jpg", "images/gamePics/yorkie-sleeping.jpg"
    ],

    //returns a shuffled cards array
    shuffle: function() {
        var random = 0;
        var temp = 0;
        var cardsArrLen = this.cards.length;
        for (var i = 1; i < cardsArrLen; i++) {
            random = Math.round(Math.random() * i);
            temp = this.cards[i];
            this.cards[i] = this.cards[random];
            this.cards[random] = temp;
        }
        console.log('shuffled cards: ', this.cards);
        this.assignData();
    },

    // assign each img a data- value frm cards arr
    assignData: function() {
        var $card = $('.card');
        $card.each(function(index) {
            $(this).removeAttr('data-card-value');
            $(this).attr('data-card-value', app.cards[index]);
            // console.log('app.cards index', app.cards[11]);
        });
        this.clickHandlers();
    },

    //changes the img src of clicked element using data-card-value
    //then Adds class selected to the element clicked.
    clickHandlers: function() {
        var $card = $('.card');
        $card.on('click', function() {
          console.log('click in clickhandlers ACTIVATED!');
            //this is whatever element you click on:
            // console.log('what is this', this);
            // debugger;
            console.log('clickhandlers assignment of src:', $(this).data('cardValue'));
            // $(this).attr('src', $(this).data('cardValue')).addClass('selected');
            $(this).attr('src', $(this).data('cardValue')).addClass('selected');

            app.checkMatch();
        });
    },

    checkMatch: function() {
        var $selected = $('.selected');
        if ($selected.length === 2) {
            if ($selected.first().data('cardValue') === $selected.last().data('cardValue')) {
                $selected.each(function() {
                    $(this).animate({
                        opacity: 0
                    }).removeClass('unmatched').removeClass('selected');
                });
                app.checkWin();
            } else {
                setTimeout(function() {
                    $selected.each(function() {
                        $(this).attr('src', "images/gamePics/blue-gradient.jpg").removeClass('selected');
                    });
                }, 1000);
            }
        }
    },

    checkWin: function() {
        if ($('.unmatched').length === 0) {
            alert("Great job!");
        }
    },

    removeDataAttr: function() {
        $('.card').each(function() {
            $(this).removeAttr('data-card-value');
        });
    },

    ///bug: does not clear the last two pics.
    resetGame: function() {
        console.log('resetGame method running');
        app.shuffle();




        //
        // $('.card').each(function() {
        //   //add back opacity:
        //     $(this).attr('src', "images/gamePics/flower-blurred.jpg").animate({
        //             opacity: 100
        //         });
        //     $(this).removeAttr('data-card-value');
        //
        //     // $(this).removeClass('selected');
        //     // $(this).addClass('unmatched');
        //       //works:
        //     // $(this).removeClass('card');
        //     // $(this).addClass('teddy');
        //     console.log('this keyword after resetGame method running:', this);
        // });



        //remove all selected class from img:

        //relmove data-card-value from each img element:

        // app.init();

        //then run shuffle:
        // app.shuffle();
        // this.clickHandlers();


        //reset images back to blue-gradient source
        // debugger;
        // var $card = $('.card');

        // $('.selected').each(function() {
        //     $(this).removeClass('selected');
        // });

        // $selected.each(function() {
        //     $(this).animate({
        //         opacity: 0
        //     }).removeClass('unmatched');
        // });
    }

};

app.shuffle();

//}; //end of main function

// $(document).ready(main);



(function() {
    var original = jQuery.fn.init;

    jQuery.fn.init = function(selector, context, rootjQuery) {
        var obj = new original(selector, context, rootjQuery);

        if (obj.selector && obj.length === 0 && console && console.warn)
            console.warn("jQuery was called with a selector of '" + selector + "' and returned an empty object");

        return obj;
    };
})();







//REMOVE THIS!! JUST A TEST TO auto win game for debugging! WRITE IN BLOG
// removeAllUnmatched: function() {
//     $('.column-1').children('img').removeClass('unmatched');
// },
