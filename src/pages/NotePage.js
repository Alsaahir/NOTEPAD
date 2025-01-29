import React, {useState, useEffect} from 'react'
// import notes from '../assets/data'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useParams, Link, useNavigate } from 'react-router-dom'; 


function NotePage ({match, history}) {
  const navigate = useNavigate()

  let [note, setNote] = useState(null)
  let { id } = useParams()

  useEffect(() => {
    getNote()
  }, [id])

  let getNote = async () => {
    if (id === 'new') return
    let response = await fetch(`http://localhost:5000/notes/${id}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    let response = await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
    navigate('/')
  }

  let updateNote = async () => {
    let response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
    let data = await response.json()
  }

  let handleSubmit = () => {
    if (id !== 'new' && !note.body) {
      deleteNote()
    } else if (id !== 'new'){
      updateNote()
    } else if (id === 'new' && note !== null){
      createNote()
    }
    updateNote()

    navigate('/');
  }

  let deleteNote = () => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    })
    navigate('/');
  }


  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to='/'>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== 'new' ? (
        <button onClick={deleteNote}>Delete</button>
      ) : (
        <button onClick={createNote}>Done</button>
      )}
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
