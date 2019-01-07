var calc = function(n1, n2, callback){
	console.log(fact);
	return callback(n1, n2);

}
var cake = function(msg){
	console.log(msg);
	console.log(fact);
}

function util(){
	fact = 100;
	var res = calc(1, 2, function(a, b){
		if(a - b < 0)
			fact = 0;
		return a-b;
	});
	if(res < 0)
		fact = 0;
	console.log(fact);
}


util();
cake("Halloween");