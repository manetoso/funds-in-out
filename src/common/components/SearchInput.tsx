import { Icon, Input } from "@ui-kitten/components";

type SearchInputProps = {
  isLoading: boolean;
  value: string;
  handleSearch: (query: string) => void;
  icon?: string;
  placeholder?: string;
};

export const SearchInput = ({
  handleSearch,
  isLoading,
  value,
  icon = "search",
  placeholder = "Search",
}: SearchInputProps) => (
  <Input
    accessoryLeft={props => <Icon {...props} name={icon} />}
    disabled={isLoading}
    onChangeText={handleSearch}
    placeholder={placeholder}
    value={value}
  />
);
