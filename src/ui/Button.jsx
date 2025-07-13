export default function Button({ label, icon, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ${className}`}
        >
            {icon && <span className="text-lg">{icon}</span>}
            {label}
        </button>
    );
}