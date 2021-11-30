function DataBase()
{
	this.acade = false;
	this.MusDesign = undefined;
	this.scrState;
	this.MovState = 0;
	this.cencle = 0;
	this.AtiveSwc = [];
	
	return this;
}
var data = new DataBase();


function GetDataImage()
{
loadI.addI("image/apple.png");
loadI.addI("image/stand.png");
loadI.addI("image/Hiddenkey_NRA.png");
loadI.addI("image/fail.png");
loadI.addI("image/wait.png");
loadI.addI("image/run.png");
loadI.addI("image/BackWalk.png");
loadI.addI("image/sit.png");
loadI.addI("image/sitR.png");
loadI.addI("image/jump.png");
loadI.addI("image/JumpBack.png");
loadI.addI("image/land.png");
loadI.addI("image/Z.png");
loadI.addI("image/forwardZ.png");
loadI.addI("image/airZ.png");
loadI.addI("image/underZ.png");
loadI.addI("image/dash.png");
loadI.addI("image/Press_Enter.png");
loadI.addI("image/Color_apple.png");
loadI.addI("image/connect.png");
//loadI.addI("test");
}

function GetDataSound()
{
loadS.addS("music/EternalDark.mp3");
loadS.addS("music/EternalLight.mp3");
}

/*AtiveSwc 1 = 왼쪽
 *AtiveSwc 2 = 오른쪼
 */

