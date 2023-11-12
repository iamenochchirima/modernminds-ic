import React, { useEffect } from "react";

function MapExample() {
  const mapRef = React.useRef(null);
  useEffect(() => {
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";
    const mapOptions = {
      zoom: 12,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#4299e1" }, { visibility: "on" }],
        },
      ],
    };

    const contentString =
      '<div class="info-window-content"><h2>Notus React</h2>' +
      "<p>A free Admin for Tailwind CSS, React, and React Hooks.</p></div>";

    
  });
  return (
    <>
      <div className="relative w-full rounded h-600-px">
        <div className="rounded h-full" ref={mapRef} />
      </div>
    </>
  );
}

export default MapExample;