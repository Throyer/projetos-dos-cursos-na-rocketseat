import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const Time = ({ when }) => {
  const publishedAt = new Date(when);
  const publishedAtFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
  const publishedAtRelativeToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true });

  return (
    <time
      title={publishedAtFormatted}
      dateTime={publishedAt.toISOString()}
    >
      {publishedAtRelativeToNow}
    </time>
  )
}