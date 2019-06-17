$('.countdown-container').hide();
$('.game').hide();
$('.game1').hide();
$('#lose').hide();
$('#lose2').hide();
$('#mode1').hide();
$('#mode2').hide();

$('#start').click(function() {
    $('#start').removeClass("fadeIn delay-1s");
    $('#start').addClass("zoomOut");
    $('#start').remove();
    $('#mode1').show();
    $('#mode2').show();
})

let game_mode = 0;
$('#mode1').click(function() {
    game_mode = 1;
    $('#mode1').remove();
    $('#mode2').remove();

    $('#header').addClass("animated zoomOut");
    $('.game').show();
    $('.game').addClass("animated zoomIn delay-1s");
    setTimeout(function() {
        $('#start').remove();
        $('#header').remove();
        $('.countdown-container').show();

        countDownClock(4, 'seconds');
    }, 1000)
    setTimeout(function() {
        timer();
    }, 6000);
});
$('#mode2').click(function() {
    game_mode = 2;
    $('#mode1').remove();
    $('#mode2').remove();
    $('#time_score').hide()
    $('#header').addClass("animated zoomOut");
    $('.game').show();
    $('.game').addClass("animated zoomIn delay-1s");
    setTimeout(function() {
        $('#start').remove();
        $('#header').remove();
        $('.countdown-container').show();

        countDownClock(4, 'seconds');
    }, 1000)
    setTimeout(function() {
        timer();
    }, 6000);
});



//-------------timer start-----------
let game_status = false;
let game_timer;

function timer() {
    let play_time = 0;
    game_timer = setInterval(function() {
        play_time++;
        let msec = play_time % 10;
        let min = parseInt(play_time / 600);
        let sec = parseInt((play_time % 600) / 10);
        if (sec < 10) {
            if (min < 10) {
                $('.time_score').text("0" + min + ":0" + sec + "." + msec);
            } else {
                $('.time_score').text(min + ":0" + sec + "." + msec);
            }
        } else {
            if (min < 10) {
                $('.time_score').text("0" + min + ":" + sec + "." + msec);
            } else {
                $('.time_score').text(min + ":" + sec + "." + msec);
            }
        }

    }, 100);


}
//-------------timer end-------------


//-------------321 countdown start---------
const countDownClock = (number = 100, format = 'seconds') => {

    const d = document;
    const secondsElement = d.querySelector('.seconds');
    let countdown;
    convertFormat(format);


    function convertFormat(format) {
        switch (format) {
            case 'seconds':
                return timer(number);
        }
    }

    function timer(seconds) {
        const now = Date.now();
        const then = now + seconds * 1000;

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft <= -2) {
                clearInterval(countdown);
                return;
            };

            displayTimeLeft(secondsLeft);

        }, 1000);
    }

    function displayTimeLeft(seconds) {
        secondsElement.textContent = seconds;
        if (seconds <= -1) {
            $('.countdown-container').hide();
            $('.game1').show()
            game1();
        }
    }
};
//-----------321 countdown end----------


