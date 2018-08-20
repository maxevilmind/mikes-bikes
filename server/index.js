let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = "mongodb://mongodb:27017/";
let express = require('express')
let app = express()
let path = require('path');
let apicache = require('apicache');
let cache = apicache.middleware

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('build'))

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  let dbo = db.db("test");
  app.get('/places', (req, res) => {
    const filters = req.query.filters && JSON.parse(req.query.filters);
    let query = {
      categories: {
        $elemMatch: {
          $regex: filters && filters.searchQuery && `.*${filters.searchQuery}.*` || '.*'
        },
      },
      city: 'Rotterdam',
      _id: filters && filters.id && ObjectId(filters.id) || {$exists: true}
    };

    if (filters && filters.ptQuery && filters.ptQuery.length > 0) {
      query.paymentTypes = {
        $elemMatch: {
          $in: filters && filters.ptQuery
        },
      }
    };

    dbo
    .collection("delivery_sites")
    .find(query)
    .limit(Number(req.query.limit) || 5)
    .toArray((err, result) => {
      if (err) throw err;
      // db.close();
      res.send(result)
    });
  })
  app.get('/tags', (req, res) => {
    dbo
    .collection("delivery_sites")
    .aggregate(
      {$unwind:"$categories"},
      {$group:{_id:null, clrs: {$addToSet : "$categories"} }},
      {$project:{_id:0, colors: "$clrs"}}
    )
    .limit(Number(req.query.limit) || 5)
    .toArray((err, result) => {
      if (err) throw err;
      // db.close();
      res.send(result)
    });
  })
  app.get('/cities', (req, res) => {
    dbo
    .collection("delivery_sites")
    .aggregate(
      {$unwind:"$city"},
      {$group:{_id:null, cities: {$addToSet : "$city"} }},
      {$project:{_id:0, cities: "$cities"}}
    )
    .limit(Number(req.query.limit) || 5)
    .toArray((err, result) => {
      if (err) throw err;
      // db.close();
      res.send(result)
    });
  })
  app.get('/payment_types', cache('24 hours'), (req, res) => {
    dbo
    .collection("delivery_sites")
    .aggregate(
      {$unwind:"$paymentTypes"},
      {$group:{_id:null, paymentTypes: {$addToSet : "$paymentTypes"} }},
      {$project:{_id:0, colors: "$paymentTypes"}}
    )
    .limit(Number(req.query.limit) || 5)
    .toArray((err, result) => {
      if (err) throw err;
      // db.close();
      res.send(result)
    });
  })
});

app.listen(3000);
