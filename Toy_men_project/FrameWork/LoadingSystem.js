function LoadBase()
{
	this.file = new Array();
	this.FileName = new Array();
	
	this.CurLodFile = 0;
	this.TotLodFile = 0;
	
	this.LoadDone = false;

	return this;
}

var loadI = new LoadBase();
var loadS = new LoadBase();

LoadBase.prototype.addI = function (FileName)
{
	if(this.LoadDone == true)
	{
		this.CurLodFile = 0;
		this.TotLodFile = 0;
	
		this.LoadDone = false;
	}
	
	if(this.file[0] != undefined)
		this.file.pop();
		
	if(FileName != "patch")
	{
		this.TotLodFile ++;
		this.FileName.push(FileName);
	}
	
	else
	{
	
		for(var i = this.TotLodFile - 1; i > -1; i--)
		{
			var image = new Image();
			image.src = this.FileName[i];
			image.addEventListener("load", CompleteFileI, false);
			this.file.push({name: this.FileName[i], data: image});
		
			delete image;
		}
		
		this.FileName.pop();
		this.LoadDone = true;
		
		return this;
	}
};

var image;


GetDataImage();
image = loadI.addI("patch");

LoadBase.prototype.addS = function(FileName, PatchCount)
{
	if(this.LoadDone == true)
	{
		this.CurLodFile = 0;
		this.TotLodFile = 0;
	
		this.LoadDone = false;
	}
	
	if(this.file[0] != undefined)
		this.file.pop();
	
	switch(arguments.length)
	{
	case 1:
		
		if(FileName != "patch")
		{
		this.TotLodFile++;
		this.FileName.push({name: FileName, argu: 1});
		break;
		}
		
		else
		{
			for(var i = this.TotLodFile - 1; i > -1; i--)
			{
				for(var I = this.FileName[i].argu - 1; I > -1; I--)
				{
					var sound = new Audio();
					sound.src = this.FileName[i].name;
					document.body.appendChild(sound);
					sound.addEventListener("canplaythrough", CompleteFileS, false);
					this.file.push({name: this.FileName[i].name, data: sound, SurePlaying: false});
					
					delete sound;
				}
			}
			
			this.FileName.pop();
			this.LoadDone = true;
			
			return this;
			
		}
	case 2:
		this.TotLodFile++;
		this.FileName.push({name: FileName, argu: PatchCount});
		break;		
	}
	
};

var sound;


GetDataSound();
sound = loadS.addS("patch");

LoadBase.prototype.get = function(FileName)
{
	for(var i = 0; i < this.TotLodFile; i++)
	{		
		if(this.file[i].name == FileName)
			return this.file[i].data;
	}
	
	return undefined;
};

LoadBase.prototype.I = function(FileName)
{
	for(var i = 0; i < this.TotLodFile; i++)
	{
		if(this.file[i].name == FileName)
			return i;
	}
	
	return undefined;
};


function CompleteFileI()
{
	image.CurLodFile++;
};

function CompleteFileS()
{
	sound.CurLodFile++;
};