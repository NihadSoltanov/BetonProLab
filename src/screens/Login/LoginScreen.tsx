import React, { useState, FC, useEffect } from 'react';
import styles from './LoginScreen.styles';
import {
    View,
    ImageBackground,
    Image,
    TextInput,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { HomeBackgroundImage, LogoImage } from 'src/themes/images';
import { LAButton } from 'src/components/Button/LAButton';
import { COLORS } from 'src/themes/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslate } from 'src/i18n/useTranslate';
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { login } from 'src/data/querys/authQuery';
import { saveString, loadString } from 'src/utils/appStorage';
import { useAuth } from 'src/contexts/Auth';
import { FONT_SIZES } from 'src/themes/fonts';
import { getBaseUrl } from 'src/utils/stringUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
    { label: 'English', value: 'en' },
    { label: 'Eesti', value: 'ee' },
    { label: 'Lietuvių', value: 'lt' },
    { label: 'Latviešu', value: 'lv' },
    { label: 'Русский', value: 'ru' },
    { label: 'Hrvat', value: 'cr' },
];

const regionData = [
    { label: 'Lithuania', value: 'Lithuania' },
];

export const LoginScreen = () => {
    const { t, i18n } = useTranslate();
    const [languageFocus, setLanguageFocus] = useState<boolean>(false);
    const [regionFocus, setRegionFocus] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

    const auth = useAuth();
    const navigation = useNavigation(); // 👉 BUNU EKLE

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            plant: '',
        },
    });
  const onSubmit: SubmitHandler<FieldValues> = async attrs => {
      const url = await loadString('base_url');

      console.log('✅ LOGIN SUBMIT VALUES:', attrs);
      console.log('✅ base_url BEFORE LOGIN:', url);

      await auth.signIn({
          username: attrs.email,
          password: attrs.password,
          base_url: url
      });
  };


   const onHandleLanguage = async (lang: string) => {
       console.log('🌍 LOGIN language selected:', lang);

       setSelectedLanguage(lang);      // ✅ STATE’E YAZ
       setLanguageFocus(false);

       await i18n.changeLanguage(lang); // ✅ i18n
       await saveString('language', lang); // ✅ AsyncStorage

       const saved = await loadString('language');
       console.log('📦 LOGIN saved language:', saved);
   };


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <ImageBackground
                    source={HomeBackgroundImage}
                    style={styles.image}>
                    <Image source={LogoImage} style={styles.logo} />
                    <View style={styles.wrapper}>
                        <Text style={styles.welcomeBack}>
                            {t('sign_in.welcome_back')}!
                        </Text>
                        <Text style={styles.pleaseLogin}>
                            {t('sign_in.please_login')}
                        </Text>
                        <View style={styles.box}>
                            <View>
                                <Text style={styles.inputLabel}>
                                    {t('sign_in.email')}
                                </Text>
                                <View style={styles.inputBottomBorder}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => {
                                            return (
                                                <TextInput
                                                    style={styles.input}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    textContentType="emailAddress"
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                    autoCorrect={false}
                                                />
                                            );
                                        }}
                                    />
                                </View>
                                {errors.email && (
                                    <Text>Email is required.</Text>
                                )}
                            </View>
                            <View>
                                <Text style={styles.inputLabel}>
                                    {t('sign_in.password')}
                                </Text>
                                <View style={styles.inputBottomBorder}>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => {
                                            return (
                                                <TextInput
                                                    style={styles.input}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    autoCapitalize="none"
                                                    secureTextEntry={true}
                                                />
                                            );
                                        }}
                                    />
                                </View>
                                {errors.password && (
                                    <Text>Password is required.</Text>
                                )}
                            </View>
                            <View>
                                <Controller
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Dropdown
                                            style={[
                                                styles.dropDown,
                                                regionFocus && {
                                                    borderBottomColor:
                                                        COLORS.darkGreen,
                                                },
                                            ]}
                                            placeholderStyle={
                                                styles.dropDownPlaceholderStyle
                                            }
                                            selectedTextStyle={
                                                styles.dropDownSelectedTextStyle
                                            }
                                            inputSearchStyle={
                                                styles.dropDownInputSearchStyle
                                            }
                                            data={regionData}
                                            value={value}
                                            labelField="label"
                                            valueField="value"
                                      onChange={async (item) => {
                                          console.log('✅ SELECTED REGION OBJECT:', item);

                                          setValue('plant', item.value);
                                          setRegionFocus(false);

                                          await saveString('base_url', item.value);

                                          const savedUrl = await loadString('base_url');
                                          console.log('✅ SAVED base_url:', savedUrl);
                                      }}

                                            iconColor={COLORS.darkGreen}
                                            onFocus={() => setRegionFocus(true)}
                                            onBlur={() => setRegionFocus(false)}
                                            placeholder={
                                                !regionFocus
                                                    ? t('sign_in.select_region')
                                                    : '...'
                                            }
                                        />
                                    )}
                                    name="plant"
                                />
                            </View>

                            <View>
                                <Dropdown
                                    style={[
                                        styles.dropDown,
                                        languageFocus && {
                                            borderBottomColor: COLORS.darkGreen,
                                        },
                                    ]}
                                    placeholderStyle={
                                        styles.dropDownPlaceholderStyle
                                    }
                                    selectedTextStyle={
                                        styles.dropDownSelectedTextStyle
                                    }
                                    inputSearchStyle={
                                        styles.dropDownInputSearchStyle
                                    }
                                    data={data}
                                    value={selectedLanguage}

                                    labelField="label"
                                    valueField="value"
                                    onChange={ (item) =>
                                        onHandleLanguage(item.value)
                                    }
                                    iconColor={COLORS.darkGreen}
                                    onFocus={() => setLanguageFocus(true)}
                                    onBlur={() => setLanguageFocus(false)}
                                    placeholder={
                                        !languageFocus
                                            ? t('sign_in.select_language')
                                            : '...'
                                    }
                                />
                            </View>

                          <View style={styles.btnWrapper}>
                              <View style={styles.btnHalf}>
                                  <LAButton
                                      onPress={handleSubmit(onSubmit)}
                                      fontColor={COLORS.darkGreen}
                                      buttonColor={COLORS.lightGreen}
                                      title={t('sign_in.login')}
                                      titleSize={FONT_SIZES.small}
                                  />
                              </View>

                              <View style={styles.btnHalf}>
                                  <LAButton
                                      onPress={() => navigation.navigate('Register' as never)} // 👉 şimdilik sadece ekran adı
                                      fontColor={COLORS.darkGreen}
                                      buttonColor={COLORS.lightGreen}
                                      title={t('sign_in.register')}              // istersen sonra t('sign_in.register') yaparız
                                      titleSize={FONT_SIZES.small}
                                  />
                              </View>
                          </View>

                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
