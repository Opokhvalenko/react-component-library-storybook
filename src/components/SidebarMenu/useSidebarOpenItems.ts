import { useCallback, useState } from "react";

/**
 * Small stateful hook that owns only the
 * "which sidebar items are open?" responsibility.
 */
export function useSidebarOpenItems() {
  const [openItemIds, setOpenItemIds] = useState<string[]>([]);

  const toggleItem = useCallback((id: string) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id],
    );
  }, []);

  const reset = useCallback(() => {
    setOpenItemIds([]);
  }, []);

  return { openItemIds, toggleItem, reset };
}
