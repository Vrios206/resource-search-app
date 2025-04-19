// components/ui/input.js
export function Input({ placeholder, onChange }) {
    return (
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    );
  }
  