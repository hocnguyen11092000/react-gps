import React, { useRef, useState } from "react";
import exifr, { parse } from "exifr";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import ReactFileUploadMobile from "react-file-upload-mobile";

function App() {
  const fileRef = useRef(null);
  const [image, setImage] = useState();
  const [gpsImg, setGpsImg] = useState({
    lat: "",
    lng: "",
  });
  const onUpload = (file) => {
    parse(file, { gps: true }).then((data) => {
      const { latitude, longitude } = data;
      console.log(data);
      setGpsImg({
        lat: latitude,
        lng: longitude,
      });
    });
  };

  var getBrowserWidth = function () {
    if (window.innerWidth < 768) {
      // Extra Small Device
      return "xs";
    } else if (window.innerWidth < 991) {
      // Small Device
      return "sm";
    } else if (window.innerWidth < 1199) {
      // Medium Device
      return "md";
    } else {
      // Large Device
      return "lg";
    }
  };
  const device = getBrowserWidth();

  async function handleChange(e) {
    parse(fileRef.current.files[0], { gps: true }).then((data) => {
      const { latitude, longitude } = data;
      console.log(data);
      setGpsImg({
        lat: latitude,
        lng: longitude,
      });
    });
  }

  return (
    <>
      {device == "xs" ? (
        <ReactFileUploadMobile
          fileUrl={image}
          displayOnly={false}
          compressImg={0.8}
          onFileUpload={onUpload}
          showNote={true}
        />
      ) : (
        <input
          type="file"
          id="file"
          accept=".jpg, .png, .heif, .heic"
          onChange={handleChange}
          ref={fileRef}
          style={{
            border: "none",
            outlineL: "none",
            padding: "8px 12px",
            margin: "20px",
          }}
        />
      )}

      <span>
        lat: {gpsImg.lat} - lng: {gpsImg.lng}
      </span>

      <div style={{ width: 1000, height: 600 }}>
        <GoogleMapReact
          defaultZoom={10}
          defaultCenter={[10.376528, 106.343889]}
        >
          <Marker key={1} text={"test"} lat={gpsImg.lat} lng={gpsImg.lng} />
        </GoogleMapReact>
      </div>
    </>
  );
}

export default App;
