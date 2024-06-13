import { configureStore } from "@reduxjs/toolkit"
import speisekarteReducer from "./speisekarte/speisekarteSlice.ts";
 
export const store = configureStore({
    reducer: {
        Speisekarte: speisekarteReducer,
    }
})
// Defaults the type to an default state
export type RootState = ReturnType<typeof store.getState>;
 
export type AppDispatch = typeof store.dispatch;
 
export default store;