import React from 'react';
import {FilterValuesType} from "../App";

type PropsType = {
    name: string
    callBack: () => void
}

//Создали универсальную компоненту кнопки
export const Button = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }

    return (
            <button onClick={onClickHandler}>{props.name}</button>
    );
};