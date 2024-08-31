import { useState } from "react";
import { useUpdateReadingMutation } from "../../hooks/useUpdateReadingMutation";
import { MyBook } from "../../models/MyBook";
import { generateThumbnailSrc } from "../../utils/generateThumbnailSrc";
import { Button } from "../Button";
import { Input } from "../Input";
import { Spinner } from "../Spinner";

import { 
  Details, 
  PageCountText,
  ProgressBarContainer, 
  ProgressBar, 
  ReadingCard, 
  Thumbnail, 
  ButtonsContainer,
  InputContainer
} from "./ReadingBookCard.styles";

interface ReadingBookCardProps {
  myBook: MyBook
}

export function ReadingBookCard({ myBook }:ReadingBookCardProps) {
  const [openUpdateReading, setOpenUpdateReading ] = useState<boolean>(false)
  const [page, setPage] = useState<string>('')

  const { mutateAsync, isLoading } = useUpdateReadingMutation()

  const handleOpenUpdateReaing = () => {
    setOpenUpdateReading(true)
    setPage('')
  }

  const handleCloseUpdateReaing = () => {
    setOpenUpdateReading(false)
  }

  const handleUpdateReaing = async () => {
    if(!page) return

    await mutateAsync({
        bookId: myBook.bookId,
        page: Number(page)
    })

    setOpenUpdateReading(false)
  }

  const currentPage = myBook.currentPage || 0
  const remainingPages = myBook.totalPages - currentPage
  const progress = Math.round((currentPage / myBook.totalPages) * 100)

  return (
    <ReadingCard>
      <Thumbnail
        src={generateThumbnailSrc({ bookId: myBook.bookId })}
        alt={myBook.book.volumeInfo.title}
      />

      <Details>
        {!openUpdateReading ? (
          <>
            <h2>{myBook.book.volumeInfo.title}</h2>
            {myBook.book.volumeInfo.authors && (
              <h3>{myBook.book.volumeInfo.authors[0]}</h3>
            )}
            
            <ProgressBarContainer>
              <ProgressBar progress={progress} />
              <span>{progress}%</span>
            </ProgressBarContainer>
    
            <PageCountText>
              Faltam {remainingPages} pág. para terminar
            </PageCountText>
    
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={handleOpenUpdateReaing}
            >
              Atualizar leitura
            </Button>
          </>      
        ): (
          <>
            <h2>Atualizar leitura</h2>

            <InputContainer>
              <Input 
                label="Página atual" 
                type="number"
                value={page} 
                onChange={(e) => setPage(e.target.value)}
              />
            </InputContainer>
            
            <ButtonsContainer>
              <Button 
                size="small" 
                variant="outlined" 
                fullWidth 
                onClick={handleCloseUpdateReaing}
              >
                Cancelar
              </Button>
              <Button 
                size="small" 
                fullWidth 
                onClick={handleUpdateReaing}
                disabled={isLoading}
              >
                {isLoading ? <Spinner size={20} /> : 'Salvar'}
              </Button>
            </ButtonsContainer>
          </>
        )}
      </Details>
    </ReadingCard>
  )
}