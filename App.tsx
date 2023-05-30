import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import data from "./assets/data.json";

type Weather = {
  state: string;
  city: string;
  date: string;
  temperature: string;
  daily_summary: string;
  wind: string;
  humidity: string;
  visibility: string;
};

export default function App() {
  const [city] = useState<string>("Fortaleza");
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    const weather = data.filter((unity) => {
      return unity.city === city;
    });

    setWeather(weather[0]);
  }, []);

  function extract_keywords(weather_summary: string) {
    const sky_keywords_regex = RegExp(
      /ensolarado|sol|(parcialmente )?nublado/gi
    );
    const temperature_keywords_regex = RegExp(
      /(extremamente )?(frio|quente)/gi
    );
    const rain_keywords_regex = RegExp(
      /(pancadas de |(sem |não há )[^\.]*)?chuva/gi
    );

    const sky_keywords = weather_summary.match(sky_keywords_regex) ?? [
      "ensolarado",
    ];
    const temperature_keywords =
      weather_summary.match(temperature_keywords_regex) ?? [];
    const rain_keywords = weather_summary.match(rain_keywords_regex) ?? [];

    return [...sky_keywords, ...temperature_keywords, ...rain_keywords].join(
      ", "
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.location}>
          {weather?.city} - {weather?.state}
        </Text>
      </View>
      <View>
        <Text style={styles.date}>{weather?.date}</Text>
      </View>
      <View>
        <Text style={styles.climate}>
          {weather?.daily_summary
            ? extract_keywords(weather?.daily_summary)
            : ""}
        </Text>
      </View>
      <View>
        <Text style={styles.temperature}>{weather?.temperature}</Text>
      </View>

      <View style={styles.daily_summary}>
        <Text style={styles.daily_summary_text}>Resumo diário</Text>
        <Text style={styles.daily_summary_text}>{weather?.daily_summary}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_item}>
          <FontAwesome5 name="wind" size={48} color="#f9f93b" />
          <Text style={styles.footer_measure_text}>{weather?.wind}</Text>
          <Text style={styles.footer_label_text}>vento</Text>
        </View>
        <View style={styles.footer_item}>
          <FontAwesome5 name="water" size={48} color="#f9f93b" />
          <Text style={styles.footer_measure_text}>{weather?.humidity}</Text>
          <Text style={styles.footer_label_text}>umidade</Text>
        </View>
        <View style={styles.footer_item}>
          <FontAwesome5 name="eye" size={48} color="#f9f93b" />
          <Text style={styles.footer_measure_text}>{weather?.visibility}</Text>
          <Text style={styles.footer_label_text}>visibilidade</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f93b",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 25,
  },
  location: {
    fontSize: 23,
    fontWeight: "700",
  },
  date: {
    paddingVertical: 15,
    paddingHorizontal: 33,
    backgroundColor: "black",
    color: "white",
    borderRadius: 24,
  },
  climate: {
    fontWeight: "800",
    fontSize: 15,
  },
  temperature: {
    fontSize: 140,
    fontWeight: "800",
  },
  daily_summary: {
    alignItems: "flex-start",
    paddingVertical: 10,
    width: "100%",
  },
  daily_summary_text: {
    fontWeight: "800",
    marginVertical: 5,
    fontSize: 17
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 10,
  },
  footer_item: {
    justifyContent: "center",
    alignItems: "center",
  },
  footer_measure_text: {
    color: "#f9f93b",
    fontWeight: "600",
  },
  footer_label_text: {
    color: "#a8a308",
  },
});
