import React, { useEffect, useState} from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import { firebaseApp } from '../database/firebase'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import { ListItem, Avatar } from '@rneui/base'

const firestore = getFirestore(firebaseApp)

export default function UsersList({ navigation }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const usersRef = collection(firestore, 'users')
    onSnapshot(usersRef, (snapshot) => {
      const tempUsers = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setUsers(tempUsers)
    })
  }, [])
  return (
    <View>
      <ScrollView>
        <Button
          title="Create User"
          onPress={() => navigation.navigate('CreateUserScreen')}
        />
        {
          users.map(user => (
            <ListItem
              key={user.id}
              bottomDivider
              onPress={() => navigation.navigate('UserDatailsScreen', { userId: user.id })}
            >
              <ListItem.Chevron />
              <Avatar source={{uri: 'https://i.pravatar.cc/300'}} rounded />
              <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        }

      </ScrollView>
    </View>
  )
}