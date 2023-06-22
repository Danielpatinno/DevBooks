/* eslint-disable prettier/prettier */
import axios from 'axios'

export const googleBooksApi = axios.create({
  baseURL: 'https://www.googleapis.com/books'
})


// googleBooksApi.get('/v1/volumes?q=')