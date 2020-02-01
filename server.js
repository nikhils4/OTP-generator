const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

function genotp() {
	let hash = crypto.createHmac('sha512', process.env.SECRETHASH)
	.update(String(new Date().getTime()))
	.digest('hex');
	let last = hash.slice(-1);
	let start = parseInt(last, 16);
	let str = hash.substring(start, start + 8);
	let value = parseInt(str, 16);
	let otp = value%Math.pow(10,6);
	return otp;
}

app.use(cors());
app.get("/generateotp", (request, response) => {

	let otp = genotp();
	if(String(otp).length <= 5){
		while(String(otp).length <= 5){
			console.log(otp);
			otp = genotp();
		}
	}
console.log(otp)
	response.json({
		otp
	})
})

app.listen(port, () => {
	console.log("The server is up");
});