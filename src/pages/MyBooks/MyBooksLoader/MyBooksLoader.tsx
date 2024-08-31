import { SkeletonLoader } from '../../../components/SkeletonLoader'
import { GenerateSkeleton } from '../../../utils/generateSkeleton'
import { ReadingCard, ReadingList } from '../MyBooks.styles'
import {
  BookProgressContainer,
  ProgressBarContainer,
  SmallBook,
  SmallBookContainer
} from './MyBooksLoader.styles'

export function MyBooksLoader() {
  return (
    <>
      <SkeletonLoader width="20rem" height="3.4rem" />

      <ReadingList>
        {GenerateSkeleton(3).map((skeleton) => (
          <li key={skeleton}>
            <ReadingCard>
              <SkeletonLoader width="12rem" height="16rem" />

              <BookProgressContainer>
                <SkeletonLoader width="100%" height="1.6rem" />
                <SkeletonLoader width="45%" height="1.6rem" />

                <SkeletonLoader width="60%" height="1rem" />

                <ProgressBarContainer>
                  <SkeletonLoader width="80%" height="1.2rem" />
                  <SkeletonLoader width="20%" height="1.2rem" />
                </ProgressBarContainer>

                <SkeletonLoader width="100%" height="3.2rem" />
              </BookProgressContainer>
            </ReadingCard>
          </li>
        ))}
      </ReadingList>

      <SkeletonLoader width="20rem" height="3.4rem" />

      <SmallBookContainer>
        {GenerateSkeleton(3).map((skeleton) => (
          <SmallBook key={skeleton}>
            <SkeletonLoader width="12rem" height="16rem" />
            <SkeletonLoader width="10rem" height="1.6rem" />
            <SkeletonLoader width="7rem" height="1.2rem" />
          </SmallBook>
        ))}
      </SmallBookContainer>

      <SkeletonLoader width="20rem" height="3.4rem" />

      <SmallBookContainer>
        {GenerateSkeleton(5).map((skeleton) => (
          <SmallBook key={skeleton}>
            <SkeletonLoader width="12rem" height="16rem" />
            <SkeletonLoader width="10rem" height="1.6rem" />
            <SkeletonLoader width="7rem" height="1.2rem" />
          </SmallBook>
        ))}
      </SmallBookContainer>
    </>
  )
}
