import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Edit, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { linkStorage, LinkEntry } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

const LatestEntries = () => {
  const [entries, setEntries] = useState<LinkEntry[]>([]);
  const { toast } = useToast();

  const loadEntries = () => {
    const data = linkStorage.getAll();
    setEntries(data.slice(0, 6)); // Show latest 6 entries
  };

  useEffect(() => {
    loadEntries();

    // Listen for new entries added
    const handleLinkAdded = () => {
      loadEntries();
    };

    window.addEventListener('linkAdded', handleLinkAdded);
    return () => window.removeEventListener('linkAdded', handleLinkAdded);
  }, []);

  const handleDelete = (id: string) => {
    try {
      linkStorage.delete(id);
      loadEntries();
      toast({
        title: "تم الحذف",
        description: "تم حذف الرابط بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الرابط",
        variant: "destructive"
      });
    }
  };

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };

  if (entries.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">آخر الإدخالات</h2>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">لا توجد روابط بعد. أضف رابطك الأول!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">آخر الإدخالات</h2>
        <Button variant="admin-ghost" size="sm">
          عرض الكل
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {entries.map((entry) => (
          <Card
            key={entry.id}
            className="group relative overflow-hidden aspect-[4/5] transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02] cursor-pointer p-0"
          >
            {/* Image taking full card space */}
            <div className="relative w-full h-full">
              {entry.image ? (
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-admin-surface flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">لا توجد صورة</span>
                </div>
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
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
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => handleOpenLink(entry.url)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      فتح الرابط
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center gap-2 text-destructive"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Title overlay */}
              <div className="absolute top-2 right-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-sm font-medium text-right line-clamp-2 leading-tight drop-shadow-lg">
                  {entry.title}
                </h3>
              </div>
              
              {/* Tags at bottom left */}
              <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 max-w-[calc(100%-1rem)]">
                {entry.tags.slice(0, 2).map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-black/50 text-white border-white/20 text-xs px-2 py-0.5 backdrop-blur-sm"
                  >
                    {tag}
                  </Badge>
                ))}
                {entry.tags.length > 2 && (
                  <Badge
                    className="bg-black/50 text-white border-white/20 text-xs px-2 py-0.5 backdrop-blur-sm"
                  >
                    +{entry.tags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LatestEntries;