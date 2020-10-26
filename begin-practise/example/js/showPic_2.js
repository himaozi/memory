function showPic(whichpic){
	if (!document.getElementById("placeholder")){return false;} //判断是否能得到id=placeholder的元素。 
	var source = whichpic.getAttribute("href");//获得链接的href。
	var placeholder = document.getElementById("placeholder");
	
	placeholder.setAttribute("src", source);
	if (document.getElementById("description")){
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3){
			description.firstChild.nodeValue = text;
		}
	}
	return true;
}
function prepareGallery(){
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var link = gallery.getElementsByTagName("a");
	for (var i=0;i<link.length;i++){
		link[i].onclick = function(){
			return showPic(this)?false:true;
		}
	}
} 

function addLoadEvent(func){
	var oldload = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldload();
			func();
		}
	}
}
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
function preparePlaceholder(){
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/empty.png");
	placeholder.setAttribute("alt","My picture gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var destext = document.createTextNode("Choose an image");
	description.appendChild(destext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);



























 
