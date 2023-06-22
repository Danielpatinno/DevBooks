/* eslint-disable prettier/prettier */
import { InputHTMLAttributes } from 'react'
import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import { Container } from './SearchBox.styles'

type SearchBoxProps = InputHTMLAttributes<HTMLInputElement>

export function SearchBox (props:SearchBoxProps) {
  return <>
    <Container>
        <SearchIcon />
         <input placeholder='Qual livro você quer buscar?'  {...props}/>
    </Container>
    
  </>
}