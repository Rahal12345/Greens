import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";

import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { withNavigationFocus } from "react-navigation";

import ButtonComponent from "../components/ButtonComponent";
import PlantCard from "../components/PlantCard";

import { database } from "../../firebase";
import { ref, get } from "firebase/database";

function Home({ navigation, isFocused }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [plantsData, setPlantsData] = useState([]);

  useEffect(() => {
    searchPlants();
  }, [isFocused]);
  const searchPlants = async () => {
    await get(ref(database, "/plants"))
      .then((snapshot) => {
        const data = snapshot.val();
        if (data != null) {
          if (searchQuery !== "")
            setPlantsData(
              Object.keys(data)
                .map((ID) => ({
                  id: ID,
                  ...data[ID],
                }))
                .filter((plant) => plant.plantName.includes(searchQuery))
            );
          else
            setPlantsData(
              Object.keys(data).map((ID) => ({
                id: ID,
                ...data[ID],
              }))
            );
        } else {
          setPlantsData([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <ImageBackground
          source={require("../../assets/background.png")}
          style={styles.backgroundImage}
          imageStyle={styles.watermark}
        >
          <Text style={styles.heading}>Greens</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search plants"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity onPress={searchPlants}>
              <Icon
                name="search"
                size={30}
                color="#FFFFFF"
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.addPlant}>
            <ButtonComponent
              text="Add Plant"
              icon="plus"
              type="antdesign"
              onPress={() => navigation.navigate("AddPlantScreen")}
            />
          </View>
          <View style={styles.scrollView}>
            <FlatList
              scrollEnabled={true}
              data={plantsData}
              renderItem={({ item, index }) => (
                <PlantCard
                  key={index}
                  plantName={item.plantName}
                  botanicalName={item.botanicalName}
                  imageSource={item.imageLink}
                  onPress={() =>
                    navigation.navigate("ViewPlantScreen", { plant: item })
                  }
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    height: 150,
    width: 150,
    resizeMode: "contain",
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
  searchInput: {
    width: "80%",
    height: 40,
    borderColor: "#0c913a",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginHorizontal: 14,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchIcon: {
    marginTop: 4,
    padding: 2,
    backgroundColor: "#0c913a",
    borderRadius: 4,
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
  addPlant: {
    position: "absolute",
    top: 165,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: { marginTop: 220 },
});

export default withNavigationFocus(Home);
