import { ReadingBookCard } from '../../components/ReadingBookCard'
import { useMyBooksQuery } from '../../hooks/useMyBooksQuery'
import { generateThumbnailSrc } from '../../utils/generateThumbnailSrc'
import { MainLayout } from '../layouts/MainLayout'
import {
  Book,
  BookContainer,
  Container,
  ReadingList,
  Thumbnail
} from './MyBooks.styles'
import { MyBooksLoader } from './MyBooksLoader'

export function MyBooks() {
  const { data, isLoading } = useMyBooksQuery()
  return (
    <MainLayout>
      {data && !isLoading ? (
        <Container>
          <div>
            <h1>Lendo</h1>

            <ReadingList>
              {data.isReading.map((item) => (
                <li key={item.bookId}>
                  <ReadingBookCard myBook={item} />
                </li>
              ))}
            </ReadingList>
          </div>

          <div>
            <h1>Quero Ler</h1>

            <BookContainer>
              {data.wantsToRead.map((item) => (
                <Book key={item.bookId}>
                  <Thumbnail
                    src={generateThumbnailSrc({ bookId: item.bookId })}
                    alt={item.book.volumeInfo.title}
                  />

                  <h2>{item.book.volumeInfo.title}</h2>
                  {item.book.volumeInfo.authors && (
                    <h3>{item.book.volumeInfo.authors[0]}</h3>
                  )}
                </Book>
              ))}
            </BookContainer>
          </div>

          <div>
            <h1>Já lí</h1>

            <BookContainer>
              {data.read.map((item) => (
                <Book key={item.bookId}>
                  <Thumbnail
                    src={generateThumbnailSrc({ bookId: item.bookId })}
                    alt={item.book.volumeInfo.title}
                  />

                  <h2>{item.book.volumeInfo.title}</h2>
                  {item.book.volumeInfo.authors && (
                    <h3>{item.book.volumeInfo.authors[0]}</h3>
                  )}
                </Book>
              ))}
            </BookContainer>
          </div>
        </Container>
      ) : (
        <MyBooksLoader />
      )}
    </MainLayout>
  )
}
