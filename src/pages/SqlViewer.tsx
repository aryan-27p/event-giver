import { useEffect, useState } from "react";
import { Database } from "lucide-react";

export default function SqlViewer() {
  const [data, setData] = useState<{
    volunteers: any[];
    events: any[];
    registrations: any[];
  } | null>(null);

  const fetchDb = () => {
    fetch("http://localhost:3000/api/db")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  };

  useEffect(() => {
    fetchDb();
  }, []);

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Database className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold font-heading">Database History</h1>
            <p className="text-muted-foreground mt-1">
              Live records of all registration history and system data saved to the backend database.
            </p>
          </div>
          <button
            onClick={fetchDb}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm font-medium hover:bg-primary/90"
          >
            Refresh Data
          </button>
        </div>

        {!data ? (
          <p>Loading database tables...</p>
        ) : (
          <div className="space-y-8">
            <TableView title="Volunteers Table" data={data.volunteers} />
            <TableView title="Events Table" data={data.events} />
            <TableView title="Registrations Table" data={data.registrations} />
          </div>
        )}
      </div>
    </div>
  );
}

function TableView({ title, data }: { title: string; data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground">No records found.</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm overflow-hidden">
      <h2 className="text-xl font-bold mb-4">{title} ({data.length} rows)</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-muted/50 transition-colors">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                    {String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
