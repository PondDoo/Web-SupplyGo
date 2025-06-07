// src/components/TextBox.tsx
export default function TextBox() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name" className="text-gray-700 font-medium">
        Your Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
