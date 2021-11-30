function FrameBase(MainFrame)
{
	this.count = 0;
	this.time = new Array();
	this.time.push({name: undefined, argu: undefined, point: undefined, data: undefined, revarse: false});
	this.length = 1;
	this.RvsCount = [];
	this.SureRevarse = [];
	this.OnePlySwc = [];
	this.MainFrame = MainFrame;
	this.SubCount = 0;
	this.SurePause = false;
		
	return this;
}

var frame;


FrameBase.prototype.save = function(FileName, FrmElement, RvsPoint)
{
	for(var i = 0; i < this.length; i++)
	{
		if(this.time[i].name == undefined)
		{
			switch(arguments.length)
			{
			case 1:
				this.time[i].name = FileName;
				this.time[i].argu = 1;
				this.time[i].data = this.count;
				return;
				break;
				
			case 2:
				this.time[i].name = FileName;
				this.time[i].argu = FrmElement;
				this.time[i].data = this.count;
				return;
				break;
			case 3:
				this.time[i].name = FileName;
				this.time[i].argu = FrmElement;
				this.time[i].data = this.count;
				this.time[i].point = RvsPoint;
				this.RvsCount[i] = 0;
				this.OnePlySwc[i] = false;
				return;
				break;
			default:
				return undefined;
			}
		}
	}
	
	switch(arguments.length)
	{
	case 1:
		this.time.push({name:FileName, argu: 1, point: undefined, data: this.count, revarse: false});
		this.length++;
		break;
	case 2:
		this.time.push({name:FileName, argu: FrmElement, point: undefined, data: this.count, revarse: false});
		this.length++;
		break;
	case 3:
		this.time.push({name:FileName, argu: FrmElement, point: RvsPoint, data: this.count, revarse: false});
		this.length++;
		break;
	}
};


FrameBase.prototype.Delete = function(FileName)
{
	for(var i = 0; i < this.length; i++)
	{
		if(this.time[i].name == FileName)
		{
			this.time[i].name = undefined;
			this.time[i].argu = undefined;
			this.time[i].data = undefined;
			this.time[i].point = undefined;
			this.SureRevarse[i] = undefined;
			return;
		}
	}
	return undefined;
};


FrameBase.prototype.get = function(FileName)
{
	for(var i = 0; i < this.length; i++)
	{
		if(this.time[i].name == FileName)
			return this.time[i].data;
	}
	return undefined;
};

FrameBase.prototype.getI = function(FileName)
{
	for(var i = 0; i < this.length; i++)
	{
		if(this.time[i].name == FileName)
			return i;
	}
	return undefined;
};



