import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { API_ACCESS_TOKEN } from "react-native-dotenv";
import { IMovie } from "../types/app";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import MovieList from "../components/movies/MovieList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieDetail = ({ route, navigation }: any): JSX.Element => {
  const [movie, setMovie] = useState<IMovie>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { id } = route.params;

  const getMovieById = (movieId: number): void => {
    if (API_ACCESS_TOKEN.length == null) {
      throw new Error("ENV not found");
    }

    const url = `https://api.themoviedb.org/3/movie/${movieId}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovie(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) getMovieById(id);
  }, [id]);

  const addFavorite = async (movie: IMovie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");

      let favMovieList: IMovie[] = [];
      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(favMovieList));
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");

      if (initialData !== null) {
        const favMovieList: IMovie[] = JSON.parse(initialData);
        const updateFavMovieList = favMovieList.filter(
          (movie) => movie.id !== id
        );

        await AsyncStorage.setItem(
          "@FavoriteList",
          JSON.stringify(updateFavMovieList)
        );
        setIsFavorite(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");
      if (initialData !== null) {
        const favMovieList: IMovie[] = JSON.parse(initialData);
        const isExist = favMovieList.some((movie) => movie.id === id);
        setIsFavorite(isExist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (movie) checkIsFavorite(movie.id);
  }, [movie]);

  return (
    <ScrollView style={[styles.height, styles.backgroundWhite]}>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
          }}
        >
          <LinearGradient
            colors={["#00000000", "rgba(0, 0, 0, 0.7)"]}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
            <Text style={styles.movieTitle}>{movie?.title}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="yellow" />
                <Text style={styles.rating}>
                  {movie?.vote_average.toFixed(1)}
                </Text>
              </View>
              {isFavorite ? (
                <TouchableOpacity
                  onPress={() => {
                    if (movie) removeFavorite(movie.id);
                  }}
                >
                  <AntDesign name="heart" size={24} color="red" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (movie) addFavorite(movie);
                  }}
                >
                  <AntDesign name="hearto" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={{ display: "flex", gap: 10, margin: 20 }}>
          <Text>{movie?.overview}</Text>
          <View>
            <View
              style={{
                display: "flex",
                gap: 20,
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ fontWeight: "bold", width: "50%" }}>
                Original Language
              </Text>
              <Text style={{ fontWeight: "bold", width: "50%" }}>
                Popularity
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                gap: 20,
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ width: "50%" }}>{movie?.original_language}</Text>
              <Text style={{ width: "50%" }}>
                {movie?.popularity.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                gap: 20,
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ fontWeight: "bold", width: "50%" }}>
                Release Date
              </Text>
              <Text style={{ fontWeight: "bold", width: "50%" }}>
                Vote Count
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                gap: 20,
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ width: "50%" }}>{movie?.release_date}</Text>
              <Text style={{ width: "50%" }}>{movie?.vote_count}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 30 }}>
          <MovieList
            title="Recommendation"
            path={`movie/${id}/recommendations`}
            coverType="poster"
            key="Recommendation"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: "#FFFFFF",
  },
  height: {
    height: "100%",
  },
  container: {
    display: "flex",
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  fontSize30: {
    fontSize: 30,
  },
  margin20: {
    margin: 20,
  },
  marginVertical20: {
    marginVertical: 20,
  },
  backgroundImage: {
    width: "100%",
    height: 250,
  },
  backgroundImageStyle: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  movieTitle: {
    color: "white",
    margin: 8,
    fontSize: 20,
    fontWeight: "700",
  },
  gradientStyle: {
    padding: 8,
    height: "100%",
    width: "100%",
    borderRadius: 8,
    display: "flex",
    justifyContent: "flex-end",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginHorizontal: 8,
    marginBottom: 10,
  },
  rating: {
    color: "yellow",
    fontWeight: "700",
  },
  header: {
    marginLeft: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8978A4",
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
});

export default MovieDetail;
