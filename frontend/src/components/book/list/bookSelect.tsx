import { api } from "@/api";
import { SELECT_DATA_ENDPOINTS } from "@/api/endpoints";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/i18n/i18nProvider";
import { BaseDataResponse, DataResult } from "@/types/api";
import { useEffect, useState } from "react";

type Props = {
  endpoint: keyof typeof SELECT_DATA_ENDPOINTS;
  placeholder: string;
  value: string | number | undefined;
  onChange: (value: number) => void;
};

export default function ApiSelect({
  endpoint,
  placeholder,
  value,
  onChange,
}: Props) {
  const { t } = useI18n();
  const [options, setOptions] = useState<DataResult[]>([]);

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

  const final_value = value == null ? "" : String(value);

  return (
    <div>
      <Select
        value={final_value}
        onValueChange={(event) => {
          onChange(Number(event));
        }}
      >
        <SelectTrigger className="h-12 rounded-none bg-background px-4 shadow-none">
          <SelectValue placeholder={t(placeholder)} />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              {t(item.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
