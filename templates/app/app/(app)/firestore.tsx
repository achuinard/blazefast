import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, useColorScheme} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {getAuth} from "@react-native-firebase/auth";
import BFTextInput from "@/components/BFTextInput";
import {BFText} from "@/components/BFText";
import BFButton from "@/components/BFButton";

type Todo = {
    key: string;
    title: string;
    complete: boolean;
};

const FirestoreScreen = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(getAuth().currentUser?.uid)
            .collection('todos')
            .onSnapshot(querySnapshot => {
                if (querySnapshot) {
                    const todos: Todo[] = [];
                    querySnapshot.forEach(documentSnapshot => {
                        todos.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        } as Todo);
                    });
                    setTodos(todos);
                }
            });

        return () => subscriber();
    }, []);

    const addTodo = () => {
        if (newTodo.trim()) {
            firestore()
                .collection('users')
                .doc(getAuth().currentUser?.uid)
                .collection('todos')
                .add({
                    title: newTodo,
                    complete: false,
                })
                .then(() => {
                    setNewTodo('');
                });
        }
    };

    const toggleTodo = (id: string, complete: boolean) => {
        firestore()
            .collection('users')
            .doc(getAuth().currentUser?.uid)
            .collection('todos')
            .doc(id)
            .update({
                complete: !complete,
            });
    };

    return (
        <View style={styles.container}>
            <BFText style={styles.title}>Firestore Todo List</BFText>
            <View style={styles.inputRow}>
                <BFTextInput
                    style={styles.input}
                    value={newTodo}
                    onChangeText={setNewTodo}
                    placeholder="Add a new todo"
                />
                <BFButton title={'Add'} onPress={addTodo}/>
            </View>
            <FlatList
                data={todos}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={[styles.todoItem, {borderBottomColor: isDark ? '#374151' : '#e5e7eb'}]}
                        onPress={() => toggleTodo(item.key, item.complete)}
                    >
                        <View
                            style={[
                                styles.checkbox,
                                {
                                    borderColor: isDark ? '#6b7280' : '#d1d5db',
                                    backgroundColor: item.complete ? '#22c55e' : (isDark ? '#1f2937' : '#ffffff'),
                                }
                            ]}
                        />
                        <BFText style={item.complete ? styles.completedText : undefined}>{item.title}</BFText>
                    </TouchableOpacity>
                )}
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
        padding: 8,
        borderBottomWidth: 1,
    },
    checkbox: {
        width: 24,
        height: 24,
        marginRight: 8,
        borderWidth: 1,
        borderRadius: 4,
    },
    completedText: {
        textDecorationLine: 'line-through',
    },
});

export default FirestoreScreen;
