import { Button } from "@/components/ui/shadcn/Button";
import { Input } from "@/components/ui/shadcn/Input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchField = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchTerm.trim()) {
      router.push(`/streams?searchTerm=${searchTerm}`);
    } else {
      router.push("/streams");
    }
  }

  return (
    <div className="ml-auto hidden lg:block">
      <form className="relative flex items-center" onSubmit={onSubmit}>
        <Input
          placeholder="Поиск"
          type="text"
          className="w-full rounded-lg pl-4 pr-10 lg:w-[400px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="absolute right-1 h-8 w-8" type="submit">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};

export default SearchField;