//-----------game1 start----------------
function game1() {
    let gameArea = $('#game1area');
    let maxarea = 15;

    let playerlen = 4;
    let playerpos = { "tr": 7, "td": 10 };
    let foodposx = Math.floor(Math.random() * 24);
    let foodposy = Math.floor(Math.random() * 14);

    let count = 4;
    let playerdir = {
        "up": 1,
        "right": 2,
        "down": 3,
        "left": 4
    };
    let currentdir = playerdir["right"];

    function drawarea() {
        for (let index = 0; index < maxarea; index++) {
            gameArea.append("<tr class='tr" + index + "'></tr>");

            let thisTr = $('.tr' + index);

            for (let indexTd = 0; indexTd < maxarea + 10; indexTd++) {
                thisTr.append("<td class='tr" + index + "td" +
                    indexTd + "'></td>");
            }
        }
    }
    drawarea();


    var ar = new Array(37, 38, 39, 40);

    $(document).keydown(function(e) {
        var key = e.which;
        //if(key==35 || key == 36 || key == 37 || key == 39)
        if ($.inArray(key, ar) > -1) {
            e.preventDefault();
            return false;
        }
        return true;
    });


    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 38:
                if (currentdir == playerdir["down"]) {
                    break;
                } else
                    currentdir = playerdir["up"];
                break;
            case 40:
                if (currentdir == playerdir["up"]) {
                    break;
                }
                currentdir = playerdir["down"];
                break;
            case 37:
                if (currentdir == playerdir["right"]) {
                    break;
                }
                currentdir = playerdir["left"];
                break;
            case 39:
                if (currentdir == playerdir["left"]) {
                    break;
                }
                currentdir = playerdir["right"];
                break;
        }
    });

    let getplayerpos;

    function drawplayer() {
        count += 1;

        switch (currentdir) {
            case 1:
                playerpos["tr"] -= 1;
                getplayerpos = $(".tr" + playerpos["tr"] +
                    "td" + playerpos["td"]);
                break;
            case 2:
                playerpos["td"] += 1;
                getplayerpos = $(".tr" + playerpos["tr"] +
                    "td" + playerpos["td"]);
                break;
            case 3:
                playerpos["tr"] += 1;
                getplayerpos = $(".tr" + playerpos["tr"] +
                    "td" + playerpos["td"]);
                break;
            case 4:
                playerpos["td"] -= 1;
                getplayerpos = $(".tr" + playerpos["tr"] +
                    "td" + playerpos["td"]);
                break;
            default:
                alert("ERROR");
                break;
        }

        if (getplayerpos.hasClass("draw-player")) {
            lose();
        }
        getplayerpos.addClass("draw-player count" + count);

        let playertail = count - playerlen;
        let getplayertail = $('.count' + playertail);

        getplayertail.removeClass("draw-player count" + playertail);


    }

    let score = 0;
    let speed = 115;

    function food() {
        let foodpos = $(".tr" + foodposy +
            "td" + foodposx);
        if (!foodpos.hasClass("draw-player") && foodposy != 0 && foodposx != 0) {
            foodpos.addClass("food");
        } else {
            newfood();
        }

        function newfood() {
            foodposx = Math.floor(Math.random() * 24);
            foodposy = Math.floor(Math.random() * 14);
        }


        if (foodpos.hasClass("draw-player")) {
            foodpos.removeClass("food");
            playerlen += 1;
            let playertail = count - playerlen;
            let getplayertail = $('.count' + playertail);
            getplayertail.addClass("draw-player count" + playertail);

            score++;
            speed -= 5;


            clearInterval(timer);
            timer = setInterval(function() {
                if (game_mode == 1) {
                    //time
                    if (playerpos["td"] == -1 || playerpos["td"] == 25 || playerpos["tr"] == -1 || playerpos["tr"] == 15) {
                        lose();
                    } else if (score == 10) {
                        win();
                    } else {
                        drawplayer();
                    }
                } else if (game_mode == 2) {
                    //score
                    if (playerpos["td"] == -1 || playerpos["td"] == 25 || playerpos["tr"] == -1 || playerpos["tr"] == 15) {
                        over();
                    } else {
                        drawplayer();
                    }
                }

                food();
            }, speed);

            $('#score').text("SCORE : " + score);
            newfood();
        }
    }

    timer = setInterval(function() {
        if (playerpos["td"] == -1 || playerpos["td"] == 25 || playerpos["tr"] == -1 || playerpos["tr"] == 15) {
            if (game_mode == 1) {
                lose();
            } else if (game_mode == 2) {
                over()
            }
        } else {
            drawplayer();
        }
        food();
    }, speed);


    function lose() {
        $('.game').removeClass("zoomIn delay-1s");
        $('.game').addClass("bounceOut delay-1s");
        clearInterval(game_timer)

        clearInterval(timer);
        setTimeout(function() {
            $('.game').hide();
            $('#lose').show();
            $('#lose').addClass("animated bounceIn");
            var restart = ' <button id="restart" style="margin-top: 200px" class="btn animated fadeIn delay-1s">HOME</button>';
            $('.first').append(restart);
            $('#restart').click(function() {
                location.reload();
            })
        }, 3000);
    }

    function win() {
        game_status = true;
        clearInterval(timer);
        if (game_status == true) {
            clearInterval(game_timer)
        }
        $('.game').removeClass("zoomIn delay-1s");
        $('#game1area').addClass("animated flash delay-1s");
        $('.game').addClass("flash delay-1s");


        setTimeout(function() {
            $('.game').removeClass("flash delay-1s");
            $('#game1area').removeClass("flash delay-1s");
            $('.game').addClass("bounceOut");
            $('#game1area').addClass("bounceOut delay-1s");
            //$('.game').hide();
            $('#lose').text("YOU WIN!")
            let time = $('#time_score').html()
            $('#lose2').text("YOUR SCORE : " + time)
            setTimeout(function() {
                $('#lose').show();
                $('#lose').addClass("animated bounceIn");
                $('#lose2').show();
                $('#lose2').addClass("animated bounceIn");
                var restart = ' <button id="restart" class="btn animated fadeIn delay-1s">HOME</button>';
                $('.first').append(restart);
                $('#restart').click(function() {
                    location.reload();
                })
            }, 1000)

        }, 3000);

    }

    function over() {
        $('.game').removeClass("zoomIn delay-1s");
        $('.game').addClass("bounceOut delay-1s");
        $('#lose').text("GAME OVER!")
        $('#lose2').text("YOUR SCORE : " + score)
        clearInterval(timer);
        setTimeout(function() {
            $('.game').removeClass("flash delay-1s");
            $('#game1area').removeClass("flash delay-1s");
            $('.game').addClass("bounceOut");
            $('#game1area').addClass("bounceOut delay-1s");
            setTimeout(function() {
                $('#lose').show();
                $('#lose').addClass("animated bounceIn");
                $('#lose2').show();
                $('#lose2').addClass("animated bounceIn");
                var restart = ' <button id="restart" class="btn animated fadeIn delay-1s">HOME</button>';
                $('.first').append(restart);
                $('#restart').click(function() {
                    location.reload();
                })
            }, 1000)

        }, 2000);
    }
};
//------------game1 end------------