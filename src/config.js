import React, { Component } from 'react';
import { PixelRatio, Dimensions } from 'react-native';
const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
let temp='';
  if (pixelRatio === 2) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      temp = 13 * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      temp = 13;
      // iphone 6-6s
    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
      temp = 13 * 1.15;
    }
    // older phablets
    temp = 13 * 1.25;
  }
  if (pixelRatio === 3) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      temp = 13;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      temp = 13 * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      temp = 13 * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    temp = 13 * 1.27;
  }
  if (pixelRatio === 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      temp = 13;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      temp = 13 * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      temp = 13 * 1.25;
    }
    // catch larger phablet devices
    temp = 13 * 1.4;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5
  temp = 13;
export const normalize =temp;
// export const URL_HOME = 'https:pa.glviews.com';
export const URL_HOME = 'https:pa.glviews.com';