$('#start').click(function() {
    countDownClock(4, 'seconds');
});

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

            if (secondsLeft <= -3) {
                clearInterval(countdown);
                return;
            };

            displayTimeLeft(secondsLeft);

        }, 1000);
    }

    function displayTimeLeft(seconds) {
        secondsElement.textContent = seconds;
        if (seconds <= -1) {
            $('.countdown-container').remove();
            $('.game1').show()
        }
    }
}