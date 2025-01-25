export interface DebugProps<T> {
  content: T;
}

export const Debug = <T,>({ content }: DebugProps<T>) => {
  return (
    <pre>
      {JSON.stringify(content, undefined, 2)}
    </pre>
  )
}
