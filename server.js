//including required packages
const fs = require("fs");
const path = require("path");
const webApp = require("express")();
const server = require("http").createServer(webApp);
//including custom libs
JSON.parse(fs.readFileSync("./json/customModules.json")).forEach((mpath) => {
    let myModule = require("./modules/"+mpath);
    Object.keys(myModule).forEach((key) => {global[key] = myModule[key];});
});
//getting file system and banned content
var jsonParsedFileSystem = JSON.parse(fs.readFileSync("./json/fileSystem.json"));
var fileSystem = jsonParsedFileSystem.system;
var bannedURLs = jsonParsedFileSystem.banned;
delete jsonParsedFileSystem;
//opening port 80
var serverIPs = getServerIPs();
server.listen(80, () => {
    console.log("listening on port 80...");
});

webApp.use((req, res, next) => {
    let domain = req.get("host");
    let clientIP = req.socket.remoteAddress;
    if (serverIPs.includes(domain)) clientIP = "admin";
    if (req.url=="/") {
        res.sendFile(
            fileSystem[req.url].url, 
            {root: path.join(__dirname)}, 
            err => {
                if (err) next(err);
                else console.log('Sent:', fileSystem[req.url].name);
            }
        );
    } else if (req.url.startsWith("/")) {
        console.log(`Client ${clientIP} requested: "${req.url}"`);
        let handler = fileSystem[req.url];
        if (fileSystem[req.url]===undefined) {
            handler = fileSystem["pageNotFound"];
        }
        let file = handler.url;
        let name = handler.name;
        if (fileExist(("."+req.url).toString()) && fileSystem[req.url]===undefined && !isBanned(req.url,bannedURLs)) {
            file = req.url;
            name = req.url;
        }
        res.sendFile(
            file, 
            {root: path.join(__dirname)}, 
            err => {
                if (err) next(err);
                else console.log('Sent:', name);
            }
        );
    }
});