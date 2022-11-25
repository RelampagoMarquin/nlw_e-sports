import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import {
    ActivityIndicator,
    Alert,
    Modal,
    ModalProps,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard'

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}
import { styles } from './styles';
import { useState } from 'react';

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    
    const [isCopping, setisCopping] = useState(false)

    async function handleCopyDiscordToClipboards() {
        setisCopping(true)
        await Clipboard.setStringAsync(discord)

        Alert.alert('Discord Copiado!', 'Corre no discord para confirmar a jogatina!')
        setisCopping(false)
    }

    return (
        <Modal
            {...rest}
            animationType = "fade"
            transparent
            statusBarTranslucent
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_300}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading
                        title="Let's play!"
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />
                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>
                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipboards}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}