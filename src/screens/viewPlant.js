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
import { Icon } from "react-native-elements";

import { Button } from "react-native-paper";
import { database } from "../../firebase";
import { ref, remove } from "firebase/database";

import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

import DeleteConfirmationModal from "../components/confirmationModal";
import { FlatList } from "react-native";

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
          duration: 2000,
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
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Icon
              name="reply"
              size={30}
              color="#FFFFFF"
              style={styles.backIcon}
            />
          </TouchableOpacity>
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
            <Text style={styles.label}>Seed Rate</Text>
            <TextInput
              style={styles.input}
              placeholder="Seed Rate"
              value={formData.seedRate}
            />
            <Text style={styles.label}>Agronomic Practices</Text>
            <TextInput
              style={styles.input}
              placeholder="Agronomic Practices"
              value={formData.agronomicPractices}
            />
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableRow, width: "50%" }}>
                <Text style={{ ...styles.label, width: "100%" }}>
                  Pest & Desease
                </Text>
              </View>
              <View style={{ ...styles.tableRow, width: "50%" }}>
                <Text
                  style={{ ...styles.label, width: "100%", textAlign: "right" }}
                >
                  Organic Pesticide
                </Text>
              </View>
            </View>
            <FlatList
              data={formData.pestTable}
              renderItem={({ item, index }) => (
                <View>
                  <View style={styles.tableRow}>
                    <TextInput
                      style={{ ...styles.tableInput, marginRight: 10 }}
                      placeholder="Enter here"
                      value={item.desease}
                    />
                    <TextInput
                      style={styles.tableInput}
                      placeholder="Enter here"
                      value={item.pesticide}
                    />
                  </View>
                  <Image
                    style={styles.image}
                    source={{ uri: item.imageLink }}
                  />
                  <View style={formData.imageLink && styles.line}></View>
                </View>
              )}
              keyExtractor={(item, index) => index}
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
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
  },
  formContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertSuccess: {
    backgroundColor: "#b5160b",
    color: "#fff",
    fontSize: 18,
  },
  back: {
    position: "absolute",
    top: 35,
    left: 10,
    bottom: 0,
  },
  backIcon: {
    marginTop: 4,
    padding: 2,
    backgroundColor: "#0c913a",
    borderRadius: 96,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  tableInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginRight: 0,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginVertical: 4,
  },
});

export default PlantForm;
