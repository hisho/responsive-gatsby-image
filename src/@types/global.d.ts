interface CSSModule {
  [className: string]: string;
}

declare module '*.module.css' {
  const cssModule: CSSModule;
  export = cssModule;
}

declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.jpe?g' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}

import { variablesInterface } from 'types/variables';

declare module 'src/data/variables.json' {
  const value: variablesInterface;
  export = value;
}
