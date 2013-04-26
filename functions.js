'use strict';

var RoadImages = (function () {

  var roadImages = {};

  var self = roadImages;

  roadImages.defaultCount = 10;

  roadImages.apiEndPoint = "http://traphiccam.com:8888"

  roadImages.buildQueryPart = function (latitude, longitude) {
    return '/' + latitude + '/' + longitude + '/' + self.defaultCount;
  };

  roadImages.camDataRequest = function (url, cb) {
    var s = document.createElement('scr' + 'ipt');
    s.src = url + '?callback=RoadImages.camDataRetrieved';
    document.body.appendChild(s);
  };

  roadImages.camUrlToLi = function (camUrl) {
    var liNode = document.createElement('li');
    var imgNode = document.createElement('img');
    imgNode.src = camUrl;
    liNode.appendChild(imgNode);
    document.querySelector('#cam-pics').appendChild(liNode);
  };

  roadImages.camDataRetrieved = function (camData) {
    for (var i = 0; i < camData.length; i += 1) {
      self.camUrlToLi(camData[i].url);
    }
  };

  roadImages.retrieveCamData = function (latitude, longitude) {
    var queryPart, queryUrl;

    queryPart = self.buildQueryPart(latitude, longitude);

    queryUrl = self.apiEndPoint + queryPart;

    self.camDataRequest(queryUrl, self.camDataRetrieved);
  };

  roadImages.locGotten = function (position) {
    var resultsVec;
    resultsVec = self.retrieveCamData(position.coords.latitude, position.coords.longitude);
  };

  roadImages.locError = function () {
    console.log('sad face %o', arguments);
  };

  roadImages.grabCameraData = function () {
    navigator.geolocation.getCurrentPosition(self.locGotten, self.locError);
  };

  return roadImages;
}());
