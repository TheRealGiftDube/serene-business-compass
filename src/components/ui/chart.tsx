
import React from 'react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

interface BarChartProps {
  categories: string[];
  seriesData: {
    name: string;
    data: number[];
  }[];
}

export const BarChart = ({ categories, seriesData }: BarChartProps) => {
  // Transform the data for Recharts
  const data = categories.map((category, index) => {
    const dataPoint: Record<string, any> = { name: category };
    seriesData.forEach((series) => {
      dataPoint[series.name] = series.data[index];
    });
    return dataPoint;
  });

  const colors = ['#3b82f6', '#6366f1', '#8b5cf6'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            border: 'none'
          }} 
        />
        {seriesData.map((series, i) => (
          <Bar
            key={series.name}
            dataKey={series.name}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface PieChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export const PieChart = ({ data }: PieChartProps) => {
  const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            border: 'none'
          }} 
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
