import { configureStore } from '@reduxjs/toolkit'
import editorLayoutSlice from './features/editor-layout.slice'
import editorSizeSlice from './features/editor-size.slice'
import projectDataSlice from './features/project-data.slice'

export const makeStore = () => {
    return configureStore({
        reducer: { editorLayoutSlice, editorSizeSlice, projectDataSlice },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']