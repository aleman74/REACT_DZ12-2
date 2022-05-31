import {configureStore} from '@reduxjs/toolkit';
import {combineEpics, createEpicMiddleware} from 'redux-observable';

import listReducer from "./listReducer";
import itemReducer from "./itemReducer";

import {listEpic} from "../epics/listEpic";
import {itemEpic} from "../epics/itemEpic";


// Конфигурируем Epic
const epicMiddleware = createEpicMiddleware();

export const rootEpic = combineEpics(
    listEpic,
    itemEpic,
);

// Конфигурируем Store
const store = configureStore({
    reducer: {
        listReducer,
        itemReducer
    },
    middleware: [epicMiddleware]
});

epicMiddleware.run(rootEpic);

export default store;
