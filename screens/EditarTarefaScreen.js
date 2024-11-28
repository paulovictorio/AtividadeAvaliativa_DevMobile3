import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const EditarTarefaScreen = () => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  const handleAtualizacao = async () => {
    if (!id || !nome || !descricao || !status) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }
    try {
      const response = await axios.put(
        `http://10.68.152.102:3000/atualizacao/${id}`,
        {
          nome,
          descricao,
          status,
        }
      );
      console.log(response.data);
      setNome("");
      setDescricao("");
      setStatus("");
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      Alert.alert("Erro", "Falha ao atualizar tarefa.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualização de Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Id da Tarefa"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <Button
        title="Atualizar Tarefa"
        onPress={handleAtualizacao}
        color="#6200ee"
      />
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

export default EditarTarefaScreen;
