import {createSlice} from '@reduxjs/toolkit';


// Структура данных
const initialState = {
    item: { id: '', name: '', price: '', content: '' },
    loading: false,
    error: null
};



const itemReducer = createSlice({
    name: 'data',
    initialState,
    reducers: {

        itemReducer_search_start(state, action)
        {
            console.log('itemReducer_search_start', action.payload);
            state = {...state, loading: true, error: null}

            return state;
        },

        itemReducer_search_success(state, action)
        {
            console.log('dataReducer_search_success', action.payload.item);


            const item = action.payload.item;

            state = {...state, item: item, loading: false, error: null};

            console.log({state});

            return state;
        },

        itemReducer_search_failure(state, action)
        {
            console.log('itemReducer_search_failure', action.payload);

            const error = action.payload.error;
            state = {...state, loading: false, error: error}

            return state;
        }
    },
});

export const set_itemReducer_param_success = (item) => (
    {item: item}
);
export const set_itemReducer_param_failure = (error) => (
    {error: error}
);
export const { itemReducer_search_start, itemReducer_search_success, itemReducer_search_failure } = itemReducer.actions;

export default itemReducer.reducer;

// Value Selector
export const itemReducer_valueSelector = (store) => store.itemReducer;
