import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    filter: 'all',
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: new Date().getTime(),
        text: action.payload,
        completed: false,
      });
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo(state, action) {
      const toggledItem = state.todos.find((todo) => todo.id === action.payload);
      toggledItem.completed = !toggledItem.completed;
    },
    toggleAllTodo(state, action) {
      action.payload.forEach((item) => {
        const toggledItem = state.todos.find((todo, i) => i === item);
        toggledItem.completed = !toggledItem.completed;
      });
    },
    untoggleAllTodo(state, action) {
      action.payload.forEach((item) => {
        const untoggledItem = state.todos.find((todo, i) => i === item);
        untoggledItem.completed = !untoggledItem.completed;
      });
    },
    clearAllCompleted(state, action) {
      action.payload.forEach((item) => {
        state.todos = state.todos.filter((todo) => todo.id !== item);
      });
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    changeTodoText(state, action) {
      const item = state.todos.find((todo) => todo.id === action.payload.id);
      if (action.payload) {
        item.text = action.payload.editing;
      }
    },
  },

});

export const {
  addTodo, removeTodo, toggleTodo, toggleAllTodo, untoggleAllTodo, clearAllCompleted, changeFilter, changeTodoText,
} = todoSlice.actions;
export default todoSlice.reducer;
