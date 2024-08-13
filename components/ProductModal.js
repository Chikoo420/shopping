import React from 'react';
import { Modal, View, Text, Image, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/productSlice';

const ProductModal = ({ visible, product, onClose }) => {
  const dispatch = useDispatch();

  // Check if product is defined
  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch the action to add to cart
    console.log('Product added to cart:', product); // Log the added product to the console
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>No Image Available</Text>
        )}
        <Text style={styles.title}>{product.title || 'No Title Available'}</Text>
        <Text style={styles.description}>{product.description || 'No Description Available'}</Text>
        <Text style={styles.price}>${product.price || 'N/A'}</Text>
        <Button title="Add to Cart" onPress={handleAddToCart} />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white', // Make the modal non-transparent
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'cover', 
  },
  noImageText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginVertical: 10,
  },
});

export default ProductModal;
