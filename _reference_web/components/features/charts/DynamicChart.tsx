// Dynamic Chart Component - Renders different chart types based on configuration

import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { ChartConfig, SalesData } from '@/lib/game/types';

interface DynamicChartProps {
  config: ChartConfig | null;
  data: SalesData[];
}

export const DynamicChart: React.FC<DynamicChartProps> = ({ config, data }) => {
  if (!config) return null;

  // Apple-esque chart colors
  const colors = config.colors || ['#007AFF', '#34C759', '#FF9500', '#AF52DE'];

  const renderChart = () => {
    switch (config.chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
            <XAxis
              dataKey="label"
              label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }}
              stroke="var(--muted-foreground)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: 'var(--foreground)'
              }}
            />
            {config.showLegend && <Legend />}
            <Bar
              dataKey="sales"
              fill={colors[0]}
              radius={[8, 8, 0, 0]}
              label={config.showValues ? { position: 'top', fill: 'var(--foreground)' } : false}
            />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
            <XAxis
              dataKey="label"
              label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }}
              stroke="var(--muted-foreground)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: 'var(--foreground)'
              }}
            />
            {config.showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey="sales"
              stroke={colors[0]}
              strokeWidth={3}
              dot={{ fill: colors[0], r: 5, strokeWidth: 2, stroke: 'var(--background)' }}
              activeDot={{ r: 7 }}
              label={config.showValues ? { position: 'top', fill: 'var(--foreground)' } : false}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
            <XAxis
              dataKey="label"
              label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }}
              stroke="var(--muted-foreground)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: 'var(--foreground)'
              }}
            />
            {config.showLegend && <Legend />}
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="sales"
              stroke={colors[0]}
              fill="url(#colorSales)"
              strokeWidth={2}
              label={config.showValues ? { position: 'top', fill: 'var(--foreground)' } : false}
            />
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey="sales"
              nameKey="quarter"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={config.showValues}
              strokeWidth={2}
              stroke="var(--background)"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: 'var(--foreground)'
              }}
            />
            {config.showLegend && <Legend />}
          </PieChart>
        );

      default:
        return <p className="text-muted-foreground">Unknown chart type</p>;
    }
  };

  return (
    <div className="bg-secondary border border-primary/30 rounded-2xl p-6 mb-6 shadow-lg shadow-primary/10">
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
      {config.interpretation && (
        <div className="mt-6 bg-background border border-primary/30 p-4 rounded-xl">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">AI's interpretation: </span>
            {config.interpretation}
          </p>
        </div>
      )}
    </div>
  );
};
