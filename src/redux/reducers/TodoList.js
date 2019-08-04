import * as types from '../types'

const initialValue = {
    data: [],
    isLoading: true,
    isError: false,
    isFinish: false,
    isLoggedIn: false
}

export default (state = initialValue, action) => {
    if (action.type === types.TODO_ADD) {
        state = {...state, data: [...state.data, action.payload]}
    } else if (action.type === types.TODO_DELETE) {
        state = { ...state, data: [
            ...state.data.slice(0, action.index),
            ...state.data.slice(action.index + 1)]}
    } else if (action.type === types.TODO_EDIT) {
        state = { ...state, data: [
            ...state.data.slice(0, action.index), action.payload,
            ...state.data.slice(action.index + 1)]}
    }
    return state
}