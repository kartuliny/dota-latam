import { ref } from "vue";
import { RechargeTableItem } from "../../domain/models/table/RechargeTableItem";
import { TablePagination } from "@/modules/shared/domain/table/RechargePagination";
import { TableColumn } from "@/modules/shared/domain/table/TableColumn";

const PAGE = 1;
const PAGE_SIZE = 5;
const defaultPagination: TablePagination = { currentPage: PAGE, pageSize: PAGE_SIZE, totalElements: 0 };

export class RechargeTable {
    public data = ref<RechargeTableItem[]>([]);
    public pagination = ref<TablePagination>();
    public columns = ref<TableColumn[]>([]);

    constructor(data: RechargeTableItem[], columns: TableColumn[], pagination: TablePagination) {
        this.data.value = data;
        this.columns.value = columns;
        this.pagination.value = pagination;
    }

    public static createEmpty(): RechargeTable {
        return new RechargeTable([], getColumns(), defaultPagination);
    }

    public setColumns(columns: TableColumn[]): void {
        this.columns.value = columns;
    }

    public setPagination(pagination: TablePagination): void {
        this.pagination.value = pagination;
    }

    public setData(data: RechargeTableItem[]): void {
        this.data.value = data;
    }

    public getColumns(): TableColumn[] {
        return this.columns.value;
    }

    public getActiveColumns(): TableColumn[] {
        return this.columns.value.filter(column => column.active);
    }

    public getPagination(): TablePagination {
        if (!this.pagination.value) return defaultPagination;
        return this.pagination.value;
    }

    public getPaginationPage(): number {
        if (!this.pagination.value) return 0;
        return this.pagination.value.currentPage;
    }

    public getPaginationPageSize(): number {
        if (!this.pagination.value) return 0;
        return this.pagination.value.pageSize;
    }

    public showPagination(): boolean {
        return !!this.getPaginationTotalPages() && !(this.getPaginationPage() == 0 && this.getPaginationTotalCount() <= this.getPaginationPageSize())
    }

    public getPaginationTotalPages(): number {
        if (!this.pagination.value) return 0;
        return Math.ceil(this.getPaginationTotalCount() / this.getPaginationPageSize());
    }

    public getPaginationTotalCount(): number {
        if (!this.pagination.value) return 0;
        return this.pagination.value.totalElements!;
    }

    public setPaginationPage(page: number): void {
        if (!this.pagination.value) return;
        this.pagination.value.currentPage = page;
    }

    public getData(): RechargeTableItem[] {
        return this.data.value;
    }
}

function getColumns(): TableColumn[] {
    return [
        { label: 'Método de pago', value: 'paymentMethods', active: true },
        { label: 'Monto', value: 'amount', active: true },
        { label: 'Estado', value: 'status', active: true },
        { label: 'Fecha', value: 'date', active: true },
    ]
}