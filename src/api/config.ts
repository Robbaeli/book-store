import axios from "axios";
import { Alert } from "react-native";

export type Book = {
  id: string;
  createdAt?: string;
  name_of_author: string;
  price_of_book: string | number;
  cover?: string;
  email_of_seller?: string;
  book_title?: string;
};

export type BookInput = {
  name_of_author: string;
  price_of_book: string | number;
  cover?: string;
  email_of_seller?: string;
  book_title?: string;
};

type CallbackParams<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
};

const endpointURL = "EXPO_PUBLIC_BOOKS_API_URL_PLACEHOLDER";

export const getListOfBooks = async ({ onSuccess, onError }: CallbackParams<Book[]> = {}) => {
  try {
    const response = await axios.get<Book[]>(endpointURL);
    onSuccess && onSuccess(response.data);
  } catch (error) {
    onError && onError(error);
    console.log(error);
  }
};

export const getBookByID = async ({
  onSuccess,
  onError,
  itemID,
}: CallbackParams<Book> & { itemID: string }) => {
  try {
    const response = await axios.get<Book>(`${endpointURL}/${itemID}`);
    onSuccess && onSuccess(response.data);
  } catch (error) {
    onError && onError(error);
    console.log("An Error Occurred", error);
  }
};

export const deleteBookByID = async ({
  onSuccess,
  onError,
  itemID,
}: CallbackParams<Book> & { itemID: string }) => {
  try {
    const response = await axios.delete<Book>(`${endpointURL}/${itemID}`);
    Alert.alert("Book Is Deleted Successfully");
    onSuccess && onSuccess(response.data);
  } catch (error) {
    onError && onError(error);
    console.log(error);
  }
};

export const createBook = async ({
  onSuccess,
  onError,
  body,
}: CallbackParams<Book> & { body: BookInput }) => {
  try {
    const response = await axios.post<Book>(endpointURL, body);

    Alert.alert("Book Has Been Created!");
    onSuccess && onSuccess(response.data);
  } catch (error) {
    onError && onError(error);
    console.log(error);
  }
};

export const updateBook = async ({
  onSuccess,
  onError,
  itemID,
  body,
}: CallbackParams<Book> & { itemID: string; body: BookInput }) => {
  try {
    const response = await axios.put<Book>(`${endpointURL}/${itemID}`, body);

    Alert.alert("Book Has Been Updated!");
    onSuccess && onSuccess(response.data);
  } catch (error) {
    onError && onError(error);
    console.log(error);
  }
};