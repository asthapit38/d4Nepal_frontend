export type Plan = {
    id: number;
    name: string;
    price: number;
    business_per_account?: number;
    kpi: number;
    visual_graph: number;
}

export type Subscription = {
    plan_details: Plan;
    start_date: string;
    end_date: string;
    status: string;
    id: number;
}

export type BusinessType = {
    id: number;
    name: string;
    description?: string;
}

export type BusinessTypeWithKpi = BusinessType & {
    kpi: {
        id: number;
        name: string;
    }[]
}

export type User = {
    id: string;
    username: string;
    email: string;
    access: string;
}

export type Kpi = {
    id: string;
    name: string;
}