//난이도 헬 함수.부가설명을 참고할것.
FrameBase.prototype.GetTurn = function(FileName, PlayTime)
{	
	var count;
	var turn;
	
	if(this.SurePause == true)
		count = this.SubCount;
	else
		count = this.count;//일시상태를 받을지 일반상태를 받을지 인식한다.
		
	for(var i = 0; i < this.length; i++)
	{
		if(this.time[i].name == FileName)
		break;
	}//파일목록에서  원하는 파일을 꺼내온다.
	
	var RunTime = count - this.time[i].data; //해당 프레임이 저장된뒤 지나간 프레임의 수를 반환한다.
											 //count는 매 프레임마다 지속적으로 오른다.
	
	var revarse = this.time[i].revarse;
	
	switch(arguments.length)
	{
		
	case 1:
	
		if(this.time[i].point == undefined || this.time[i].point == 0)//역주행 없는 프레임반복을 사용하지 않을때 작동한다.
		{
			
			turn = (RunTime + this.time[i].argu) % this.time[i].argu;//나머지 값을 반환하면 argu만큼의 프레임이 지날때 마다 값이 0이 될것이다.
																		 //즉 필요한 값인 0 ... argu-1 의 값을 반복적으로 얻는다.
																		 //argu를 더한뒤 나머지를 구하는이유는 argu보다 RunTime이 작아서
																		 //연산의 요류로 지속적인 0이 나오는 구간을 없애기 위함이다.
			return turn;
		}
		
		else if(this.time[i].point == -1)//프레임 반복을 사용하지 않을때 작동한다.
		{
			turn = RunTime;
			if(turn > this.time[i].argu - 1)//턴이 마지막 프레임을 넘어갔을때.
			{
				this.time[i].point = -2;//이 함수를 더이상 실행하지 않게한다.
				turn = this.time[i].argu -1;//그리고 마지막 컷으로 복귀한다.
			}
			return turn;
		}
		// -->이어서
		else if(this.time[i].point == -2)
		{
			turn = this.time[i].argu - 1;//고정되게 마지막 컷만 지속 전달한다.
			return turn;
		}
		
		else if(this.time[i].point > 0)//역주행 프레임 반복을 사용할때 작동한다.
		{
			var RvsArgument = this.time[i].argu + (this.time[i].argu - this.time[i].point);//기존프레임과 역주행되며 다시 호출되는 프레임
																						   //을 합친 실질 총 프레임을 저장한다.
			if(RunTime < RvsArgument)
				turn = (RunTime + RvsArgument) % RvsArgument;
			
			else
			{
				turn = (RunTime + RvsArgument + this.RvsCount[i]) % RvsArgument;
				this.SureRevarse[i] = false;
			}
			
			if(turn >= this.time[i].argu)
			{
				this.SureRevarse[i] = true;
				turn = turn % this.time[i].argu;
				turn = this.time[i].argu - turn - 2;
			}
			
			if((turn == (this.time[i].point - 1)) && this.SureRevarse[i] == true)
			{
				this.RvsCount[i] += this.time[i].point;
			}

			return turn;
		}
		
		else
			return undefined;
	
	case 2:
	
		var SecPerFrame = this.time[i].argu / (this.MainFrame * PlayTime);// 초당 프레임수인 메인프레임을 실행시간 만큼 콥하면 해당 시간동안 지나간
																		  // 프레임수를 구할수 있다. 구하고자하는 프레임의 요소수에 이 값을 나누면
																		  // 실행시간에 맞춰 프레임이 완료되는 값을 얻을수 있다.
		
		if(this.time[i].point == 0 || this.time[i].point == undefined)
		{
			var turn = (RunTime * SecPerFrame + this.time[i].argu) % this.time[i].argu;//런타임은 지속적으로 1씩 오를것이다.
																					   //그 값에 지속적으로 초당프레임을 곱해서
																					   //포당프레임이 총 프레임의 값이 될때까지 값을 올린다.
			
			turn = NumClear(turn);//연산의 문제상 턴수는 정수값에 다다를때마다 근사값이 나올수 밖에 없다.
								  //이를 바로잡기위해 소수점 0.99 이상일경우 반올림하고 그외는 버린다.
			
			if(turn >= this.time[i].argu)
				turn = this.time[i].argu - 1;
			return turn;
		}
		
		else if(this.time[i].point == -1)
		{
			var turn = RunTime * SecPerFrame;
			
			turn = NumClear(turn);
				
			if(turn > this.time[i].argu - 1)//턴이 마지막 프레임을 넘어가면 실행된다.
			{
				this.time[i].point = -2;
				turn = this.time[i].argu - 1;
			}
			
			if(turn >= this.time[i].argu)
				turn = this.time[i].argu - 1;
			
			return turn;
		}
		// -->이어서
		
		else if(this.time[i].point == -2)
		{
			turn =this.time[i].argu - 1;
			
			return turn;
		}
		
		else if(this.time[i].point > 0)
		{
			var RvsArgument = this.time[i].argu + (this.time[i].argu - this.time[i].point);
			
			SecPerFrame = (RvsArgument - this.time[i].point) / (this.MainFrame * PlayTime);// 처음에 실행된뒤, 반복이 실행되는 요소수를
																						   // 기준으로 초당 프레임을 구한다.
			if((RunTime * SecPerFrame) < RvsArgument)
			{
				turn = ((RunTime * SecPerFrame) + RvsArgument) % RvsArgument;
				turn = NumClear(turn);
			}
			
			else
			{
				turn = ((RunTime * SecPerFrame) + RvsArgument + this.RvsCount[i]) % RvsArgument;
				turn = NumClear(turn);
				this.SureRevarse[i] = false;
			}
				
			if(turn >= this.time[i].argu)
			{
				this.SureRevarse[i] = true;
				turn = turn % this.time[i].argu;
				turn = this.time[i].argu - turn - 2;
			}
			
			if(turn == (this.time[i].point - 1) && this.OnePlySwc[i] == false)
				this.OnePlySwc[i] = true;
			
			if(this.OnePlySwc[i] == true && this.SureRevarse[i] == true)
			{
				this.RvsCount[i] += this.time[i].point;
				this.OnePlySwc[i] = undefined;
			}
			
			if(turn != (this.time[i].point - 1))
				this.OnePlySwc[i] = false;

			return turn;
		}
		
		else
			return undefined;
		
	default:
		return undefined;		
	}
};
//현재 리버스 포인트가 2 이상일경우 프레임이 비정상적으로 흘러가는 현상이 발견됨.

FrameBase.prototype.set = function(state)
{
	switch(state)
	{
	case "start":
		this.count++;
		break;
	
	case "end":
		this.count = 0;
		break;
		
	default:
		return undefined;
	}
};


FrameBase.prototype.SubSet = function(state_or_number)
{
	switch(state_or_number)
	{
	case "start":
		this.SubCount++;
		this.SurePause = true;
		return true;
		break;
	
	case "end":
		this.SubCount = 0;
		this.SurePause = false;
		return false;
		break;
		
	default:
		if(state_or_number > 0)
		{
			this.SubCount++;
			this.SurePause = true;
			
			if(this.SubCount / this.MainFrame >= state_or_number)//서브카운트가 메인 프레임만큼 쌀이면 1초가 지난다. 여기서 state는 대기할 시간초값을 의미한다.
			{
				this.SubCount = 0;
				this.SurePause = false;
				return false;
			}
			
			return true;
		}
		else
			return undefined;
	}
};


FrameBase.prototype.skip = function(value, state)
{
	switch(arguments.length)
	{
	
	case 1:
		
		if(this.SurPause == true)
			this.SubCount += value;
		else
			this.count += value;
		
		break;
		
	case 2:
		
		switch(state)
		{
			
		case "count":
		
			if(this.SurPause == true)
				this.SubCount += value;
			else
				this.count += value;
			
			break;
			
		case "state":
		
			if(this.SurPause == true)
			{
				if(this.SubCount < value)
					this.SubCount = value;
			}
			else
			{
				if(this.count < value)
					this.count = value;
			}
		
			break;
			
		case "work":
		
			if(this.SurePause == true)
			{
				if(this.SubCount % value == 0)
					return true;
				
				return false;
			}
			
			else
			{
				if(this.count % value == 0)
					return true;
				
				return false;
			}
			
		default:
			return undefined;
		}
		
	default:
		return undefined;
	}
};

function NumClear(number)
{
	if(number - Math.floor(number) >= 0.99)
		number = Math.ceil(number);
	else
		number = Math.floor(number);
		
	return number;
}
