import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { ajax } from 'rxjs/ajax';
import { from, of } from 'rxjs';
import { map, filter, debounceTime, retry } from 'rxjs/operators';
import { mergeMap, concatMap, exhaustMap, switchMap, catchError } from 'rxjs/operators';
import {Navigate, useParams} from "react-router-dom";

import {
    itemReducer_search_failure,
    itemReducer_search_start,
    itemReducer_search_success,
    itemReducer_valueSelector,
    set_itemReducer_param_failure,
    set_itemReducer_param_success
} from "../store/itemReducer";


export default function Item(props) {

    const {item, loading, error} = useSelector(itemReducer_valueSelector);
    const dispatch = useDispatch();

    const [isRepeat, setRepeat] = useState(false);

    // Определяем переданное ID
    const v = useParams();
    console.log('id', v.id);


    useEffect(() => {

        const data$ = from([process.env.REACT_APP_API_URL + '/' + v.id]);

        const v$ = data$.pipe(

            map(o => {
                dispatch(
                    itemReducer_search_start()
                );

                return o;
            }),

            switchMap(url => ajax.getJSON(url).pipe(        // запускаем новый поток
                catchError(ex => {
//                    of(console.log('error_handler', {ex}, ex.status, ex.request.url));
                    return of(
                        dispatch(
                            itemReducer_search_failure(
                                set_itemReducer_param_failure(ex.message)
                        )
                    ));
                }),
            )),
        ).subscribe({
            next: value => {

                // Считаем, что успешный запрос обязательно должен вернуть массив
                if (value.id)
                {
                    dispatch(
                        itemReducer_search_success(
                            set_itemReducer_param_success(value)
                        )
                    )
                }
            },
            error: error => (
                dispatch(
                    itemReducer_search_failure(
                        set_itemReducer_param_failure(error)
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
    if (! item.id)
        return null;

    // Есть данные и не загрузка
    return (
        <div id="data">
            <div>{'ID = ' + item.id}</div>
            <div>{'NAME = ' + item.name}</div>
            <div>{'PRICE = ' + item.price}</div>
            <div>{'CONTENT = ' + item.content}</div>
        </div>
    );

}