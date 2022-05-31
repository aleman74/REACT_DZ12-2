import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {
    listReducer_valueSelector,
    listReducer_search_start,
    set_listReducer_param_start,
} from "../store/listReducer";


export default function List2(props) {

    const {items, loading, error} = useSelector(listReducer_valueSelector);
    const dispatch = useDispatch();

    const [isRepeat, setRepeat] = useState(false);


    useEffect(() => {

        const url = process.env.REACT_APP_API_URL;

        // Запускаем загрузку данных
        dispatch(
            listReducer_search_start(
            set_listReducer_param_start(url)
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