import { 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { GameController } from 'phosphor-react-native'
import { styles } from './styles';

export interface DouCardProps {
    id: string;
    HourEnd: string;
    hourStart: string;
    name: string;
    useVoiceChannel: boolean,
    weekDays: string[],
    yearsPlaying: number
}

interface Props {
    data: DouCardProps;
    onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo
                label='Nome'
                value={data.name}
                colorValue={THEME.COLORS.TEXT}
            />

            <DuoInfo
                label='Tempo de jogo'
                value={`${data.yearsPlaying} anos`}
                colorValue={THEME.COLORS.TEXT}
            />
            <DuoInfo
                label='Disponibilidade'
                value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.HourEnd}`}
                colorValue={THEME.COLORS.TEXT}
            />
            <DuoInfo
                label='Chamada de áudio'
                value={data.useVoiceChannel ? "Sim" : "Não"}
                colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity 
                style={styles.button}
                onPress={onConnect}
            >
                <GameController 
                    color={THEME.COLORS.TEXT}
                    size={20}
                />
                
                <Text style={styles.buttonTitle}>
                    Conectar
                </Text>
            </TouchableOpacity>
        </View>
    );
}