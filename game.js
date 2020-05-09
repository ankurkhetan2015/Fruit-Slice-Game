var playing = false;
var currentScore;
var trialsLeft;
var step;
var lifespeed;
var initialSpeed;
var action;
var winSize;
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
		
		//initial(minimum) speed of fruits falling
		initialSpeed = 1;

		//hide gameover box initially
		$("#gameOver").hide();

		//show trials left
		$("#trialsleft").show();
		trialsLeft = 3;
		addHearts();

		//change button text to "reset game"
		$("#startreset").html("Reset Game");

		//start the game
		sendFruit();
	}
});

//slicing fruit
$("#fruits").mouseover(function()
{
	//update the score
	currentScore++;
	$("#scorevalue").html(currentScore);

	//play cut audio
	document.getElementById("cutsound").play();

	//stop fruit from going further down
	clearInterval(action);

	//show animation while cutting
	$("#fruits").hide("explode", 300);


	//send next fruit
	setTimeout(sendFruit, 300);

});

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
function sendFruit()
{
	generateFruit();

	//if life is less than provided, based on some criteria provide option for more lives
	if(currentScore % 20 == 0 && currentScore !== 0 && trialsLeft < 3)
	{
		sendLife();
	}
	//move food down by 1 step every few (x) milliseconds
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

				//play game over sound
				document.getElementById("endsound").play();
				
				//show gameover box
				$("#gameOver").show();
				winSize = $("#gamebox").width();
				if(winSize < 450)
				{
					$("#gameOver").html('<p><p>Your Score is: ' + currentScore + '</p>');
				}
				else
				{
					$("#gameOver").html('<p>Game Over!!!</p><p>Your Score is: ' + currentScore + '</p>');
				}

				//hide trialsleft box
				$("#trialsleft").hide();
				//stop the game
				stopFruit();
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

	//correct the fruit size according to screen size
	winSize = $("#gamebox").width();
	if(winSize >= 670)
	{
		$("#fruits").css('width', 50)
		winSize -= 50;
	}

	else if(winSize < 670)
	{
		$("#fruits").css('width', 40)
		winSize -= 40;
	}

	//random fruit position
	$("#fruits").css({'left' : Math.round(winSize * Math.random()), 'top' : -100});

	if(currentScore % 30 == 0 && currentScore !== 0 && initialSpeed < 3)
	{
		initialSpeed++;
	}
	//generate random step, changing step
	step = initialSpeed + Math.round(5*Math.random());

	if(step > 6)
	{
		step = 6;
	}
}

//send extra life option
function sendLife()
{
	$(".extraLife").show();
	$(".extraLife").attr('src', 'images/heart.png');

	//responsive size of heart
	winSize = $("#gamebox").width();
	if(winSize >= 670)
	{
		$(".extraLife").css('width', 50)
		winSize -= 50;
	}

	else if(winSize < 670)
	{
		$(".extraLife").css('width', 40)
		winSize -= 40;
	}

	$(".extraLife").css({'left' : Math.round(winSize * Math.random()), 'top' : -100});
	lifespeed = 2;

	action = setInterval(function()
	{
		$(".extraLife").css('top', $(".extraLife").position().top + lifespeed);
	}, 10);
	
	//if extra life is selected
	$(".extraLife").mouseover(function()
	{
		//play life audio
		document.getElementById("lifesound").play();

		//show animation while getting life
		$(".extraLife").hide("pulsate", 300);
		
		//increment the life count in game
		trialsLeft++;
		addHearts();
	});

}

//stop the game and stop dropping the fruits
function stopFruit()
{
	clearInterval(action);
	$("#fruits").hide();
}

});