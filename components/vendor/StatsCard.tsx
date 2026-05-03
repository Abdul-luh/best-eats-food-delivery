import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "brand" | "emerald" | "blue" | "amber";
}

export function StatsCard({ title, value, icon: Icon, trend, color = "brand" }: StatsCardProps) {
  const colorClasses = {
    brand: "text-brand-600 bg-brand-500/10",
    emerald: "text-emerald-500 bg-emerald-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    amber: "text-amber-500 bg-amber-500/10",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
            <h3 className="text-3xl font-black">{value}</h3>
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold mt-2",
                trend.isPositive ? "text-emerald-500" : "text-red-500"
              )}>
                {trend.isPositive ? "+" : "-"}{trend.value}%
                <span className="text-muted-foreground font-medium">from last week</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-2xl", colorClasses[color])}>
            <Icon size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
