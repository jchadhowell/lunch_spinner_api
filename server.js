const express = require('express');
const app = express();
var port = process.env.PORT || 8000;

var yelp = require('yelp').createClient({
    consumer_key: 'f6TEXZpl19BGpCmvj4sFsA',
    consumer_secret: 'Tc5rr4kO49xrWjif6CGC-zDt5Q8',
    token: 'nW7K79xxVHQKKRVJGB30UyGAbTlwjZD_',
    token_secret: 'c4QpX-2fI4vv9DkkowQvg1UojJg'
});


app.get('/', function (req, res) {
    res.json({ "message": "welcome" });
});

function TransformYelpResults(yelpBusiness) {
    return {
        name: yelpBusiness.name,
        image_url: yelpBusiness.image_url,
        mobile_url: yelpBusiness.mobile_url
    };
}

function processYelpResponse(res, error, data) {

    if (error && error.statusCode) {
        res.json(error.statusCode, JSON.parse(data));
        return;
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(data.businesses.map(TransformYelpResults));
}

app.get('/restaurants', function (req, res) {
    yelp.search({
        term: 'food',
        location: '78665',
        limit: '10'
    }, function (error, data) {
        processYelpResponse(res, error, data);
    });
})



app.listen(port, () => {
    console.log('We are live on port ' + port);
})


