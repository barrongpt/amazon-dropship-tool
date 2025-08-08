export function Card({ children }) {
  return <div className="p-4 border rounded-md shadow">{children}</div>;
}
export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}
