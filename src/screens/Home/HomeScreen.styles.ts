import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from 'src/themes/colors';
import { FONT_FAMILIES, FONT_SIZES } from 'src/themes/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGreen,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  historyImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain'
  },
  trackingImage: {
    width: 40,
    height: 40,
    marginRight:10,
    resizeMode: 'contain'
  },
  orderHistoryButtonStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 40
  },
  orderTrackingButtonStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 30,
    paddingVertical: 40
  },
  plusImage: {
    width: 60,
    height: 60,
  },
  rightImage:{
   width: 30,
   height: 30
  },
  logo: {
    position: 'absolute',
    top: '1%',
    bottom: 100,
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
  },
  orderbtnContainer: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: 30,
    height:60,
    paddingRight:60,
    marginTop:30
  },
  allBtnsContainer: {
    width: "90%",
    justifyContent: "center",

  },
  orderTitle: {
    fontFamily: FONT_FAMILIES.poppinsBlack,
    fontSize: FONT_SIZES.medium,
    fontWeight:'200'

  },
  historyTitle: {
  
    fontSize: FONT_SIZES.large,
    fontStyle: 'normal',
    fontWeight:'bold',
    color:COLORS.darkGreen
  },
  subTitle:{
    color:COLORS.darkGreen,
    marginTop: 7
  },
  laGroupButtonText:{

  },
  laGroupButton:{
    padding:20, borderRadius:10,
    backgroundColor:'white',
    marginRight:20, 
    borderColor:'green'
  },
  headerTitle:{
    color:COLORS.white,
    marginBottom: 20,
    marginTop:40,
    fontSize:FONT_SIZES.medium,
    fontWeight:'bold'
  },
});

export default styles;
