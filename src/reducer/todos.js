import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo(state, action) {
      const {id, text} = action.payload;
      state.push({id, text, completed: false});
    },
    toggleTodo(state, action) {
      const todoItem = state.find(item => item.id === action.payload);
      console.log(1111, state, todoItem)
      if (todoItem) {
        todoItem.completed = !todoItem.completed;
      }
    }
  },
});

export const { addTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;