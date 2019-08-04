import * as types from '../types'

export const addData = data => {
    return {
        type: types.TODO_ADD,
        payload: {id:data.id, task:data.task, category:data.category, color:data.color, status:data.status}
    }
}

export const delData = index => {
    return {
        type: types.TODO_DELETE,
        index: index
    }
}

export const editData = data => {
    return {
        type: types.TODO_EDIT,
        payload: {id:data.id, task:data.task, category:data.category, color:data.color, status:data.status},
        index: data.index
    }
}