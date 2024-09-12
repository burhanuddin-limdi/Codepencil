import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface EditorLayoutState {
    value: {
        layoutType: editorLayoutType
    }
}

const initialState = { value: { layoutType: "t" } } satisfies EditorLayoutState as EditorLayoutState

const editorLayoutSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        changeLayout(state, action: PayloadAction<editorLayoutType>) {
            state.value.layoutType = action.payload
        },
    },
})

export const { changeLayout } = editorLayoutSlice.actions
export default editorLayoutSlice.reducer