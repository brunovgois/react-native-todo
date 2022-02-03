import React, { useState, useRef, useEffect } from 'react';
import {TouchableOpacity, View, Image, StyleSheet, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import { Task } from './TasksList'

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, title: string) => void;
  removeTask: (id: number) => void;
}
export function TaskItem({task, index, toggleTaskDone, editTask, removeTask}:TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [updatedTitle, setUpdatedTitle] = useState(task.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
      setIsEditing(true)
    }
    
    function handleCancelEditing() {
      setUpdatedTitle(task.title)
      setIsEditing(false)
    }

    function handleSubmitEditing() {
      editTask(task.id, updatedTitle)
      setIsEditing(false)
    }

    useEffect(() => {
      if (textInputRef.current) {
        if (isEditing) {
          textInputRef.current.focus();
        } else {
          textInputRef.current.blur();
        }
      }
    }, [isEditing])

    return (
      <View style={styles.container}> 
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={updatedTitle}
            onChangeText={setUpdatedTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
            
        </TouchableOpacity>
        <View style={ styles.iconsContainer } >
          { isEditing ? (
            <TouchableOpacity
              onPress={handleCancelEditing}>
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
            ) : (
            <TouchableOpacity
              onPress={handleStartEditing}>
              <Image source={editIcon} />
            </TouchableOpacity>
          ) }

          <View 
            style={ styles.iconsDivider }
          />

          <TouchableOpacity
            testID={`trash-${index}`}
            disabled={isEditing}
            onPress={() => removeTask(task.id)}>
            <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
          </TouchableOpacity>
        </View>
      </View>

      
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row'
    },
    iconsContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center'

    },
    iconsDivider: {
      borderRightColor: '#000' 
    },
    taskButton: {
      width: '80%',
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })