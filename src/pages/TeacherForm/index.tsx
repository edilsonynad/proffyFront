import React, {FormEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';


import PageHeader from '../../components/PageHeader';
import './styles.css';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';
import { Redirect } from 'react-router-dom';

export default function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''}
    ]);
    
    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, from: '', to: ''}
        ])
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault()

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        }).then((response)=>{
            alert('Cadastro realizado com sucesso!!!!')
            history.push('/')
        }).catch(()=>{
            alert('Erro no cadastro!!!!!')
        })
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updateSetScheduleItems = scheduleItems.map((scheduleItem, index) =>{
            if(index === position){
                return {...scheduleItem, [field]: value};
            }

            return scheduleItem;
        })

       setScheduleItems(updateSetScheduleItems)
    }

    return (
        <div id="page-teacher-form" className="container">
           <PageHeader 
            title='Que incrivel qu voce quer dar aulas!' 
            description='O primeiro passo e preencher o formulario de inscricao'
           />
           <main>
               <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                        name="name" 
                        label="Nome completo"
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}
                        />
                        <Input 
                        name="avatar" 
                        label="Avatar"
                        value={avatar}
                        onChange={(e)=>{
                            setAvatar(e.target.value)
                        }}/>
                        <Input 
                        name="whatsapp" 
                        label="Whatsapp"
                        value={whatsapp}
                        onChange={(e)=>{
                            setWhatsapp(e.target.value)
                        }}/>
                        <Textarea
                        name="bio" 
                        label="Biografia"
                        value={bio}
                        onChange={(e)=>{
                            setBio(e.target.value)
                        }}
                        /> 
                        
                    </fieldset>
                    <fieldset>
                            <legend>Sobre a aula</legend>

                            <Select  
                            name="subject" 
                            label="Materia" 
                            value={subject}
                            onChange={(e)=>{
                                setSubject(e.target.value)
                            }}
                            options={[
                                {value: 'Artes', label: 'Artes'},
                                {value: 'matematica', label: 'Matematica'},
                                {value: 'ciencias', label: 'Ciencias'},
                                {value: 'Fisica', label: 'Fisica'}
                            ]}
                            
                            
                            />
                            <Input 
                            name="cost" 
                            label="Custo da sua hora por aula" 
                            value={cost}
                            onChange={(e)=>{
                                setCost(e.target.value)
                            }}
                            />
                    </fieldset>
                    <fieldset>
                            <legend>
                                Horarios Disponiveis 
                                <button type="button" onClick={addNewScheduleItem}>
                                    + Novo horario
                                </button>
                            </legend> 
                        
                        {scheduleItems.map((scheduleItem, index) =>{
                        return(
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select  
                                    name="week_day" 
                                    label="Dia da semana" 
                                    value={scheduleItem.week_day}
                                    onChange={
                                        e=>{
                                            setScheduleItemValue(index,'week_day', e.target.value)
                                        }
                                    }
                                    options={[
                                        {value: '0', label: 'Segunda-feira'},
                                        {value: '1', label: 'Ter??a-feira'},
                                        {value: '2', label: 'Quarta-feira'},
                                        {value: '4', label: 'Quinta-feira'},
                                        {value: '5', label: 'Sexta-feira'},
                                        {value: '6', label: 'S??bado'}
                                    ]}
                                    />

                                    <Input 
                                        name="from" 
                                        label='Das' 
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={
                                            e=>{
                                                setScheduleItemValue(index,'from', e.target.value)
                                            }
                                        }
                                    />
                                    <Input 
                                        name="from" 
                                        label='At??' 
                                        type="time" 
                                        value={scheduleItem.to}
                                        onChange={
                                            e=>{
                                                setScheduleItemValue(index,'to', e.target.value)
                                            }
                                        }
                                    />
                                </div>
                        )
                        })}

                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
              </form>
           </main>
       </div>
    )
}
 