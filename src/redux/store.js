import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import userPreRegistration from './reducers/preRegistration';
import optionsSlice from './reducers/options';

// Middleware personalizado para manejar valores no serializables
const nonSerializableMiddleware = getDefaultMiddleware => getDefaultMiddleware({
  serializableCheck: false, // Deshabilita la comprobación de serialización
});

export const Store = configureStore({
  reducer: {
    user: userReducer,
    options: optionsSlice,
    preRegistration: userPreRegistration,
  },
  middleware: nonSerializableMiddleware
});



