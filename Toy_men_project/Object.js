function BackGround()
{
	draw.image("image/Color_apple.png");
	draw.SetAph(40);
	draw.paint("#ffffff",0, 0, 800, 600);
	
	draw.SetAph(100);
	draw.text("toggle test..." + input.check + "State:" + data.MovState, 30, 100, "#ff0000", '30px Arial');
}

function odject()
{

	var sky = master.box(0, -100, 800, 2, input.KeyX + 50, input.KeyY);
	draw.paint("#000000", 0, 0, 800, 2);
	if(sky == true)
		input.KeyY = 2;
	
	var WallL = master.box(-100, 1, 2, 600, input.KeyX, input.KeyY + 88);
	draw.paint("#000000", 0, 1, 2, 600);
	if(WallL == true)
		input.KeyX = 2;
		
	var WallR = master.box(798, 1, 900, 600, input.KeyX + 100, input.KeyY + 88);
	draw.paint("#000000", 798, 1, 799, 600);
	if(WallR == true)
		input.KeyX = 798 - 100;
	
	var ground = master.box(0, 598, 799, 700, input.KeyX + 50, input.KeyY + 175);
	draw.paint("#000000", 0, 598, 799, 599);
	if(ground == true)
		input.KeyY = 598 - 175;
}