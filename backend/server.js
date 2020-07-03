const http = require("http");
const app = require("./app");
const debug = require("debug")("node-angular");
const port = process.env.PORT || 3000;
const express = require("express");
const onListening = () => {
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};
app.use(express.static(__dirname + "/dist"));
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname + "/meanStackApp/index.html"));
});

app.set("port", port);
const server = http.createServer(app);
server.on("listening", onListening);
server.listen(port);
