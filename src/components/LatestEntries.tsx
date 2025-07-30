import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Edit, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - in a real app, this would come from your backend
const mockEntries = [
  {
    id: 1,
    title: "مشروع تطبيق الطعام",
    url: "https://foodapp.example.com",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=400&fit=crop",
    tags: ["تطبيق", "طعام", "موبايل"],
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "موقع التجارة الإلكترونية",
    url: "https://shop.example.com",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=400&fit=crop",
    tags: ["تجارة", "ويب", "متجر"],
    createdAt: "2024-01-14"
  },
  {
    id: 3,
    title: "تطبيق إدارة المهام",
    url: "https://tasks.example.com",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=400&fit=crop",
    tags: ["إنتاجية", "مهام", "تنظيم"],
    createdAt: "2024-01-13"
  },
  {
    id: 4,
    title: "منصة التعلم الإلكتروني",
    url: "https://learn.example.com",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=400&fit=crop",
    tags: ["تعليم", "أونلاين", "دورات"],
    createdAt: "2024-01-12"
  }
];

const LatestEntries = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">آخر الإدخالات</h2>
        <Button variant="admin-ghost" size="sm">
          عرض الكل
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockEntries.map((entry) => (
          <Card
            key={entry.id}
            className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative">
              <img
                src={entry.image}
                alt={entry.title}
                className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Action Menu */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-black/20 hover:bg-black/40 text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      فتح الرابط
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="text-right">
                  <h3 className="font-medium text-sm text-foreground line-clamp-2 leading-relaxed">
                    {entry.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 truncate" dir="ltr">
                    {entry.url}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 justify-end">
                  {entry.tags.slice(0, 2).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {entry.tags.length > 2 && (
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5"
                    >
                      +{entry.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="text-left">
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LatestEntries;