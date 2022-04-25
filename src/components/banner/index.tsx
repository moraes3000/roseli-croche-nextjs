
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Banner() {
  return (
    <>
      <Carousel autoPlay={true} width={960} interval={2000} thumbWidth={100} >
        <div>
          <img src="img/casamento1-1.jpg" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src="img/casamento2.jpg" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src="img/casamento3.jpg" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </>
  )
}