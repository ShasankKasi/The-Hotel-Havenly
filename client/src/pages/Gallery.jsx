import styled from "styled-components";
import { useCabinPhotos } from "../features/cabins/useCabinPhotos";
import Spinner from "../ui/Spinner";

// Styled components
const GalleryContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  ); /* Adjusted for better spacing */
  justify-items: center;
  padding: 20px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const HotelDescription = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  color: var(--color-primary);
`;

const Description = styled.p`
  font-size: 18px;
  color: var(--color-grey-600);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

function Gallery() {
  const { isLoading, cabinPhotos = {} } = useCabinPhotos();
  if (isLoading) return <Spinner />;

  return (
    <>
      <HotelDescription>
        <Title>Explore Our Cabins</Title>
        <Description>
          Discover the cozy and luxurious cabins at our hotel. Each cabin is
          designed to provide comfort and a memorable stay.
        </Description>
      </HotelDescription>
      <GalleryContainer>
        {cabinPhotos.map((photo, index) => (
          <ImageWrapper key={index}>
            <Image src={photo} alt={`Cabin ${index}`} />
          </ImageWrapper>
        ))}
      </GalleryContainer>
    </>
  );
}

export default Gallery;
