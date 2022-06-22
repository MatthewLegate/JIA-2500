const QRCode = require('qrcode');

const generateQR = async text => {
	try {
		return await QRCode.toDataURL(text);
	} catch (err) {
		console.log(err);
	}
};


export {generateQR};