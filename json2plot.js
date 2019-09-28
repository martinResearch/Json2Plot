function plotly_jmespath_parse(jsonstr,plotstr){
	log_html= document.getElementById('log')
	log_html.innerHTML=""
	try{
		data = JSON.parse(jsonstr); 
	}
	catch(err) {
		log_html.innerHTML+="error data:"+err.message+"<br>"
		return
	}
	try{					
		plots = JSON.parse(plotstr);
	}
	catch(err) {
		log_html.innerHTML+="error plot:"+err.message+"<br>"
		return
	}

	console.log(data)
	console.log(plots)
	
	function iter_object(data,o) {
		Object.keys(o).forEach(function (key) {
			if (o[key] !== null && typeof o[key] === 'object') {
				iter_object(data,o[key]);
				return;
			}
			if ((typeof o[key] === 'string')&&(o[key].length>0)&&o[key].charAt(0)=='$')  {
					log_html.innerHTML += "evaluating \""+key+"\":\""+o[key]+"\""
					try {
						result = jmespath.search(data, o[key].substring(1))
						o[key] = result
						log_html.innerHTML+="found "+result.length+ " entries<br>"
					}
					catch(err) {
					log_html.innerHTML+="error:"+err.message+"<br>"
						
					}
				
			}
		});
	}

	iter_object(data,plots)
	console.log(plots)
	Plotly.newPlot('plot', plots["data"],plots["layout"]);		
}


