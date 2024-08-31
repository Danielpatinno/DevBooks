import HtmlParser from 'react-html-parser'

import { useParams } from 'react-router-dom'
import { useBookDetailsQuery } from '../../hooks/useBooksDetails'
import { MainLayout } from '../layouts/MainLayout'

import {
  Container,
  ContentContainer,
  PublisherContainer,
  DetailsContainer,
  DetailColum,
  ButtonsContainer,
  DescriptionContainer,
  Description,
  ThumbnailContainer,
  Thumbnail,
  BackgroundThumbnail
} from './BookDetail.styles'

import { ReactComponent as StarIcon } from '../../icons/star.svg'
import { BookDetailLoader } from './BookDetailLoader'
import { MyBookButton } from './MyBookButton'
import { BookState } from '../../models/BookState'
import { useAddToMyBookMutation } from '../../hooks/useAddToMyBooksMutation'
import { generateThumbnailSrc } from '../../utils/generateThumbnailSrc'

export function BookDetail() {
  const params = useParams()
  const addToMyBookMutation = useAddToMyBookMutation()

  const { data, isLoading } = useBookDetailsQuery({
    bookId: params.bookId as string
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
      year: 'numeric'
    }).format(date)
  }

  // Higher order function
  const handleAddToMyBookList = (bookState: BookState) => async () => {
    if (params.bookId) {
      addToMyBookMutation.mutateAsync({
        bookId: params.bookId,
        bookState
      })
    }
  }

  return (
    <MainLayout>
      {data && !isLoading ? (
        <Container>
          <ContentContainer>
            <h1>{data.volumeInfo.title}</h1>

            <h2>{data.volumeInfo.authors?.[0]}</h2>

            <PublisherContainer>
              {data && (
                <span>
                  {formatDate(new Date(data.volumeInfo.publishedDate))}
                </span>
              )}{' '}
              .<span>{data.volumeInfo.publisher}</span>
            </PublisherContainer>

            <DetailsContainer>
              <DetailColum>
                <strong>
                  {data.volumeInfo.averageRating
                    ? data.volumeInfo.averageRating
                    : 4}

                  <StarIcon />
                </strong>
                <span>Avaliações</span>
              </DetailColum>

              <DetailColum>
                <strong>{data.volumeInfo.pageCount}</strong>
                <span>Páginas</span>
              </DetailColum>
            </DetailsContainer>

            <ButtonsContainer>
              <MyBookButton
                isSelected={data.bookState === 'IS_READING'}
                onAddBookList={handleAddToMyBookList('IS_READING')}
                disabled={false}
              >
                Estou Lendo
              </MyBookButton>
              <MyBookButton
                isSelected={data.bookState === 'WANTS_TO_READ'}
                onAddBookList={handleAddToMyBookList('WANTS_TO_READ')}
                disabled={false}
              >
                Quero Ler
              </MyBookButton>
              <MyBookButton
                isSelected={data.bookState === 'READ'}
                onAddBookList={handleAddToMyBookList('READ')}
                disabled={false}
              >
                Já Li
              </MyBookButton>
            </ButtonsContainer>

            <DescriptionContainer>
              <h3>Sobre este livro</h3>

              <Description>
                {HtmlParser(data.volumeInfo.description)}
              </Description>
            </DescriptionContainer>
          </ContentContainer>

          <ThumbnailContainer>
            <Thumbnail src={generateThumbnailSrc({ bookId: data.id })} />
            <BackgroundThumbnail
              src={generateThumbnailSrc({ bookId: data.id })}
            />
          </ThumbnailContainer>
        </Container>
      ) : (
        <BookDetailLoader />
      )}
    </MainLayout>
  )
}
