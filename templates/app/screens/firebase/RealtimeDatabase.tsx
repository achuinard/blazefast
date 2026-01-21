import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, useColorScheme } from 'react-native';
import database from '@react-native-firebase/database';
import {getAuth} from "@react-native-firebase/auth";
import BFTextInput from "@/components/BFTextInput";
import {BFText} from "@/components/BFText";
import BFButton from "@/components/BFButton";

type Todo = {
    id: string;
    title: string;
    complete: boolean;
};


const RealtimeDatabaseScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${getAuth().currentUser?.uid}/todos`)
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const messageList = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setTodos(messageList);
        } else {
            setTodos([]);
        }
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${getAuth().currentUser?.uid}/todos`).off('value', onValueChange);
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newReference = database().ref(`/users/${getAuth().currentUser?.uid}/todos`).push();
      newReference
        .set({
          title: newTodo,
          complete: false
        })
        .then(() => setNewTodo('')).catch(console.error);
    }
  };

    const toggleTodo = (id: string, complete: boolean) => {
        database()
        .ref(`/users/${getAuth().currentUser?.uid}/todos/${id}`)
        .update({
            complete: !complete,
        });
    };

    const deleteTodo = (id: string) => {
        database()
        .ref(`/users/${getAuth().currentUser?.uid}/todos/${id}`)
        .remove();
    };

    return (
        <View style={styles.container}>
            <BFText style={styles.title}>Realtime Database Todos</BFText>
            <View style={styles.inputRow}>
                <BFTextInput
                    style={styles.input}
                    placeholder="Enter a new todo"
                    value={newTodo}
                    onChangeText={setNewTodo}
                />
                <BFButton title={'Add'} onPress={addTodo}/>
            </View>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <TouchableOpacity
                            style={[
                                styles.checkbox,
                                {
                                    borderColor: isDark ? '#9ca3af' : '#9ca3af',
                                    backgroundColor: item.complete ? '#22c55e' : (isDark ? '#374151' : '#e5e7eb'),
                                }
                            ]}
                            onPress={() => toggleTodo(item.id, item.complete)}
                        />
                        <BFText style={[styles.todoText, item.complete && styles.completedText]}>{item.title}</BFText>
                        <TouchableOpacity
                            onPress={() => deleteTodo(item.id)}
                        >
                            <BFText style={styles.deleteText}>Delete</BFText>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 4,
    },
    input: {
        flex: 1,
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 12,
        marginRight: 8,
    },
    todoText: {
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
    },
    deleteText: {
        color: '#dc2626',
    },
});

export default RealtimeDatabaseScreen;
