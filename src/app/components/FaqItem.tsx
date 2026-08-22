import { useId} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqItem({ q, a, isOpen, onToggle }: FaqItemProps) {
  const panelId = `faq-panel-${useId()}`;

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        {isOpen ? <ChevronUp size={16} className="text-accent flex-shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />}
      </button>
      <div id={panelId} hidden={!isOpen} className="pb-5">
        <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}
