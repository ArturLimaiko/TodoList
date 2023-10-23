import React, {FunctionComponent} from 'react';
import {FilterValuesType} from "../App";
import s from './button.module.css'


type PropsType = {
    name: string
    callBack: () => void
    filter?: FilterValuesType
}

//Создали универсальную компоненту кнопки
export const Button: FunctionComponent<PropsType> = ({name, callBack, filter}) => {

    console.log('filter', filter, name)

    const onClickHandler = () => {
        callBack()
    }

    const finalClassName = `${s.button} ${filter?.toLowerCase() === name.toLowerCase() ? s.active : ''}`

    return (
        <button
            onClick={onClickHandler}
            className={finalClassName}
        >
            {name}
        </button>
    );
};