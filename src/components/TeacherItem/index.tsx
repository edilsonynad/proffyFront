import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './style.css';

export interface Teacher {
    id: number
    avatar: string
    bio: string
    cost: number
    name: string
    subject: string
    user_id: number
    whatsapp: string
}

interface TeacherItemProps{
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {

    function createNewConnection(){
        api.post('connections', {
            user_id: teacher.id,
        })
    }

    const {id, 
        avatar,
        bio,
        cost,
        name,
        subject,
        user_id,
        whatsapp} = teacher

    return (
        <div>
              <article className="teacher-item">
                    <header>
                        <img src={avatar} alt={name} />
                        <div>
                            <strong>{name}</strong>
                            <span>{subject}</span>
                        </div>
                    </header>
                    <p>{bio}</p>
                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ {cost}</strong>
                        </p>
                        <a target='_blank' onClick={createNewConnection} href={`https://wa.me/${whatsapp}`} type="button">
                            <img src={whatsappIcon} alt="" />
                            Entrar em contacto
                        </a>
                    </footer>
                </article>
        </div>
    )
}

export default TeacherItem;
