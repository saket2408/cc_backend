const express = require('express');
const app = express();
const host = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 8080;
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'custom-mysql.gamification.svc.cluster.local',
    user: 'xxuser',
    password: 'welcome1',
    database: 'sampledb'
})


/* for debugging purposes */
app.get('/allProducts', function (req, res, next) {
    conn.connect();
    conn.query('select s.ITEM_NUMBER , s.DESCRIPTION, s.LONG_DESCRIPTION , s.CATALOGUE_CATEGORY, s.SKU_UNIT_OF_MEASURE, s.STYLE_ITEM,'+
    's.SKU_ATTRIBUTE1,s.SKU_ATTRIBUTE2,s.SKU_ATTRIBUTE3,s.SKU_ATTRIBUTE4,s.SKU_ATTRIBUTE5,s.SKU_ATTRIBUTE6, '+
    's.SKU_ATTRIBUTE_VALUE1,s.SKU_ATTRIBUTE_VALUE2,s.SKU_ATTRIBUTE_VALUE3,s.SKU_ATTRIBUTE_VALUE4,s.SKU_ATTRIBUTE_VALUE5,s.SKU_ATTRIBUTE_VALUE6,'+
    'm.BRAND from sampledb.XXIBM_PRODUCT_SKU s inner join XXIBM_PRODUCT_STYLE m on s.STYLE_ITEM = m.ITEM_NUMBER;', function (err, rows, fields) {
        if(err) console.log(err)
        console.log(rows)
        res.send(rows);

    });
});

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something went wrong.')
    });


    app.listen(port, host);
    console.log('Backend server started on: ' + host + ':' + port);