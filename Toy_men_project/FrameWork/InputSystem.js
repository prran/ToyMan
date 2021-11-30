function InputBase(width, height)
{
	this.KeyX = 0;
	this.KeyY = 200;
	this.clickX = [0, 0 ,0];
	this.clickY = [0, 0, 0];
	this.button = new Array();
	
	this.SpdX = 10;
	this.SpdY = 10;
	//키보드를 통한 이동속도가 정의되어 있는 변수.
	
	this.KeyAddress = [];
	this.ClkAddress = new Array();
	for(var i = 0; i <= width; i++)
	{
		this.ClkAddress[i] = new Array();
	}
	
	this.SureMuti = true;
	
	this.check;
	
	return this;
}

var input;


window.addEventListener("keydown", keydown, false);
function keydown(e)
{	
	input.check = e.keyCode;
	input.KeyAddress[e.keyCode] = true;
}

window.addEventListener("keyup", keyup, false);
function keyup(e)
{
	input.KeyAddress[e.keyCode] = false;
}

if(input.SureMuti == true)
	window.addEventListener("mousedown", mousedown);
function mousedown(e)
{
	input.ClkAddress[e.clientX][e.cilentY] = true;
	var distance0 = Math.abs((e.clientX + e.cilentY) - (input.clickX[0] + input.clickY[0]));
	var distance1 = Math.abs((e.clientX + e.cilentY) - (input.clickX[1] + input.clickY[1]));
	
	if(input.ClkAddress[input.clickX[0]][input.clickY[0]] == true && (e.clientX != input.clickX[0] || e.cilentY != input.clickY[0]) && distance0 >= 10)
	{
		input.ClkAddress[input.clickX[1]][input.clickY[1]] = false;
		input.clickX[1] = e.clientX;
		input.clickY[1] = e.clientY;
	}
	
	else if(input.ClkAddress[input.clickX[1]][input.clickY[1]] == true && (e.clientX != input.clickX[1] || e.cilentY != input.clickY[1]) && distance1 >= 10)
	{
		input.ClkAddress[input.clickX[0]][input.clickY[0]] = false;
		input.clickX[0] = e.clientX;
		input.clickY[0] = e.clientY;
	}
	
	else if(distance0 < 10 && distance1 < 10)
	{
		input.ClkAddress[input.clickX[0]][input.clickY[0]] = false;
		input.ClkAddress[input.clickX[1]][input.clickY[1]] = false;
		
		input.clickX[0] = e.clientX;
		input.clickY[0] = e.clientY;
		input.clickX[1] = 0;
		input.clickY[1] = 0;
	}
	
	else
	{
		input.ClkAddress[input.clickX[0]][input.clickY[0]] = false;
		input.clickX[0] = e.clientX;
		input.clickY[0] = e.clientY;
	}
};

if(input.SureMuti == true)
	window.addEventListener("mouseup", mouseup);
function mouseup(e)
{
	input.ClkAddress[e.clientX][e.clientY] = false;
	var distance = Math.abs((e.clientX + e.cilentY) - (input.clickX[0] + input.clickY[0]));
	
	if(distance < 10 && input.ClkAddress[input.clickX[1]][input.clickY[1]] == true)
	{
		input.clickX[0] = input.clickX[1];
		input.clickY[0] = input.clickY[1];
		input.clickX[1] = 0;
		input.clickY[1] = 0;
	}
	
	else if((distance >= 10 && input.ClkAddress[input.clickX[0]][input.clickY[0]] == true) || (distance < 10 && input.ClkAddress[input.clickX[1]][input.clickY[1]] == false))
	{
		input.clickX[1] = 0;
		input.clickY[1] = 0;
	}
	
	else
		input.SureMuti = false;
}


if(input.SureMuti == false)
	window.addEventListener("mousemove", mousemove);
function mousemove(e)
{
	input.clickX[2] = e.clientX;
	input.clickY[2] = e.clientY;
}

if(input.SureMuti == false)
	window.addEventListener("mousedown", buttondown);
function buttondown(e)
{
	input.button[e.button] = true;
}

if(input.SureMuti == false)
	window.addEventListener("mouseup", buttonup);
function buttonup(e)
{
	input.button[e.button] = false;
}