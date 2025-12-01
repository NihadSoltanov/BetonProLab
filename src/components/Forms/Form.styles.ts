import { StyleSheet } from 'react-native';
import { COLORS } from 'src/themes/colors';
import { FONT_SIZES } from 'src/themes/fonts';

export const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    container: {
        backgroundColor: COLORS.darkGreen,
        flex: 1,
    },
    headerText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.medium,
        marginTop: 15,
        textAlign: 'center',
    },
    input: {
        borderColor: COLORS.darkGreen,
        borderWidth: 1,
        flex: 1,
        marginRight: 5,
        borderRadius: 7,
        padding: 5,
        fontSize: FONT_SIZES.xsmall,
    },
    timeInput: {
        borderColor: COLORS.darkGreen,
        borderWidth: 1,
        borderRadius: 7,
        width: '50%',
        justifyContent: 'space-between',
        padding: 5,
    },
    timeInputText: {
        fontSize: FONT_SIZES.small,
        alignSelf: 'flex-start',
    },
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    horizontalLine: {
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.white,
        width: '100%',
        marginVertical: 3,
    },
    modalTitle: {
        color: COLORS.white,
        fontSize: FONT_SIZES.xlarge,
        marginTop: 15,
        marginBottom: 10,
    },
    backgroundImage: {
        flex: 1,
        padding: 15,
        marginTop: '15%',
    },
    formHeaderContainer: {
        flex: 1,
    },
});
