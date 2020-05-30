const express = require('express');
const cors = require('cors');
const countries = require('./countriesConfig');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const isDevMode = process.env.NODE_ENV === 'development';
const port = process.env.port || 8080;

if (isDevMode) app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/countries', (req, res) => {
    if (req.query.search) {
        const param = req.query.search.toLowerCase();
        const filtered = countries.filter(c => c.name.toLowerCase().includes(param));

        if (filtered.length > 0) {
            res.send(filtered);
        } else {
            res.status(404).send('404 Not found');
        }
    } else {
        res.status(500).send('500 Internal Server Error');
    }
});

router.post('/selectedCountries', (req, res) => {
    if (req.body.isoCodes) {
        console.log(`Selected countries: ${req.body.isoCodes}`);
        res.send('success');
    } else {
        res.send('failure');
    }
    res.end();
});

app.use("/", router);

app.listen(port, () => console.log(`Server listening on ${port}, mode: ${process.env.NODE_ENV}`));