import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import type { Book, BookInput } from "../api/config";

type AddBookScreenProps = {
  onCloseIconPress: () => void;
  onSaveBook: (body: BookInput) => void;
  initialBook?: Book | null;
};

const AddBookScreen = ({ onCloseIconPress, onSaveBook, initialBook }: AddBookScreenProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.book_title ?? "");
      setAuthor(initialBook.name_of_author ?? "");
      setPrice(String(initialBook.price_of_book ?? ""));
      setSellerEmail(initialBook.email_of_seller ?? "");
      setCoverUrl(initialBook.cover ?? "");
      return;
    }

    setTitle("");
    setAuthor("");
    setPrice("");
    setSellerEmail("");
    setCoverUrl("");
  }, [initialBook]);

  const submit = () => {
    if (!title.trim() || !sellerEmail.trim() || !price.trim() || !coverUrl.trim()) {
      Alert.alert("Missing fields", "Fill in title, email, price and image URL.");
      return;
    }

    onSaveBook({
      book_title: title,
      name_of_author: author.trim() ? author : title,
      price_of_book: price,
      email_of_seller: sellerEmail,
      cover: coverUrl,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{initialBook ? "Edit Book" : "Add Book"}</Text>
        <AntDesign name="close-circle" size={26} color="#E81D1D" onPress={onCloseIconPress} />
      </View>

      <TextInput
        placeholder="Book title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Author name"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />
      <TextInput
        placeholder="Seller email"
        value={sellerEmail}
        onChangeText={setSellerEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Cover image URL"
        value={coverUrl}
        onChangeText={setCoverUrl}
        style={styles.input}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.saveButton} onPress={submit}>
        <Text style={styles.saveButtonText}>{initialBook ? "Save Changes" : "Save Book"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddBookScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#f5f8ff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#102a43",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9e2ec",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: "#1273DE",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});