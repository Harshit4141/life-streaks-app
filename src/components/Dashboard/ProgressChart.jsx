import React from 'react';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const ProgressChart = ({ data, title, type = 'line' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="fw-bold mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="mb-0" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <Card.Title className="fw-bold mb-4">{title}</Card.Title>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            {type === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6c757d' }}
                  axisLine={{ stroke: '#dee2e6' }}
                />
                <YAxis 
                  tick={{ fill: '#6c757d' }}
                  axisLine={{ stroke: '#dee2e6' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="streaks" 
                  stroke="#4CAF50" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="goals" 
                  stroke="#2196F3" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            ) : (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6c757d' }}
                  axisLine={{ stroke: '#dee2e6' }}
                />
                <YAxis 
                  tick={{ fill: '#6c757d' }}
                  axisLine={{ stroke: '#dee2e6' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FF9800" 
                  fill="#FF9800"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <div className="d-flex align-items-center me-4">
            <div className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
            <small className="text-muted">Current Streaks</small>
          </div>
          <div className="d-flex align-items-center">
            <div className="bg-primary rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
            <small className="text-muted">Goals</small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProgressChart;