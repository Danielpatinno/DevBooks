import { KeyboardEvent, useRef, useState } from 'react'
import { useLazyBooksQuery } from '../../hooks/useBooksQuery'
import { useOutsideInteraction } from '../../hooks/useOutsideInterection'

import { Link } from '../Link'
import { SearchBox } from '../SearchBox'
import { SearchResultBook } from '../SearchResultBook/SearchResultBook'

import {
  Container,
  SearchResult,
  SearchResultBookContainer,
  SeeAllContainer
} from './Search.styles'
import { SearchLoader } from './SearchLoader'

export function Search() {
  const [search, setSearch] = useState('')
  const [showResult, setShowResult] = useState(false)
  const searchRef = useRef<HTMLDivElement | null>(null)
  const { fetch, data, isLoading } = useLazyBooksQuery()

  const handleCloseResult = () => {
    setShowResult(false)
  }

  useOutsideInteraction(searchRef, handleCloseResult)

  const handleSearch = async () => {
    if (search) {
      setShowResult(true)
      const maxResults = 3
      fetch({
        search,
        maxResults
      })
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Container ref={searchRef}>
      <SearchBox
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      {showResult && (
        <SearchResult>
          <span>Resultado da Busca</span>

          <SearchResultBookContainer>
            {data && !isLoading ? (
              data.items.map((item) => (
                <SearchResultBook key={item.id} book={item} />
              ))
            ) : (
              <SearchLoader />
            )}
          </SearchResultBookContainer>

          <SeeAllContainer>
            <Link to={`/livros?q=${search}`}>Ver todos</Link>
          </SeeAllContainer>
        </SearchResult>
      )}
    </Container>
  )
}
