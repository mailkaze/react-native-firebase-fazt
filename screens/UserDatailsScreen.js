import React, { useState, useEffect } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { firebaseApp } from '../database/firebase'
import { getFirestore, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'

const firestore = getFirestore(firebaseApp)

export default function UserDatailsScreen({ navigation, route}) {
  const initialState = {
    id: '',
    name: '',
    email: '',
    phone: '',
  }
  const [user, setUser] = useState(initialState)
  const [loading, setLoading] = useState(true)

  const getUserById = async (userId) => {
    const userRef = doc(firestore, 'users', userId)
    const tempUser = await getDoc(userRef) 
    setUser({...tempUser.data(), id: tempUser.id})
    setLoading(false)
  }

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value})
  }

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?", 
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => deleteUser() },
      ]
    )
  }

  const deleteUser = async () => {
    const docRef = doc(firestore, 'users', route.params.userId)
    await deleteDoc(docRef)
    navigation.navigate('UsersList')
  }

  const updateUser = async () => {
    const docRef = doc(firestore, 'users', route.params.userId)
    await updateDoc(docRef, {
      name: user.name,
      email: user.email,
      phone: user.phone,
    })
    setUser(initialState)
    navigation.navigate('UsersList')
  }

  useEffect(() => {
    getUserById(route.params.userId)
  }, [])

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color='#9E9E9E' />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Name User" 
          value={user.name}
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Email User" 
          value={user.email}
          onChangeText={(value) => handleChangeText('email', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Phone User" 
          value={user.phone}
          onChangeText={(value) => handleChangeText('phone', value)}
        />
      </View>
      <View>
        <Button 
          color='#19AC52'
          title="Update user" 
          onPress={() => updateUser()}
        />
      </View>
      <View>
        <Button 
          color='#E37399'
          title="Delete User" 
          onPress={() => openConfirmationAlert()}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
})