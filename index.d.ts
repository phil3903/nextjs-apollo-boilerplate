declare module 'bad-words' {
  
}

declare module 'next-page-transitions' {
  interface PageTransitionProps {
    timeout?: number,
    classNames?: string,
    children?: any
  }
  declare class PageTransition extends React.Component<PageTransitionProps, any> {}
}