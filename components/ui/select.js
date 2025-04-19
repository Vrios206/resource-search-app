// components/ui/select.js
export function Select({ children, onValueChange }) {
    return (
      <select
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {children}
      </select>
    );
  }
  