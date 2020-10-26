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



//addLoadEvent(prepareGallery);
window.onload = prepareGallery;