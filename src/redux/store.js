import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import userPreRegistrationReducer from './reducers/preRegistration';
import optionsReducer from './reducers/options';
import courseReducer from './reducers/course';

// Middleware personalizado para manejar valores no serializables
const nonSerializableMiddleware = getDefaultMiddleware => getDefaultMiddleware({
  serializableCheck: false, // Deshabilita la comprobación de serialización
});

export const Store = configureStore({
  reducer: {
    user: userReducer,
    options: optionsReducer,
    preRegistration: userPreRegistrationReducer,
    course: courseReducer,
  },
  middleware: nonSerializableMiddleware
});



