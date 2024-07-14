export const createStyles = (cssModule: any) => {
  return (className: string): string => {
    return cssModule[className];
  }
}