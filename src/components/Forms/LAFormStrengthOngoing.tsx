import { FC, useEffect, useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import { styles } from './Form.styles';
import { InputContainer } from '../InputContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenBackgroundWithModal } from '../ScreenBackground/ScreenBackgroundWithModal';
import { OrderDto } from 'src/domain/models/Order';
import { getOrderTranspLab } from 'src/data/querys/orderQueries';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTranslate } from 'src/i18n/useTranslate';
import moment from 'moment';
import { LAButton } from '../Button/LAButton';
import { COLORS } from 'src/themes/colors';
import { updateOrderTranspLab } from 'src/data/mutations/orderMutations';
import { OrderTransLab } from 'src/domain/models/OrderTransLab';
import { queryClient } from 'src/api/react-query-lib';

interface laFormStrengthProps {
    onClose: () => void;
    visible: boolean;
    plantId: string;
    deliveryId: string;
    isSelected?:boolean;
}

export const LAFormStrengthOngoing: FC<laFormStrengthProps> = ({
    visible,
    onClose,
    isSelected,
    plantId,
    deliveryId,
}) => {
    const { t } = useTranslate();
    const [dateOfSampling, setDateOfSampling] = useState('');
    const [samplingBy, setSamplingBy] = useState('');
    const [showSamplePicker, setShowSamplePicker] = useState(false);

    const getTransLabs = async () => {
        const lab = await getOrderTranspLab(plantId, deliveryId);
        if (lab) {
            setDateOfSampling(lab.sample_taking_data!);
            setSamplingBy(lab.person_sample!);
        }
    };
    useEffect(() => {
        if (isSelected && visible) {
            getTransLabs();
        }
    }, [isSelected,visible]);

    const onHandleUpdate = async () => {
        const delivery: OrderTransLab = {
            delivery_id: deliveryId,
            plant_id: plantId,
            sample_taking_data: dateOfSampling,
            person_sample: samplingBy,
        };

        await updateOrderTranspLab(delivery, plantId, deliveryId);
        onClose();
    };

    const resetModal =() =>{
        setDateOfSampling('');
        setSamplingBy('');
        onClose();
    }

    return (
        <ScreenBackgroundWithModal
            screenTitle={t('strength_form.strength_test')}
            visible={visible}
            onClose={resetModal}>
            <View style={styles.formContainer}></View>
            <KeyboardAwareScrollView>
                <View style={{ marginBottom: 300, paddingBottom: 100 }}>
                    <InputContainer title={t('strength_form.date_of_sampling')}>
                        <Pressable
                            onPress={() =>
                                setShowSamplePicker(!showSamplePicker)
                            }
                            style={styles.input}>
                            <Text style={styles.timeInputText}>
                                {dateOfSampling}
                            </Text>
                        </Pressable>
                        <DateTimePickerModal
                            timeZoneOffsetInMinutes={0}
                            date={new Date()}
                            isVisible={showSamplePicker}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            locale="en_GB"
                            onConfirm={(date: Date) => {
                                setDateOfSampling(
                                    moment(date).format('HH:mm'),
                                );
                                setShowSamplePicker(false);
                            }}
                            onCancel={() =>
                                setShowSamplePicker(false)
                            }
                        />
                    </InputContainer>
                    <InputContainer title={t('strength_form.sampling_by')}>
                        <TextInput
                            placeholder={samplingBy}
                            onChangeText={text => setSamplingBy(text)}
                            value={samplingBy}
                            style={styles.input}
                        />
                    </InputContainer>
                    <LAButton
                        onPress={onHandleUpdate}
                        title={t('update')}
                        fontColor={COLORS.darkGreen}
                        buttonColor={COLORS.lightGreen}
                    />
                </View>
            </KeyboardAwareScrollView>
        </ScreenBackgroundWithModal>
    );
};
