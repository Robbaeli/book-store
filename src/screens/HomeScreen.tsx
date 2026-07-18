import { FlatList, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {
  createBook,
  deleteBookByID,
  getListOfBooks,
  type Book,
  type BookInput,
  updateBook,
} from "../api/config";
import AddButton from "../components/AddButton";
import BookCard from "../components/bookCard";
import AddBookScreen from "./AddBookScreen";

const HomeScreen = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const getListOfBooksFN = () => {
    getListOfBooks({
      onSuccess: (books: Book[]) => setBookList(books),
      onError: (err: unknown) => console.log(err),
    });
  };

  useEffect(() => {
    getListOfBooksFN();
  }, []);

  const onDeleteItem = (item: Book) => {
    deleteBookByID({
      onSuccess: () => {
        getListOfBooksFN();
      },
      onError: (error: unknown) => console.log(error),
      itemID: item.id,
    });
  };

  const onEditItem = (item: Book) => {
    setBookToEdit(item);
    setShowEditor(true);
  };

  const onAddItem = () => {
    setBookToEdit(null);
    setShowEditor(true);
  };

  const onSaveBook = (body: BookInput) => {
    const commonCallbacks = {
      onSuccess: () => {
        setShowEditor(false);
        setBookToEdit(null);
        getListOfBooksFN();
      },
      onError: (error: unknown) => console.log(error),
    };

    if (bookToEdit?.id) {
      updateBook({
        ...commonCallbacks,
        itemID: bookToEdit.id,
        body,
      });
      return;
    }

    createBook({
      ...commonCallbacks,
      body,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={bookList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookCard
            authorName={item.name_of_author}
            price={item.price_of_book}
            imageURI={item.cover}
            title={item.book_title ?? "Untitled"}
            onDeleteItem={() => onDeleteItem(item)}
            onEditItem={() => onEditItem(item)}
          />
        )}
      />
      <AddButton onPress={onAddItem} />

      <Modal visible={showEditor} animationType="slide">
        <AddBookScreen
          onCloseIconPress={() => setShowEditor(false)}
          onSaveBook={onSaveBook}
          initialBook={bookToEdit}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
