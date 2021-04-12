const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
	fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		} else {
			handleOutput(data, out);
		}
	});
}

async function webCat(url) {
	try {
		let resp = await axios.get(url);
		console.log(resp.data);
	} catch (error) {
		console.error(
			`Sorry, we couldn't find ${url}, \n\nHere is what happened, ${error}.`
		);
		process.exit(1);
	}
}

function handleOutput(text, out) {
	if (out) {
		fs.writeFile(out, text, 'utf8', function (err) {
			if (err) {
				console.error(`Couldn't write ${out}: ${err}`);
			}
		});
	} else {
		console.log(text);
	}
}

let path;
let out;

if (process.arg[v] === '--out') {
	out = process.argv[3];
	path = process.argv[4];
} else {
	path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
	webCat(path, out);
} else {
	cat(path, out);
}
