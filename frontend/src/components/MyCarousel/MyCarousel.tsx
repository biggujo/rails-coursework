import { ReactElement } from 'react';
import Carousel from 'react-material-ui-carousel';

interface Props {
  children: Array<ReactElement>;
}

export default function MyCarousel({ children }: Props) {
  return (
    <Carousel
      autoPlay={false}
      navButtonsAlwaysVisible={true}
      animation={'slide'}
      duration={200}
      fullHeightHover={false}
      sx={{
        width: '100%',
      }}
    >
      {children}
    </Carousel>
  );
}
