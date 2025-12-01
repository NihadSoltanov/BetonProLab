import { StyleSheet } from 'react-native';
import { COLORS } from 'src/themes/colors';
import { FONT_SIZES } from 'src/themes/fonts';

const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 7,
        borderColor: COLORS.darkGreen,
        borderWidth: 0.8,
        marginBottom: 15,
        padding: 15,
        backgroundColor: COLORS.white,
    },
    inputTitle: {
        fontSize: FONT_SIZES.small,
        marginBottom: 5,
        color: COLORS.black,
        fontWeight: '600',
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default styles;
