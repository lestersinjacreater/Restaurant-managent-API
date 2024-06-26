import { Context } from "hono";
import { getdriversService, getDriverByIdService, createDriverService, updateDriverByidService, deleteDriverByIdService } from "./driver.service"

//get all drivers
export const getDriversController = async (c: Context) => {
    try {
        const drivers = await getdriversService();
        if (drivers == null || drivers.length == 0) {
            return c.text("No drivers found", 404);
        }
        return c.json(drivers, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};

// create driver
export const createDriverController = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const newDriver = await createDriverService(driver);

        if (!newDriver) return c.text("Driver not created", 400);
        return c.json({ message: newDriver }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get driver by id
export const getDriverByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const driver = await getDriverByIdService(id);
        if (driver == null) {
            return c.text("Driver not found", 404);
        }
        return c.json(driver, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//update driver
export const updateDriverController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const driver = await c.req.json();

        // search for user by id
        let existingDriver = await getDriverByIdService(id);
        if (existingDriver = undefined) return c.text("Driver not found", 404);
        const updatedDriver = await updateDriverByidService(id, driver);
        return c.text("Driver updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//delete driver
export const deleteDriverController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const driver = await getDriverByIdService(id);
        if (!driver) return c.text("Driver not found", 404);
        await deleteDriverByIdService(id);
        return c.text("Driver deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
