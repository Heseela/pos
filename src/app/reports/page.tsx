'use client';

import { useState } from 'react';
import ReportGenerator from '@/components/reports/ReportGenerator';
import { mockReports } from '@/lib/mockData';
import { BarChart3, TrendingUp, Download, Calendar, Filter } from 'lucide-react';

export default function ReportsPage() {
  const [reports] = useState(mockReports);
  const [reportType, setReportType] = useState('daily');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');

  const reportStats = {
    totalSales: 156800,
    totalPurchases: 98700,
    totalExpenses: 34200,
    netProfit: 23900,
    growth: 12.5,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and analyze business performance reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-semibold mb-4 md:mb-0">Report Generator</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-gray-500" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-1 border rounded text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-gray-500" />
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm flex items-center gap-2">
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            <ReportGenerator />
          </div>

          <div className="bg-white rounded-lg border p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report</div>
                    <div className="text-sm text-gray-500">Period: {report.period}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${report.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      RS.{report.netProfit.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button className="p-2 text-gray-500 hover:text-primary">
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 size={20} />
              Summary
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600">Total Sales</div>
                <div className="text-2xl font-bold">RS.{reportStats.totalSales.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-red-600">Total Purchases</div>
                <div className="text-2xl font-bold">RS.{reportStats.totalPurchases.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-sm text-yellow-600">Total Expenses</div>
                <div className="text-2xl font-bold">RS.{reportStats.totalExpenses.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-600">Net Profit</div>
                <div className="text-2xl font-bold">RS.{reportStats.netProfit.toLocaleString()}</div>
                <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp size={16} />
                  {reportStats.growth}% growth
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Reports</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 border rounded-lg hover:bg-gray-50 text-left">
                Sales Report
              </button>
              <button className="w-full px-4 py-3 border rounded-lg hover:bg-gray-50 text-left">
                Inventory Report
              </button>
              <button className="w-full px-4 py-3 border rounded-lg hover:bg-gray-50 text-left">
                Customer Report
              </button>
              <button className="w-full px-4 py-3 border rounded-lg hover:bg-gray-50 text-left">
                Financial Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}