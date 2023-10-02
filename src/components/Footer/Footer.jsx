import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import s from './Footer.module.scss';
import data from './data';
import { changeFilter, clearAllCompleted } from '../../store/slicer/todoSlicer';

import Button from '../Button';

export default function Footer() {
  const dispatch = useDispatch();
  const [clearBtn, setClearBtn] = useState(false);
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

  useEffect(() => {
    if (itemsDone) {
      setClearBtn(true);
    } else {
      setClearBtn(false);
    }
  }, [itemsDone]);

  const clearCompleted = () => {
    const completedNotes = allNotes
      .filter((item) => item.completed)
      .map((item) => item.id);
    dispatch(clearAllCompleted(completedNotes));
  };

  const buttons = data.map((item) => (
    <li className={cx({ [s.currentLink]: item.id === filter })} key={item.text.length}>
      <Button className={s.selector} onClick={changeActive} cbData={item.id} text={item.text} />
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
      {clearBtn && <Button className={s.clearCompleted} onClick={clearCompleted} text="Clear completed" />}
    </footer>
  );
}
