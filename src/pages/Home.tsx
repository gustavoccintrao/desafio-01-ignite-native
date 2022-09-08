import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasSameName, setHasSameName] = useState(false);

  function handleAddTask(newTaskTitle: string) {
    const hasSameName = tasks.find((task) => task.title === newTaskTitle);
    if (hasSameName) {
      Alert.alert(
        "Adicionar Task",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const hasSameName = tasks.find((task) => task.title === taskNewTitle);
    if (hasSameName) {
      Alert.alert(
        "Editar Task",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      setHasSameName(true);
      return;
    }
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: taskNewTitle };
      }

      return task;
    });

    setTasks(updatedTasks);
    setHasSameName(false);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover Task",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: () => {
            const filteredTasks = tasks.filter((task) => task.id !== id);
            setTasks(filteredTasks);
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
        hasSameName={hasSameName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
