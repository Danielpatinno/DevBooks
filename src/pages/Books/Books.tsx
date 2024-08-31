import { useSearchParams } from 'react-router-dom'
import { BookCard } from '../../components/BookCard'
import { useBooksQuery } from '../../hooks/useBooksQuery'
import { MainLayout } from '../layouts/MainLayout'
import { BookLoader } from './BookLoader'
import { BooksList } from './Books.styles'

export function Books() {
  const params = useSearchParams()
  const [searchParams] = params
  const q = searchParams.get('q') as string

  const { data, isLoading } = useBooksQuery({
    search: q,
    maxResults: 20
  })
  return (
    <MainLayout>
      <h1>Resultado da busca</h1>

      <BooksList>
        {data && !isLoading ? (
          data.items.map((item) => (
            <li key={item.id}>
              <BookCard book={item} />
            </li>
          ))
        ) : (
          <BookLoader />
        )}
      </BooksList>
    </MainLayout>
  )
}
