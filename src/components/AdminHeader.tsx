import { Button } from "@/components/ui/button";
import { BarChart3, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-admin-surface/95 backdrop-blur supports-[backdrop-filter]:bg-admin-surface/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <div className="h-4 w-4 rounded-sm bg-white"></div>
            </div>
            <h1 className="text-lg font-semibold text-foreground">إدارة الروابط</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button 
                variant="admin-ghost" 
                size="sm"
                className="hidden sm:flex"
              >
                عرض الموقع
              </Button>
            </Link>
            <Link to="/analytics">
              <Button 
                variant="admin-outline" 
                size="sm"
                className="hidden sm:flex"
              >
                <BarChart3 className="h-4 w-4" />
                التحليلات
              </Button>
            </Link>
            <Button variant="admin-ghost" size="icon" className="sm:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;