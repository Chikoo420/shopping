import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const ProductItem = ({ product, onSelect, onIncrement, onDecrement }) => {
  return (
    <View style={styles.itemContainer}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.image} /> 
      ) : (
        <Text style={styles.noImageText}>No Image Available</Text> 
      )}
      <Text style={styles.title}>{product.title || 'No Title Available'}</Text>
      <Text style={styles.price}>${product.price || 'N/A'}</Text>
      <View style={styles.controls}>
        <Button title="+" onPress={onIncrement} />
        <Text style={styles.quantity}>{product.quantity || 0}</Text>
        <Button title="-" onPress={onDecrement} />
      </View>
      <Button title="View Details" onPress={onSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'cover', 
  },
  noImageText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default ProductItem;
