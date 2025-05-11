export interface IOptionsRow {
  label: string;
  onClick: (row: T) => void;
  hidden?: boolean;
}
