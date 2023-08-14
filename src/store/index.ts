import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './reducers/authSlic'
import { patientSlice } from './reducers/patientSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    patient : patientSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch