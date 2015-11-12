var React = require('react');

var Map = React.createClass({

  //opens the modal for selected index
  openModal: function openModal(index) {
    this.props.openModal(index);
  },

  //Default options for the map
  getDefaultProps: function () {
    return {
      initialZoom: 4,
      mapCenterLat: 22.45,
      mapCenterLng:  55.36
    };
  },

  //Render the Google Map. I've put this in componentDidMount so that the map would only render once.
  componentDidMount: function () {
    var _this = this;
    var customMapType = new google.maps.StyledMapType([
     {
          "featureType": "administrative.province",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#e0efef"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "hue": "#1900ff"
              },
              {
                  "color": "#c0e8e8"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 700
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#7dcdcd"
              }
          ]
      }
    ], {
      name: 'Drone strikes'
    });

    var customMapTypeId = "custom_style";
    var mapOptions = {
        center: this.mapCenterLatLng(),
        zoom: this.props.initialZoom,
        mapTypeControlOptions: {
          mapTypeIds: [customMapTypeId]
        }
      };
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

    var allPoints = [];

    for (var i = 0; i < this.props.strikes.length; i++) {
      allPoints.push({
        latitude: this.props.strikes[i].lat,
        longitude: this.props.strikes[i].lon,
        strikeIndex: i
      })
    };

    for(var i = 0; i < allPoints.length; i++){
      var myLatlng = new google.maps.LatLng(allPoints[i].latitude, allPoints[i].longitude);
      var iconImage = '../explosion.png';
      var marker = new google.maps.Marker({
        position: myLatlng,
        map:map,
        icon: iconImage
      })
      //upon click, the map recenters on the strike that you have selected
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        var temp = new google.maps.LatLng(parseInt(allPoints[i].latitude)-1, allPoints[i].longitude);
        return function() {
          map.setOptions({
            options: {
              center: temp,
              zoom: 8
            }
          })

          _this.openModal(i); 
        };
      })(marker, i));
    }
  },

  mapCenterLatLng: function () {
    var props = this.props;
    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  },

  render: function () {
    return (
      <div className='map-gic'></div>
    );
  }
});

module.exports = Map;
