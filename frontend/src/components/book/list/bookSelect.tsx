import { api } from "@/api";
import { SELECT_DATA_ENDPOINTS } from "@/api/endpoints";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseDataResponse, DataResult } from "@/types/api";
import { useEffect, useState } from "react";

type Props = {
  endpoint: keyof typeof SELECT_DATA_ENDPOINTS;
  placeholder: string;
  value: string | number | undefined | null;
  onChange: (value: number) => void;
};

export default function ApiSelect({
  endpoint,
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
  const [options, setOptions] = useState<DataResult[]>(placeholder_data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<BaseDataResponse>(
          SELECT_DATA_ENDPOINTS[endpoint],
        );

        setOptions(response.results);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    void fetchData();
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
