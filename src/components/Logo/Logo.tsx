import { ReactComponent as BookIcon } from '../../icons/Book.svg'

import { Container } from './Logo.styles'

export function Logo() {
  return (
    <Container>
      <BookIcon />
      <span>DevBooks</span>
    </Container>
  )
}
