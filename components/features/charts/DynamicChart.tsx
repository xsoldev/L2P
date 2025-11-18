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

  const colors = config.colors || ['#70BEFA', '#5AAFED', '#8CCFFD', '#4A9FE0'];

  const renderChart = () => {
    switch (config.chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />}
            <XAxis
              dataKey="label"
              label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }}
              stroke="#9CA3AF"
            />
            <YAxis
              label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }}
              stroke="#9CA3AF"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #70BEFA',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            {config.showLegend && <Legend />}
            <Bar
              dataKey="sales"
              fill={colors[0]}
              radius={[8, 8, 0, 0]}
              label={config.showValues ? { position: 'top', fill: '#E5E7EB' } : false}
            />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />}
            <XAxis
              dataKey="label"
              label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }}
              stroke="#9CA3AF"
            />
            <YAxis
              label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }}
              stroke="#9CA3AF"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #70BEFA',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            {config.showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey="sales"
              stroke={colors[0]}
              strokeWidth={3}
              dot={{ fill: colors[0], r: 5, strokeWidth: 2, stroke: '#1A1A1A' }}
              activeDot={{ r: 7 }}
              label={config.showValues ? { position: 'top', fill: '#E5E7EB' } : false}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />}
            <XAxis
              dataKey="label"
              label={{ value: config.xAxisLabel, position: 'insideBottom', offset: -5 }}
              stroke="#9CA3AF"
            />
            <YAxis
              label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }}
              stroke="#9CA3AF"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #70BEFA',
                borderRadius: '8px',
                color: '#F9FAFB'
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
              label={config.showValues ? { position: 'top', fill: '#E5E7EB' } : false}
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
              stroke="#1A1A1A"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #70BEFA',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            {config.showLegend && <Legend />}
          </PieChart>
        );

      default:
        return <p className="text-gray-400">Unknown chart type</p>;
    }
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#70BEFA]/30 rounded-2xl p-6 mb-6 shadow-lg shadow-[#70BEFA]/10">
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
      {config.interpretation && (
        <div className="mt-6 bg-[#0D0D0D] border border-[#70BEFA]/30 p-4 rounded-xl">
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-[#70BEFA]">AI's interpretation: </span>
            {config.interpretation}
          </p>
        </div>
      )}
    </div>
  );
};
