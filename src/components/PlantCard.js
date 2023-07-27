import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Image, Text } from "react-native-elements";

const PlantCard = ({ plantName, botanicalName, imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card containerStyle={styles.cardContainer} onPress={onPress}>
        <Image source={{ uri: imageSource }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.plantName}>{plantName}</Text>
          <Text style={styles.botanicalName}>{botanicalName}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 0,
    backgroundColor: "#ffffff",
    marginBottom: 1,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 16,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  botanicalName: {
    fontSize: 14,
    color: "#888888",
  },
});

export default PlantCard;
