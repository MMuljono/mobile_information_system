import axios from "axios";
import config from "../config/config";

interface IAxiosResponseGeoLocator {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: any[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

const baseUrlValidateAddress = "https://nominatim.openstreetmap.org/search?";
const geolocatorHandler = async (
  city: string,
  postalcode: string,
  street: string
) => {
  const fetchURL = encodeURI(
    `${baseUrlValidateAddress}city=${city}&postalcode=${postalcode}&street=${street}&format=json&limit=1`
  );
  return await axios({
    method: "get",
    url: fetchURL,
    headers: {
      "User-Agent": `${config.server.userAgent}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
    .then((res: { data: [IAxiosResponseGeoLocator] }) => {
      return res.data[0];
    })
    .catch((e) => console.log(e.response));
};

export default geolocatorHandler;
