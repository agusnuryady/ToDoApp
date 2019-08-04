import {combineReducers} from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import AppNavigation from '../../navigation/AppNavigation'
import TodoList from './TodoList'

const router = createNavigationReducer(AppNavigation)

const appReducer = combineReducers({
    router:router,
    TodoList:TodoList,
})

export default appReducer