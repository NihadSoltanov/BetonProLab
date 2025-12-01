import { StyleSheet } from 'react-native';
import { COLORS } from 'src/themes/colors';

const styles = StyleSheet.create({
    backgroundImageContainer: {
        width: '100%',
        height: '100%',
    },
    headerImage: {
        alignItems: 'center',
    },
    headerContainer: {
        marginTop: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    headerButton: {
        borderRadius: 30,
        padding: 10,
        borderWidth: 0.5,
        borderColor: COLORS.white,
    },
    logo: {
        width: '40%',
        height: '100%',
        alignSelf: 'center',
    },
    sortRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    screenTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: COLORS.white,
    },
    listContainer: {
        width: '100%',
        paddingBottom: 100,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 0,
        marginTop: 0,
    },
    filterContainer: {
        flexDirection: 'row',
        borderColor: COLORS.white,
        borderWidth: 0.9,
        borderRadius: 15,
        alignSelf: 'center',
        padding: 5,
    },
    filterText: {
        color: COLORS.white,
        alignSelf: 'center',
    },
});

export default styles;
