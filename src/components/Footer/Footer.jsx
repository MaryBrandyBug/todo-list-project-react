import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import s from './Footer.module.scss';
import data from './data';
import { changeFilter, clearAllCompleted } from '../../store/slicer/todoSlicer';

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
    <li className={cx({ [s.currentLink]: item.id === filter })} key={item.text.length}>
      <button className={s.selector} type="button" onClick={() => changeActive(item.id)}>
        {item.text}
      </button>
    </li>
  ));

  return (
    <footer className={s.root}>
      <span className={s.needToDo}>
        <strong>{itemsLeftNumber}</strong>
        {' '}
        items left
      </span>
      <ul className={s.filters}>{buttons}</ul>
      {itemsDone ? (
        <button
          type="button"
          className={s.clearCompleted}
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}
