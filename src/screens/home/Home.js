import React, {Component} from'react'
import {Text, View, ScrollView, TouchableOpacity, FlatList, Alert} from 'react-native'
import {Dropdown} from 'react-native-material-dropdown'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import styles from './styles'
import * as actionToDoList from '../../redux/actions/ToDoList'

var arr = []
var myObj = []

class Home extends Component {

    constructor(props){
        super(props)
        arr = this.props.TodoList.data
        this.state={
            value:'All Task',
        }
    }

    async componentWillMount() {
        await this.categoryArray()
    }

    async categoryArray() {
        if(this.props.TodoList.data !== 'undifined' && this.props.TodoList.data.length > 0) {
            myObj = []
            await this.props.TodoList.data.map(value => {
                myObj.push({value: value.category})
            })
            await myObj.unshift({value:'All Task'})
        } else {
            await myObj.unshift({value:'All Task'})
        }
    }

    async handleDelete(id) {
        arr = this.props.TodoList.data
        const index = arr.indexOf(arr.find(val => {return val.id === id}))
        await this.props.delData(index)
        await this.categoryArray()
    }
    
    async handleDone(id) {
        arr = this.props.TodoList.data
        const index = arr.indexOf(arr.find(val => {return val.id === id}))
        const data = arr.find(val => {return val.id === id})
        await this.props.editData({index:index, id:id,task:data.task,category:data.category,color:data.color,status:1})
    }

    async handleUndone(id) {
        arr = this.props.TodoList.data
        const index = arr.indexOf(arr.find(val => {return val.id === id}))
        const data = arr.find(val => {return val.id === id})
        await this.props.editData({index:index, id:id,task:data.task,category:data.category,color:data.color,status:0})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Dropdown
                        data={myObj}
                        containerStyle={styles.headerPicker}
                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                        fontSize={26}
                        baseColor='white'
                        textColor='white'
                        value='All Task'
                        dropdownPosition={-5}
                        itemColor='gray'
                        selectedItemColor='black'
                        onChangeText={(value) => this.setState({value:value})}
                    />
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <FlatList
                        data={this.state.value !== 'All Task' ?
                            this.props.TodoList.data.filter(value => {
                                return value.status === 0 && value.category === this.state.value
                            }):
                            this.props.TodoList.data.filter(value => {
                                return value.status === 0
                            })
                        }
                        renderItem={({item, index}) => (
                            <View
                            key={index} 
                            style={[styles.note, {borderLeftColor:item.color,}]}>
                                <TouchableOpacity 
                                    onPress={()=> this.handleDone(item.id)} 
                                    style={styles.noteUndone}>
                                    <Icon name='loading1' type='antdesign' color='#c8c8c8' size={22} />
                                </TouchableOpacity>
                                <View style={{flexDirection:'column'}} >
                                    <Text style={styles.noteText}>{item.task}</Text>
                                    <Text style={[styles.noteCategory, {color:item.color}]}>{item.category}</Text>
                                </View>
                                <View style={styles.noteBox} >
                                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditForm', {id:item.id})} style={styles.noteEdit}>
                                        <Icon name='edit' type='feather' color='white' size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={()=> Alert.alert(
                                            '',
                                            'Are you sure you want delete this? ',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                {
                                                    text:'OK', 
                                                    onPress: ()=> {
                                                        this.handleDelete(item.id)
                                                    }
                                                },
                                            ],
                                            {cancelable:false},
                                            )
                                        } 
                                        style={styles.noteDelete}>
                                        <Icon name='delete' type='antdesign' color='white' size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => {
                            return item.id.toString()
                        }}
                    />
                    {this.props.TodoList.data.indexOf(this.props.TodoList.data.find(val => {return val.status === 1})) > -1 ? 
                        <View style={{backgroundColor:'#F9F9F9'}} >
                            <Text style={styles.noteSeparate} >
                                Done
                            </Text>
                        </View> : null
                    }
                    <FlatList
                        data={this.state.value !== 'All Task' ?
                            this.props.TodoList.data.filter(value => {
                                return value.status === 1 && value.category === this.state.value
                            }):
                            this.props.TodoList.data.filter(value => {
                                return value.status === 1
                            })
                        }
                        renderItem={({item, index}) => (
                            <View
                            key={index} 
                            style={[styles.noteClear, {borderLeftColor:item.color,}]}>
                                <TouchableOpacity onPress={()=> this.handleUndone(item.id)} style={styles.noteDone}>
                                    <Icon name='check' type='entypo' color='white' size={22} />
                                </TouchableOpacity>
                                <View style={{flexDirection:'column'}} >
                                    <Text style={styles.noteTextClear}>{item.task}</Text>
                                    <Text style={[styles.noteCategoryClear, {color:item.color}]}>{item.category}</Text>
                                </View>
                                <View style={styles.noteBox} >
                                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditForm', {id:item.id})} style={styles.noteEdit}>
                                        <Icon name='edit' type='feather' color='white' size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=> Alert.alert(
                                            '',
                                            'Are you sure you want delete this? ',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                {
                                                    text:'OK', 
                                                    onPress: ()=> {
                                                        this.handleDelete(item.id)
                                                    }
                                                },
                                            ],
                                            {cancelable:false},
                                            )} 
                                        style={styles.noteDelete}>
                                        <Icon name='delete' type='antdesign' color='white' size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => {
                            return item.id.toString()
                        }}
                    />
                </ScrollView>

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('AddForm') } style={styles.addButton}>
                    <Icon name='plus' type='octicon' color='white' size={35} />
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
        delData: index => dispatch(actionToDoList.delData(index)),
        editData: data => dispatch(actionToDoList.editData(data))
    }
}

export default connect(mapStateProps,mapDispatchToProps)(Home)