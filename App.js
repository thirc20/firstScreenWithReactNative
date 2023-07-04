import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { keyboardDid, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, Animated, Keyboard } from 'react-native';

export default function App() {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}))
  const [ opacity ] = useState(new Animated.Value(0))
  const [logo] = useState(new Animated.ValueXY({x:850, y:850}))
  
  useEffect( () => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 30,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      })
    ]).start()

    
  }, [])
  
  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 350,
        duration: 50,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 350,
        duration: 50,
        useNativeDriver: false
      })
    ]).start()
  }

  function keyboardDidHide(){
    Animated.timing(logo.x, {
      toValue: 850,
      duration: 10,
      useNativeDriver: false
    }),
    Animated.timing(logo.y, {
      toValue: 850,
      duration: 10,
      useNativeDriver: false
    }).start()
  }


  return (
    <KeyboardAvoidingView style={styles.background} behavior="padding" enabled keyboardShouldPersistTaps='handled'>
      <View style={styles.containerLogo}>
        <Animated.Image style={{
          width: logo.x,
          height: logo.y,
        }}
        source={require('./assets/logo.png')}>
        </Animated.Image>
      </View>

      <Animated.View style={[
          styles.container,
        {
          opacity: opacity,
          transform:[
            {
              translateY: offset.y
            }
          ]
        }
            ]}>
        <TextInput style={styles.input}
          placeholder='Email'
          autoCorrect={false}
          onChangeText={()=> {}}
        ></TextInput>

        <TextInput style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          onChangeText={()=> {}}
        ></TextInput>

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar Conta</Text>
        </TouchableOpacity>
      </Animated.View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323'
  },
  containerLogo:{
    flex: 1,
    justifyContent: 'center',
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  input:{
    backgroundColor: "#FFF",
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText:{
    color:'#fff',
    fontSize: 18
  },
  btnRegister:{
    backgroundColor: '#FF8400',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 10
  },
  registerText:{
    color:'#fff',
    fontSize: 18
  }
})