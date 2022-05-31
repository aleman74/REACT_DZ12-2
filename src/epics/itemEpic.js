import {ofType} from 'redux-observable';
import {of} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {map, filter, debounceTime, switchMap, catchError} from 'rxjs/operators';

import {
    itemReducer_search_failure,
    itemReducer_search_start,
    itemReducer_search_success,
    set_itemReducer_param_failure,
    set_itemReducer_param_success
} from "../store/itemReducer";



// --------------------------------
// Загрузка элемента
// --------------------------------
// Запуск dispatch(
//          itemReducer_search_start(
//                  set_itemReducer_param_start(url)
//        ))
export const itemEpic = (action$, state$) => action$.pipe(
    ofType(itemReducer_search_start),      //    ofType('data2/itemReducer_search_start'),

    switchMap(o => ajax.getJSON(o.payload.url).pipe(        // запускаем новый поток

        map(o => {
//            console.log('epic-1-3', {o});
            return itemReducer_search_success(
                set_itemReducer_param_success(o)
            );
        }),

        catchError(ex => {
//            of(console.log('error_handler', {ex}, ex.status, ex.request.url));
            return of(itemReducer_search_failure(
                set_itemReducer_param_failure(ex.message))
            );
        }),
    )),
);
