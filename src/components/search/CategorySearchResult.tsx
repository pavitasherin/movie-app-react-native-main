import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { IMovie } from "../../types/app";
import { API_ACCESS_TOKEN } from "react-native-dotenv";
import MovieItem from "../movies/MovieItem";
import { coverImageSize } from "../movies/MovieList";

const CategorySearchResult = ({ route, navigation }: any): JSX.Element => {
  const { genreId, genreTitle } = route.params;

  const [movies, setMovies] = useState<IMovie[]>([]);

  const getMovieSearch = (keyword: number): void => {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${keyword}`;
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

  useEffect(() => {
    getMovieSearch(genreId);
  }, [genreId]);

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 20,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "center",
            width: "100%",
          }}
        >
          Result of {genreTitle} Genre
        </Text>
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
  );
};

export default CategorySearchResult;
