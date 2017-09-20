/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span><hr>';

// New added
var HTMLprofile = '<div id="profile"></div>'
var HTMLsectionDivision = '<hr class="heading-border">'

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';
// New added
var HTMLProfileText = '<div id="profile-text"></div>';
var HTMLrole = '<h3 id="role">%data%</h3>';
var HTMLiamText = '<span>I\'m</span>';
var HTMLtopSns = '<ul id="topSns" class="flex-box"></ul>';
var HTMLContact = '<div id="contact"></div>';
var HTMLContactHead = '<h1 id="contactMe">Contact Me</h1>';
var HTMLfooterSns = '<ul id="footerSns" class="flex-box"></ul>';

// New Added for awesomefont
var HTMLContactItem = '<li class="flex-item icon-text">%data%</li>';
var HTMLContactValueIconOnly = '<li class="flex-item icon-only">%data%</li>';
var HTMLmobileIcon = '<i class="fa fa-phone-square" aria-hidden="true"></i>';
var HTMLemailIcon = '<i class="fa fa-envelope" aria-hidden="true"></i>';
var HTMLtwittterIcon = '<a href="#" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>';
var HTMLfacebookIcon = '<a href="#" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>';
var HTMLgithubIcon = '<a href="#" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>';
var HTMLweiboIcon = '<a href="#" target="_blank"><i class="fa fa-weibo" aria-hidden="true"></i></a>';
var HTMLlocation = '<i class="fa fa-location-arrow" aria-hidden="true"></i>';
var HTMLContactValue = '<span> %data%</span>'
// var HTMLtwitterFooterIcon = '<a class="white-text" href="#" target="_blank"><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a>';
// var HTMLfacebookFooterIcon = '<a href="#" class="white-text" target="_blank"><i class="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a>';
// var HTMLgithubFooterIcon = '<a href="#" class="white-text" target="_blank"><i class="fa fa-github fa-2x" aria-hidden="true"></i></a>';
// var HTMLweiboFooterIcon = '<a href="#" class="white-text" target="_blank"><i class="fa fa-weibo fa-2x" aria-hidden="true"></i></a>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<p class="welcome-message">%data%</p>';// changed

// New added
var HTMLnav = '<div id="top-nav"><ul class="nav nav-tabs nav-justified"></ul></div>';
var HTMLtab = '<li role="presentation"><a href="#">%data%</a></li>';
var HTMLtabActive = '<li role="presentation" class="active"><a href="#">%data%</a></li>';

// New Added
var HTMLAboutMe = '<div id="about-me"></div>';
var HTMLAboutMeHead = '<div class="heading-border"><h2 class="heading">About Me</h2>';
var HTMLAboutMeContent = '<div id="about-me-body"><div class="content"><p>%data%<p></div></div>';

// New Added
var HTMLSkillSection = '<div id="skill-section"></div>';
var HTMLskillsHead = '<div class="heading-border"><h2 class="heading">Skills at a Glance</h2>';
var HTMLskills = '<ul id="skill-list" class="flex-box"></ul>';
var HTMLskill = '<li class="flex-item skill-item"><h4 class="skill-caption">%data%</h4>%html%</li>';
var HTMLskillProgress = '<div id="%id%" class="circle"><div class="value"></div></div>';

// New Added for timeline
var HTMLtimeline = '<div class="timeline"></div>';
var HTMLtimelineEntryTitle = '<div class="title"><h3>%data%</h3><p>%data2%</p></div>';
var HTMLtimelineEntryAddtionInfo = '<p>%data%</p>'
var HTMLtimelineEntryBody = '<div class="body"><p>%data%</p><ul class="timeline-entry-details"></ul><ul class="timeline-entry-images"></ul></div>';
var HTMLtimelineEntryDetail = '<li>%data%</li>';
var HTMLtimelineEntryImage = '<li><image class="entry-image img-responsive" src="%data%"></li>';

var HTMLworkStart = '<div class="work-entry entry"></div>';
var HTMLworkEmployer = '<a class="plain-text" href="#" target="_blank">%data%</a>';//changed
var HTMLworkTitle = '<p>%data%</p>';//changed
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry entry"></div>';
var HTMLprojectTitle = '<a class="plain-text" href="#" target="_blank">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry entry"></div>';
var HTMLschoolName = '<a class="plain-text" href="#" target="_blank">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h4 class="section-title">Online Classes</h4>';
var HTMLonlineTitle = '<a class="plain-text" href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';


/*
The Internationalize Names challenge found in the lesson Flow Control from JavaScript Basics requires you to create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var $name = $('#name');
    var iName = inName($name.text()) || function(){};
    $name.html(iName);
  });
});

function inName(name) {
  var names = name.trim().split(" ");
  names[1] = names[1].toUpperCase();
  names[0] = names[0].slice(0, 1).toUpperCase + names[0].slice(1).toLowerCase();

  return names[0] + " " + names[1];
}

/*
The next few lines about clicks are for the Collecting Click Locations quiz in the lesson Flow Control from JavaScript Basics.
*/
var clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  // your code goes here!
  logClicks(loc.pageX, loc.pageY);
});



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    zoom: 3,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: {lat: 39.9880071, lng: 116.479643}
  };

  /*
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js.
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  var kmlLayer = new google.maps.KmlLayer({
    suppressInfoWindows: true,
    preserveViewport: false,
    url: 'https://www.google.com/maps/d/kml?mid=10Zg7y4CuBPTuK5RjCt7hciC6w2g',
    map: map
  });

  // kmlLayer.addListener('click', function(event) {
  //   var content = event.featureData.infoWindowHtml;
  //   var testimonial = document.getElementById('capture');
  //   testimonial.innerHTML = content;
  // });

  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    education.schools.forEach(function(school){
      locations.push(school.location);
    });

    // iterates through work locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    work.jobs.forEach(function(job){
      locations.push(job.location);
    });

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    // map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
// window.addEventListener('resize', function(e) {
//   //Make sure the map bounds get updated on page resize
//   map.fitBounds(mapBounds);
// });
