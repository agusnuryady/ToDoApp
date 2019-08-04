import React, {Component} from'react'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import styles from './styles'
import {TriangleColorPicker, toHsv, fromHsv} from 'react-native-color-picker'
import * as actionToDoList from '../../redux/actions/ToDoList'

let arr = []

class AddForm extends Component {

    constructor(props){
        super(props)
        const data = this.props.TodoList.data
        arr = Object.keys(data).map(function(key) {return data[key]})
        this.state={
            id:'',
            task:'',
            category:'',
            color: toHsv('green'),            
        }
        this.onColorChange = this.onColorChange.bind(this)
    }

    componentDidMount() {
        this.idStat()
    }

    idStat() {
        if(arr !== 'undifined' && arr.length > 0) {
            const mapId = arr.map(value => {
                return value.id
            })
            const maxId = Math.max.apply(null, mapId)+1
            this.setState({id:maxId})
        }else{
            this.setState({id:1})
        }
    }

    onColorChange(color) {
        this.setState({ color:color })
    }
    
    async handleIncrement() {
        await this.props.addData({id:this.state.id, task: this.state.task, category: this.state.category, color:fromHsv(this.state.color), status:0})
        await this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ],
        }))
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Form Input</Text>
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
        addData: data => dispatch(actionToDoList.addData(data))
    }
}

export default connect(mapStateProps,mapDispatchToProps)(AddForm)