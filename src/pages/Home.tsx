import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { linkStorage, LinkEntry } from "@/lib/storage";

const Home = () => {
  const [entries, setEntries] = useState<LinkEntry[]>([]);

  useEffect(() => {
    const data = linkStorage.getAll();
    setEntries(data);
  }, []);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Brand */}
      <header className="container mx-auto px-4 py-8 text-center">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <span className="text-2xl font-bold text-white">🔗</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              مجموعة روابطي
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              اكتشف مجموعة مختارة من أفضل المشاريع والروابط المفيدة في مكان واحد
            </p>
          </div>
        </div>
      </header>

      {/* Links Grid */}
      <main className="container mx-auto px-4 pb-12">
        {entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <ExternalLink className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-foreground">لا توجد روابط بعد</h3>
                <p className="text-muted-foreground">سيتم عرض الروابط هنا عند إضافتها</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {entries.map((entry) => (
              <Card
                key={entry.id}
                className="group relative overflow-hidden aspect-[4/5] transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02] cursor-pointer p-0 animate-fade-in"
                onClick={() => handleLinkClick(entry.url)}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  {entry.image ? (
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-admin-surface to-muted flex items-center justify-center">
                      <ExternalLink className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* External link icon */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ExternalLink className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute top-3 right-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-sm font-medium text-right line-clamp-2 leading-tight drop-shadow-lg">
                      {entry.title}
                    </h3>
                  </div>
                  
                  {/* Tags at bottom */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-wrap gap-1 justify-end">
                      {entry.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-white/20 text-white border-white/30 text-xs px-2 py-0.5 backdrop-blur-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {entry.tags.length > 3 && (
                        <Badge
                          className="bg-white/20 text-white border-white/30 text-xs px-2 py-0.5 backdrop-blur-sm"
                        >
                          +{entry.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            صُنع بـ ❤️ لعرض أفضل الروابط
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;