import {ofType} from 'redux-observable';
import {of} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {map, filter, debounceTime, switchMap, catchError} from 'rxjs/operators';

import {
    listReducer_search_failure,
    listReducer_search_start,
    listReducer_search_success,
    set_listReducer_param_failure,
    set_listReducer_param_success
} from "../store/listReducer";

// --------------------------------
// Загрузка списка
// --------------------------------
// Запуск dispatch(
//          listReducer_search_start(
//                  set_listReducer_param_start(url)
//        ))
export const listEpic = (action$, state$) => action$.pipe(
    ofType(listReducer_search_start),      //    ofType('data/listReducer_search_start'),

    switchMap(o => ajax.getJSON(o.payload.url).pipe(        // запускаем новый поток

        map(o => {
//            console.log('epic-1-3', {o});
            return listReducer_search_success(
                set_listReducer_param_success(o)
            );
        }),

        catchError(ex => {
//            of(console.log('error_handler', {ex}, ex.status, ex.request.url));
            return of(listReducer_search_failure(
                set_listReducer_param_failure(ex.message))
            );
        }),
    )),
);
