import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_ACCESS_TOKEN } from "react-native-dotenv";
import { IMovie } from "../../types/app";
import MovieItem from "../movies/MovieItem";
import { coverImageSize } from "../movies/MovieList";

const KeywordSearch = ({ navigation }: any): JSX.Element => {
  const [keyword, setKeyword] = useState<string>();
  const [movies, setMovies] = useState<IMovie[]>([]);

  const getMovieSearch = (keyword: string): void => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}`;
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
        setMovies(response.results);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });
  };

  const onChangeText = (text: string) => {
    setKeyword(text);
  };

  const handleSubmit = () => {
    if (keyword) getMovieSearch(keyword);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input title movie here"
          onChangeText={onChangeText}
          value={keyword}
          onSubmitEditing={handleSubmit}
        />
        <Feather name="search" size={24} color="black" />
      </View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 20,
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 350,
          }}
        >
          {movies?.map((movie) => (
            <View style={{ flexBasis: "31%" }} key={movie.id}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MovieDetail");
                }}
              >
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  size={coverImageSize["poster"]}
                  coverType="poster"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 0,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#DDDDDD",
    borderRadius: 25,
    flexBasis: "92%",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#DDDDDD",
    borderRadius: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default KeywordSearch;
