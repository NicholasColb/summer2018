const app = require('express')();
const cors = require('cors')
const bodyParser = require('body-parser');

var express = require('express');
var path = require('path');

//Enable CORS
app.use(cors());

const species = [
  {
    name: 'mallard'
  },
  {
    name: 'redhead'
  },
  {
    name: 'gadwall'
  },
  {
    name: 'canvasback'
  },
  {
    name: 'lesser scaup'
  }
];

const sightings = [
{
    id: '0',
    species: 'canvasback',
    description: 'Just a duck I saw',
    dateTime: '2016-09-01T01:01:00Z',
    count: 1
  },
  {
    id: '1',
    species: 'gadwall',
    description: 'Just a red duck I saw',
    dateTime: '2016-10-01T01:01:00Z',
    count: 1
  },
  {
    id: '2',
    species: 'lesser scaup',
    description: 'This was an awesome one',
    dateTime: '2016-12-13T12:05:00Z',
    count: 5
  },
  {
    id: '3',
    species: 'canvasback',
    description: 'Quite a funny duck',
    dateTime: '2016-11-30T23:59:00Z',
    count: 2
  },
  {
    id: '4',
    species: 'mallard',
    description: 'This duck was tired',
    dateTime: '2016-11-29T00:00:00Z',
    count: 18
  },
  {
    id: '5',
    species: 'redhead',
    description: 'I think this one is called Alfred J.',
    dateTime: '2016-11-29T10:00:01Z',
    count: 1
  },
  {
    id: '6',
    species: 'redhead',
    description: 'If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.',
    dateTime: '2016-12-01T13:59:00Z',
    count: 1
  },
  {
    id: '7',
    species: 'mallard',
    description: 'Too many ducks to be counted',
    dateTime: '2016-12-12T12:12:12Z',
    count: 100
  },
  {
    id: '8',
    species: 'canvasback',
    description: 'This guy was loud',
    dateTime: '2016-12-11T01:01:00Z',
    count: 5
  }
];

app.use(express.static('public'));


//Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/sightings', (req, res) => {
  res.json(sightings);
});

app.get('/species', (req, res) => {
  res.json(species);
});




/*
	Posts a new sighting to const. sightings. Generates a unique id for the new sighting by taking the biggest id and adding one to it.
*/


app.post('/delete', (req,res) => {
	
		var id = req.body.id;
		var index = sightings.map(function(e) { return e.id; }).indexOf(id);

		sightings.splice(index,1);
		res.json(sightings);
});	

app.post('/sightings', (req, res) => {
 
	if(sightings.length > 0 ) 
	{ 
		
		
		req.body.id = (+sightings[sightings.length - 1].id + +'1').toString();
	}
	else
	{ 
		req.body.id = '0';
	}
  
  sightings.push(req.body); 
  res.json(req.body);
  
});



//deletes a sighting from sightings









app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
		
    });
	



const port = process.env.PORT ? process.env.PORT : 8081;
const server = app.listen(port, () => {
    console.log("Server listening  port %s", port);
});
