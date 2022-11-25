import { ImageBackground } from 'react-native';

import { styles } from './styles';

import backgroundimg from '../../assets/background-galaxy.png'

interface Props{
    children: React.ReactNode;
}
export function Background({children}: Props) {
  return (
    <ImageBackground 
        source={backgroundimg}
        style={styles.container}
        defaultSource={backgroundimg}
    >
        {children}
    </ImageBackground>
  );
}