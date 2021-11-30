window.addEventListener("load", LoopSet, false);
//window.addEventListener("load", TestState, false);

var StateLoop;


function LoopSet()
{
	var FPS = 60;
	
	frame = new FrameBase(FPS);
	draw = new DrawBase("PlayScreen", 800, 600);
	input = new InputBase(800, 600);
	
	input.SpdX = 6;
	input.SpdY = 9;
	
	StateLoop = setInterval(LoadingState, 1000/FPS);
}

function LoadingState()
{
	var TotalFile = image.TotLodFile + sound.TotLodFile;
	var CurrentFile = image.CurLodFile + sound.CurLodFile;
	
	if(data.AtiveSwc[500] == true)
		PlayState();
	
	if(CurrentFile >= TotalFile && data.AtiveSwc[500] != true)
	{
		frame.SubSet("start");
		draw.image("image/apple.png");
		draw.text("Loading Complete!!", 275, 320, "#ff0000", '30px Arial');
		draw.anima("image/Press_Enter.png", 310, 350, 205, 50, 6, 1, 1);
		
		draw.paint("#000000", 0, 0, 800, 2);
		draw.paint("#000000", 0, 1, 2, 600);
		draw.paint("#000000", 798, 1, 799, 600);
		draw.paint("#000000", 0, 598, 799, 599);
		
		if(input.KeyAddress[13] == true)
		{
				frame.SubSet("end");
				data.AtiveSwc[500] = true;
		}
	}
	if(CurrentFile < TotalFile)
	{
		draw.image("image/apple.png");
		draw.text("Loading..." + CurrentFile + "/" + TotalFile, 300, 300, "#ff6600", '30px Arial');
	}
}


function PlayState()
{	
	frame.set("start");
	BackGround();
	odject();
	AlwyRun();
	command();
	control();
}

function TestState()
{
	var GetCvs = document.getElementById(this.canvas);
	var pencil = GetCvs.getContext("2d");
	pencil.fillStyle = "#ffff00";
	pencil.fillRect(0, 0, 800, 600);
}
