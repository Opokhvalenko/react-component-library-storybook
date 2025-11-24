import { AnimatePresence, motion } from "framer-motion";
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

interface SidebarListProps {
  items: SidebarMenuItem[];
  openItemIds: string[];
  onToggle: (id: string) => void;
}

function SidebarList({ items, openItemIds, onToggle }: SidebarListProps) {
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
            <button
              type="button"
              className="sidebar-item-button"
              onClick={handleClick}
            >
              <span className="sidebar-item-label">{item.label}</span>

              {hasChildren && (
                <span
                  className={`sidebar-chevron${
                    isOpen ? " sidebar-chevron--open" : ""
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? "▾" : "▸"}
                </span>
              )}
            </button>

            {hasChildren && isOpen && item.children && (
              <SidebarList
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

/**
 * SidebarMenu:
 * - slides in from the right
 * - renders nested items (accordion-style)
 * - closes when backdrop or close button are clicked
 */
export default function SidebarMenu({
  isOpen,
  onClose,
  items,
  title = "Menu",
}: SidebarMenuProps) {
  const [openItemIds, setOpenItemIds] = useState<string[]>([]);

  const handleToggleItem = (id: string) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id],
    );
  };

  const handleClose = () => {
    setOpenItemIds([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="sidebar-overlay"
          aria-modal="true"
          role="dialog"
          aria-label={title}
        >
          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close sidebar"
            onClick={handleClose}
          />

          <motion.aside
            className="sidebar-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="sidebar-header">
              <h2 className="sidebar-title">{title}</h2>

              <button
                type="button"
                className="sidebar-close"
                aria-label="Close sidebar"
                onClick={handleClose}
              >
                ×
              </button>
            </div>

            <nav className="sidebar-nav" aria-label={title}>
              <SidebarList
                items={items}
                openItemIds={openItemIds}
                onToggle={handleToggleItem}
              />
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}