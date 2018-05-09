const fs = require('fs');

const generatePage = () => new Promise((resolve, reject) => {
  // parse file
	var readStream = fs.createReadStream('./src/page-to-parse.html', 'utf8');
	let data = '';
	let scrapedData;
	readStream.on('data', function(chunk) {
		data += chunk;
	}).on('end', function() {
		const startI = data.indexOf(' id=\'relevant\'');

		// search for start tag
		let i = startI;
		let tagNameBuffer = [];
		while (data[i] !== '<') {
			if (data[i] === ' ') {
				tagNameBuffer = [];
			} else {
				tagNameBuffer.push(data[i]);
			}
			i -= 1;
		}
		const tagName = tagNameBuffer.reverse();
		const endI = data.indexOf(`</${tagName}>`, startI);

    resolve(`<!DOCTYPE html>
    <html>
    <head>
      <title>Server-Side</title>
    </head>
    <body>
      <h1>Server-Side Rendering</h1>
      <p>
      Example of server-side rendering. Upon receiving the GET request, we parse the static file,
      and pass the parsed data into a JS function that inserts it into a html template,
      and returns the hydrated html as a string.
      </p>
      <p>Here's the data we grabbed:</p>
      <p>${data.substring(startI, endI)}</p>
    </body>
    </html>`);
  })
  .on('error', (e) => {
    reject(e);
  })
});

module.exports = generatePage;
