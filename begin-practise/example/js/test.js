window.onload = function(){
	var para = document.createElement("p");
	var text = document.createTextNode("Hello World");
	para.appendChild(text);
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);
}