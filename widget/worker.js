// worker.js

let xhr = new XMLHttpRequest();
xhr.open('POST', 'http://m.ctrip.com/restapi/soa2/10101/json/bannersearch');
xhr.send('{"ver":615,"cid":"2","head":{"cid":"09031011210220861783","ctok":"","cver":"1.0","lang":"01","sid":"8888","syscode":"09","auth":null,"extension":[{"name":"protocal","value":"http"}]},"contentType":"json"}');
xhr.onreadystatechange = (state) => {
	if (xhr.readyState === 4 && xhr.status === 200) {
		let response = JSON.parse(xhr.responseText);
		response.ResponseStatus && (delete response.ResponseStatus)
		postMessage(response);
	}
}

postMessage({a: 1});