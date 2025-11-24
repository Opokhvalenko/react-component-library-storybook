import { useState } from "react";
import "./SidebarMenu.css";

export interface SidebarMenuItem {
  id: string;
  label: string;
  children?: SidebarMenuItem[];
  onClick?: () => void;
}

export interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarMenuItem[];
  title?: string;
}

/**
 * SidebarMenu:
 * - slides in from the right
 * - supports nested items (accordion style)
 * - closes on background click
 */
const SidebarMenu = ({ isOpen, onClose, items, title = "Menu" }: SidebarMenuProps) => {
  const [openItemIds, setOpenItemIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <aside className="sidebar-panel" onClick={(event) => event.stopPropagation()}>
        <header className="sidebar-header">
          <h2 className="sidebar-title">{title}</h2>
          <button type="button" className="sidebar-close" aria-label="Close menu" onClick={onClose}>
            ×
          </button>
        </header>

        <nav className="sidebar-nav">
          <SidebarList items={items} openItemIds={openItemIds} onToggle={toggleItem} />
        </nav>
      </aside>
    </div>
  );
};

interface SidebarListProps {
  items: SidebarMenuItem[];
  openItemIds: string[];
  onToggle: (id: string) => void;
}

const SidebarList = ({ items, openItemIds, onToggle }: SidebarListProps) => {
  return (
    <ul className="sidebar-list">
      {items.map((item) => {
        const hasChildren = !!item.children?.length;
        const isOpen = openItemIds.includes(item.id);

        return (
          <li key={item.id} className="sidebar-item">
            <button
              type="button"
              className="sidebar-item-button"
              onClick={() => {
                if (hasChildren) {
                  onToggle(item.id);
                }
                if (item.onClick) {
                  item.onClick();
                }
              }}
            >
              <span>{item.label}</span>
              {hasChildren && (
                <span
                  className={`sidebar-chevron ${isOpen ? "sidebar-chevron--open" : ""}`}
                  aria-hidden="true"
                >
                  ▸
                </span>
              )}
            </button>

            {hasChildren && isOpen && (
              <SidebarList items={item.children!} openItemIds={openItemIds} onToggle={onToggle} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarMenu;
