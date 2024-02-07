import { configureStore } from "@reduxjs/toolkit";
import userPreRegistrationReducer from './reducers/preRegistration';
import userReducer from "./reducers/user";
import usersReducer from "./reducers/users";
import optionsReducer from './reducers/options';
import courseReducer from './reducers/course';
import settingsReducer from './reducers/setting';

// Middleware personalizado para manejar valores no serializables
const nonSerializableMiddleware = getDefaultMiddleware => getDefaultMiddleware({
  serializableCheck: false, // Deshabilita la comprobación de serialización
});

export const Store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    options: optionsReducer,
    preRegistration: userPreRegistrationReducer,
    course: courseReducer,
    setting: settingsReducer,
  },
  middleware: nonSerializableMiddleware
});



