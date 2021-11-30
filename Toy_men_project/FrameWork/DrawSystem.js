function DrawBase(CanvasId, width, height)
{
	this.canvas = CanvasId;
	this.width = width;
	this.height = height;
	this.alpha = 1;
	
	return this;
};

var draw;


DrawBase.prototype.paint = function(ColorId, StrX, StrY, FinX, FinY)
{
	var GetCvs = document.getElementById(this.canvas);
	var pencil = GetCvs.getContext("2d");
	pencil.globalAlpha = this.alpha;
	
	pencil.fillStyle = ColorId;
	pencil.fillRect(StrX, StrY, FinX, FinY);
};


DrawBase.prototype.text = function(string, x, y, ColorId, font)
{
	var GetCvs = document.getElementById(this.canvas);
	var pencil = GetCvs.getContext("2d");
	pencil.globalAlpha = this.alpha;
	
	switch(arguments.length)
	{
	case 3:
		pencil.fillStyle = "#000000";
		pencil.font = '15px Arial';
		pencil.fillText(string, x, y);
		break;
	case 4:
		pencil.fillStyle = ColorId;
		pencil.font = '15px Arial';
		pencil.fillText(string, x, y);
		break;
	case 5:
		pencil.fillStyle = ColorId;
		pencil.font = font;
		pencil.fillText(string, x, y);
		break;
	default:
		return;
	}
};

DrawBase.prototype.image = function(FileName, x, y, width, height)
{
	var GetCvs = document.getElementById(this.canvas);
	var pencil = GetCvs.getContext("2d");
	pencil.globalAlpha = this.alpha;
	
	switch(arguments.length)
	{
	case 1:
		pencil.drawImage(image.get(FileName), 0, 0, this.width, this.height);
		break;
	case 3:
		pencil.drawImage(image.get(FileName), x, y);
		break;
	case 5:
		pencil.drawImage(image.get(FileName), x, y, width, height);
		break;
	default:
		return;
	}
};

DrawBase.prototype.anima = function(FileName, x, y, width, height, FrmElement, RvsPoint, PlayTime)
{
	var GetCvs = document.getElementById(this.canvas);
	var pencil = GetCvs.getContext("2d");
	pencil.globalAlpha = this.alpha;
	
	var CurFrame;
	
	switch(arguments.length)
	{
	case 6:
		if(frame.get(FileName) == undefined)
			frame.save(FileName, FrmElement);
		
		CurFrame = frame.GetTurn(FileName) * width;
		
		break;
	case 7:
		if(frame.get(FileName) == undefined)
			frame.save(FileName, FrmElement, RvsPoint);
		
		CurFrame = frame.GetTurn(FileName) * width;
		
		break;
	case 8:
		if(frame.get(FileName) == undefined)
			frame.save(FileName, FrmElement, RvsPoint);
		
		CurFrame = frame.GetTurn(FileName, PlayTime) * width;
		
		break;
	default:
		return undefined;
	}
	
	pencil.drawImage(image.get(FileName) ,CurFrame, 0, width, height, x, y, width, height);
};


DrawBase.prototype.SetAph = function(PerVlaue)
{
	if(PerVlaue < 0 || PerVlaue > 100)
		this.alpha = 1;
	else
		this.alpha = PerVlaue / 100;
};


DrawBase.prototype.scrEffect = function(EffName)
{
	//각종 이펙트는 필요에 따라 구현한다.
};