import React, { SelectHTMLAttributes } from "react";

import './style.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    name: string;
    label: string;
    options: Array<{
        value: string,
        label: string;
    }>
}

const  Select: React.FC<SelectProps> = ({name,label, options, ...rest})=>{
    return(
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value='' id={name} {...rest}>
                <option value="" disabled  hidden>Selecione uma opcao</option>
                {options.map(op =>{
                    return <option key={op.value} value={op.value}>{op.label}</option>
                })}
            </select>
        </div>
    )
}

export default Select;