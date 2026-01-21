"use client"


interface SelectFilterProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string; label: string }[];
}


export const SelectFilter = ({ options, ...props }: SelectFilterProps) => (
    <select
        {...props}

        className={`h-14 flex flex-1 items-center px-6 bg-white border border-gray-200 rounded-sm text-gray-500  ${props.className}`}
    >
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
);