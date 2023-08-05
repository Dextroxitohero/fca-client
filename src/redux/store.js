import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import userPreRegistration from './reducers/preRegistration';


export const Store = configureStore({
  reducer: {
    user: userReducer,
    preRegistration: userPreRegistration
  },
});
