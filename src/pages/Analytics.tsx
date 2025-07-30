import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, MousePointer, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-admin-bg" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="admin-ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة إلى لوحة التحكم
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">التحليلات</h1>
          <p className="text-muted-foreground mt-2">تتبع أداء روابطك ومعرفة إحصائيات المشاهدات</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المشاهدات</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231</div>
              <p className="text-xs text-muted-foreground">
                +20.1% من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">النقرات</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">معدل النقر</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2%</div>
              <p className="text-xs text-muted-foreground">
                +19% من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الزوار الفريدون</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">
                +201 من الشهر الماضي
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>المشاهدات خلال الشهر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-admin-surface rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">سيتم عرض الرسم البياني هنا</p>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Links */}
        <Card>
          <CardHeader>
            <CardTitle>أفضل الروابط أداءً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "مشروع تطبيق الطعام", clicks: 1240, views: 8500 },
                { title: "موقع التجارة الإلكترونية", clicks: 856, views: 6200 },
                { title: "تطبيق إدارة المهام", clicks: 654, views: 4100 },
              ].map((link, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-admin-surface rounded-lg">
                  <div className="text-right">
                    <h3 className="font-medium">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {link.views.toLocaleString()} مشاهدة • {link.clicks.toLocaleString()} نقرة
                    </p>
                  </div>
                  <div className="text-left">
                    <span className="text-lg font-bold text-primary">
                      {((link.clicks / link.views) * 100).toFixed(1)}%
                    </span>
                    <p className="text-xs text-muted-foreground">معدل النقر</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;