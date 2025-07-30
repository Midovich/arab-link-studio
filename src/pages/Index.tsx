import AdminHeader from "@/components/AdminHeader";
import LinkForm from "@/components/LinkForm";
import LatestEntries from "@/components/LatestEntries";

const Index = () => {
  return (
    <div className="min-h-screen bg-admin-bg" dir="rtl">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">مرحباً بك في إدارة الروابط</h2>
          <p className="text-muted-foreground">أضف وأدر روابطك بسهولة مع تتبع الإحصائيات</p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <LinkForm />
        </div>

        {/* Latest Entries Section */}
        <div className="mt-12">
          <LatestEntries />
        </div>
      </main>
    </div>
  );
};

export default Index;
