import {StyleSheet} from 'react-native'
import {Dimensions} from 'react-native'

var {width,height}=Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#2FDADC',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#ddd',
        elevation:5
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        fontWeight:'bold',
        padding: 20,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 180,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        alignSelf: 'stretch',
        color: 'black',
        padding: 20,
        margin:20,
        fontSize:20,
        borderRadius:50,
        backgroundColor: '#fefefe',
        borderWidth: 1,
        borderColor: '#2FDADC',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        backgroundColor: '#2FDADC',
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 0,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    colorText: {
        fontSize:20,
        marginBottom:20
    },
    colorBox: {
        width:'100%',
        height:270,
        padding:20,
        backgroundColor: '#212021'
    },
});

export default styles