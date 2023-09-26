import React from 'react';
import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import data from './data';
import { changeFilter, clearAllCompleted } from '../../store/slicer/todoSlicer';
import activeClass from './utils';

export default function Footer() {
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.todos.todos);
  const itemsLeftNumber = allNotes.filter(
    (item) => item.completed === false,
  ).length;
  const itemsDone = allNotes.filter((item) => item.completed === true).length;
  const { filter } = useSelector((state) => state.todos);

  const changeActive = (newActive) => {
    switch (newActive) {
      case 'active':
        return dispatch(changeFilter('active'));
      case 'completed':
        return dispatch(changeFilter('completed'));
      default:
        return dispatch(changeFilter('all'));
    }
  };

  const clearCompleted = () => {
    const completedNotes = allNotes
      .filter((item) => item.completed)
      .map((item) => item.id);
    dispatch(clearAllCompleted(completedNotes));
  };

  const buttons = data.map((item) => (
    <li className={activeClass(item.id, filter)} key={item.text.length}>
      <button type="button" onClick={() => changeActive(item.id)}>
        {item.text}
      </button>
    </li>
  ));

  return (
    <footer className="footer">
      <span className="needToDo">
        <strong>{itemsLeftNumber}</strong>
        {' '}
        items left
      </span>
      <ul className="filters">{buttons}</ul>
      {itemsDone ? (
        <button
          type="button"
          className="clearCompleted"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}
