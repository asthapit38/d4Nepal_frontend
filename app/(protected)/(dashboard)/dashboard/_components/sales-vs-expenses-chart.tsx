"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        expenses: 4000,
        sales: 2400,
        amt: 2400,
    },
    {
        name: 'Feb',
        expenses: 3000,
        sales: 1398,
        amt: 2210,
    },
    {
        name: 'March',
        expenses: 2000,
        sales: 9800,
        amt: 2290,
    },
    {
        name: 'April',
        expenses: 2780,
        sales: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        expenses: 1890,
        sales: 4800,
        amt: 2181,
    },
    {
        name: 'June',
        expenses: 2390,
        sales: 3800,
        amt: 2500,
    },
    {
        name: 'July',
        expenses: 3490,
        sales: 4300,
        amt: 2100,
    },
];

export function SalesVsExpensesChart() {
    return (
        <>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                    <XAxis dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}