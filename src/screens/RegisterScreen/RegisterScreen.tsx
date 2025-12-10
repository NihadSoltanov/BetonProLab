import React, { useState } from 'react';
import styles from 'src/screens/Login/LoginScreen.styles';
import {
  View,
  ImageBackground,
  Image,
  TextInput,
  Text,
  SafeAreaView,
  Switch,
  Modal,          // ✅ EKLENDİ
  Pressable,      // ✅ EKLENDİ
} from 'react-native';

import { HomeBackgroundImage, LogoImage } from 'src/themes/images';
import { LAButton } from 'src/components/Button/LAButton';
import { COLORS } from 'src/themes/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { FONT_SIZES } from 'src/themes/fonts';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from 'src/navigation/routes';
import { useTranslate } from 'src/i18n/useTranslate';
import { axios } from 'src/api/axios-lib';
import { saveString, loadString } from 'src/utils/appStorage';

// ✅ VALIDATION REGEX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+[0-9]{10,15}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

type RegisterForm = {
 name: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
  address: string;
  taxCode: string;
  company: string;
  companyCode: string;
  plant: string;
  language: string;
};

export const RegisterScreen = () => {
  const { t, i18n } = useTranslate(); // ✅ LOGIN İLE AYNI MANTIK
  const navigation = useNavigation();
  const [isCompany, setIsCompany] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      repeatPassword: '',
      address: '',
      taxCode: '',
      company: '',
      companyCode: '',
      plant: '',
      language: '',
    },
  });


  const passwordValue = watch('password');

  const languageData = [
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

const onSubmit = async (data: RegisterForm) => {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      tel: data.phone,          // ✅ phone → tel
      company: data.company,
      region: data.plant,       // ✅ plant → region
      tax: data.taxCode,        // ✅ taxCode → tax
      code: data.companyCode,  // ✅ companyCode → code
      address: data.address,
      language: data.language,
      isCompany: isCompany,
    };

    console.log('📤 REGISTER PAYLOAD:', payload);

    const response = await axios.post('sendRegisterMail', payload);

  if (response?.data?.success) {
    setShowSuccessModal(true);
  }


  } catch (error) {
    console.log('❌ REGISTER ERROR:', error);
    alert(t('register.failed'));
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <ImageBackground source={HomeBackgroundImage} style={styles.image}>
          <Image source={LogoImage} style={styles.logo} />

          <View style={styles.wrapper}>
            <Text style={styles.welcomeBack}>{t('register.title')}</Text>
            <Text style={styles.pleaseLogin}>{t('register.subtitle')}</Text>

            <View style={styles.box}>
              {/* REGION */}
              <Controller
                name="plant"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={styles.dropDown}
                    data={regionData}
                    value={value}
                    labelField="label"
                    valueField="value"
                    onChange={async item => {
                      onChange(item.value);

                      await saveString('base_url', item.value);   // ✅ BU ÇOK KRİTİK

                      const test = await loadString('base_url');
                      console.log('✅ REGISTER BASE_URL SAVED:', test);
                    }}
                        placeholder={t('register.select_region')}
                  />
                )}
              />

              {/* LANGUAGE */}
              <Controller
                name="language"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={styles.dropDown}
                    data={languageData}
                    value={value}
                    labelField="label"
                    valueField="value"
                    onChange={item => {
                      onChange(item.value);
                      i18n.changeLanguage(item.value);
                    }}
                    placeholder={t('register.select_language')}
                  />
                )}
              />

              {/* NAME */}
              <Text style={styles.inputLabel}>{t('register.name')}</Text>
              <View style={styles.inputBottomBorder}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: t('register.errors.name_required') }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} value={value} onChangeText={onChange} />
                  )}
                />
              </View>
              {errors.name && <Text style={{ color: 'red', fontSize: 12 }}>{errors.name.message}</Text>}

              {/* EMAIL */}
              <Text style={styles.inputLabel}>{t('register.email')}</Text>
              <View style={styles.inputBottomBorder}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: t('register.errors.email_required'),
                    pattern: { value: emailRegex, message: t('register.errors.email_invalid') },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      value={value}
                      onChangeText={onChange}
                      autoCapitalize="none"
                    />
                  )}
                />
              </View>
              {errors.email && <Text style={{ color: 'red', fontSize: 12 }}>{errors.email.message}</Text>}

              {/* PHONE */}
              <Text style={styles.inputLabel}>{t('register.phone')}</Text>
              <View style={styles.inputBottomBorder}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: t('register.errors.phone_required'),
                    pattern: {
                      value: phoneRegex,
                      message: t('register.errors.phone_invalid'),
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} value={value} onChangeText={onChange} />
                  )}
                />
              </View>
              {errors.phone && <Text style={{ color: 'red', fontSize: 12 }}>{errors.phone.message}</Text>}

              {/* PASSWORD */}
              <Text style={styles.inputLabel}>{t('register.password')}</Text>
              <View style={styles.inputBottomBorder}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: t('register.errors.password_required'),
                    pattern: {
                      value: passwordRegex,
                      message: t('register.errors.password_invalid'),
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput secureTextEntry style={styles.input} value={value} onChangeText={onChange} />
                  )}
                />
              </View>
              {errors.password && <Text style={{ color: 'red', fontSize: 12 }}>{errors.password.message}</Text>}

              {/* REPEAT PASSWORD */}
              <Text style={styles.inputLabel}>{t('register.repeat_password')}</Text>
              <View style={styles.inputBottomBorder}>
                <Controller
                  name="repeatPassword"
                  control={control}
                  rules={{
                    required: t('register.errors.repeat_password_required'),
                    validate: value =>
                      value === passwordValue || t('register.errors.passwords_not_match'),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput secureTextEntry style={styles.input} value={value} onChangeText={onChange} />
                  )}
                />
              </View>
              {errors.repeatPassword && (
                <Text style={{ color: 'red', fontSize: 12 }}>{errors.repeatPassword.message}</Text>
              )}

              {/* ADDRESS */}
              <Text style={styles.inputLabel}>{t('register.address')}</Text>
              <View style={styles.inputBottomBorder}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} value={value} onChangeText={onChange} />
                  )}
                />
              </View>

              {/* TAX CODE */}
              <Text style={styles.inputLabel}>{t('register.tax_code')}</Text>
              <View style={styles.inputBottomBorder}>
                <Controller
                  name="taxCode"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} value={value} onChangeText={onChange} />
                  )}
                />
              </View>

              {/* COMPANY SWITCH */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Switch value={isCompany} onValueChange={setIsCompany} />
                <Text style={{ marginLeft: 10, color: COLORS.darkGreen }}>
                  {t('register.company_account')}
                </Text>
              </View>

              {/* COMPANY FIELDS */}
              {isCompany && (
                <>
                  <Text style={styles.inputLabel}>{t('register.company_name')}</Text>
                  <View style={styles.inputBottomBorder}>
                    <Controller
                      name="company"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextInput style={styles.input} value={value} onChangeText={onChange} />
                      )}
                    />
                  </View>

                  <Text style={styles.inputLabel}>{t('register.company_code')}</Text>
                  <View style={styles.inputBottomBorder}>
                    <Controller
                      name="companyCode"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextInput style={styles.input} value={value} onChangeText={onChange} />
                      )}
                    />
                  </View>
                </>
              )}

              {/* BUTTONS */}
              <View style={styles.btnWrapper}>
                <View style={styles.btnHalf}>
                  <LAButton
                    onPress={handleSubmit(onSubmit)}
                    fontColor={COLORS.darkGreen}
                    buttonColor={COLORS.lightGreen}
                    title={t('register.register')}
                    titleSize={FONT_SIZES.small}
                  />
                </View>

                <View style={styles.btnHalf}>
                  <LAButton
                    onPress={() => navigation.navigate(ROUTES.Login as never)}
                    fontColor={COLORS.darkGreen}
                    buttonColor={COLORS.lightGreen}
                    title={t('register.login')}
                    titleSize={FONT_SIZES.small}
                  />
                </View>
              </View>

            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
      {/* ✅ SUCCESS MODAL */}
    {/* ✅ SUCCESS MODAL */}
    <Modal
      visible={showSuccessModal}
      transparent
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '85%',
            backgroundColor: COLORS.lightGreen,
            borderRadius: 16,
            padding: 25,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: COLORS.darkGreen,
              textAlign: 'center',
              marginBottom: 15,
            }}
          >
            {t('register.success_title')}
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: COLORS.darkGreen,
              textAlign: 'center',
              marginBottom: 25,
              lineHeight: 22,
            }}
          >
            {t('register.success_message')}
          </Text>

          <Pressable
            onPress={() => {
              setShowSuccessModal(false);
              navigation.navigate(ROUTES.Login as never);
            }}
            style={{
              backgroundColor: COLORS.darkGreen,
              paddingVertical: 12,
              paddingHorizontal: 40,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.lightGreen,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {t('register.success_button')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>


    </SafeAreaView>
  );
};
