import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface EditorSizeState {
    value: {
        layoutType: editorSizeType
    }
}

const initialState = { value: { layoutType: "r" } } satisfies EditorSizeState as EditorSizeState

const editorSizeSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        changeSize(state, action: PayloadAction<editorSizeType>) {
            state.value.layoutType = action.payload
        },
    },
})

export const { changeSize } = editorSizeSlice.actions
export default editorSizeSlice.reducer