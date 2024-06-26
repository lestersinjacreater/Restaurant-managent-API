import { Context } from "hono";
import { getcitiesService,getCityByIdService,createCityService,updateCityByidService,deleteCityByIdService,getCityRestaurantsService  } from "./city.service"

//get all cities
export const getCitiesController = async (c: Context) => {
    try {
        const cities = await getcitiesService();
        if (cities == null || cities.length == 0) {
            return c.text("No cities found", 404);
        }
        return c.json(cities, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create city
export const createCityController = async (c: Context) => {
    try {
        const city = await c.req.json();
        const newCity = await createCityService(city);

        if (!newCity) return c.text("City not created", 400);
        return c.json({ message: newCity }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get city by id
export const getCityByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const city = await getCityByIdService(id);
        if (city == null) {
            return c.text("City not found", 404);
        }
        return c.json(city, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update city
export const updateCityController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const city = await c.req.json();

        // search for user by id
        const updatedCity = await getCityByIdService(id);
        if (!updatedCity) return c.text("City not found", 404);

        // get data to update
        const res = await updateCityByidService(id, city);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete city
export const deleteCityController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for city by id
        const city = await getCityByIdService(id);
        if (!city) return c.text("City not found", 404);

        // delete city
        const res = await deleteCityByIdService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//get city restaurants
export const getCityRestaurantsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const city = await getCityRestaurantsService(id);
        if (!city) return c.text("City not found", 404);
        return c.json(city, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


