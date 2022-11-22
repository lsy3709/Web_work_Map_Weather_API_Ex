window.onload = function(){
  initMap(document.getElementsByClassName("dropdown-item")[0].id);
  seoulWeather();
}


window.initMap = function (self) {
  console.log(self)
  if(self === 'seoul'){
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.5400456, lng: 126.9921017 },
    zoom: 10,
  });


const malls = [
  { label: "C", name: "코엑스몰", lat: 37.5115557, lng: 127.0595261 },
  { label: "G", name: "고투몰", lat: 37.5062379, lng: 127.0050378 },
  { label: "D", name: "동대문시장", lat: 37.566596, lng: 127.007702 },
  { label: "I", name: "IFC몰", lat: 37.5251644, lng: 126.9255491 },
  { label: "L", name: "롯데월드타워몰", lat: 37.5125585, lng: 127.1025353 },
  { label: "M", name: "명동지하상가", lat: 37.563692, lng: 126.9822107 },
  { label: "T", name: "타임스퀘어", lat: 37.5173108, lng: 126.9033793 },
]; 
detailMap(map,malls);

} else {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.566535, lng: 126.97796919 },
    zoom: 10,
  });

  const malls = [
    { label: "C", name: "해수욕장", lat: 35.1587053, lng: 129.1603804 },
    { label: "G", name: "청사포다리돌전망대", lat: 35.1637133, lng: 129.1961997 },
      ];

      detailMap(map,malls);
}

function detailMap(map, malls) {
  const bounds = new google.maps.LatLngBounds();
const infowindow = new google.maps.InfoWindow();

malls.forEach(({ label, name, lat, lng }) => {
  const marker = new google.maps.Marker({
    position: { lat, lng },
    label,
    map: map,
  });
  bounds.extend(marker.position);

  marker.addListener("click", () => {
    map.panTo(marker.position);
    infowindow.setContent(name);
    infowindow.open({
      anchor: marker,
      map,
    });
  });
});
map.fitBounds(bounds);
}



};
// 날씨 api - fontawesome 아이콘


var weatherIcon = {
  '01' : 'fas fa-sun',
  '02' : 'fas fa-cloud-sun',
  '03' : 'fas fa-cloud',
  '04' : 'fas fa-cloud-meatball',
  '09' : 'fas fa-cloud-sun-rain',
  '10' : 'fas fa-cloud-showers-heavy',
  '11' : 'fas fa-poo-storm',
  '13' : 'far fa-snowflake',
  '50' : 'fas fa-smog'
};

const API_KEY = config_weather_key.apikey;

// 날씨 api - 서울 open weather 사이트에 가입하고 자기 api 키 사용하기
// API_KEY 이 부분에 
var apiURI = "https://api.openweathermap.org/data/2.5/weather?lat="+'37.5400456'+"&lon="+"126.9921017"+"&appid="+API_KEY;
$.ajax({
  url: apiURI,
  dataType: "json",
  type: "GET",
  async: "false",
  success: function(resp) {

      var $Icon = (resp.weather[0].icon).substr(0,2);
      var $weather_description = resp.weather[0].main;
      var $Temp = Math.floor(resp.main.temp- 273.15) + 'º';
      var $humidity = '습도&nbsp;&nbsp;&nbsp;&nbsp;' + resp.main.humidity+ ' %';
      var $wind = '바람&nbsp;&nbsp;&nbsp;&nbsp;' +resp.wind.speed + ' m/s';
      var $city = '서울';
      var $cloud = '구름&nbsp;&nbsp;&nbsp;&nbsp;' + resp.clouds.all +"%";
      var $temp_min = '최저 온도&nbsp;&nbsp;&nbsp;&nbsp;' + Math.floor(resp.main.temp_min- 273.15) + 'º';
      var $temp_max = '최고 온도&nbsp;&nbsp;&nbsp;&nbsp;' + Math.floor(resp.main.temp_max- 273.15) + 'º';
      

      $('.weather_icon').append('<i class="' + weatherIcon[$Icon] +' fa-5x" style="height : 150px; width : 150px;"></i>');
      $('.weather_description').prepend($weather_description);
      $('.current_temp').prepend($Temp);
      $('.humidity').prepend($humidity);
      $('.wind').prepend($wind);
      $('.city').append($city);
      $('.cloud').append($cloud);
      $('.temp_min').append($temp_min);
      $('.temp_max').append($temp_max);               
  }
})



// 날씨 api - 부산
var apiURI = "https://api.openweathermap.org/data/2.5/weather?lat="+'35.1587053'+"&lon="+"129.1603804"+"&appid="+API_KEY;
$.ajax({
  url: apiURI,
  dataType: "json",
  type: "GET",
  async: "false",
  success: function(resp) {

      var $g_Icon = (resp.weather[0].icon).substr(0,2);
      var $g_weather_description = resp.weather[0].main;
      var $g_Temp = Math.floor(resp.main.temp- 273.15) + 'º';
      var $g_humidity = '습도&nbsp;&nbsp;&nbsp;&nbsp;' + resp.main.humidity+ ' %';
      var $g_wind = '바람&nbsp;&nbsp;&nbsp;&nbsp;' +resp.wind.speed + ' m/s';
      var $g_city = '부산';
      var $g_cloud = '구름&nbsp;&nbsp;&nbsp;&nbsp;' + resp.clouds.all +"%";
      var $g_temp_min = '최저 온도&nbsp;&nbsp;&nbsp;&nbsp;' + Math.floor(resp.main.temp_min- 273.15) + 'º';
      var $g_temp_max = '최고 온도&nbsp;&nbsp;&nbsp;&nbsp;' + Math.floor(resp.main.temp_max- 273.15) + 'º';
      

      $('.g_weather_icon').append('<i class="' + weatherIcon[$g_Icon] +' fa-5x" style="height : 150px; width : 150px;"></i>');
      $('.g_weather_description').prepend($g_weather_description);
      $('.g_current_temp').prepend($g_Temp);
      $('.g_humidity').prepend($g_humidity);
      $('.g_wind').prepend($g_wind);
      $('.g_city').append($g_city);
      $('.g_cloud').append($g_cloud);
      $('.g_temp_min').append($g_temp_min);
      $('.g_temp_max').append($g_temp_max);   
  }
})

function busanWeather(){
  document.getElementById("seoul_display").style.display = "none";
  document.getElementById("busan_display").style.display = "block";
}

function seoulWeather(){
  document.getElementById("busan_display").style.display = "none";
  document.getElementById("seoul_display").style.display = "block";
}

