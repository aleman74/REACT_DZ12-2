import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import {
    itemReducer_search_start,
    itemReducer_valueSelector,
    set_itemReducer_param_start
} from "../store/itemReducer";


export default function Item2(props) {

    const {item, loading, error} = useSelector(itemReducer_valueSelector);
    const dispatch = useDispatch();

    const [isRepeat, setRepeat] = useState(false);

    // Определяем переданное ID
    const v = useParams();
    console.log('id', v.id);


    useEffect(() => {

        const url = process.env.REACT_APP_API_URL + '/' + v.id;

        // Запускаем загрузку данных
        dispatch(
            itemReducer_search_start(
                set_itemReducer_param_start(url)
            ));

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
                <div className="cssload-zenith" />
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