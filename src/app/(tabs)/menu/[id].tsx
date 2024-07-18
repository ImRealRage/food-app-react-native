import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useState, useEffect } from "react";
import Button from "@/src/components/Button";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState("M");
  const [price, setPrice] = useState(0);

  const product = products.find((p) => p.id.toString() === id);

  useEffect(() => {
    if (product) {
      const initialPrice = calculatePrice(product.price, selectedSize);
      setPrice(initialPrice);
    }
  }, [product]);

  const calculatePrice = (basePrice, size) => {
    const sizeIndex = sizes.indexOf(size);
    return basePrice * (1 + sizeIndex * 0.1);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const newPrice = calculatePrice(product.price, size);
    setPrice(newPrice);
  };

  const addToCart = () => {
    console.warn("Add to cart", selectedSize, product);
  };

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

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => handleSizeChange(size)}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: "auto",
  },

  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  sizeText: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default ProductDetailsScreen;
