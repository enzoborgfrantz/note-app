export enum Category {
  Link = "link",
  Recipe = "recipe",
  ActionItem = "action-item",
  Reminder = "reminder",
  Other = "other",
}

export interface MemoryType {
  id: string;
  dateCreated: number;
  lastEdited: number;
  value: string;
  note: string; // notes help you search for something later on
  category: Category;
}
