import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Time = ({ when }: { when: Date }) => {
  const publishedAtFormatted = format(when, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
  const publishedAtRelativeToNow = formatDistanceToNow(when, { locale: ptBR, addSuffix: true });

  return (
    <time
      title={publishedAtFormatted}
      dateTime={when.toISOString()}
    >
      {publishedAtRelativeToNow}
    </time>
  )
}