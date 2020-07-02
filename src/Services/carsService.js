import axios from "axios";
import { CARS_SERVICE_ENDPOINT_URL } from "dotenv";
import vehicles from "Services/vehicles.json";

class CarsService {
  constructor() {
    this.cars = axios.create({
      baseURL: CARS_SERVICE_ENDPOINT_URL,
    });
  }

  getCars() {
    //Api call this.cars.METHOD(route)
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        //Add a liked field for filtering by favorites func
        const vehiclesWithLiked = vehicles.map((e) => ({ ...e, Liked: false }));
        resolve(vehiclesWithLiked);
      }, 250);
    });
  }
}

const carsService = new CarsService();

export default carsService;
