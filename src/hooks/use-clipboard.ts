import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function useClipboard() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyText = async (textToCopy: string) => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast({
        description: "Poll Link copied to clipboard",
      });
      const copyTimeout = setTimeout(() => {
        setCopied(false);
        clearTimeout(copyTimeout);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return { copyText, copied };
}
