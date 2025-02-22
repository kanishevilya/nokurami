import { Button } from "@/components/ui/shadcn/Button";
import { Input } from "@/components/ui/shadcn/Input";
import { SearchIcon } from "lucide-react";

const SearchField = () => {
  return (
    <div className="ml-auto hidden lg:block">
      <form className="relative flex items-center">
        <Input
          placeholder="Поиск"
          type="text"
          className="w-full rounded-lg pl-4 pr-10 lg:w-[400px]"
        />
        <Button className="absolute right-1 h-8 w-8" type="submit">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};

export default SearchField;
