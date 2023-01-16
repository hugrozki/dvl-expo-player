import { useState } from 'react'
import { View, Text, Button } from 'react-native'

import { Player } from '../../components/player'
import { styles } from './PlayerScreen.styles'

export function PlayerScreen() {
  const [play, setPlay] = useState(false) 
  
  const playVideo = () => { setPlay(true) }

  return (
    <View style={styles.container}>
      {play ? <Player /> : <Button title='Reproducir' onPress={playVideo}/>}
    </View>
  )
}