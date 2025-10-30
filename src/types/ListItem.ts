export interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  dateCreated: Date;
}

export interface ListItemFormData {
  title: string;
  subtitle: string;
}