"use client";

import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/vendor/StatsCard";
import { cn } from "@/lib/utils/cn";

const data = [
  { name: "Jan", revenue: 4000, orders: 240 },
  { name: "Feb", revenue: 3000, orders: 198 },
  { name: "Mar", revenue: 5000, orders: 305 },
  { name: "Apr", revenue: 2780, orders: 189 },
  { name: "May", revenue: 1890, orders: 120 },
  { name: "Jun", revenue: 2390, orders: 167 },
  { name: "Jul", revenue: 3490, orders: 210 },
];

const categoryData = [
  { name: "Burgers", value: 400, color: "#f97316" },
  { name: "Pizza", value: 300, color: "#ef4444" },
  { name: "Sushi", value: 300, color: "#3b82f6" },
  { name: "Salads", value: 200, color: "#10b981" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-black mb-2">Platform Overview</h1>
        <p className="text-muted-foreground">Real-time performance metrics across all vendors</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total GMV" 
          value="$124,592" 
          icon={DollarSign} 
          trend={{ value: 8.2, isPositive: true }}
          color="brand"
        />
        <StatsCard 
          title="Active Users" 
          value="12.4k" 
          icon={Users} 
          trend={{ value: 15, isPositive: true }}
          color="blue"
        />
        <StatsCard 
          title="Orders Today" 
          value="1,240" 
          icon={ShoppingBag} 
          trend={{ value: 2.4, isPositive: false }}
          color="emerald"
        />
        <StatsCard 
          title="Security Flags" 
          value="3" 
          icon={ShieldAlert} 
          color="amber"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black">Revenue Growth</CardTitle>
              <p className="text-xs text-muted-foreground">Monthly platform revenue comparison</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg h-8">Weekly</Button>
              <Button variant="secondary" size="sm" className="rounded-lg h-8">Monthly</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "#64748b"}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "#64748b"}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Share */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-black">Order Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{Math.round((item.value / 1200) * 100)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Latest Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-black">Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { type: "VENDOR_SIGNUP", text: "New vendor application: 'The Sushi Garden'", time: "2 min ago", status: "PENDING" },
                { type: "LARGE_ORDER", text: "High-value order detected: $254.80 by User #9283", time: "15 min ago", status: "MONITORING" },
                { type: "PAYOUT_COMPLETED", text: "Payout of $4,200.00 processed for 'Burger King'", time: "1 hour ago", status: "SUCCESS" },
                { type: "SUPPORT_TICKET", text: "New urgent ticket: 'Delivery delayed for 2 hours'", time: "3 hours ago", status: "URGENT" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={cn(
                    "w-2 h-2 mt-2 rounded-full",
                    activity.status === "URGENT" ? "bg-red-500" :
                    activity.status === "SUCCESS" ? "bg-emerald-500" : "bg-blue-500"
                  )} />
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-tight">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{activity.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-black">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>API Response Time</span>
                <span className="text-emerald-500">99.9% Up</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[99.9%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Delivery ETA Accuracy</span>
                <span className="text-blue-500">94.2%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[94.2%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Fraud Detection Rate</span>
                <span className="text-brand-600">98.5%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-brand-600 w-[98.5%]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
