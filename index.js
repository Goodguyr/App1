class setupMapData {
  constructor(array) {
    this.type = "scattermapbox";
    this.mode = "markers";
    this.marker = {}
    this.marker.size = 5
    this.marker.color = "rgb(255, 0, 0)"
    this.lat = [];
    this.lon = [];
    this.text = [];
    for (let i = 0; i < array.length; i++) {
      this.lat.push(array[i][0]);
      this.lon.push(array[i][1]);
      this.text.push(array[i][2]);
    }
  }
}
  
function findCenter(array) {
  let maxLat = 0
  let minLat = 100
  let maxLon = 0
  let minLon = 100
  for(let i = 0; i < array.length; i++){
    if(array[i][0] > maxLat){
      maxLat = array[i][0]
    }
    else if(array[i][0] < minLat){
      minLat = array[i][0]
    }
    if(array[i][1] > maxLon){
      maxLon = array[i][1]
    }
    else if(array[i][1] < minLon){
      minLon = array[i][1]
    }
  }
  let avgLat = (minLat + maxLat) / 2
  let avgLon = (minLon + maxLon) / 2
  return [avgLat, avgLon]
}
  
class setupMapLayout {
  constructor(array) {
    this.mapbox = {};
    this.mapbox.style = "streets";
    this.mapbox.zoom = 12;
    this.info = function findCenter(array) {
      let maxLat = 0
      let minLat = 200
      let maxLon = 0
      let minLon = 200
      for(let i = 0; i < array.length; i++){
        if(array[i][0] > maxLat){
          maxLat = array[i][0]
        }
        else if(array[i][0] < minLat){
          minLat = array[i][0]
        }
        if(array[i][1] > maxLon){
          maxLon = array[i][1]
        }
        else if(array[i][1] < minLon){
          minLon = array[i][1]
        }
      }
      let avgLat = (minLat + maxLat) / 2
      let avgLon = (minLon + maxLon) / 2
      return [avgLat, avgLon]
      }
    this.information = this.info(array)
    this.mapbox.center = {};
    this.mapbox.center.lat = this.information[0];
    this.mapbox.center.lon = this.information[1];
  }
}
  
class getMapParams {
  constructor(file) {
    let info = JSON.parse(file);
    this.data = [new setupMapData(info)];
    this.layout = new setupMapLayout(info);
  }
}
  

function loadMap() {  
  Plotly.setPlotConfig({ 
  mapboxAccessToken: 'pk.eyJ1IjoiZ29vZGd1eXIiLCJhIjoiY2syaDl1cnBkMDR6NTNsb2tzd2xlaWp4byJ9.WXmbbhPCIYCYYwJMa5GgcA'});
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200){
      console.log(this.response);
      let mapParams = new getMapParams(this.response);
      Plotly.plot('map', mapParams.data, mapParams.layout);
      console.log(mapParams.layout.mapbox.center.lat)
    }
  };
  xhttp.open("GET", "/routes/riga");
  xhttp.send();
}
      