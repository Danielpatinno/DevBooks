import { MouseEventHandler, ReactNode } from 'react'
import { Container } from './MyBookButton.styles'

import { ReactComponent as CheckIcon } from '../../../icons/check.svg'

interface MyBookButtonProps {
  children: ReactNode
  isSelected: boolean
  onAddBookList: MouseEventHandler<HTMLButtonElement>
  disabled: boolean
}

export function MyBookButton({
  children,
  isSelected,
  onAddBookList,
  disabled
}: MyBookButtonProps) {
  return (
    <Container
      variant={isSelected ? 'default' : 'outlined'}
      isSelected={isSelected}
      onClick={onAddBookList}
      disabled={disabled}
    >
      {isSelected && <CheckIcon />}
      {children}
    </Container>
  )
}
