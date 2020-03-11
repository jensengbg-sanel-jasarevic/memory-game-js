var numbers = [1, 2, 1, 2, 3, 4, 3, 4, 5, 6, 5, 6, 7, 8, 7, 8];
var matches = 0;
var pause = false;
var clickedButtonId = undefined;
var clickedButtonNumber = undefined;

var buttons = document.querySelectorAll(".game-button");

spreadNumbers();

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (e) {
        var turnable = e.target.dataset.turnable;

        //1st click
        if (!pause && clickedButtonId == undefined &&
             clickedButtonNumber == undefined && turnable == 'true') {
                e.target.dataset.turnable = 'false';
                
                e.target.textContent = e.target.dataset.number;
                 e.target.style.backgroundColor = 'cyan';

                 clickedButtonId = e.target.id;
                 clickedButtonNumber = e.target.dataset.number;
        }

        //2nd click  
        if (!pause && clickedButtonId != undefined && clickedButtonNumber
            != undefined && turnable == 'true' &&
            e.target.id != clickedButtonId) {
                e.target.dataset.turnable = 'false';

                e.target.textContent = e.target.dataset.number;
             
                //Pair
                if (e.target.dataset.number == clickedButtonNumber) {
                    e.target.style.backgroundColor = 'green';
                    document.getElementById(clickedButtonId)
                    .style.backgroundColor = 'green';

                    clickedButtonId = undefined;
                    clickedButtonNumber = undefined;
                    
                    matches++;

                    if (matches == 8) {
                        alert ("Game over!");
                    }

                 //No pair   
                } else {
                    document.getElementById(clickedButtonId).style.
                    backgroundColor = 'red';
                    e.target.style.backgroundColor = 'red';
                    pause = true;

                    setTimeout (() => {
                        e.target.dataset.turnable = 'true';
                        e.target.style.backgroundColor = 'indigo';
                        e.target.textContent = "";

                        var pausedButton = document.getElementById
                        (clickedButtonId);

                        pausedButton.dataset.turnable = 'true';
                        pausedButton.style.backgroundColor = 'indigo';
                        pausedButton.textContent = "";

                        clickedButtonId = undefined;
                        clickedButtonNumber = undefined;
                        pause = false;
                    }, 700);
                }
            } 
    });
}

function spreadNumbers() {
    for (i = 0; i < buttons.length; i++) {
        buttons[i].dataset.number = numbers[i];
    }
}