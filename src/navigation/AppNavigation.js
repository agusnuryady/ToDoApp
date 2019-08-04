import {createAppContainer, createStackNavigator} from 'react-navigation'
import Home from '../screens/home/Home'
import AddForm from '../screens/addForm/AddForm'
import EditForm from '../screens/editForm/EditForm'

const AppNavigation = createStackNavigator({
    Home:Home,
    AddForm:AddForm,
    EditForm:EditForm
}, {
    initialRouteName:'Home',
    headerMode:'none'
})

export default createAppContainer(AppNavigation)