import { PaginationTableType } from "@/sections/shared/look/Pagination/Pagination.type";

export class TablePagination implements PaginationTableType {
    currentPage: number = 0;
    pageSizeDefault?: number | undefined;
    totalElements?: number = 0;
    pageSize: number = 20;
}