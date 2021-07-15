import React, {FormEvent, useState} from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';



const TeacherList: React.FC<Teacher> =() => {
    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [time, setTime] = useState('')

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('classes', {
            params:{
                subject, 
                week_day,
                time
            }
        })

        console.log(response.data)
        setTeachers(response.data)
    }

    return (
       <div id="page-teacher-list" className="container">
           <PageHeader title='Estes são os proffys disponiveis'>
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select  
                    name="subject" 
                    label="Materia" 
                    value={subject}
                    onChange={e =>{
                        setSubject(e.target.value)
                    }}
                    options={[
                        {value: 'Artes', label: 'Artes'},
                        {value: 'matematica', label: 'Matematica'},
                        {value: 'ciencias', label: 'Ciencias'},
                        {value: 'Fisica', label: 'Fisica'}
                    ]}/>
                    <Select  
                    name="week_day" 
                    label="Dia da semana" 
                    value={week_day}
                    onChange={e =>{
                        setWeek_day(e.target.value)
                    }}
                    options={[
                        {value: '0', label: 'Segunda-feira'},
                        {value: '1', label: 'Terça-feira'},
                        {value: '2', label: 'Quarta-feira'},
                        {value: '4', label: 'Quinta-feira'},
                        {value: '5', label: 'Sexta-feira'},
                        {value: '6', label: 'Sãbado'}
                    ]}/>
                    <Input 
                    type="time"
                    name="time" 
                    label="Hora" 
                    value={time}
                    onChange={e =>{
                        setTime(e.target.value)
                    }}
                    />
                    <button type="submit"> 
                        Buscar
                    </button>
                </form>
           </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) =>   {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
               
               
            </main>

       </div>
    )
}

export default TeacherList;