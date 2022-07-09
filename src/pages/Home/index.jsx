import React, {useState, useEffect} from 'react';
import './styles.css';
import {Card} from '../../componets/Card';

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudent] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  const  handdleAddStudent = () => {
    const newStudent ={
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
      }),
    };

    setStudent(prevState => [...prevState, newStudent])
  }

  const resetList = () => {
    setStudent([])
  }

  useEffect(() =>{
    fetch ('https://api.github.com/users/iagopuzer')
    .then(response => response.json())
    .then(data => {
      setUser({
        avatar: data.avatar_url,
        name: data.name
      })
    })
  }, [])

  return (
   <div className="container">
    <header>
      <h1>Lista de Presença</h1>
      
      <div className="usuario">
        <strong>{user.name}</strong>
        <img src={user.avatar} alt='Foto de perfil'></img>
      </div>
    </header>
    
    
    <input type="text" 
    placeholder='Digite o nome'
    onChange={e => setStudentName(e.target.value)}
    />
    
    <div className="btn-list">
    <button type="button" onClick={handdleAddStudent}>Adicionar</button>
    <button type="button" onClick={resetList} >Resetar Lista</button>
    </div>
    

    {
      
      students.map(student =>  
      <Card 
      key={student.time}
      name={student.name} 
      time={student.time} 
      />  )
      
    }
   </div>  
  
  )
}


