import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Book } from '../models/Book'
import { api } from '../services/api'

interface BooksQueryResponse {
  totalItems: number
  items: Book[]
}
interface BooksQueryArgs {
  search: string
  maxResults: number
}

async function fetchBooks({
  search,
  maxResults
}: BooksQueryArgs): Promise<BooksQueryResponse> {
  const { data } = await api.get(`/books?q=${search}&maxResults=${maxResults}`)

  return data
}

export function useBooksQuery({ search, maxResults }: BooksQueryArgs) {
  return useQuery({
    queryKey: ['books', search, maxResults],
    queryFn: async () => await fetchBooks({ search, maxResults }),
    staleTime: Infinity
  })
}

export function useLazyBooksQuery() {
  const [variables, setVariables] = useState<BooksQueryArgs | null>(null)

  const query = useQuery({
    queryKey: ['laze-books', variables],
    queryFn: async () => await fetchBooks(variables as BooksQueryArgs),
    enabled: Boolean(variables)
  })

  const fetch = (queryVariables: BooksQueryArgs) => {
    setVariables(queryVariables)
  }

  return {
    fetch,
    ...query
  }
}
