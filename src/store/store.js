import {configureStore} from '@reduxjs/toolkit';
import listReducer from "./listReducer";
import itemReducer from "./itemReducer";

// Конфигурируем Store
export default configureStore({
    reducer: {
        listReducer,
        itemReducer
    }
});