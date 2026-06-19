import { api, API_ENDPOINTS } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type ApiItem = {
  id: string | number;
  name: string;
};

type Props = {
  endpoint: keyof typeof API_ENDPOINTS;
  label: string;
  placeholder: string;
  value: string | number | undefined | null;
  onChange: (value: number) => void;
};

export default function ApiSelect({
  endpoint,
  label,
  placeholder,
  value,
  onChange,
}: Props) {
  let placeholder_data = [
    { id: -1, name: "Todos" },
    { id: 1, name: "Ficción" },
    { id: 2, name: "Misterio" },
    { id: 3, name: "Fantasía" },
  ];
  const [options, setOptions] = useState<ApiItem[]>(placeholder_data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<any>(API_ENDPOINTS[endpoint], {
          params: { page_size: 10, page: 1 },
        });

        setOptions(response.data.results);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <div>
      <Select value={value?.toString()} onValueChange={onChange}>
        <SelectTrigger className="h-12 rounded-none bg-background px-4 shadow-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
