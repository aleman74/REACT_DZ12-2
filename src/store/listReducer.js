import {createSlice} from '@reduxjs/toolkit';


// Структура данных
const initialState = {
    items: [],
    loading: false,
    error: null,
    url: ''
};



const listReducer = createSlice({
    name: 'data',
    initialState,
    reducers: {

        listReducer_search_start(state, action)
        {
            console.log('listReducer_search_start', action.payload);
            state = {...state, loading: true, error: null, url: action.payload.url}

            return state;
        },

        listReducer_search_success (state, action)
        {
            console.log('listReducer_search_success', action.payload.items);

            let items = [];

            if (action.payload.items)
                items = action.payload.items;

            state = {...state, items: items, loading: false, error: null};

            console.log('state', state);

            return state;
        },

        listReducer_search_failure(state, action)
        {
            console.log('listReducer_search_failure', action.payload);

            const error = action.payload.error;
            state = {...state, loading: false, error: error}

            return state;
        }
    },
});

export const set_listReducer_param_start = (url) => (
    {url: url}
);
export const set_listReducer_param_success = (items) => (
    {items: items}
);
export const set_listReducer_param_failure = (error) => (
    {error: error}
);
export const { listReducer_search_start, listReducer_search_success, listReducer_search_failure } =  listReducer.actions;

export default  listReducer.reducer;

// Value Selector
export const listReducer_valueSelector = (store) => store.listReducer;
