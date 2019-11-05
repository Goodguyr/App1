class setupMapData {
  constructor(array) {
    this.type = "scattermapbox";
    this.mode = "markers";
    this.marker = {}
    this.marker.size = 5
    this.marker.color = rgb(255, 0, 0)
    this.lat = [];
    this.lon = [];
    this.text = [];
    for (let i = 0; i < array.length; i++) {
      this.lat.append(array[i][0]);
      this.lon.append(array[i][1]);
      this.text.append(array[i][2]);
    }
  }
}
  
  function findCenter(array) {
      let maxLat = 0
      let minLat = 0
      let maxLon = 0
      let minLon = 0
      for(let i = 0; i < array.length; i++){
          if(array[i][0] > maxLat){
              maxLat = array[i]
          }
          if(array[i][0] < minLat){
              minLat = array[i][0]
          }
          if(array[i][1] > maxLon){
              maxLon = array[i][1]
          }
          if(array[i][1] < minLon){
              minLon = array[i][1]
          }
      }
      let avgLat = (minLat + maxLat) / 2
      let avgLon = (minLon + maxLon) / 2
      return [avgLat, avgLon]
  }
  
class setupMapLayout {
  constructor(array) {
    let centerInfo = findCenter(array);
    this.mapbox = {};
    this.mapbox.style = "streets";
    this.mapbox.zoom = 12;
    this.mapbox.center = {};
    this.mapbox.center.lat = centerInfo[0];
    this.mapbox.center.lon = centerInfo[1];
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
        Plotly.setPlotConfig({ mapboxAccessToken: 'pk.eyJ1IjoiZ29vZGd1eXIiLCJhIjoiY2syaDl1cnBkMDR6NTNsb2tzd2xlaWp4byJ9.WXmbbhPCIYCYYwJMa5GgcA' });
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if (this.readyState === 4 && this.status === 200){
              console.log(this.response);
  
              let mapParams = new getMapParams(this.response);
              Plotly.plot('map', mapParams.data, mapParams.layout);
          }
      };
      xhttp.open("GET", "/routes/riga");
      xhttp.send();
          }
      