import React, {Component} from'react'
import {Text, View, TextInput, TouchableOpacity,} from 'react-native'
import {connect} from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import styles from './styles'
import {TriangleColorPicker, toHsv, fromHsv} from 'react-native-color-picker'
import * as actionToDoList from '../../redux/actions/ToDoList'

let arr = []

class EditForm extends Component {

    constructor(props){
        super(props)
        this.state={
            index:'',
            id:'',
            task:'',
            category:'',
            color: toHsv('green'),
            status:''
        }
        this.onColorChange = this.onColorChange.bind(this)
    }

    componentDidMount() {
        const {navigation} = this.props
        this.setState({id:navigation.getParam('id','')})
        const id = navigation.getParam('id','')
        arr = this.props.TodoList.data
        const index = arr.indexOf(arr.find(val => {return val.id === id}))
        const data = arr.find(val => {return val.id === id})
        this.setState({index:index,id:id,task:data.task,category:data.category,color:data.color,status:data.status})
    }

    onColorChange(color) {
        this.setState({ color:color })
    }
    
    async handleIncrement() {
        await this.props.editData({index:this.state.index, id:this.state.id, task: this.state.task, category: this.state.category, color:fromHsv(this.state.color), status:this.state.status})
        await this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ],
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Form Edit</Text>
                </View>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={(task) => this.setState({task:task})}
                    value={this.state.task}
                    placeholder='New Task...'
                    placeholderTextColor='gray'
                    underlineColorAndroid='transparent'>
                </TextInput>
                <TextInput 
                    style={[styles.textInput, {marginTop:5}]}
                    onChangeText={(category) => this.setState({category:category})}
                    value={this.state.category}
                    placeholder='Name Category...'
                    placeholderTextColor='gray'
                    underlineColorAndroid='transparent'>
                </TextInput>
                <View style={{alignItems:'center'}} >
                    <Text style={styles.colorText} >
                        Select your list colors :
                    </Text>
                </View>
                <View style={styles.colorBox} >
                    <TriangleColorPicker
                        oldColor='white'
                        color={this.state.color}
                        onColorChange={this.onColorChange}
                        onColorSelected={color => alert(`Color selected: ${color}`)}
                        onOldColorSelected={color => alert(`Old color selected: ${color}`)}
                        style={{flex: 1}}
                    />
                </View>
                <TouchableOpacity onPress={ () => this.handleIncrement() } style={styles.addButton}>
                    <Text style={styles.addButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateProps = (state) => {
    return {
        TodoList: state.TodoList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editData: data => dispatch(actionToDoList.editData(data))
    }
}

export default connect(mapStateProps,mapDispatchToProps)(EditForm)