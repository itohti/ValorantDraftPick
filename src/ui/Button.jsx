export default function Button({ label, onClick, className }) {
    return (
        <button className={`bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ${className}`} onClick={onClick}>
            {label}
        </button>
    );
}