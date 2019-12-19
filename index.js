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
    var ordersList;
    conn.connect();
    conn.query('select * from XXIBM_PRODUCT_SKU', function (err, rows, fields) {
        if (err) throw err
        else{
            orderlist=rows;
        }
        console.log(ordersList);
        res.send({ success: true, result: ordersList });
    });
});

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something went wrong.')
    });


    app.listen(port, host);
    console.log('Backend server started on: ' + host + ':' + port);