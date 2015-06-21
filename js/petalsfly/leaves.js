


const NUMBER_OF_LEAVES = 125;


function randomInteger(low, high)
{
    return low + Math.floor(Math.random() * (high - low));
}


function randomFloat(low, high)
{
    return low + Math.random() * (high - low);
}


function pixelValue(value)
{
    return value + 'px';
}



function durationValue(value)
{
    return value + 's';
}


function createALeaf()
{
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');
    
    image.src = '../js/petalsfly/images/realLeaf' + randomInteger(1, 7) + '.png';
    
    leafDiv.style.top = pixelValue(randomInteger(50, 160));

    leafDiv.style.left = pixelValue(randomInteger(0, 485));
    leafDiv.style.width = pixelValue(40);
    leafDiv.style.height = pixelValue(30);
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    

    leafDiv.style.webkitAnimationName = 'fade, drop';

	image.classList.add("animated");
	image.classList.add("fallDown");
    
    var fadeAndDropDuration = durationValue(30);
 
    var spinDuration = durationValue(randomFloat(5, 7));

    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    var leafDelay = durationValue(randomFloat(0, 5));
    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

    image.style.webkitAnimationDuration = spinDuration;

    leafDiv.appendChild(image);

    return leafDiv;
	
	
}

function createPetal()
{
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');
    
    image.src = '../js/petalsfly/images/realLeaf' + randomInteger(1, 7) + '.png';
    
    leafDiv.style.top = pixelValue(randomInteger(230, 340));

    leafDiv.style.left = pixelValue(randomInteger(0, 485));
    leafDiv.style.width = pixelValue(40);
    leafDiv.style.height = pixelValue(30);
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    
    leafDiv.style.webkitAnimationName = 'fade, drop';

	image.classList.add("animated");
	image.classList.add("fallDown");
    
    var fadeAndDropDuration = durationValue(30);
 
    var spinDuration = durationValue(randomFloat(5, 7));

    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    var leafDelay = durationValue(randomFloat(0, 5));
    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

    image.style.webkitAnimationDuration = spinDuration;

    leafDiv.appendChild(image);

    return leafDiv;
	
}
function blah() {

	alert('blah ');
}

//window.addEventListener('load', init, false);

//window.addEventListener('createALeaf', blah, false);

