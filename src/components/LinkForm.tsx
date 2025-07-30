import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkFormData {
  image: File | null;
  title: string;
  url: string;
  tags: string[];
}

const LinkForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<LinkFormData>({
    image: null,
    title: "",
    url: "",
    tags: []
  });
  const [newTag, setNewTag] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    toast({
      title: "تم بنجاح",
      description: "تم إضافة الرابط بنجاح",
    });

    // Reset form
    setFormData({
      image: null,
      title: "",
      url: "",
      tags: []
    });
    setImagePreview(null);
  };

  return (
    <Card className="w-full shadow-form transition-all duration-300 hover:shadow-card-hover">
      <CardHeader className="text-right">
        <CardTitle className="text-xl font-semibold text-foreground">إضافة رابط جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium text-right block">
              الصورة <span className="text-xs text-muted-foreground">(1080x1340px)</span>
            </Label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: null }));
                    }}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer bg-admin-surface hover:bg-admin-surface-hover transition-all duration-200"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground text-center">
                      <span className="font-medium">انقر لتحميل صورة</span>
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG أو WEBP</p>
                  </div>
                </label>
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-right block">
              العنوان *
            </Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="أدخل عنوان الرابط"
              className="text-right"
              dir="rtl"
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium text-right block">
              الرابط *
            </Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com"
              className="text-left"
              dir="ltr"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-right block">
              العلامات
            </Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="أضف علامة جديدة"
                className="text-right flex-1"
                dir="rtl"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button
                type="button"
                onClick={addTag}
                variant="admin-outline"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="admin"
            className="w-full"
            size="lg"
          >
            إضافة الرابط
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LinkForm;