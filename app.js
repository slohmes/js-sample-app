"use strict";

var http = require('http'),
fs = require('fs');

function serveStaticFile(response, path, contentType, responseCode) {
	if(!responseCode) responseCode = 200;

	// asynchronously reads file & executes callback function
	fs.readFile(__dirname + path, function(error, data) {
		if (error) {
			response.writeHead(500, { 'Content-Type': 'text/plain' });
			response.end('500 - Internal Error');
		} else {
			response.writeHead(responseCode, { 'Content-Type': contentType });
			response.end(data);
		}
	});
}

http.createServer( function(request, response){

	var normalizedPath = stripQuerystringAndTrailingSlash(request.url).toLowerCase();

	switch (normalizedPath) {
		case '':
			serveStaticFile(response, '/src/home.html', 'text/html');
			break;
		case '/about':
			serveStaticFile(response, '/src/about.html', 'text/html');
			break;
		case '/img/logo.jpg':
			serveStaticFile(response, '/src/img/logo.jpg', 'image/jpeg');
			break;
		default:
			serveStaticFile(response, '/src/404.html', 'text/html', 400);
			break;
	}
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl+c to terminate...');


function stripQuerystringAndTrailingSlash(path) {
	return path.replace(/\/?(?:\?.*)?$/, '');
}