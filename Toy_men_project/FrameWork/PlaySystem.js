function PlayBase()
{
	this.volume = 1;
	
	return this;
}

var play = new PlayBase();


PlayBase.prototype.sound = function(FileName, SureLoop)
{
	switch(arguments.length)
	{
	case 1:
	
		var i = sound.I(FileName);
		
		for(;sound.file[i].name == FileName; i++)
		{
			if(sound.file[i].SurePlaying == true && sound.file[i].data.ended == true)
			{
				sound.file[i].data.load();
				sound.file[i].SurePlaying = false;
			}
			
			if(sound.file[i].SurePlaying == false)
			{
				sound.file[i].data.Volume = this.volume;
				sound.file[i].data.play();
				sound.file[i].SurePlaying = true;
				break;
			}
		}
		
		if(sound.file[i].name != FileName)
			return undefined;
		
		break;
		
	case 2:
	
		if(SureLoop == false)
		{
			var i = sound.I(FileName);
			
			if(sound.file[i].SurPlaying == true)
			{
				sound.file[i].data.pause();
				sound.file[i].data.load();
				sound.file[i].SurePlaying == false;
				sound.file[i + 1].data.Volume = this.volume;
				sound.file[i + 1].data.play();
				
				return;
			}
			
			else
			{
				sound.file[i + 1].data.pause();
				sound.file[i + 1].data.load();
				sound.file[i].SurePlaying == true;
				sound.file[i].data.Volume = this.volume;
				sound.file[i].data.play();
				
				return;
			}
		}
		
		else
		{
			var i = sound.I(FileName);
			
			if(sound.file[i].SurPlaying == false)
			{
				sound.file[i].data.loop = true;
				sound.file[i].data.Volume = this.volume;
				sound.file[i].data.play();
				sound.file[i].SurePlaying = true;
				
				return;
			}
			
			else
			{
				return;
			}
		}
		
		break;
		
	default:
		return undefined;
	}
};

//영상의 재생은 추후에 추가한다.

PlayBase.prototype.control = function(FileName, State)
{
	var i = sound.I(FileName);
	
	switch(state)
	{
	case "stop":
		sound.file[i].SurPlaying = false;
		sound.file[i].data.pause();
		sound.file[i].data.load();
		sound.file[i].data.loop = false;
		break;
		
	case "pause":
		sound.file[i].data.pause();
		break;
		
	case "play":
		sound.file[i].SurPlaying = true;
		sound.file[i].data.play();
		break;
		
	default:
		return undefined;
	}
};

//영상의 재생을 제어하는 함수는 추후 추가한다.

PlayBase.prototype.vol = function(PerValue)
{
	if(PerValue < 0 || PerValue > 100)
		this.volume = 1;
	else
		this.volume = PerValue / 100;
};

//영상속 소리의 크기를 조정하는 함수는 추후에 추가한다.

PlayBase.prototype.SndEffect = function()
{
	//각종 이펙트는 필요에따라 구현한다.
};
