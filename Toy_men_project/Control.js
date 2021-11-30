var CumdDelay = 0.26;
var GrviState = true;

//지금부터 정리작업에 들어갑니다.

function AlwyRun()
{
	gravity(GrviState);
	GrviSwitch();
	
	if(data.cencle == 0)//data.cencle 은 동작을 지속되게하는 변수로써 0은 조작 자유 1은 조작 불가입니다.
	{
			
//----------------------------------------------------버그가 있는 부분--------------------------------------------------------
		data.MovState = "stand";
		
		if(frame.get("stand") == undefined)
			frame.save("stand", 2, -1);	
		
		if(frame.GetTurn("stand", 14) == 1)
			data.MovState = "wait";
//----------------------------------------------------버그가 있는 부분--------------------------------------------------------
		
		if(input.KeyY <= 300)
			data.MovState = "fail";

		if(input.KeyY > 300 && input.KeyY < 598 - 175)
			data.MovState = "land";

		if(input.KeyY < 598 - 175)
		{
			frame.Delete("image/sit.png");
			frame.Delete("StandUp");
			frame.Delete("image/sitR.png");
			input.KeyAddress[40] = undefined;
		}
		if(input.KeyY >= 598 - 175)
		{
			data.AtiveSwc[1] = false;
			data.AtiveSwc[2] = false;
		}
	}
}

function command()
{
	if(data.cencle == 0)//data.cencle 은 동작을 지속되게하는 변수로써 0은 조작 자유 1은 조작 불가입니다.
	{
	
		if(input.KeyAddress[40] == true && input.KeyY >= 598 - 175)
		{
			data.MovState = "SitDown";
		}
		
		else if(input.KeyAddress[40] == false && input.KeyY >= 598 - 175 && data.AtiveSwc[400] == true)
		{
			data.MovState = "StandUp";
		}
	
		if(input.KeyAddress[37] == true && data.MovState == "stand")
		{
			if(data.AtiveSwc[101] != true)
				data.AtiveSwc[101] = true;
				
			input.KeyX -= (input.SpdX / 2);
			data.MovState = "back";
		}
		
		if(input.KeyAddress[39] == true && data.MovState == "stand")
		{
			if(data.AtiveSwc[102] != true)
				data.AtiveSwc[102] = true;
			
			input.KeyX += input.SpdX;
			data.MovState = "run";
		}
		
		if(input.KeyAddress[38] == true && input.KeyY >= 598 - 175 && input.KeyAddress[40] != true)
		{	
			data.MovState = "jump";
			data.cencle = 1;
		}	
		
		if(input.KeyAddress[38] == true && input.KeyAddress[37] == true && input.KeyY >= 598 - 175 && input.KeyAddress[40] != true)
		{
			data.MovState = "jumpback";
			data.cencle = 1;
		}
		
		if(input.KeyAddress[38] == true && input.KeyAddress[39] == true && input.KeyY >= 598 - 175 && input.KeyAddress[40] != true)
		{	
			data.MovState = "jumpfoward";
			data.cencle = 1;
		}
		
		if(input.KeyAddress[112] == true)
			master.ShowDetail = true;
		else
			master.ShowDetail = false;
		
		if(input.KeyAddress[78] == true && input.KeyAddress[82] == true && input.KeyAddress[65] == true)
		{
			data.MovState = "hidden";
		}	
		
		if(input.KeyAddress[90] == true && input.KeyY >= 598 - 175)
		{
			data.MovState = "Z";
			data.cencle = 1;
		}
		if(input.KeyAddress[90] == true && input.KeyAddress[39] == true && input.KeyY >= 598 - 175)
		{
			data.MovState = "forwardZ";
			data.cencle = 1;
		}
		if(input.KeyAddress[90] == true && input.KeyAddress[40] == true && input.KeyY >= 598 - 175)
		{
			data.MovState = "underZ";
			data.cencle = 1;
		}
		if(input.KeyAddress[90] == true && input.KeyY < 598 - 175)
		{
			data.MovState = "FailZ";
			data.cencle = 1;
		}
		
		if(data.AtiveSwc[101] == true && input.KeyAddress[37] == false)
		{
			data.AtiveSwc[201] = true;
		}
		//-->>
		if(data.AtiveSwc[102] == true && input.KeyAddress[39] == false)
		{
			data.AtiveSwc[202] = true;
		}
		//-->>
		if(data.AtiveSwc[202] == true && input.KeyAddress[39] == true && data.AtiveSwc[302] != true)
		{
			data.MovState = "dash";
			data.cencle = 1;
		}	
		
		if(data.AtiveSwc[201] == true && input.KeyAddress[39] == true && input.KeyAddress[90] == true)
		{
			data.MovState = "connect";
			data.cencle = 1;
		}//임시 커맨드
	}
}

