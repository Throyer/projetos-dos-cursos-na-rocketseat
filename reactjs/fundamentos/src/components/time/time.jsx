import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const Time = ({ when }) => {
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