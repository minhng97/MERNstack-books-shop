import { createStore } from "redux";
import rootReducer from "./Cart.reducer";

const store = createStore(rootReducer);

export default store;