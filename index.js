function loadMap() {  
    // example data, you will replace it later
    var data = [{
      type:'scattermapbox',
      lat:['56.95730993','56.95606','56.95608'],
      lon:['24.11768354456','24.11768354456','24.121'],
      mode:'markers',
      marker: {
        size:14,
        color: "rgb(255,0,255)"
      },
      text:['Riga']
    }]
  
  // example layout config, you will replace it later
    var layout = {
      autosize: true,
      hovermode:'closest',
      mapbox: {style: 'streets',
        bearing:0,
        center: {
          lat:56.95731,
          lon:24.11768
        },
        pitch:0,
        zoom:14
      },
    }
  
  // REPLACE THE TOKEN WITH YOUR OWN!!!
    Plotly.setPlotConfig({
      mapboxAccessToken: 'pk.eyJ1IjoiZ3VuZGVnYSIsImEiOiJjazJjZjZpZ24wYTk4M29xbWwwMmszNjVjIn0.eCj9qYJgdYNtdZKSm7oyaA'
    })
  
    // LAST STEP 
    // uncomment the following block 
    // when all your functions are defined and working
    /*
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
          if (this.readyState === 4 && this.status === 200){
              console.log(this.response);
  
              // var mapParams = getMapParams(this.response);
              // Plotly.plot('map', mapParams.data, mapParams.layout);
          }
      };
      xhttp.open("GET", "/routes/riga");
      xhttp.send();
    */
  
    Plotly.plot('map', data, layout)
  
  }
  
  function setupMapData(array){
    let info = {}
    info[type] = "scattermapbox"
    info[mode] = "markers"
    info[marker] = {
        size = 5,
        color = rgb(255,0,0)
    }
    info[lat] = []
    info[lon] = []
    info[text] = []
    for(let i = 0; i < array.length; i++){

        info[lat].append(array[i][0])
        info[lon].append(array[i][1])
        info[text].append(array[i][2])
    }
    return info
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
  
  function setupMapLayout(array) {
    let info = {}
    info[mapbox] = {}
    info[mapbox][style] = "streets"
    info[mapbox][zoom] = 12
    info[mapbox][center] = findCenter(array)
  }
  
  function getMapParams(file) {
      
  }
  