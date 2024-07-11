import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import styled from "styled-components";
import { useCabinPhotos } from "../features/cabins/useCabinPhotos";
import Spinner from "../ui/Spinner";

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

const SlideContainer = styled.div`
  .slide-container {
    width: 100%;
    height: 100%;
  }
`;

const SlideImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  height: 70vh; /* Use viewport height for responsiveness */
`;

function Gallery() {
  const { isLoading, cabinPhotos = [] } = useCabinPhotos();
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
      <SlideContainer>
        <Slide>
          {cabinPhotos.map((slideImage, index) => (
            <SlideImageWrapper key={index} style={{ backgroundImage: `url(${slideImage})` }}>
              <div style={{ height: '100%', width: '100%' }}></div>
            </SlideImageWrapper>
          ))}
        </Slide>
      </SlideContainer>
    </>
  );
}

export default Gallery;
