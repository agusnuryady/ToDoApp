import {createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import appReducer from './reducers/Index'
import middleware from './middleware'

const config = {
    key: 'primary',
    storage:AsyncStorage,
    whitelist: ['TodoList'],
    blacklist: ['router']
}

let persistedReducer = persistReducer(config,appReducer)
let store = createStore(persistedReducer,applyMiddleware(...middleware))
let persistor = persistStore(store)

export {
    store,
    persistor
}