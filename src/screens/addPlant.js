import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import uuid from "react-native-uuid";

import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

import ButtonComponent from "../components/ButtonComponent";
import ImageGallary from "../components/SingleImagePicker";

import { database } from "../../firebase";
import { ref, push } from "firebase/database";

import { uploadToFirebase, uriToBlob } from "../services/ImageService";

const PlantForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    plantName: "",
    botanicalName: "",
    familyName: "",
    imageLink: "",
    plantingMethod: "",
    soilType: "",
    spacesWithinRaws: "",
    spacesBetweenRaws: "",
    pitSize: "",
    soilDepth: "",
    agronomicPractices: "",
  });
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const addPlant = async () => {
    showMessage({
      message: "Plant Added Successfully!",
      type: "success",
      backgroundColor: styles.alertSuccess.backgroundColor,
      color: styles.alertSuccess.color,
      fontSize: styles.alertSuccess.fontSize,
      duration: 3000,
    });
    const id = uuid.v4();

    await uriToBlob(formData.imageLink).then((blob) => {
      uploadToFirebase(blob, id).then((link) => {
        push(ref(database, "/plants"), { ...formData, imageLink: link })
          .then(() => {
            showMessage({
              message: "Plant Added Successfully!",
              type: "success",
              backgroundColor: styles.alertSuccess.backgroundColor,
              color: styles.alertSuccess.color,
              fontSize: styles.alertSuccess.fontSize,
              duration: 3000,
            });
            navigation.navigate("HomeScreen");
          })
          .catch((err) => {
            console.error(err);
          });
      });
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
          <Text style={styles.heading}>Add Plant</Text>
          <ScrollView style={styles.formContainer}>
            <Text style={styles.label}>Plant Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Plant Name"
              value={formData.plantName}
              onChangeText={(value) => handleChange("plantName", value)}
            />
            <Text style={styles.label}>Botanical Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Botanical Name"
              value={formData.botanicalName}
              onChangeText={(value) => handleChange("botanicalName", value)}
            />
            <Text style={styles.label}>Family Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Family Name"
              value={formData.familyName}
              onChangeText={(value) => handleChange("familyName", value)}
            />
            <Text style={styles.label}>Planting Method</Text>
            <TextInput
              style={styles.input}
              placeholder="Planting Method"
              value={formData.plantingMethod}
              onChangeText={(value) => handleChange("plantingMethod", value)}
            />
            <Text style={styles.label}>Soil Type</Text>
            <TextInput
              style={styles.input}
              placeholder="Soil Type"
              value={formData.soilType}
              onChangeText={(value) => handleChange("soilType", value)}
            />
            <Text style={styles.label}>Spaces Within Raws</Text>
            <TextInput
              style={styles.input}
              placeholder="Spaces Within Raws"
              value={formData.spacesWithinRaws}
              onChangeText={(value) => handleChange("spacesWithinRaws", value)}
            />
            <Text style={styles.label}>Spaces Between Raws</Text>
            <TextInput
              style={styles.input}
              placeholder="Spaces Between Raws"
              value={formData.spacesBetweenRaws}
              onChangeText={(value) => handleChange("spacesBetweenRaws", value)}
            />
            <Text style={styles.label}>Pit Size</Text>
            <TextInput
              style={styles.input}
              placeholder="Pit Size"
              value={formData.pitSize}
              onChangeText={(value) => handleChange("pitSize", value)}
            />
            <Text style={styles.label}>Soil Depth</Text>
            <TextInput
              style={styles.input}
              placeholder="Soil Depth"
              value={formData.soilDepth}
              onChangeText={(value) => handleChange("soilDepth", value)}
            />
            <Text style={styles.label}>Agronomic Practices</Text>
            <TextInput
              style={styles.input}
              placeholder="Agronomic Practices"
              value={formData.agronomicPractices}
              onChangeText={(value) =>
                handleChange("agronomicPractices", value)
              }
            />
            {formData.imageLink && (
              <Image
                style={styles.image}
                source={{ uri: formData.imageLink }}
              />
            )}

            <Button
              icon={"upload"}
              mode="contained"
              style={{ marginBottom: 20 }}
              buttonColor={"#783316"}
              onPress={() => setModalShow(true)}
            >
              Upload Plant Image
            </Button>
            <View>
              <ButtonComponent
                text="Submit"
                icon="upload"
                type="antdesign"
                onPress={addPlant}
              />
            </View>
            <ImageGallary
              modal={modalShow}
              closeModal={() => {
                setModalShow(false);
              }}
              image={formData.imageLink}
              setImage={(val) => {
                handleChange("imageLink", val);
              }}
            />
          </ScrollView>
        </ImageBackground>
      </View>
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
    backgroundColor: "#0c913a",
    color: "#fff",
    fontSize: 18,
  },
});

export default PlantForm;