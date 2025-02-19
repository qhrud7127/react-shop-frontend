import React from 'react';
import Slider, { type Settings } from 'react-slick';

import Box from "@mui/material/Box";

import { SampleImage } from '../sample/sample-image';

type Props = {
  settings: Settings;
};
export const MultiCarousel = ({ settings }: Props) => (
  /*
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  */
  <Box className="slider-container" sx={{marginBottom:'30px'}}>
    <Slider {...settings}>
      <div>
        <SampleImage shape="vertical" width={400} height={500} />
      </div>
      <div>
        <SampleImage shape="vertical" width={400} height={500} />
      </div>
    </Slider>
  </Box>
);
