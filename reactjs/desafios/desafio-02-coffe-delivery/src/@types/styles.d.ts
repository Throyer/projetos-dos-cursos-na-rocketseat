/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import styled from "styled-components";

import { defaultTheme } from "../styles/themes/default";

type ThemeTypes = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTypes {}
}