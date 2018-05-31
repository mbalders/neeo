const { execSync } = require('child_process');

const packageFile = require(process.cwd() + '/package.json');
const devices = packageFile.neeoDevices || {};

console.log("Installing devices...")

for (d in devices){
	console.log("Installing... " + d);
	execSync("git clone " + devices[d] + " devices/" + d);
	execSync("npm install devices/" + d + "  --prefix ./devices/" + d);
}