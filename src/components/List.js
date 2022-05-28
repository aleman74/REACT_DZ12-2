import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { ajax } from 'rxjs/ajax';
import { from, of } from 'rxjs';
import { map, filter, debounceTime, retry } from 'rxjs/operators';
import { mergeMap, concatMap, exhaustMap, switchMap, catchError } from 'rxjs/operators';

import {
    listReducer_search_start,
    listReducer_valueSelector,
    listReducer_search_failure,
    set_listReducer_param_failure,
    set_listReducer_param_success,
    listReducer_search_success
} from "../store/listReducer";


export default function List(props) {

    const {items, loading, error} = useSelector(listReducer_valueSelector);
    const dispatch = useDispatch();

    const [isRepeat, setRepeat] = useState(false);


    useEffect(() => {

        const data$ = from([process.env.REACT_APP_API_URL]);

        const v$ = data$.pipe(

            map(o => {
                dispatch(
                    listReducer_search_start()
                );

                return o;
            }),

            switchMap(url => ajax.getJSON(url).pipe(        // запускаем новый поток
                catchError(ex => {
//                    of(console.log('error_handler', {ex}, ex.status, ex.request.url));
                    return of(dispatch(
                        listReducer_search_failure(
                            set_listReducer_param_failure(ex.message)
                        )
                    ));
                }),
            )),
        ).subscribe({
            next: value => {

                // Считаем, что успешный запрос обязательно должен вернуть массив
                if (Array.isArray(value))
                {
                    dispatch(
                        listReducer_search_success(
                            set_listReducer_param_success(value)
                        )
                    )
                }
            },
            error: error => (
                dispatch(
                    listReducer_search_failure(
                        set_listReducer_param_failure(error)
                    )
                )
            ),
            complete: () => console.info('complete')
        });


        return () => {
            v$.unsubscribe();
        };

    }, [dispatch, isRepeat]);     // dispatch, isRepeat


    const onRepeat = (evt) => {
        evt.preventDefault();
        setRepeat(!isRepeat);
    };

    // Ошибка
    if (error)
        return (
            <>
                <div className="error">
                    <span>Произошла ошибка!</span>
                    <button className="repeate" onClick={onRepeat}>Повторить запрос</button>
                </div>
            </>
        );

    // При загрузке отображаем loader
    if (loading)
        return (
            <div className="cssload-container">
                <div className="cssload-zenith"></div>
            </div>
        );

    // Если данных нет, то ничего не отображаем
    if (items.length == 0)
        return null;

    // Есть данные и не загрузка
    return (
        <div id="data">
            {items.map((item) =>
                <Link key={item.id} to={'/' + item.id + '/details'}>{item.name}</Link>
            )}
        </div>
    );

}