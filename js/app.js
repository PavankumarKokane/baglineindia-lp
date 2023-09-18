var map;
var markers = [];
var cities = [
    {
        name: "New York City, USA",
        image: "images/new-york-city-desk.webp",
        image_mb: "images/new-york-city-mb.webp",
    },
    {
        name: "Grand Canyon, USA",
        image: "images/grand-canyon-desk.webp",
        image_mb: "images/grand-canyon-mb.webp",
    },
    {
        name: "Banff National Park, Canada",
        image: "images/banff-national-park-desk.webp",
        image_mb: "images/banff-national-park-mb.webp",
    },
    {
        name: "Cancun, Mexico",
        image: "images/cancun-desk.webp",
        image_mb: "images/cancun-mb.webp",
    },
    {
        name: "San Francisco, USA",
        image: "images/san-francisco-desk.webp",
        image_mb: "images/san-francisco-mb.webp",
    },
    {
        name: "Machu Picchu, Peru",
        image: "images/machu-picchu-desk.webp",
        image_mb: "images/machu-picchu-mb.webp",
    },
    {
        name: "Rio de Janeiro, Brazil",
        image: "images/rio-de-janeiro-desk.webp",
        image_mb: "images/rio-de-janeiro-mb.webp",
    },
    {
        name: "Buenos Aires, Argentina",
        image: "images/buenos-aires-desk.webp",
        image_mb: "images/buenos-aires-mb.webp",
    },
    {
        name: "Paris, France",
        image: "images/paris-desk.webp",
        image_mb: "images/paris-mb.webp",
    },
    {
        name: "Santorini, Greece",
        image: "images/santorini-desk.webp",
        image_mb: "images/santorini-mb.webp",
    },
    {
        name: "Rome, Italy",
        image: "images/rome-desk.webp",
        image_mb: "images/rome-mb.webp",
    },
    {
        name: "Prague, Czech Republic",
        image: "images/prague-desk.webp",
        image_mb: "images/prague-mb.webp",
    },
    {
        name: "Barcelona, Spain",
        image: "images/barcelona-desk.webp",
        image_mb: "images/barcelona-mb.webp",
    },
    {
        name: "Switzerland, Europe",
        image: "images/switzerland-desk.webp",
        image_mb: "images/switzerland-mb.webp",
    },
    {
        name: "London, UK",
        image: "images/london-desk.webp",
        image_mb: "images/london-mb.webp",
    },
    {
        name: "Greenland, Europe",
        image: "images/greenland-desk.webp",
        image_mb: "images/greenland-mb.webp",
    },
    {
        name: "Turkey, Istanbul",
        image: "images/turkey-desk.webp",
        image_mb: "images/turkey-mb.webp",
    },
    {
        name: "Cape Town, South Africa",
        image: "images/cape-town-desk.webp",
        image_mb: "images/cape-town-mb.webp",
    },
    {
        name: "Egypt",
        image: "images/egypt-desk.webp",
        image_mb: "images/egypt-mb.webp",
    },
    {
        name: "Victoria Falls, Zimbabwe",
        image: "images/victoria-falls-desk.webp",
        image_mb: "images/victoria-falls-mb.webp",
    },
    {
        name: "Kerala, India",
        image: "images/kerala-desk.webp",
        image_mb: "images/kerala-mb.webp",
    },
    {
        name: "Kashmir, India",
        image: "images/kashmir-desk.webp",
        image_mb: "images/kashmir-mb.webp",
    },
    {
        name: "Bali, Indonesia",
        image: "images/bali-desk.webp",
        image_mb: "images/bali-mb.webp",
    },
    {
        name: "Dubai, United Arab Emirates",
        image: "images/dubai-desk.webp",
        image_mb: "images/dubai-mb.webp",
    },
    {
        name: "Kyoto, Japan",
        image: "images/kyoto-desk.webp",
        image_mb: "images/kyoto-mb.webp",
    },
    {
        name: "Sydney, Australia",
        image: "images/sydney-desk.webp",
        image_mb: "images/sydney-mb.webp",
    },
    {
        name: "Queenstown, New Zealand",
        image: "images/queenstown-desk.webp",
        image_mb: "images/queenstown-mb.webp",
    },
    {
        name: "Tahiti, French Polynesia",
        image: "images/tahiti-desk.webp",
        image_mb: "images/tahiti-mb.webp",
    },
    {
        name: "Great Barrier Reef, Australia",
        image: "images/great-barrier-reef-desk.webp",
        image_mb: "images/great-barrier-reef-mb.webp",
    },
    {
        name: "Fiji, Oceania",
        image: "images/fiji-desk.webp",
        image_mb: "images/fiji-mb.webp",
    },
];

