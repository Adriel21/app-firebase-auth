import { useState } from 'react'
import { Alert, Button, StyleSheet, TextInput, Vibration, View } from 'react-native'

// Importamos os recursos de autenticação através das configurações Firebase
import { auth } from "../firebaseConfig";

// Importamos as funções de autenticação diretamente da lib
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"

const Login = ( {navigation} ) => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const login = () =>{
        // teste
        // console.log(email, senha)
        if(!email || !senha){
            Vibration .vibrate();
            Alert.alert("Atenção!", "Você deve preencher todos os campos");
            return; // parar o processo
        }

        // Faça isso primeiro                            faça isso em seguida
        signInWithEmailAndPassword(auth, email, senha)
        .then(()=>{
            navigation.replace("AreaLogada");
        })
        .catch(error => {
         // console.log(error);
        // console.log(error.code);
        let mensagem;
        switch (error.code) {
          case "auth/user-not-found":
            mensagem = "Usuário não encontrado!";
            break;
          case "auth/wrong-password":
            mensagem = "Senha incorreta";
            break;
          default:
            mensagem = "Houve um erro, tente novamente mais tarde";
            break;
        }
        Alert.alert("Ops!", mensagem);
      });
  
    
    }

    const recuperarSenha = () => {
        sendPasswordResetEmail(auth, email)
            .then(()=>{
                Alert.alert("Recuperar Senha", "Verifique sua caixa de entrada");
            }).catch(error => console.log(error));
    }


    return (
        <View style={estilos.container}>
            <View style={estilos.formulario}>
                <TextInput
                    onChangeText={valor => setEmail(valor)}
                    placeholder='E-mail'
                    style={estilos.input}
                    // Para aceitar apenas email
                    keyboardType="email-address"
                />
                <TextInput
                    onChangeText={valor => setSenha(valor)}
                    placeholder='Senha'
                    style={estilos.input}
                    // Propriedade booleana para senha
                    secureTextEntry
                />
                <View style={estilos.botoes}>
                    <Button title='Entre' color="green" onPress={login}/>

                    <Button title='Recuperar Senha' color="blue" onPress={recuperarSenha}/>
                </View>
            </View>
        </View>
    )
}

export default Login

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formulario: {
        marginBottom: 32,
        width: "80%"
    },
    input: {
        backgroundColor: "white",
        marginVertical: 8,
        padding: 8,
        borderRadius: 4
    },
    botoes: {
        marginVertical: 8,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})