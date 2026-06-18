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
  placeholder: string;
  value: string | number;
  onChange: (value: string) => void;
};

export default function ApiSelect({
  endpoint,
  placeholder,
  value,
  onChange,
}: Props) {
  const [options, setOptions] = useState<ApiItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<any>(API_ENDPOINTS[endpoint], {
          params: {
            page_size: 10,
            page: 1,
          },
        });

        const data = response.data.results;
        setOptions(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <Select value={value.toString()} onValueChange={onChange}>
      <SelectTrigger className="h-12 rounded-none bg-background px-4 shadow-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {
          <SelectContent>
            {options.map((item) => (
              <SelectItem key={item.id} value={String(item.id)}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        }
      </SelectContent>
    </Select>
  );
}
