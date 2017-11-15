import express from 'express';
import fs from 'fs';

const app = express()
const openConnections = []
const data = [
  // {type: 'birth'},                                                                                                                                                        
  // {type: 'death'},
  // {type: 'condition-onset'},
  // {type: 'condition-abatement'},
  // {type: 'procedure'},
  // {type: 'encounter'}
];

let PNG = require('pngjs2').PNG;

let usa_map = [];
let map_width =0;
let map_height = 0;

function checkMap(x,y){

  return usa_map[y][x];
}

let id = 0;

fs.createReadStream('assets/usa_map.png')
  .pipe(new PNG())
  .on('parsed', function() {

    map_width = this.width;
    map_height = this.height;

    for (var y = 0; y < this.height; y++) {
      usa_map[y] = [];
      for (var x = 0; x < this.width; x++) {
        usa_map[y][x] = false;
        var idx = (this.width * y + x) << 2;

        if(this.data[idx] > 50){
          usa_map[y][x] = true 
        }

      }
    }

    fs.readdir('./data', function(err, filenames) {
      if (err) {
        onError(err);
        return;
      }
      let count = 0;
      filenames.forEach(function(filename, index) {
        fs.readFile('./data/' + filename, 'utf-8', function(err, content) {
          if (err) {
            onError(err);
            return;
          }
          count++;
          console.log('Loaded ' + count + ' of ' + filenames.length);// console.log(JSON.parse(content));
          let bundle = JSON.parse(content);
          let events = [];
          let patientName = '';
          let gender = '';
          let birthDate = '';
          // console.log(bundle.entry);
          bundle.entry.forEach((obj) => {
            switch(obj.resource.resourceType){
              case 'Patient':
                patientName = obj.resource.name[0].given[0] + ' ' + obj.resource.name[0].family;
                gender = obj.resource.gender;
                events.push({type: 'birth'})
                birthDate = obj.resource.birthDate;
                break;
              case 'Condition':
                events.push({type: 'condition-onset', value: obj.resource.code.text})
                if(obj.resource.abatementDateTime){
                  events.push({type: 'condition-abatement', value: obj.resource.code.text})
                }
                break;
              case 'Encounter':
                events.push({type: 'encounter', class: obj.resource.class.code, value: obj.resource.type[0].text})
                if(obj.resource.type[0].text === 'Death Certification'){
                  events.push({type: 'death'});
                }
                break;
              case 'Procedure':
                events.push({type: 'procedure', code: obj.resource.code.text})
                break;
            };
          });

          let pos = randomPosition();

          if(patientName.length > 0){
            data.push.apply(data, events.map((item) => {
              item.name = patientName;
              item.gender = gender;
              item.birthDate =birthDate;
              item.lat = pos[0];
              item.lon = pos[1];
              return item;
            }));

          }
          // onFileContent(filename, content);
        });
      });
    });
  });

app.get('/', (req, res) => {
  res.send('<a href="http://synthetic-usa.robscanlon.com/?eps=50">demo vis</a>.<br><BR>Go to <a href="/events?eps=50">view raw stream</a>. <br><br>Change the eps querystring param to vary the simulated events per second.')
})

app.get('/events', (req, res) => {

  let eps = 10;

  if (req.query.eps){
    eps = Math.max(Math.min(req.query.eps,1000),1);
  }

  req.socket.setTimeout(Number.MAX_VALUE);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache', 'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  res.write('\n');

  openConnections.push(res);
  console.log("New Connection.  Current Connections: " + openConnections.length);

  res.clearInterval = setInterval(function(){
    // console.log('eps set to ' + eps);
    if(data.length > 0){
      setTimeout(() => sendData(data[Math.floor(Math.random() * data.length)], res), Math.random() * 3 * 1000/eps);
    }

  }, 1000/eps);


  req.on("close", function() {
    var toRemove;
    for (var j =0 ; j < openConnections.length ; j++) {
      if (openConnections[j] == res) {
        console.log("clearing interval");
        clearInterval(res.clearInterval);
        toRemove =j;
        break;
      }
    }
    openConnections.splice(j,1);
    sendData({
      type: "meta-disconnect",
      size: openConnections.length
    });
    console.log("Closed Connection. Current Connections: " + openConnections.length);
  });

  sendData({
    type: "meta-connect",
    size: openConnections.length
  });
});

var sendData = function(data, connection){
  if(!connection){
    openConnections.forEach(function(resp) {
      // resp.write('id: ' + Date.now() + '\n');
      id++;
      resp.write('id: ' + id + '\n');
      resp.write('data:' + JSON.stringify(data) +   '\n\n');
    });

  } else {
    // console.log('just send to one connection');
    id++;
    connection.write('id: ' + id + '\n');
    connection.write('data:' + JSON.stringify(data) +   '\n\n');
  }
};

var randomPosition = function(){
  var x = Math.floor(Math.random() * map_width);
  var y = Math.floor(Math.random() * map_height);


  while(!checkMap(x,y)){
    x = Math.floor(Math.random() * map_width);
    y = Math.floor(Math.random() * map_height);
  }

  return [25 + (1 - y / map_height) * 25, -69 - 55 * (1- x / map_width)]
}



setInterval(function(){
  sendData({
    type: "meta-heartbeat",
    size: openConnections.length
  });
}, 3000);


app.listen(1337, () => {
  console.log('Example app listening on port 1337!')
})

