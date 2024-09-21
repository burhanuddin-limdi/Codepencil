import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ProjectDataState {
    value: {
        name: string,
        projectEdited: boolean,
        htmlCode?: string,
        cssCode?: string,
        jsCode?: string,
        projectId?: string,
        uid?: string
    }
}

const initialState = { value: { name: "Untitled", projectEdited: false } } satisfies ProjectDataState as ProjectDataState

const projectDataSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        changeName(state, action: PayloadAction<editorLayoutType>) {
            state.value.name = action.payload
        },
        changeProjectEdited(state, action: PayloadAction<boolean>) {
            state.value.projectEdited = action.payload
        },
        changeHtml(state, action: PayloadAction<string>) {
            state.value.htmlCode = action.payload
        },
        changeCss(state, action: PayloadAction<string>) {
            state.value.cssCode = action.payload
        },
        changeJs(state, action: PayloadAction<string>) {
            state.value.jsCode = action.payload
        },
        setProjectId(state, action: PayloadAction<{ projectId: string, uid: string }>) {
            state.value.projectId = action.payload.projectId
            state.value.uid = action.payload.uid
        },

    },
})

export const { changeName, changeProjectEdited, changeHtml, changeCss, changeJs, setProjectId } = projectDataSlice.actions
export default projectDataSlice.reducer