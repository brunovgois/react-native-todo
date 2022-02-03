import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    const sameTitleTask = tasks.find(el=>el.title === newTaskTitle)

    if(!sameTitleTask){
      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks([...tasks, newTask])
    } else {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
    }

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskToChange = updatedTasks.find(task => task.id === id)

    if(taskToChange){ 
      taskToChange.done = !taskToChange.done
      setTasks(updatedTasks)
    }
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "Sim", onPress: () => {
          const updatedTasks = tasks.filter(task => {
            return task.id != id
          })
          setTasks(updatedTasks)
        },
        } 
      ]
    );
  }

  function handleEditTask(id: number, taskNewTitle: string){
    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskToChange = updatedTasks.find(task => task.id === id)

    if(taskToChange) {
      taskToChange.title = taskNewTitle
      setTasks(updatedTasks)
    }
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
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})