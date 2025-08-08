export function Select({ children }) {
  return <select className="border p-2 rounded w-full">{children}</select>;
}
export function SelectTrigger({ children }) {
  return <div>{children}</div>;
}
export function SelectValue({ children }) {
  return <span>{children}</span>;
}
export function SelectContent({ children }) {
  return <div>{children}</div>;
}
export function SelectItem({ children, ...props }) {
  return <option {...props}>{children}</option>;
}
