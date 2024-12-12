const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());
var fs = require('fs');

app.put("/api/exercises", (req, res) => {
    const updated = req.body;
    const user = req.query.user.toLowerCase();

    fs.writeFile(`./store/${user}.json`, JSON.stringify(updated), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.send("Data saved");
});

app.get("/api/exercises", (req, res) => {
    if (fs.existsSync(`./store/${req.query.user}.json`)) {
        const user = req.query.user.toLowerCase();
        fs.readFile(`./store/${user}.json`, (err, data) => {
            var data = data.toString();
            res.send(data);
        });
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});