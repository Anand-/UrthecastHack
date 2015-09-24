function getScenes(latitude,longitude){

var scene_ids = [];
var time_stamps = [];
var url2 = "https://api.urthecast.com/v1/archive/scenes?api_key=25DD9D131871413DB0CB&api_secret=24042ED40BA7403CA7831CBE46B84EC9&geometry_intersects=POINT("+latitude+"%20"+longitude+")";
var xmlhttp2 = new XMLHttpRequest();

        xmlhttp2.open("GET", url2, true);
        xmlhttp2.send();

        xmlhttp2.onreadystatechange = function() {
        if (xmlhttp2.readyState == 4 &&
               xmlhttp2.status == 200) {

               var resp = JSON.parse(xmlhttp2.responseText);
           	   myArr2 = resp.payload
               
               for(i = 0; i < myArr2.length; i++) {
               	scene_ids[i] = (myArr2[i].acquired.substring(0,10));
               	time_stamps[i] = (myArr2[i].owner_scene_id);
               }
               var scene_properties = [time_stamps,scene_ids];
      }};
}