var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var zoomLevel = 2;

// Check if screen width is less than 767 pixels
if (screenWidth < 767) {
    zoomLevel = 1;
} else {
    zoomLevel = 2;
}

function initMap() {
    var mapOptions = {
        zoom: zoomLevel, // Adjust the zoom level to show the entire world
        center: {
            lat: 0,
            lng: 0,
        }, // Set the center of the world
        styles: [
            {
                featureType: "administrative",
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                featureType: "water",
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
        ],
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Function to add a custom pin with a different icon
    function addMarker(location, title, iconUrl, draggable, className) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: title,
            icon: iconUrl, // Set the custom icon for the marker
            draggable: draggable, // Allow the marker to be dragged
            label: {
                text: title, // Display the city name as the marker label
                color: "black", // Label text color
                fontSize: "12px", // Label font size
                fontWeight: "bold", // Label font weight
            },
        });

        // Get the marker label element
        var labelElement = marker.getLabel();

        // Add a custom class to the label element
        labelElement.className += className;

        // Add a dragend event listener to the marker
        marker.addListener("dragend", function (event) {
            // Use reverse geocoding to get the city name directly
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode(
                {
                    location: event.latLng,
                },
                function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK && results[0]) {
                        var cityName = getCityNameFromGeocodeResults(results[0]);
                        console.log("New location: " + cityName);

                        // Find the nearest city from the array
                        var nearestCity = findNearestCity(event.latLng);
                        if (nearestCity) {
                            console.log("Nearest city: " + nearestCity);

                            // Set the marker's position to the nearest city
                            marker.setPosition(getLatLngForCity(nearestCity));
                            marker.setLabel({ text: nearestCity, className: "custom-marker-label" });
                            var img_url = getImageUrlByCityName(nearestCity);
                            var img_url_mb = getImageUrlByCityNameMB(nearestCity);

                            // $(".city-name").text(nearestCity);
                            $(".city-img").attr("src", img_url);
                            $(".city-img.mb").attr("src", img_url_mb);
                            $("#overlay").fadeIn(1000).css("display", "flex");
                        }
                    } else {
                        console.log("Geocoding failed: " + status);
                    }
                }
            );
        });

        markers.push(marker);
    }

    // Function to extract the city name from geocode results based on a specific type
    function getCityNameFromGeocodeResults(geocodeResult) {
        for (var i = 0; i < geocodeResult.address_components.length; i++) {
            var component = geocodeResult.address_components[i];
            if (component.types.includes("locality") && component.types.includes("political")) {
                return component.long_name;
            }
        }
        return "City not found";
    }

    // Function to find the nearest city from the array
    function findNearestCity(latLng) {
        var nearestCity = null;
        var nearestDistance = Number.MAX_VALUE;

        for (var i = 0; i < cities.length; i++) {
            var city = cities[i];
            var cityLatLng = getLatLngForCity(city.name);
            var distance = getDistance(latLng, cityLatLng);
            console.log(city.name + ":- " + distance + " km from the dropped pin");

            if (distance < nearestDistance) {
                nearestCity = city.name;
                nearestDistance = distance;
            }
        }

        return nearestCity;
    }

    function getImageUrlByCityName(cityName) {
        for (var i = 0; i < cities.length; i++) {
            if (cities[i].name === cityName) {
                return cities[i].image;
            }
        }
    }
    function getImageUrlByCityNameMB(cityName) {
        for (var i = 0; i < cities.length; i++) {
            if (cities[i].name === cityName) {
                return cities[i].image_mb;
            }
        }
    }

    // Function to calculate the distance between two points using Haversine formula (in kilometers)
    function getDistance(latLng1, latLng2) {
        var radLat1 = (Math.PI * latLng1.lat()) / 180;
        var radLng1 = (Math.PI * latLng1.lng()) / 180;
        var radLat2 = (Math.PI * latLng2.lat()) / 180;
        var radLng2 = (Math.PI * latLng2.lng()) / 180;

        var dLat = radLat2 - radLat1;
        var dLng = radLng2 - radLng1;

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var distance = 6371 * c; // Radius of the Earth in kilometers

        return distance;
    }

    // Function to get the LatLng for a city
    function getLatLngForCity(cityName) {
        switch (cityName) {
            case "New York City, USA":
                return new google.maps.LatLng(40.7128, -74.006);
            case "Grand Canyon, USA":
                return new google.maps.LatLng(36.1069, -112.1126);
            case "Banff National Park, Canada":
                return new google.maps.LatLng(51.4968, -115.9281);
            case "Cancun, Mexico":
                return new google.maps.LatLng(21.1619, -86.8515);
            case "San Francisco, USA":
                return new google.maps.LatLng(37.7749, -122.4194);
            case "Machu Picchu, Peru":
                return new google.maps.LatLng(-13.1631, -72.545);
            case "Rio de Janeiro, Brazil":
                return new google.maps.LatLng(-22.9068, -43.1729);
            case "Buenos Aires, Argentina":
                return new google.maps.LatLng(-34.6118, -58.4173);
            case "Paris, France":
                return new google.maps.LatLng(48.8566, 2.3522);
            case "Santorini, Greece":
                return new google.maps.LatLng(36.3932, 25.4615);
            case "Rome, Italy":
                return new google.maps.LatLng(41.9028, 12.4964);
            case "Prague, Czech Republic":
                return new google.maps.LatLng(50.0755, 14.4378);
            case "Barcelona, Spain":
                return new google.maps.LatLng(41.3851, 2.1734);
            case "Switzerland, Europe":
                return new google.maps.LatLng(46.8182, 8.2275);
            case "London, UK":
                return new google.maps.LatLng(51.5074, -0.1278);
            case "Greenland, Europe":
                return new google.maps.LatLng(71.7069, -42.6043);
            case "Turkey, Istanbul":
                return new google.maps.LatLng(41.0082, 28.9784);
            case "Cape Town, South Africa":
                return new google.maps.LatLng(-33.9249, 18.4241);
            case "Egypt":
                return new google.maps.LatLng(26.8206, 30.8025);
            case "Victoria Falls, Zimbabwe":
                return new google.maps.LatLng(-17.9244, 25.8567);
            case "Kerala, India":
                return new google.maps.LatLng(10.8505, 76.2711);
            case "Kashmir, India":
                return new google.maps.LatLng(34.0837, 74.7973);
            case "Bali, Indonesia":
                return new google.maps.LatLng(-8.3405, 115.092);
            case "Dubai, United Arab Emirates":
                return new google.maps.LatLng(25.276987, 55.296249);
            case "Kyoto, Japan":
                return new google.maps.LatLng(35.0116, 135.7681);
            case "Sydney, Australia":
                return new google.maps.LatLng(-33.8688, 151.2093);
            case "Queenstown, New Zealand":
                return new google.maps.LatLng(-45.0312, 168.6626);
            case "Tahiti, French Polynesia":
                return new google.maps.LatLng(-17.6797, -149.4068);
            case "Great Barrier Reef, Australia":
                return new google.maps.LatLng(-18.2871, 147.6992);
            case "Fiji, Oceania":
                return new google.maps.LatLng(-17.7134, 178.065);
            default:
                return new google.maps.LatLng(0, 0);
        }
    }

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var cityLatLng = getLatLngForCity(city.name);
        addMarker(getLatLngForCity(city.name), " ", "images/pin.svg", false, " marker-label");
    }

    // Add your custom pins with different icons
    addMarker(new google.maps.LatLng(-60.123097, 9.239027), "Drag & pin to your destination.", "images/marker.png", true, " marker-label marker-label2");

    // addMarker(new google.maps.LatLng(-50.123097, 54.414806), "Marker 2", "https://i.imgur.com/qxLbaNz.png", true);
}

