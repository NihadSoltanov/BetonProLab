import { FC, useEffect, useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import { styles } from './Form.styles';
import { InputContainer } from '../InputContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenBackgroundWithModal } from '../ScreenBackground/ScreenBackgroundWithModal';
import { LAButton } from '../Button/LAButton';
import { COLORS } from 'src/themes/colors';
import { OrderDto } from 'src/domain/models/Order';
import { getOrderTranspLab } from 'src/data/querys/orderQueries';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTranslate } from 'src/i18n/useTranslate';
import moment from 'moment';
import { updateOrderTranspLab } from 'src/data/mutations/orderMutations';
import { OrderTransLab } from 'src/domain/models/OrderTransLab';

interface laFormFreezeProps {
    onClose: () => void;
    visible: boolean;
    plantId: string;
    deliveryId: string;
    isSelected?:boolean;
}

export const LAFormFreeze: FC<laFormFreezeProps> = ({
    visible,
    onClose,
    isSelected,
    plantId,
    deliveryId,
}) => {
    const { t } = useTranslate();

    const [testTime, setTestTime] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [numberOfCycles, setNumberOfCycles] = useState('0');
    const [testedBy, setTestedBy] = useState('');
    const [massBefore, setMassBefore] = useState('0.0');
    const [massAfter, setMassAfter] = useState('0.0');
    const [percentages, setPercentages] = useState('0.0');
    const [comments, setComments] = useState('');

    const getTransLabs = async () => {
        const lab = await getOrderTranspLab(plantId, deliveryId);
        if (lab) {
            setTestTime(lab.freeze_test_time!);
            setNumberOfCycles(lab.number_of_cycles!);
            setTestedBy(lab.freeze_test_person!);
            setMassBefore(lab.freeze_mass_before!);
            setMassAfter(lab.freeze_mass_after!);
            setPercentages(lab.freeze_mass_loss!);
            setComments(lab.comment!);
        }
    };
    useEffect(() => {
        if (isSelected && visible) {
            getTransLabs();
        }
    }, [isSelected,visible]);

    const onHandleUpdate = async () => {
        const delivery: OrderTransLab = {
            freeze_test_time: testTime,
            number_of_cycles: numberOfCycles,
            delivery_id: deliveryId,
            plant_id: plantId,
            freeze_test_person: testedBy,
            freeze_mass_before: massBefore,
            freeze_mass_after: massBefore,
            freeze_mass_loss: percentages,
            comment: comments,
        };

        await updateOrderTranspLab(delivery, plantId, deliveryId);
        onClose();
    };

    const resetModal =() =>{
        setTestTime('');
        setNumberOfCycles('0');
        setTestedBy('');
        setMassBefore('0.0');
        setMassAfter('0.0');
        setPercentages('0.0');
        setComments('');
        onClose();
    }


    return (
        <ScreenBackgroundWithModal
            screenTitle={t('freeze_form.freeze_test')}
            visible={visible}
            onClose={resetModal}>
            <View style={styles.formContainer}></View>
            <KeyboardAwareScrollView>
                <View style={{ marginBottom: 300, paddingBottom: 100 }}>
                    <InputContainer title={t('freeze_form.test_time')}>
                        <Pressable
                            onPress={() => {
                                setShowPicker(!showPicker);
                            }}
                            style={styles.input}>
                            <Text style={styles.timeInputText}>{testTime}</Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={showPicker}
                            mode="datetime"
                            is24Hour={true}
                            display="spinner"
                            onConfirm={(date: Date) => {
                                setTestTime(
                                    moment(date).format('YYYY-MM-DD, HH:mm'),
                                );
                                setShowPicker(!showPicker);
                            }}
                            onCancel={() => setShowPicker(!showPicker)}
                        />
                    </InputContainer>
                    <InputContainer title={t('freeze_form.number_of_cycles')}>
                        <TextInput
                            placeholder={numberOfCycles}
                            onChangeText={text => setNumberOfCycles(text)}
                            value={numberOfCycles}
                            style={styles.input}
                            inputMode="numeric"
                        />
                    </InputContainer>
                    <InputContainer title={t('freeze_form.tested_by')}>
                        <TextInput
                            placeholder={testedBy}
                            onChangeText={text => setTestedBy(text)}
                            value={testedBy}
                            style={styles.input}
                        />
                    </InputContainer>
                    <InputContainer title={t('freeze_form.mass_before')}>
                        <TextInput
                            placeholder={massBefore}
                            onChangeText={text => {
                                setMassBefore(text);
                                setPercentages((parseInt(text)-parseInt(massAfter)).toString());
                            }}
                            value={massBefore}
                            style={styles.input}
                            inputMode="numeric"
                        />
                    </InputContainer>
                    <InputContainer title={t('freeze_form.mass_after')}>
                        <TextInput
                            placeholder={massAfter}
                            onChangeText={text => {
                                setMassAfter(text);
                               setPercentages((parseInt(massBefore)-parseInt(text)).toString());
                            }}
                            value={massAfter}
                            style={styles.input}
                            inputMode="numeric"
                        />
                    </InputContainer>
                    <InputContainer title={t('freeze_form.percentage')}>
                        <TextInput
                            placeholder={percentages}
                            onChangeText={text => setPercentages(text)}
                            value={percentages}
                            style={styles.input}
                            inputMode="numeric"
                            editable={false}
                        />
                    </InputContainer>
                    <InputContainer title={t('comments')}>
                        <TextInput
                            placeholder={comments}
                            onChangeText={text => setComments(text)}
                            value={comments}
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
