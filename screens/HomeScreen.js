import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  // Função para buscar as tarefas da API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://10.68.152.102:3000/home");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      Alert.alert("Erro", "Não foi possível carregar as tarefas.");
    }
  };

  // Função para deletar uma tarefa
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://10.68.152.102:3000/home/${id}`);
      Alert.alert("Sucesso", "Tarefa deletada com sucesso!");
      fetchTasks(); // Atualiza a lista após deletar
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      Alert.alert("Erro", "Não foi possível deletar a tarefa.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Renderização de cada tarefa
  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskName}>{item.nome}</Text>
        <Text style={styles.taskDescription}>{item.descricao}</Text>
        <View style={styles.taskStatusContainer}>
          <Text style={styles.taskStatusText}>
            {item.status === "completa" ? "Completa" : "Pendente"}
          </Text>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: item.status === "completa" ? "green" : "red" },
            ]}
          />
        </View>
      </View>
      <View style={styles.taskActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditarTarefaScreen", { id: item.id })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("NovaTarefaScreen")}
      >
        <Text style={styles.createButtonText}>Criar Tarefa</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  createButton: {
    backgroundColor: "cyan",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  createButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  taskContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  taskInfo: {
    marginBottom: 10,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  taskStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskStatusText: {
    fontSize: 14,
    marginRight: 8,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#FF4D4D",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
