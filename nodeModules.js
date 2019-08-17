const os = require("os");
const fs = require("fs");
const EventEmitter = require("events"); //returns EventEmitter Class
const http = require("http");

// OS Module
console.log("************* OS ***************");
console.log("Total Memory ", os.totalmem()); // RAM memory in Bytes
console.log("Free memory ", os.freemem()); // Free RAM in Bytes
console.log("CPU Arch ", os.arch()); // CPU Arch  x64
console.log("Platform: " + os.platform()); // Platform: win32
console.log("OS Type: " + os.type()); // OS Type: Windows_NT

// FILE SYSTEM module
//Every function in FS module has a synchronous and asychronous versions.
//Asyc funcs will always have callback func as parameter
console.log("************* FS ***************");
// Synchronous func, Dont use
console.log("Synchronous readdir: ", fs.readdirSync("./")); //[ 'app.js', 'nodeModules.js' ]
// Asynchronous func, Must use this instead
fs.readdir("./", (err, files) => {
  if (err) console.log(err);
  console.log("Async readdir: ", files); //[ 'app.js', 'nodeModules.js' ]
});

// EVENTS Module
console.log("************* EVENTS ***************");
// We get EvenEmmiter class on requiring the module

const myEmitterObj1 = new EventEmitter(); // creating object of EventEmitter we required from module
const myEmitterObj2 = new EventEmitter();
//------------------------------------------------------------------------------------------------
// REGISTER EVENT  (Events should be registered before they can be emitted otherwise nothing happens)
// on function is used to listen to connection and act on it
myEmitterObj1.on("messageEvent", () => {
  console.log("message Event called");
});
// CALL EVENT
myEmitterObj1.emit("messageEvent"); // Event call without Arguments
//-------------------------------------------------------------------------------------------------
// Event call with Arguments
myEmitterObj2.on("message", eventArg => {
  console.log("Message Event with Arg called ", eventArg);
});
myEmitterObj2.emit("message", { id: 1, message: "Hello Sush" });

// HTTP Module -
/* - In Real world applications we use Express instead of built-in HTTP module. Because code gets complex. 
   - Express internally uses HTTP module.
*/
console.log("************* HTTP ***************");

/* Creating server with no args
const server = http.createServer(); //taking no args

// go to localhost:3000 in brower, it will log "new connection" in console
server.on("connection", socket => {
  console.log("new connection");
});
*/

//Creating server taking a call back func as arg, which in turn takes request, response as args
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000); // emits an event called "connection"
console.log("listening to port 3000");
