import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkLength } from '../../modules/utils/utils';
import s from './Header.module.scss';
import { addTodo } from '../../store/slicer/todoSlicer';

export default function Header() {
  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState('');

  const handleInput = (e) => {
    setNewNote(e.target.value);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.className !== 'newNote' && checkLength(newNote)) {
        dispatch(addTodo(newNote));
        setNewNote('');
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [newNote]);

  const adding = (event) => {
    if (event.key === 'Enter' && checkLength(newNote)) {
      dispatch(addTodo(newNote));
      setNewNote('');
    }
  };

  return (
    <header className={s.header}>
      <h1>todos</h1>
      <input
        type="text"
        value={newNote}
        onChange={handleInput}
        onKeyDown={adding}
        name="note"
        className={s.newNote}
        placeholder="What needs to be done?"
        autoFocus
      />
    </header>
  );
}
