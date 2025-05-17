import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
export default function BarChartComponent() {
    const barChartData = [
        {
            name: "Finance",
            invested: 200000,
            current: 240000, // green
        },
        {
            name: "Auto",
            invested: 180000,
            current: 160000, // red
        },
        {
            name: "IT",
            invested: 220000,
            current: 250000, // green
        },
        {
            name: "FMCG",
            invested: 150000,
            current: 150000, // same (neutral)
        },
        {
            name: "Telecom",
            invested: 170000,
            current: 165000, // red
        },
    ];

    return (
        <div className="flex flex-col gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm max-w-full w-full sm:w-[90vw] md:w-[600px] lg:w-[700px] mx-auto">
            <h1 className="text-gray-900 font-semibold text-xl sm:text-2xl md:text-3xl">
                Invested Value by Sector
            </h1>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={barChartData}
                    barGap={5}
                    barCategoryGap="30%"
                    margin={{ right: 20, left: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                    <XAxis
                        dataKey="name"
                        fontFamily="poppins"
                        fontSize={14}
                        fontWeight={400}
                        fill="#667085"
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        domain={[0, 'dataMax']}
                        fontFamily="poppins"
                        fontSize={14}
                        fontWeight={400}
                        fill="#667085"
                    />
                    <Tooltip
                        cursor={false}
                        isAnimationActive={true}
                        content={({ active, payload, label }) => {
                            if (!active || !payload || payload.length === 0) return null;

                            const invested = Number(payload.find(p => p.dataKey === 'invested')?.value) || 0;
                            const current = Number(payload.find(p => p.dataKey === 'current')?.value) || 0;
                            const gainLoss = Math.abs(current - invested);
                            const gainLossColor = current >= invested ? "#17B26A" : "#F04438";

                            return (
                                <div style={{ backgroundColor: 'white', padding: 10, border: '1px solid #ccc' }}>
                                    <p style={{ marginBottom: 8, fontWeight: 'bold' }}>{label}</p>
                                    <p style={{ color: '#9012FF' }}>
                                        Invested: ₹{invested.toLocaleString("en-IN")}
                                    </p>
                                    <p style={{ color: gainLossColor }}>
                                        Current: ₹{current.toLocaleString("en-IN")}
                                    </p>
                                    <p style={{ color: gainLossColor }}>
                                        Gain/Loss: ₹{gainLoss.toLocaleString("en-IN")}
                                    </p>
                                </div>
                            );
                        }}
                    />
                    <Legend wrapperStyle={{ display: 'none' }} />
                    <Bar dataKey="invested" name="Invested" fill="#9012FF" barSize={20} />
                    <Bar
                        dataKey="current"
                        name="Current Value"
                        barSize={20}
                        fill="#ccc"
                        shape={(props: any) => {
                            const { x, y, width, height, payload } = props;
                            const fill = payload.current >= payload.invested ? "#17B26A" : "#F04438";
                            return <rect x={x} y={y} width={width} height={height} fill={fill} />;
                        }}
                    />
                    <Bar
                        dataKey={(entry) => Math.abs(entry.current - entry.invested)}
                        name="Gain/Loss"
                        barSize={20}
                        fill="#ccc"
                        shape={(props: any) => {
                            const { x, y, width, height, payload } = props;
                            const fill = payload.current >= payload.invested ? "#17B26A" : "#F04438";
                            return <rect x={x} y={y} width={width} height={height} fill={fill} />;
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}