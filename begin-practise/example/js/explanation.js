function displayAbbreviations(){
	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length<1) {return false};
	var defs = new Array();
	for (var i=0;i<abbreviations.length;i++){
		var definition = abbreviations[i].getAttribute("title");
		var key = abbreviations[i].lastChild.nodeValue;
		defs[key] = definition;
	}


var dlist = document.createElement("dl");
for (key in defs){
	var definition = defs[key];
	var dtitle = document.createElement("dt");
	var dtitle_text = document.createTextNode(key);
	dtitle.appendChild(dtitle_text);
	var ddesc = document.createElement("dd");
	var ddesc_text = document.createTextNode(definition);
	ddesc.appendChild(ddesc_text);
	dlist.appendChild(dtitle);
	dlist.appendChild(ddesc);
}
var header = document.createElement("h2");
var header_text = document.createTextNode("Abbreviations");
header.appendChild(header_text);
document.body.appendChild(header);
document.body.appendChild(dlist);

}
function displayCitations(){
	var quotes = document.getElementsByTagName("blockquote");
	for (var i=0;i<quotes.length;i++){
		if(!quotes[i].getAttribute("cite")){continue;};
		var url = quotes[i].getAttribute("cite");
		var quoteChildren = quotes[i].getElementsByTagName("*");
		if (quoteChildren.length<1){continue;};
		var elem = quoteChildren[quoteChildren.length-1];
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href",url);
		var superscript = document.createElement("sup");
		superscript.appendChild(link);
		elem.appendChild(superscript);
	}
}
function displayAccesskeys(){
	var link = document.getElementsByTagName("a");
	var keys = new Array();
	for (var i=0;i<link.length;i++){
		if (!link[i].getAttribute("accesskey")){continue;};
		var key = link[i].getAttribute("accesskey");
		var text = link[i].lastChild.nodeValue;
		keys[key] = text;
	}
	var list = document.createElement("ul");
	for (key in keys){
		var text = keys[key];
		var str = key+":"+text
		var item = document.createElement("li");
		var item_text = document.createTextNode(str);
		item.appendChild(item_text);
		list.appendChild(item);
	} 
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Accesskey");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(list);
}
addLoadEvent(displayAbbreviations);
addLoadEvent(displayCitations);
addLoadEvent(displayAccesskeys);

