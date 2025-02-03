import Navigation from "@/components/site/Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
