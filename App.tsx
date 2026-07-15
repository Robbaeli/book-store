import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, FlatList, Image } from "react-native";
import axios from "axios";
import { useState } from "react";

type Book = {
  id: string;
  name_of_author: string;
  price_of_book: string;
  cover?: string;
};

export default function App() {
  const [bookList, setBookList] = useState<Book[]>([]);

  const endpointURL = "EXPO_PUBLIC_BOOKS_API_URL_PLACEHOLDER";

  const getListOfBooks = async () => {
    const response = await axios.get(endpointURL);
    console.log(response.data);
    setBookList(response.data);
  };

  const getBookById = async () => {
    const response = await axios.get(`${endpointURL}/7`);
    console.log(JSON.stringify(response.data, null, 3));
  }


  return (
    <View style={styles.container}>
      <Text>Text</Text>
      <StatusBar style="auto" />
      <Button title="get list of books" onPress={getListOfBooks} />
      <Button title="get book by ID" onPress={getBookById} />
      <FlatList
        data={bookList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name_of_author}</Text>
            <Text>{item.price_of_book}</Text>
            {!!item.cover && (
              <Image
                source={{ uri: item.cover }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
