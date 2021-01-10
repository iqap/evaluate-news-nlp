const dotenv = require('dotenv');
dotenv.config();

const meaningCloudApiKey = process.env.API_KEY;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));


app.listen(8081, function () {
    console.log('App is listening on port 8081!')
})


async function getSentimentAnalysis(url, text) {
    try {
        var params = new URLSearchParams();
        params.append('key', meaningCloudApiKey);
        params.append('lang', 'en');
        if (url) {
            params.append('url', url);
        }
        if (text) {
            params.append('txt', text);
        }
        const result = await axios.post('https://api.meaningcloud.com/sentiment-2.1', params);
        return result.data;
    } catch (err) {
        console.error(err);
    }
}


app.post('/sentiment', async function (req, res) {

    let result = await getSentimentAnalysis(req.body.url, req.body.text);

    let scoreMapping = {
        "P+": "Strong Positive",
        "P": "Positive",
        "NEU": "Neutral",
        "N": "Negative",
        "N+": "Strong Negative",
        "NONE": "Without Sentiment"
    };

    let data = {
        'Status': result.status.msg,
        'Model': result.model,
        'Score': scoreMapping[result.score_tag] || result.score_tag,
        'Confidence': result.confidence,
        'Agreement': result.agreement,
        'Irony': result.irony,
        'Subjectivity': result.subjectivity
    }

    res.send({
        'status': 200,
        'statusText': 'OK',
        'data': data
    })
})
