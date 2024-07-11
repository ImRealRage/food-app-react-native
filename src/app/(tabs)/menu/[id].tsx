import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options = {{
        title: `Product Details: ${id}`  // dynamically change title based on id
      }} />
      <Text>ProductDetailsScreen : {id}</Text>
    </View>
  )
}

export default ProductDetailsScreen