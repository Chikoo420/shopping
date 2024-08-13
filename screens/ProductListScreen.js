import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, Button, Text, StyleSheet } from 'react-native';
import ProductItem from '../components/ProductItem';
import ProductModal from '../components/ProductModal';
import { fetchProducts, increment, decrement } from '../redux/productSlice';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    dispatch(increment(selectedProduct.id));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {status === 'loading' ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem
              product={item}
              onSelect={() => handleSelectProduct(item)}
              onIncrement={() => dispatch(increment(item.id))}
              onDecrement={() => dispatch(decrement(item.id))}
            />
          )}
        />
      )}
      {selectedProduct && (
        <ProductModal
          visible={isModalVisible}
          product={selectedProduct}
          onClose={() => setModalVisible(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ProductListScreen;
