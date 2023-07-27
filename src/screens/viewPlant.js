import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { Button } from "react-native-paper";
import { database } from "../../firebase";
import { ref, remove } from "firebase/database";

import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

import DeleteConfirmationModal from "../components/confirmationModal";

const PlantForm = ({ navigation }) => {
  const [formData, setFormData] = useState(navigation.getParam("plant"));
  const [modalShow, setModalShow] = useState(false);

  const deletePlant = async () => {
    await remove(ref(database, `/plants/${formData.id}`))
      .then(() => {
        showMessage({
          message: "Plant Removed Successfully!",
          type: "success",
          backgroundColor: styles.alertSuccess.backgroundColor,
          color: styles.alertSuccess.color,
          fontSize: styles.alertSuccess.fontSize,
          duration: 3000,
        });
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        console.log("error while removing plant ");
      });
  };
  return (
    <View style={styles.container}>
      <FlashMessage position="bottom" />
      <View style={{ flex: 3 }}>
        <ImageBackground
          source={require("../../assets/background.png")}
          style={styles.backgroundImage}
          imageStyle={styles.watermark}
        >
          <Text style={styles.heading}>View Plant</Text>
          <ScrollView style={styles.formContainer}>
            {formData.imageLink && (
              <Image
                style={styles.image}
                source={{ uri: formData.imageLink }}
              />
            )}
            <Text style={styles.label}>Plant Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Plant Name"
              value={formData.plantName}
            />
            <Text style={styles.label}>Botanical Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Botanical Name"
              value={formData.botanicalName}
            />
            <Text style={styles.label}>Family Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Family Name"
              value={formData.familyName}
            />
            <Text style={styles.label}>Planting Method</Text>
            <TextInput
              style={styles.input}
              placeholder="Planting Method"
              value={formData.plantingMethod}
            />
            <Text style={styles.label}>Soil Type</Text>
            <TextInput
              style={styles.input}
              placeholder="Soil Type"
              value={formData.soilType}
            />
            <Text style={styles.label}>Spaces Within Raws</Text>
            <TextInput
              style={styles.input}
              placeholder="Spaces Within Raws"
              value={formData.spacesWithinRaws}
            />
            <Text style={styles.label}>Spaces Between Raws</Text>
            <TextInput
              style={styles.input}
              placeholder="Spaces Between Raws"
              value={formData.spacesBetweenRaws}
            />
            <Text style={styles.label}>Pit Size</Text>
            <TextInput
              style={styles.input}
              placeholder="Pit Size"
              value={formData.pitSize}
            />
            <Text style={styles.label}>Soil Depth</Text>
            <TextInput
              style={styles.input}
              placeholder="Soil Depth"
              value={formData.soilDepth}
            />
            <Text style={styles.label}>Agronomic Practices</Text>
            <TextInput
              style={styles.input}
              placeholder="Agronomic Practices"
              value={formData.agronomicPractices}
            />
            <TouchableOpacity
              onPress={() => {
                setModalShow(true);
              }}
            >
              <Button icon="delete" mode="contained" buttonColor={"#b5160b"}>
                Delete Plant
              </Button>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
      <DeleteConfirmationModal
        visible={modalShow}
        onClose={() => setModalShow(false)}
        onDelete={deletePlant}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 2,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  watermark: {
    position: "absolute",
    height: "70%",
    opacity: 0.3,
    top: 220,
    left: 0,
  },
  heading: {
    fontSize: 40,
    color: "#0c913a",
    textAlign: "center",
    fontWeight: "500",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
  },
  formContainer: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertSuccess: {
    backgroundColor: "#b5160b",
    color: "#fff",
    fontSize: 18,
  },
});

export default PlantForm;
