import React, { useEffect, useState } from 'react';
import { number, bool, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodo, changeTodoText } from '../../store/slicer/todoSlicer';
import { checkLength } from '../../modules/utils/utils';

export default function Note({ id, completed, text }) {
  const dispatch = useDispatch();

  const [noteStatus, setNoteStatus] = useState(true);
  const [editing, setEditing] = useState(text);

  const removeNote = () => {
    dispatch(removeTodo(id));
  };

  const toggledNote = () => {
    dispatch(toggleTodo(id));
  };

  const changeStatusToEdit = () => {
    if (noteStatus) {
      setNoteStatus(!noteStatus);
    }
  };

  const handleInput = (e) => {
    setEditing(e.target.value);
  };

  const adding = (event) => {
    if (event.key === 'Enter' && checkLength(editing)) {
      dispatch(changeTodoText({ id, editing }));
      setNoteStatus(true);
    }
    if (event.key === 'Enter' && !checkLength(editing)) {
      dispatch(removeTodo(id));
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.className !== 'edit' && checkLength(editing)) {
        dispatch(changeTodoText({ id, editing }));
        setNoteStatus(true);
      }
      if (!checkLength(editing)) {
        dispatch(removeTodo(id));
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [editing]);

  return (
    <li key={id} id={id} className={completed ? 'completed' : ''} onDoubleClick={changeStatusToEdit}>
      <div className="div">
        {noteStatus
          ? (
            <>
              <input type="checkbox" className="toggle" onChange={toggledNote} checked={completed} />
              <label htmlFor="noteStatus">
                {text}
              </label>
              <button className="deleteBtn" type="button" onClick={removeNote} aria-label="remove-button" />
            </>
          )
          : <input className="edit" value={editing} onChange={handleInput} onKeyDown={adding} />}
      </div>
    </li>
  );
}

Note.propTypes = {
  id: number,
  completed: bool,
  text: string,
};
