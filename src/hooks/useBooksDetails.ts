import { useQuery } from '@tanstack/react-query'

import { Book } from '../models/Book'
import { api } from '../services/api'

interface BookDetailQueryArgs {
  bookId: string
}

async function fetchBookDetails({ bookId }: BookDetailQueryArgs) {
  const { data } = await api.get<Book>(`/books/${bookId}`)

  return data
}

export function useBookDetailsQuery({ bookId }: BookDetailQueryArgs) {
  return useQuery({
    queryKey: ['book-details', bookId],
    queryFn: async () => await fetchBookDetails({ bookId }),
    staleTime: Infinity
  })
}