const closePopupButton = document.getElementById("close-popup");
closePopupButton.addEventListener("click", () => {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
});

// only charaters allowed
const alphaOnly = document.querySelectorAll(".alpha-only");
alphaOnly.forEach(function (element) {
    element.addEventListener("beforeinput", function (event) {
        if (event.inputType === "deleteContentBackward") {
            return;
        }
        var value = this.value;
        if (!/^[a-zA-Z ]$/.test(event.data) || (event.data === " " && value.length === 0)) {
            event.preventDefault();
        }
    });
});

// only number with 10 digits allowed
const numericOnly = document.querySelectorAll(".numeric-only");
numericOnly.forEach(function (element) {
    element.addEventListener("beforeinput", function (event) {
        // Check if the input is the backspace key
        if (event.inputType === "deleteContentBackward") {
            // If it is, allow the input
            return;
        }

        // Check if the input is not a number or if there are already 10 digits
        if (!/^\d$/.test(event.data) || this.value.length >= 10) {
            // If it's not allowed, cancel the input event
            event.preventDefault();
        }
    });
});

$(document).ready(function () {

    $('.scroll-sec').click(function(){
        var sec_top = $('#'+$(this).attr('rel')).offset().top + 5;
        var scrollto =  sec_top;
        $('html, body').animate({scrollTop:scrollto}, 1000);
    });
    
    $("#contactForm").submit(function (e) {
        e.preventDefault();

        // Prevent the form from submitting in the traditional way
        // Clear any previous error messages
        $(".error").text("");

        // Get the form data
        var name = $("#name").val();
        var phoneNumber = $("#phoneNumber").val();
        var message = $("#message").val();

        // Validate inputs
        if (name === "") {
            $("#nameError").text("Name is required.");
        }

        if (phoneNumber === "") {
            $("#phoneNumberError").text("Phone number is required.");
        } else if (phoneNumber.length < 10) {
            $("#phoneNumberError").addClass("active");
            $("#phoneNumberError").text("Phone number should be 10 digits.");
        } else {
            $("#phoneNumberError").removeClass("active");
        }

        if (message === "") {
            $("#messageError").text("Message is required.");
        }

        // If all fields are valid, you can proceed with the AJAX request
        if (name !== "" && phoneNumber !== "" && phoneNumber.length >= 10 && message !== "") {
            
            var formData = {
                name: name,
                phoneNumber: phoneNumber,
                message: message,
            };

            console.log(formData);

            $.ajax({
                type: "POST",
                url: "your_backend_endpoint_url_here",
                data: formData,
                success: function (response) {
                    // Handle the success response here

                    $(".form-div").fadeOut(1000, function () {
                        // After hiding the form-div, fadeIn the congratulations element
                        $("#congratulations").fadeIn(1000);
                    });

                    // You can also update the UI or show a success message to the user
                },
                error: function (error) {
                    // Handle any errors that occur during the AJAX request
                    console.error("Error:", error);

                    // You can also show an error message to the user
                },
            });

            $(".form-div").fadeOut(1000, function () {
                // After hiding the form-div, fadeIn the congratulations element
                $("#congratulations").fadeIn(1000);
            });
        }
    });
});