import type { SidebarMenuItem } from "./SidebarMenu.types";

interface SidebarMenuListProps {
  items: SidebarMenuItem[];
  openItemIds: string[];
  onToggle: (id: string) => void;
}

/**
 * Renders a nested, accordion-style list of sidebar items.
 * Responsible only for the tree structure and item clicks.
 */
export function SidebarMenuList({ items, openItemIds, onToggle }: SidebarMenuListProps) {
  return (
    <ul className="sidebar-list">
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openItemIds.includes(item.id);

        const handleClick = () => {
          if (hasChildren) {
            onToggle(item.id);
          } else if (item.onClick) {
            item.onClick();
          }
        };

        return (
          <li key={item.id} className="sidebar-item">
            <button type="button" className="sidebar-item-button" onClick={handleClick}>
              <span className="sidebar-item-label">{item.label}</span>

              {hasChildren && (
                <span
                  className={`sidebar-chevron${isOpen ? " sidebar-chevron--open" : ""}`}
                  aria-hidden="true"
                >
                  {isOpen ? "▾" : "▸"}
                </span>
              )}
            </button>

            {hasChildren && isOpen && item.children && (
              <SidebarMenuList
                items={item.children}
                openItemIds={openItemIds}
                onToggle={onToggle}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
