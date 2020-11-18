const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database("./tracks.db", (err) => {
  if (err) {
    console.log(err);
  }
  db.run(
    "CREATE TABLE IF NOT EXISTS tracks(fileName text, fileContent text, uid text)",
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
  console.log("DB loaded!");
});

app.listen(1617, () => {
  console.log("Server listening on port 1617");
});

app.post("/addTrack", (req, res) => {
  const stmt = db.prepare(
    "INSERT INTO tracks(fileName, fileContent, uid) VALUES (?, ?, ?)"
  );
  stmt.run([req.body.fileName, req.body.fileContent, req.body.uid], (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(`Track added -> ${req.body.fileName} by ${req.body.uid}`);
    res.send("200");
  });
});

app.post("/getTracks", (req, res) => {
  let returnObj = { tracks: [] };
  const stmt = db.prepare("SELECT * FROM tracks WHERE uid = ?");
  stmt.each(
    req.body.uid,
    (err, row) => {
      if (err) {
        console.log(err);
        throw err;
      }
      let trackObj = {
        fileName: row.fileName,
        fileContent: row.fileContent,
      };
      returnObj.tracks.push(trackObj);
    },
    () => {
      returnObj.tracks.reverse();
      res.json(returnObj);
    }
  );
});
