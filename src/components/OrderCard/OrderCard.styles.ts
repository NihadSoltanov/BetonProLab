import { StyleSheet } from 'react-native';
import { COLORS } from 'src/themes/colors';
import { FONT_SIZES } from 'src/themes/fonts';

const styles = StyleSheet.create({
    wrap: {
        borderColor: COLORS.white,
        paddingTop: 20,
        borderWidth: 0.5,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        paddingBottom: 20,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        flex: 2,
    },
    priceText: {
        fontSize: FONT_SIZES.large,
        color: COLORS.darkGreen,
        fontWeight: 'bold',
    },
    image: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 5,
    },
    textContainer: {
        justifyContent: 'space-around',
    },
    details: {
        margin: 10,
    },
    text: {
        opacity: 0.7,
    },
    orderDate: {
        fontWeight: 'bold',
        fontSize: FONT_SIZES.large,
    },
    orderDetailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    detailsContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        position: 'absolute',
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: FONT_SIZES.small,
    },
    orderAddressText: {
        fontSize: FONT_SIZES.small,
        marginLeft: 3,
    },

    detailsTitle: {
        flexDirection: 'row',
        marginTop: 15,
    },
    detailsTitleText: {
        fontWeight: 'bold',
        fontSize: FONT_SIZES.small,
        flex: 2,
    },
    detailsText: {
        fontSize: FONT_SIZES.medium,
        flex: 5,
    },
    horizontalLine: {
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.darkGreen,
        width: '100%',
        marginVertical: 20,
    },
    icon: { width: 35, height: 35 },
    iconText: {
        color: COLORS.darkGreen,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: FONT_SIZES.xsmall,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 2,
    },
    payLoadText: {
        fontSize: FONT_SIZES.large,
        alignSelf: 'center',
        marginRight: 15,
    },
    titleButton: {
        padding: 2,
        marginRight: 5,
    },
    titleText: {
        color: COLORS.darkGreen,
    },
    closebtn: {
        margin: 30,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: COLORS.darkGreen,
    },
    invoice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    licenseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    webViewContainer: {
        flexDirection: 'row',
    },
    closeBtnContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    animationContainer: {
        overflow: 'hidden',
        marginTop: 20,
    },
    bottomTextLabel: {
        fontWeight: 'bold',
        fontSize: FONT_SIZES.small,
    },
});

export default styles;
