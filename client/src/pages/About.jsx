import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";

const AboutContainer = styled.div`
  padding: 3rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-900);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Georgia, "Times New Roman", Times, serif;
  position: relative;
  border: 2px solid #d4a373;
  border-radius: 15px;
  margin: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 20px;
    background: #d4a373;
    left: 0;
  }

  &:before {
    top: -20px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  &:after {
    bottom: -20px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--color-secondary);
`;

const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  text-align: center; /* Center text */
`;

const List = styled.ul`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  text-align: center; /* Center text */
`;

const Logo = styled.img`
  width: 250px;
  height: auto;
  margin-bottom: 2rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export default function About() {
  const { isDarkMode } = useDarkMode();
  const src = !isDarkMode ? "2.jpg" : "/5.jpeg";

  return (
    <AboutContainer>
      <Logo src={src} alt="Hotel Havenly Logo" />
      <Title>About Us🏨</Title>
      <Text>
        Welcome to The Hotel Havenly, your perfect retreat for relaxation and
        comfort. Nestled in a serene environment, our hotel offers a unique
        blend of luxury and homeliness. At The Hotel Havenly, we strive to
        provide an unforgettable experience for all our guests.
      </Text>
      <SectionTitle>Our Cabins 🛏️</SectionTitle>
      <Text>
        Our hotel features beautifully designed cabins that cater to all your
        needs. Whether you are here for a romantic getaway, a family vacation,
        or a solo adventure, we have the perfect cabin for you. Each cabin is
        equipped with modern amenities to ensure your stay is as comfortable as
        possible.
      </Text>
      <SectionTitle>Guest Registration 📝</SectionTitle>
      <Text>
        At The Hotel Havenly, we believe in making your stay hassle-free from
        the moment you step in. Our streamlined guest registration process
        ensures that you can quickly settle in and start enjoying your vacation.
        Our friendly staff is always ready to assist you with any special
        requests or needs you might have during your stay.
      </Text>
      <SectionTitle>Breakfast🍽️</SectionTitle>
      <Text>
        Start your day right with our delicious breakfast offerings, available
        on a pay-as-you-go basis. We offer a variety of breakfast options to
        suit all tastes, ensuring you have the energy to make the most of your
        day. From fresh pastries to hearty hot meals, our breakfast menu is
        designed to delight.
      </Text>
      <SectionTitle>Why Choose The Hotel Havenly🌟?</SectionTitle>
      <List>
        <ListItem>Comfortable and well-equipped cabins 🏠</ListItem>
        <ListItem>Efficient and friendly guest registration 😊</ListItem>
        <ListItem>
          Delicious breakfast options available for purchase 🍳
        </ListItem>
        <ListItem>Serene and relaxing environment 🌳</ListItem>
        <ListItem>Exceptional customer service 🏆</ListItem>
      </List>
      <Text>
        At The Hotel Havenly, your satisfaction is our priority. We are
        committed to providing a memorable stay for each of our guests. Whether
        you are here for a short visit or an extended stay, we look forward to
        welcoming you and making your time with us truly special.
      </Text>
      <Text>
        Thank you for choosing 🌟 The Hotel Havenly 🌟. We cannot wait to host
        you!
      </Text>
    </AboutContainer>
  );
}
