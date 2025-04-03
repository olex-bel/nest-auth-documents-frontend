import { Permission } from "~/services/documents/user";

type PermissionSelectProps = {
    currentPermissionId?: Permission;
}

function enumToOptions<T extends Record<string, string | number>>(enumObj: T) {
    const values = Object.values(enumObj).filter(value => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 0;
    });
    
    return values.map((value) => ({
        value: value.toString(),
        label: enumObj[value as keyof T] as string,
    }))
}

export default function PermissionSelect({ currentPermissionId }: PermissionSelectProps) {
    const options = enumToOptions(Permission);
    
    return (
        <label className="block text-sm font-medium">
            Permission
            <select defaultValue={currentPermissionId} name="permissionId" className="block w-full p-2 border border-gray-300 rounded-md">
                {!currentPermissionId && <option value="">Select permission</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}