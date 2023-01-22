const fs = require("fs");
const nets = require('os')["networkInterfaces"]();
var usersInfo = JSON.parse(fs.readFileSync("./json/users.json"));
var fileExist = (path) => fs.existsSync(path);
var isBanned = (url,bannedList) => {
    for (let i of bannedList) if (url.startsWith(i)) return true;
    return false;
}
var getServerIPs = () => {
    var arrOfIP = ["localhost"];
    for (let net in nets) {
        for (let ip of nets[net]) {
            if(ip.family=="IPv4"){
                arrOfIP.push(ip.address);
            }
        };
    };
    return arrOfIP;
}

// var isRegistered = (clientIP) => {
//     if (clientIP==)
// }
module.exports = {fileExist,isBanned,usersInfo,getServerIPs};