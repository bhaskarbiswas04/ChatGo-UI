import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    // pushMessage: (state, action) => {
    //   state.messages = [...state.messages, action.payload];
    // },
  },
});

export const { setMessages, pushMessage } = messageSlice.actions;
export default messageSlice.reducer;
