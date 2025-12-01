import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingBottom: 100,
        height: '80%',
        borderRadius: 7,
    },
    footerContainer:{
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyMessage: {
        alignItems: 'center',
        marginTop: '50%',
      },
});

export default styles;
