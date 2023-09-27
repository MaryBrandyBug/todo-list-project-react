import React, { useEffect, useRef, useState } from 'react';
import { number, bool, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { removeTodo, toggleTodo, changeTodoText } from '../../store/slicer/todoSlicer';
import { checkLength } from '../../modules/utils/utils';
import s from './Note.module.scss';

export default function Note({ id, completed, text }) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

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
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(editing.length, editing.length);
    }
  }, [noteStatus]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.id !== 'edit' && checkLength(editing)) {
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
    <li key={id} id={id} className={cx(s.root, { [s.completed]: completed })} onDoubleClick={changeStatusToEdit}>
      <div className={s.div}>
        {noteStatus
          ? (
            <>
              <input type="checkbox" className={s.toggle} onChange={toggledNote} checked={completed} />
              <label htmlFor="noteStatus" className={s.label}>
                {text}
              </label>
              <button className={s.deleteBtn} type="button" onClick={removeNote} aria-label="remove-button" />
            </>
          )
          : <input ref={inputRef} type="text" autoFocus id="edit" className={s.edit} value={editing} onChange={handleInput} onKeyDown={adding} />}
      </div>
    </li>
  );
}

Note.propTypes = {
  id: number,
  completed: bool,
  text: string,
};
