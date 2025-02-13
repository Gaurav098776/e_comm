import React from 'react'

const AdminDashboard = () => {

  const sharedClasses = {
    card: "bg-card text-card-foreground p-4 rounded-lg shadow-lg transition hover:shadow-xl",
    navLink: "block py-2 px-3 rounded hover:bg-secondary/80 transition",
    tableCell: "py-2",
    borderBottom: "border-b border-border",
  };

  const StatsCard = ({ title, value }) => (
    <div className={sharedClasses.card}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-accent">{value}</p>
    </div>
  );
  
  const RecentOrders = () => (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
      <table className="w-full text-left">
        <thead>
          <tr className={sharedClasses.borderBottom}>
            {["Order ID", "Customer", "Date", "Total", "Status"].map((heading) => (
              <th className={sharedClasses.tableCell} key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { id: "#12345", customer: "John Doe", date: "2023-10-01", total: "$123.45", status: "Pending" },
            { id: "#12346", customer: "Jane Smith", date: "2023-10-02", total: "$234.56", status: "Completed" },
          ].map((order) => (
            <tr className={`${sharedClasses.borderBottom} hover:bg-muted transition`} key={order.id}>
              <td className={sharedClasses.tableCell}>{order.id}</td>
              <td className={sharedClasses.tableCell}>{order.customer}</td>
              <td className={sharedClasses.tableCell}>{order.date}</td>
              <td className={sharedClasses.tableCell}>{order.total}</td>
              <td className={`${sharedClasses.tableCell} text-accent-foreground`}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Total Sales" value="$12,345" />
          <StatsCard title="Orders" value="1,234" />
          <StatsCard title="Customers" value="567" />
          <StatsCard title="Products" value="89" />
        </div>
        <RecentOrders />
    </div>
  )
}

export default AdminDashboard;