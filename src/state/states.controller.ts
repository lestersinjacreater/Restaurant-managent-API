import { Context } from "hono";
import { getstatesService, getStateByIdService, createStateService, updateStateByidService, deleteStateByIdService,getStateCitiesService  } from "./state.service";


//get all states
export const getStatesController = async (c: Context) => {
    try {
        const states = await getstatesService();
        if (states == null || states.length == 0) {
            return c.text("No states found", 404);
        }
        return c.json(states, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};// create state
export const createStateController = async (c: Context) => {
    try {
        const state = await c.req.json();
        const newState = await createStateService(state);

        if (!newState) return c.text("State not created", 400);
        return c.json({ message: newState }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get state by id
export const getStateByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const state = await getStateByIdService(id);
        if (state == null) {
            return c.text("State not found", 404);
        }
        return c.json(state, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update state
export const updateStateController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const state = await c.req.json();

        // search for user by id
        const updatedState = await getStateByIdService(id);
        if (!updatedState) return c.text("State not found", 404);

        // get data to update
        const res = await updateStateByidService(id, state);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete state
export const deleteStateController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for state by id
        const state = await getStateByIdService(id);
        if (!state) return c.text("State not found", 404);

        // delete state
        const res = await deleteStateByIdService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//get state-state
export const getStateCitiesController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const cities = await getStateCitiesService(id);
        if (cities == null) {
            return c.text("No cities found", 404);
        }
        return c.json(cities, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);

    }

};