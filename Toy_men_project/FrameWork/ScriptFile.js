function ScriptFile(address)
{
	var script;
	script = document.createElement("script");
	script.setAttribute("src", address);
	document.getElementsByTagName("head")[0].appendChild(script);
}

ScriptFile("FrameWork/LoadingSystem.js");
ScriptFile("FrameWork/DrawSystem.js");
ScriptFile("FrameWork/PlaySystem.js");
ScriptFile("FrameWork/FrameSystem.js");
ScriptFile("FrameWork/InputSystem.js");
ScriptFile("FrameWork/MasterSystem.js");