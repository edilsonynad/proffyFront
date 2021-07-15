import React from 'react'

import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import './style.css'

interface PageHeaderProps{
    title: String;
    description?: String;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({ title, description, children }) => {
    return (
        <div>
            <header className="page-header">
               <div className="top-bar-container">
                   <Link to='/' >
                       <img src={backIcon} alt="Voltar"/>
                   </Link>
                   <img src={logoImg} alt="Proffy"/>
               </div>

                <div className="header-content">
                    <strong> { title } </strong>
                    {description && <p>{description}</p>}
                    { children }
                </div> 
           </header>
        </div>
    )
}

export default PageHeader;