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
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";

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
    seedRate: "",
    agronomicPractices: "",
  });
  const [pestTableData, setPestTableData] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [pestModalShow, setPestModalShow] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUploading, setisUploading] = useState(false);
  
  const addTableRow = () => {
    setPestTableData((prevData) => [
      ...prevData,
      { desease: "", pesticide: "", imageLink: "" },
    ]);
  };
  const removeTableRow = () => {
    const updatedTableData = [...pestTableData.slice(0, -1)];
    setPestTableData(updatedTableData);
  };
  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const handleTableChange = (index, field, value) => {
    const updatedData = pestTableData.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setPestTableData(updatedData);
  };
  const addPlant = async () => {
    setisUploading(true);
    //uploading pest images
    await Promise.all(
      pestTableData.map(async (row, index) => {
        const id = uuid.v4();
        const blob = await uriToBlob(row.imageLink);
        const link = await uploadToFirebase(blob, id);
        row.imageLink = link;
      })
    );
    // uploading main image and all details
    const id = uuid.v4();
    await uriToBlob(formData.imageLink).then((blob) => {
      uploadToFirebase(blob, id).then((link) => {
        push(ref(database, "/plants"), {
          ...formData,
          imageLink: link,
          pestTable: pestTableData,
        })
          .then(() => {
            setisUploading(false);
            showMessage({
              message: "Plant Added Successfully!",
              type: "success",
              backgroundColor: styles.alertSuccess.backgroundColor,
              color: styles.alertSuccess.color,
              fontSize: styles.alertSuccess.fontSize,
              duration: 2000,
            });
            setTimeout(() => {
              navigation.navigate("HomeScreen");
            }, 2000);
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
            <Text style={styles.label}>Seed Rate</Text>
            <TextInput
              style={styles.input}
              placeholder="Seed Rate"
              value={formData.seedRate}
              onChangeText={(value) => handleChange("seedRate", value)}
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
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableRow, width: "50%" }}>
                <Text style={{ ...styles.label, width: "86%" }}>
                  Pest & Desease
                </Text>
                <TouchableOpacity
                  onPress={addTableRow}
                  style={{ width: "14%" }}
                >
                  <Icon
                    name="add"
                    size={20}
                    color="#FFFFFF"
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ ...styles.tableRow, width: "50%" }}>
                {pestTableData.length > 0 && (
                  <TouchableOpacity
                    onPress={removeTableRow}
                    style={{ width: "14%" }}
                  >
                    <Icon
                      name="remove"
                      size={20}
                      color="#FFFFFF"
                      style={{ ...styles.backIcon, backgroundColor: "#b5160b" }}
                    />
                  </TouchableOpacity>
                )}
                <Text
                  style={{ ...styles.label, width: "86%", textAlign: "right" }}
                >
                  Organic Pesticide
                </Text>
              </View>
            </View>

            <FlatList
              data={pestTableData}
              renderItem={({ item, index }) => (
                <View>
                  <View style={styles.tableRow}>
                    <TextInput
                      style={{ ...styles.tableInput, marginRight: 10 }}
                      placeholder="Enter here"
                      value={item.desease}
                      onChangeText={(value) =>
                        handleTableChange(index, "desease", value)
                      }
                    />
                    <TextInput
                      style={styles.tableInput}
                      placeholder="Enter here"
                      value={item.pesticide}
                      onChangeText={(value) =>
                        handleTableChange(index, "pesticide", value)
                      }
                    />
                  </View>
                  {item.imageLink ? (
                    <Image
                      style={{ ...styles.image, width: "50%", height: 100 }}
                      source={{ uri: item.imageLink }}
                      resizeMode="stretch"
                    />
                  ) : (
                    <Button
                      icon={"upload"}
                      mode="contained"
                      style={{ marginBottom: 20, width: "50%" }}
                      buttonColor={"#583316"}
                      onPress={() => {
                        setPestModalShow(true);
                        setCurrentImageIndex(index);
                      }}
                    >
                      Upload image
                    </Button>
                  )}
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
            <View style={formData.imageLink && styles.line}></View>
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
            <Button
              icon={"upload"}
              mode="contained"
              style={{ marginBottom: 20 }}
              buttonColor={isUploading ? "#423d3d" : "#0c913a"}
              onPress={addPlant}
            >
              {isUploading ? "Submitting" : "Submit All"}
            </Button>
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
            <ImageGallary
              modal={pestModalShow}
              closeModal={() => {
                setPestModalShow(false);
              }}
              setImage={(val) => {
                handleTableChange(currentImageIndex, "imageLink", val);
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
    backgroundColor: "#0c913a",
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
    marginBottom: 10,
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