function control()
{

	if(data.MovState == "stand")
	{	
		draw.image("image/stand.png", input.KeyX, input.KeyY);
		
		if(frame.get("image/run.png") != undefined)
			frame.Delete("image/run.png");
		if(frame.get("image/BackWalk.png") != undefined)
			frame.Delete("image/BackWalk.png");
		if(frame.get("image/land.png") != undefined)
			frame.Delete("image/land.png");
		data.AtiveSwc[1] = false;
		data.AtiveSwc[2] = false;
	}
	else if(data.MovState == "wait")
	{
		if(frame.get("wait") == undefined)
			frame.save("wait", 2, -1);
		draw.anima("image/wait.png", input.KeyX, input.KeyY, 100, 155, 2, 1, 0.3);
		
		if(frame.GetTurn("wait", 0.8) == 1)
		{	
			frame.Delete("stand");
			frame.Delete("wait");
			frame.Delete("image/wait.png");
		}
			
	}
	
	else if(data.MovState == "SitDown")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		
		if(data.AtiveSwc[400] != true)
			data.AtiveSwc[400] = true;
		
		draw.anima("image/sit.png", input.KeyX, input.KeyY, 100, 155, 3, -1, 0.1);
		
		if(frame.getI("stand") == undefined)
		{
			frame.save("stand", 2, -1);
			RightEx(true);
		}
		
		if(frame.GetTurn("stand", 0.3) == 1)
		{
			frame.Delete("stand");
			RightEx(false);
		}	
		
	}
	else if(data.MovState == "StandUp")
	{
		if(frame.getI("stand") != undefined)
		{
			frame.Delete("stand");
		}
		
		if(frame.get("image/sit.png") != undefined && frame.get("StandUp") == undefined)
		{	
			frame.Delete("image/sit.png");
			frame.save("StandUp", 2, -1);
		}
		
		draw.anima("image/sitR.png", input.KeyX, input.KeyY, 100, 155, 3, -1, 0.1);
		
		if(frame.GetTurn("StandUp", 0.2) == 1)
		{	
			frame.Delete("StandUp");
			frame.Delete("image/sitR.png");
			RightEx(false);
			input.KeyAddress[40] = undefined;
			data.AtiveSwc[400] = false;
		}
	}
	
	else if(data.MovState == "fail")
	{
		frame.Delete("stand");
		draw.image("image/fail.png", input.KeyX, input.KeyY);
	}
	else if(data.MovState == "land")
	{
		draw.anima("image/land.png", input.KeyX, input.KeyY, 100, 200, 2, -1, 0.3);
		if(input.SpdX != 6)
			input.SpdX = 6;
	}
	
	else if(data.MovState == "run")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		draw.anima("image/run.png", input.KeyX, input.KeyY, 100, 155, 6, 2, 0.6);
		
	}
	
	else if(data.MovState == "back")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		draw.anima("image/BackWalk.png", input.KeyX, input.KeyY, 100, 155, 3, 1, 0.6);
	}
	
	else if(data.MovState == "hidden")
	{
		frame.Delete("image/stand.png");
		draw.image("image/Hiddenkey_NRA.png", input.KeyX, input.KeyY);
		input.SpdY -= input.SpdY;
	}
	
	else if(data.MovState == "Z")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		data.AtiveSwc[5] = true;
		
		if(frame.get("Z") == undefined)
			frame.save("Z", 2, -1);
		draw.anima("image/Z.png", input.KeyX, input.KeyY, 150, 155, 5, 1, 0.4);
		
		if(frame.GetTurn("Z", 1) == 1)
		{
			data.cencle = 0;
			frame.Delete("Z");
			frame.Delete("image/Z.png");
			data.AtiveSwc[5] = false;
		}
	}
	
	else if(data.MovState == "jump")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		if(data.AtiveSwc[4] != true)
			data.AtiveSwc[4] = true;
		draw.anima("image/jump.png", input.KeyX, input.KeyY, 100, 155, 3, -1, 0.2);
		
		if(input.KeyY + 155 <= 350)
		{
			frame.Delete("image/jump.png");
			data.cencle = 0;
			data.AtiveSwc[4] = false;
		}
		
		if(input.KeyAddress[90] == true)
		{
			frame.Delete("image/jump.png");
			data.cencle = 0;
		}
		
			
	}
	
	else if(data.MovState == "jumpback")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		if(data.AtiveSwc[4] != true)
			data.AtiveSwc[4] = true;
			
		data.AtiveSwc[1] = true;
		draw.anima("image/JumpBack.png", input.KeyX, input.KeyY, 100, 154, 4, -1, 0.3);
		
		if(input.KeyY + 155 <= 400)
		{
			data.cencle = 0;
			frame.Delete("image/JumpBack.png");
			data.AtiveSwc[4] = false;
		}
		
		if(input.KeyAddress[90] == true)
		{
			frame.Delete("image/JumpBack.png");
			data.cencle = 0;
		}
	}
	
	else if(data.MovState == "jumpfoward")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		if(data.AtiveSwc[4] != true)
			data.AtiveSwc[4] = true;
			
		data.AtiveSwc[2] = true;
		draw.anima("image/jump.png", input.KeyX, input.KeyY, 100, 155, 3, -1, 0.2);
		
		if(input.KeyY + 155 <= 400)
		{
			data.cencle = 0;
			frame.Delete("image/jump.png");
			data.AtiveSwc[4] = false;
		}
		
		if(input.KeyAddress[90] == true)
		{
			frame.Delete("image/jump.png");
			data.cencle = 0;
		}
	}
	
	else if(data.MovState == "FailZ")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		data.AtiveSwc[5] = true;
		
		if(frame.get("FailZ") == undefined)
			frame.save("FailZ", 2, -1);
		draw.anima("image/airZ.png", input.KeyX, input.KeyY, 150, 155, 4, 1, 0.4);
		
		if(input.KeyY + 155 <= 350)
		{
			data.AtiveSwc[4] = false;
		}
		
		if(frame.GetTurn("FailZ", 1) == 1)
		{
			data.cencle = 0;
			frame.Delete("FailZ");
			frame.Delete("image/airZ.png");
			data.AtiveSwc[5] = false;
		}
		if(input.KeyY >= 598 - 175)
		{
			data.cencle = 0;
			frame.Delete("FailZ");
			frame.Delete("image/airZ.png");
			data.AtiveSwc[5] = false;
		}
	}
	
	else if(data.MovState == "underZ")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		data.AtiveSwc[6] = true;
		
		if(frame.get("underZ") == undefined)
			frame.save("underZ", 2, -1);
		draw.anima("image/underZ.png", input.KeyX, input.KeyY, 150, 155, 5, 2, 0.4);
		
		if(frame.GetTurn("underZ", 1) == 1)
		{
			data.cencle = 0;
			frame.Delete("underZ");
			frame.Delete("image/underZ.png");
			data.AtiveSwc[6] = false;
		}
	}
	
	else if(data.MovState == "forwardZ")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		data.AtiveSwc[5] = true;
		
		if(frame.get("forwardZ") == undefined)
			frame.save("forwardZ", 2, -1);
		draw.anima("image/forwardZ.png", input.KeyX, input.KeyY, 150, 156, 7, 4, 0.4);
		
		if(frame.GetTurn("forwardZ", 1.2) == 1)
		{
			data.cencle = 0;
			frame.Delete("forwardZ");
			frame.Delete("image/forwardZ.png");
			data.AtiveSwc[5] = false;
		}
	}
	
	else if(data.MovState == "dash")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		
		input.SpdX = 12;
		data.AtiveSwc[2] = true;
		data.AtiveSwc[7] = true;
		
		if(frame.get("dash") == undefined)
			frame.save("dash", 2, -1);
		draw.anima("image/dash.png", input.KeyX, input.KeyY, 100, 155, 3, -1, 0.2);
		
		if(frame.GetTurn("dash", 1) == 1 || input.KeyAddress[39] == false)
		{
			data.cencle = 0;
			frame.Delete("dash");
			frame.Delete("image/dash.png");
			input.SpdX = 6;
			data.AtiveSwc[2] = false;
			data.AtiveSwc[7] = false;
		}
		else if(input.KeyAddress[38] == true)
		{
			data.cencle = 0;
			frame.Delete("dash");
			frame.Delete("image/dash.png");
			data.AtiveSwc[2] = false;
			data.AtiveSwc[7] = false;
		}
	}
	
	else if(data.MovState == "connect")
	{
		frame.Delete("stand");
		frame.Delete("wait");
		frame.Delete("image/wait.png");
		data.AtiveSwc[5] = true;
		
		if(frame.get("connect") == undefined)
			frame.save("connect", 2, -1);
		draw.anima("image/connect.png", input.KeyX, input.KeyY, 150, 155, 13, 0, 0.5);
		
		if(frame.GetTurn("connect", 1) == 1)
		{
			data.cencle = 0;
			frame.Delete("connect");
			frame.Delete("image/connect.png");
			data.AtiveSwc[5] = false;
		}
	}
	
	
	
	//--------------------------------------------------------------------------------------
	
	if(data.AtiveSwc[1] == true)
		input.KeyX -= input.SpdX;//왼쪽
	
	if(data.AtiveSwc[2] == true)
		input.KeyX += input.SpdX;//오른쪽
		
	if(data.AtiveSwc[3] == true)
		input.KeyY += input.SpdY;//아래
		
	if(data.AtiveSwc[4] == true)
		input.KeyY -= (input.SpdY * 2);//위
		
	if(data.AtiveSwc[5] == true)
	{
		frame.Delete("image/sit.png");
		frame.Delete("StandUp");
		frame.Delete("image/sitR.png");
		input.KeyAddress[40] = undefined;//상단공격
	}
	
	if(data.AtiveSwc[6] == true)
		;//하단공격
		
	if(data.AtiveSwc[7] == true)
	{
		frame.Delete("image/sit.png");
		frame.Delete("StandUp");
		frame.Delete("image/sitR.png");
		input.KeyAddress[40] = undefined;
	}//기술토글
	
	if(data.AtiveSwc[101] == true)
	{
		if(frame.getI("toggleL") == undefined)
		{
			frame.save("toggleL", 2, -1);
			RightEx(true);
		}
		if(frame.getI("toggleL") != undefined && frame.GetTurn("toggleL", CumdDelay) == 1)
			{
				frame.Delete("toggleL");
				data.AtiveSwc[101] = false;
				RightEx(false);
			}
	}//Left 토글
		
	if(data.AtiveSwc[102] == true)
	{
		if(frame.getI("toggleR") == undefined)
			frame.save("toggleR", 2, -1);
		
		if(frame.getI("toggleR") != undefined && frame.GetTurn("toggleR", CumdDelay) == 1)
			{
				frame.Delete("toggleR");
				data.AtiveSwc[102] = false;
			}
	}//Right 토글
	
	if(data.AtiveSwc[103] == true)
	{
		if(frame.getI("toggleD") == undefined)
			frame.save("toggleD", 2, -1);
		
		if(frame.getI("toggleD") != undefined && frame.GetTurn("toggleD", CumdDelay) == 1)
			{
				frame.Delete("toggleD");
				data.AtiveSwc[103] = false;
			}
	}//Right 토글
	
	if(data.AtiveSwc[201] == true)
	{
		if(frame.getI("toggleL") != undefined)
		{
			frame.Delete("toggleL");
			data.AtiveSwc[101] = false;
		}
		
		if(frame.getI("blankL") == undefined)
			frame.save("blankL", 2, -1);
		
		if(frame.GetTurn("blankL", CumdDelay) == 1)
			{
				frame.Delete("blankL");
				data.AtiveSwc[201] = false;
				ExclKey(302,false);
			}	
	}//blankL 토글*/
	
	if(data.AtiveSwc[202] == true)
	{
		if(frame.getI("toggleR") != undefined)
		{
			frame.Delete("toggleR");
			data.AtiveSwc[102] = false;
		}
		
		if(frame.getI("blankR") == undefined)
			frame.save("blankR", 2, -1);
		
		if(frame.GetTurn("blankR", CumdDelay) == 1)
			{
				frame.Delete("blankR");
				data.AtiveSwc[202] = false;
			}	
	}//blankR 토글*/
	
	if(data.AtiveSwc[203] == true)
	{
		if(frame.getI("toggleD") != undefined)
		{
			frame.Delete("toggleD");
			data.AtiveSwc[103] = false;
		}
		
		if(frame.getI("blankD") == undefined)
			frame.save("blankD", 2, -1);
		
		if(frame.GetTurn("blankD", CumdDelay) == 1)
			{
				frame.Delete("blankD");
				data.AtiveSwc[203] = false;
			}	
	}//blankR 토글*/
	
	if(data.AtiveSwc[301] == true)
		;//Left 재외 토글
	if(data.AtiveSwc[302] == true)
		;//Right 재외 토글
	if(data.AtiveSwc[303] == true)
		;//under 재외 토글
	if(data.AtiveSwc[304] == true)
		;//top 재외 토글
	if(data.AtiveSwc[305] == true)
		;//Z 재외 토글
		
	if(data.AtiveSwc[400] == true)
		;//stand up 오류 처리 토글
}

function RightEx(state)
{
	data.AtiveSwc[302] = state;
}

function ExclKey(KeyNumber,state)
{
	data.AtiveSwc[KeyNumber] = state;
}


//------------------------------------------------------------------------------------------------중력 관련 함수-------------
function gravity(True_or_False)
{
	if(True_or_False == true)
		input.KeyY += input.SpdY;
	else
		return;
}
function GrviSwitch()
{
	if(input.KeyAddress[8] == true && GrviState == true)
		GrviState = false;
	else if(input.KeyAddress[8] == true && GrviState == false)
		GrviState = true;
}
//------------------------------------------------------------------------------------------------중력 관련 함수-------------
