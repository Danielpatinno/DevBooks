/* eslint-disable prettier/prettier */

// style
import { BackButton, Container, Content, Description, SpinerContainer, SubTitle, Title } from './BookDetail.styles'

// hooks
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

// components
import { googleBooksApi } from "../../services/googleBooksApi"
import { Thumbnail } from '../../components/Thumbnail'
import parse from 'html-react-parser';
import { Spinner } from '../../components/Spinner'
import { ReactComponent as ArrowLeftIcon } from '../../icons/arrow-left.svg'


export interface BookState {
  id: string
  volumeInfo: {
    title: string
    subTitle: string
    description: string
    imageLinks?: {
      thumbnail: string
    }
  }
}

export function BookDetail () {
  const [book, setBook] = useState<BookState | null>(null)
  const params = useParams()
  const navigate = useNavigate()

  const { bookId } = params

  useEffect(() => {
    googleBooksApi.get(`/v1/volumes/${bookId}`)
    .then((response) => setBook(response.data))
  },[bookId])

  const handleGoBack = () => {
    navigate(-1)
  }

  return <Container>
      {book ? (
        <>
        <BackButton>
          <ArrowLeftIcon onClick={handleGoBack} />
        </BackButton>
          <Thumbnail 
          thumbnail={book.volumeInfo.imageLinks?.thumbnail} 
          title={book.volumeInfo.title} 
          size='large' 
          bgColor='#ef552b'/>

          <Content>
            <Title>{book.volumeInfo.title}</Title>
            <SubTitle>{book.volumeInfo.subTitle}</SubTitle>
            <Description>{parse(book.volumeInfo.description)}</Description>
          </Content>
        </>
      ) : (
        <SpinerContainer>
          <Spinner />
        </SpinerContainer>
        
      )
      }
    </Container>
  
}
