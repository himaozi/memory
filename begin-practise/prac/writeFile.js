"use strict";
var fs=require('fs');
var data='hello node.js';
fs.writeFile('output.txt',data,function(err){
	if (err)
	{console.log('err');
	}else{
		console.log('ok.')
	}
}
);
