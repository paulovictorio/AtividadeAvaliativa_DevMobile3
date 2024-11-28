import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const NovaTarefaScreen = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  const handleCadastro = async () => {
    try {
      const response = await axios.post("http://10.68.152.102:3000/cadastro", {
        nome,
        descricao,
        status,
      });
      console.log(response.data);
      setNome("");
      setDescricao("");
      setStatus("");
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Descricao"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <Button title="Cadastrar" onPress={handleCadastro} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
});

export default NovaTarefaScreen;
