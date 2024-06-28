import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { API_ACCESS_TOKEN } from "react-native-dotenv";
import { Genre } from "../../types/app";
import { StackActions, useNavigation } from "@react-navigation/native";

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreId, setGenreId] = useState<number>(0);
  const [genreTitle, setGenreTitle] = useState<string>();
  const [selected, setSelected] = useState<boolean>(false);

  const navigation = useNavigation();
  const pushAction = StackActions.push("CategorySearchResult", {
    genreId: genreId,
    genreTitle: genreTitle,
  });

  const getGenreList = (): void => {
    const url = `https://api.themoviedb.org/3/genre/movie/list`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setGenres(response.genres);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });
  };

  useEffect(() => {
    getGenreList();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {genres?.map((genre) => (
          <TouchableOpacity
            style={[
              styles.card,
              selected && genreId === genre.id ? styles.selectedCard : null,
            ]}
            key={genre.id}
            onPress={() => {
              setGenreId(genre.id);
              setGenreTitle(genre.name);
              setSelected(!selected);
            }}
          >
            <View>
              <Text key={genre.id} style={{ textAlign: "center" }}>
                {genre.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.dispatch(pushAction);
        }}
      >
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    flexBasis: "47%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    margin: 5,
  },
  selectedCard: {
    backgroundColor: "gray",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#8978A4",
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default CategorySearch;
