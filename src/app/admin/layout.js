import Link from "next/link";
import AdminDashboard from "./page";
const sharedClasses = {
  card: "bg-card text-card-foreground p-4 rounded-lg shadow-lg transition hover:shadow-xl",
  navLink: "block py-2 px-3 rounded hover:bg-secondary/80 transition",
  tableCell: "py-2",
  borderBottom: "border-b border-border",
};

const Sidebar = () => (
  <aside className="w-64 bg-secondary text-secondary-foreground h-screen p-4 shadow-lg rounded-lg">
    <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
    <nav className="space-y-2">
      <Link href="/admin" className={sharedClasses.navLink}>Dashboard</Link>
      <Link href="/admin/product" className={sharedClasses.navLink}>Products</Link>
    </nav>
  </aside>
);

const Header = () => (
  <header className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-accent">Dashboard</h1>
    <button className="bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary/80 transition">
      Logout
    </button>
  </header>
);



export default function HomeLayout({ children }) {
  return (
  
    <div className="min-h-screen bg-background text-foreground">
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        
        {children}
      </main>
    </div>
  </div>
    
  )
}