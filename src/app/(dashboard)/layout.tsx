import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="fixed top-0 left-0 h-full w-0 lg:w-[224px] bg-white shadow-md z-1">
        <Sidebar />
      </div>

      <div className="ml-1 lg:ml-[224px] flex flex-col h-full">
        <div className="fixed max-w-screen top-0 left-20 lg:left-[224px] right-0 z-0">
          <Header />
        </div>
        <main className="mt-[75px] p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
