import React from 'react';
import Slider, { type Settings } from 'react-slick';

import Box from "@mui/material/Box";

import { SampleImage } from '../sample/sample-image';

type Props = {
  settings: Settings;
};
export const SingleCarousel = ({ settings }: Props) => (
  <Box className="slider-container" sx={{marginBottom:'30px'}}>
    <Slider {...settings}>
      <div>
        <SampleImage shape="horizontal" />
      </div>
      <div>
        <SampleImage shape="horizontal" />
      </div>
    </Slider>
  </Box>
);
