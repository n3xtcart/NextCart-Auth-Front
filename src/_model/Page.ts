export interface Page<T> {
  content: T[];
  totalElements: number; // Total number of elements in the entire dataset
  totalPages: number; // Total number of pages
  size: number; // Number of elements per page
}
