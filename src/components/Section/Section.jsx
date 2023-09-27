import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Section.module.scss';

import Note from '../Note';
import Footer from '../Footer';

import {
  toggleAllTodo, untoggleAllTodo,
} from '../../store/slicer/todoSlicer';
import filterTasks from './utils';

export default function Section() {
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);

  const itemsCompleted = allNotes.filter((item) => item.completed === true).length;

  const toggleAll = () => {
    const currentUncompleted = allNotes.map((item) => item.completed);
    if (currentUncompleted.includes(true) && currentUncompleted.includes(false)) {
      const uncompletedNotes = allNotes.map((item, i) => (!item.completed ? i : null)).filter((item) => item !== null);
      dispatch(toggleAllTodo(uncompletedNotes));
    }
    if (!currentUncompleted.includes(false) || !currentUncompleted.includes(true)) {
      const completedNotes = allNotes.map((item, i) => i);
      dispatch(untoggleAllTodo(completedNotes));
    }
  };

  const allTasks = filterTasks(allNotes, filter).map((item) => <Note key={item.id} id={item.id} text={item.text} completed={item.completed} />);

  return (
    <section className={s.mainContent}>
      <input id="toggle-all" className={s.toggleAll} type="checkbox" onChange={toggleAll} checked={allNotes.length && allNotes.length === itemsCompleted ? 1 : 0} />
      <label htmlFor="toggle-all" />
      <ul className={s.todoList}>
        {allTasks}
      </ul>
      <Footer />
    </section>
  );
}
