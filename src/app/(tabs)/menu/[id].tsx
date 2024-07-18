import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
        }}
      />

      <Image source={{ uri: product.image || defaultPizzaImage }} />

      <Text style={{ fontSize: 20 }}>ProductDetailsScreen : {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 200,
    height: 200,
  },
  price: {},
});

export default ProductDetailsScreen;
