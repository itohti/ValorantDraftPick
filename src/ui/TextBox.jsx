import React from "react";

export default function TextBox({ label, value, onChange, placeholder, name }) {
    return (
        <div className="flex flex-col space-y-1 text-white p-2">
            {label && <label htmlFor={name} className="text-sm font-medium">{label}</label>}
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}