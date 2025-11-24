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
