import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import MovieItem from "../components/movies/MovieItem";
import { IMovie } from "../types/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { coverImageSize } from "../components/movies/MovieList";
import { useFocusEffect } from "@react-navigation/native";

const Favorite = ({ navigation }: any): JSX.Element => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchMovies = async (): Promise<void> => {
    const initialData: string | null =
      await AsyncStorage.getItem("@FavoriteList");

    if (initialData !== null) {
      const favMovieList: IMovie[] = JSON.parse(initialData);
      setMovies(favMovieList);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMovies();
    }, [])
  );

  useEffect(() => {
    if (refreshing) {
      fetchMovies();
    }
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 20,
          flexWrap: "wrap",
          gap: 10,
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
        <StatusBar translucent={false} />
      </View>
    </ScrollView>
  );
};

export default Favorite;
