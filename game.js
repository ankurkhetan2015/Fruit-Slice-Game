var playing = false;
var currentScore;
var trialsLeft;
var step;
var action;
var allfruits = ['apples', 'banana', 'cherries', 'coconut', 'kiwi', 'lemons', 'mango', 'orange', 'pears', 'strawberries', 'tomatoes', 'watermelon'];
var numFruits = allfruits.length - 1; //index of first fruit is 0

$(function()
{	
	//click on start-reset button
	$("#startreset").click(function()
	{
		//check if playing
		if(playing == true)
		{			
			//reload page
			location.reload();
		}
		
		// if not playing
		else
		{			
			playing = true;
			
			//set score to 0
			currentScore = 0;
			$("#scorevalue").html(currentScore);
			
			//show trials left
			$("#trialsleft").show();
			trialsLeft = 3;
			addHearts();

			//change button text to "reset game"
			$("#startreset").html("Reset Game");

			//start the game
			startGame();
		}
	});
});


			//define random step
			//(2)move food down by 1 step every few seconds
				//check if fruit is very low(disappearing)
					//if no, repeat (2)
					//else, check if any trials left
						//if yes
							//remove a heart 
							//then repeat (1)
						//else
							//show gameover box
							//change button to display "start game"




//slicing fruit
	//play some background sound(confirms fruit as cut)
	//explode the fruit


//funtion to a lives remaining in a game
function addHearts()
{	
	$("#trialsleft").empty();
	for(i = 0; i < trialsLeft; i++)
	{
		$("#trialsleft").append('<img class="lives" src="images/heart.png">');
	}
}

//function to start the game (send fruits)
function startGame()
{
	generateFruit();

	//move food down by 1 step every few milliseconds, 10 right now
	action = setInterval(function()
	{	
		//move food by a step
		$("#fruits").css('top', $("#fruits").position().top + step);

		//check if fruit is very low(disappeared)
		if($("#fruits").position().top > $("#gamebox").height())
		{
			//check if any trials left
			if(trialsLeft > 1)
			{
				generateFruit();

				//reduce trial by 1 (remove a heart)
				trialsLeft --;
				//populated right number of hearts in trialsleft box
				addHearts();
			}
			else
			{
				playing = false;

				//change button text to "start game"
				$("#startreset").html("Start Game");
				
				//show gameover box
				$("#gameOver").show();
				$("#gameOver").html('<p>Game Over!!!</p><p>Your Score is: ' + currentScore + '</p>');

				//stop the game
				stopGame();
			}
		}

	}, 10);



}

//function to generate a random fruit to send
function chooseFruit()
{
	$("#fruits").attr('src', 'images/' + allfruits[Math.round(numFruits * Math.random())] + '.png');
}

//decides position and speed of falling of a random fruit
function generateFruit()
{
	$("#fruits").show();
	
	//choose a random fruit
	chooseFruit();
	
	//random fruit position
	$("#fruits").css({'left' : Math.round(350*Math.random()), 'top' : -50});

	//generate random step, changing step
	step = 1 + Math.round(5*Math.random());
}

//stop the game and stop dropping the fruits
function stopGame()
{
	clearInterval(action);
	$("#fruits").hide();
}
