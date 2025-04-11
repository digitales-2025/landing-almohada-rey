import { ReactNode } from "react";

// These tags are available
type Tag = "p" | "b" | "i";

type Props = {
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode;
};

export default function RichText({ children }: Props) {
  return (
    <div className="text-pretty">
      {children({
        p: (chunks: ReactNode) => <p>{chunks}</p>,
        b: (chunks: ReactNode) => <span className="font-semibold">{chunks}</span>,
        i: (chunks: ReactNode) => <span className="italic">{chunks}</span>,
      })}
    </div>
  );
}
