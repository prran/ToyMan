function MasterBase()
{
	this.ShowDetail = false;
	this.RealTime = 0;
	this.FrmCount = 0;
	
	return this;
}

var master = new MasterBase();


MasterBase.prototype.point = function(x, y, strX, strY, finX, finY)
{
	if(this.ShowDetail == true)
		draw.paint("#ff0000", x - 1, y - 1, x, y);
	
	if(strX < x && finX > x)
	{
		if(strY < y && finY > y)
		{
			return true;
		}
	}
	
	else
		return false;
};


MasterBase.prototype.line = function(strX, strY, finX, finY, point, position)
{	
	if(position == "up" || position == "down")
	{
		var a = strX;
		var A = finX;
		var b = strY;
		var B = finY;
		var I = point.x;
		
		if(I <= a && I >= A)
			return -1;
	}
	
	else
	{
		var a = strY;
		var A = finY;
		var b = strX;
		var B = finX;
		var I = point.y;
		
		if(I <= a && I >= A)
			return -1;
	}
	
	if(position == "up" || position == "right")
		var value = b + ((I - a) * ((B - b) / (A - a)));
		
	else
		var value = b - ((I - a) * ((B - b) / (A - a)));

	if(value - Math.floor(value) >= 0.9)
		value = Math.ceil(value);
	else
		value = Math.floor(value);
		
	if(this.ShowDetail == true)
	{
		if(position == "up" || position == "down")
		{
			var HeiY;
	
			for(var i = strX; i != finX; i++)
			{
				if(position == "up")
					HeiY = strY + ((i - strX) * ((finY - strY)/(finX - strX)));
				else
					HeiY = strY - ((i - strX) * ((finY - strY)/(finX - strX)));
				
				if(HeiY - Math.floor(HeiY) >= 0.9)
					HeiY = Math.ceil(HeiY);
				else
					HeiY = Math.floor(HeiY);
			
				draw.paint("#ff0000", i - 1, HeiY - 1, i, HeiY);
			}
		}
		
		else
		{
			var WidX;
			
			for(var i = strY; i != finY; i++)
			{
				if(position == "right")
					WidX = strX + ((i - strY) * ((finX - strX)/(finY - strY)));
				else
					WidX = strX - ((i - strY) * ((finX - strX)/(finY - strY)));
					
				if(WidX - Math.floor(WidX) >= 0.9)
					WidX = Math.ceil(WidX);
				else
					WidX = Math.floor(WidX);
					
				draw.paint("#ff0000", WidX - 1, i - 1, WidX, i);
			}
		}
	}
	
	return true;
};


MasterBase.prototype.box = function(strX, strY, finX, finY, pointX, pointY)
{
	if(this.ShowDetail == true)
	{
		draw.paint("#ff0000", strX, strY, finX, strY + 1);
		draw.paint("#ff0000", strX, finY - 1, finX, finY);
		draw.paint("#ff0000", strX, strY, finX + 1, finY);
		draw.paint("#ff0000", finX - 1, strY, finX, finY);
	}
			
	if(strX < pointX && finX > pointX)
	{
		if(strY < pointY && finY > pointY)
		{
			return true;
		}
	}

	else
		return false;
};


MasterBase.prototype.fps = function()
{
	if(this.ShowDetail == true)
	{
		var SubTime = new Date();
		
		if(this.RealTime == 0)
		{
			this.FrmCount = frame.count;
			this.RealTime = SubTime.getTime();
		}
		
		if(this.RealTime + 1000 >= SubTIme.getTime())
		{
			var value = frame.count = this.FrmCount;
			this.RealTime = 0;
			
			return value;
		}
	}
	
	return 0;
};


MasterBase.prototype.clear = function(DataName)
{
	//이미지 사운드 애니메이션 프레임 마우스 키보드 스크린중 하나를 삭제. 필요에따라 구현.
};


MasterBase.prototype.masage = function()
{
	//원하는 종류의 로그를 남긴다. 필요에따라 구현.
};
