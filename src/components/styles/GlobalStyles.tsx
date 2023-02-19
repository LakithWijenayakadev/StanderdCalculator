import { StyleSheet } from 'react-native';
import { myColors } from './Colors';

export const Styles = StyleSheet.create({
    btnBlue: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDark: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.btnDark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLight: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnGray: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.btnGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SmallTextLight: {
        fontSize: 32,
        color: myColors.white
    },
    SmallTextDark: {
        fontSize: 32,
        color: myColors.black
    },
    row: {
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: '2%'
    },
    viewBottom: {
        flex: 1
    },
    screenFirstNumber: {
        fontSize: 96,
        color: myColors.gray,
        fontWeight: '300',
        alignSelf: 'flex-end'
    },
    screenSecondNumber: {
        fontSize: 40,
        color: myColors.gray,
        fontWeight: '500',
        alignSelf: 'flex-end'
    },
    container: {
        flex: 1,
        backgroundColor: myColors.light,

        justifyContent: 'flex-start'
    },
    fadingContainer: {
        backgroundColor: 'powderblue'
    }
});
