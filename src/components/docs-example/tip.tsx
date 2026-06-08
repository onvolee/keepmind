import {
  Item,
  ItemContent,
  ItemMedia,
} from "@/components/ui/item";
import { Info } from "lucide-react";

export function Tip({ children }: { children: string }) {
  return (
    <Item variant="outline" className="bg-yellow-50 dark:bg-yellow-950 items-start mb-2">
      <ItemMedia variant="icon" className="my-[1.25em]">
        <Info />
      </ItemMedia>
      <ItemContent className="text-sky-700 dark:text-sky-300 leading-6.5">
        {children}
      </ItemContent>
    </Item>
  );
}
