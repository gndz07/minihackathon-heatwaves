import * as SelectPrimitive from "@radix-ui/react-select";
import {
  SelectTrigger,
  SelectIcon,
  SelectContent,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectItem,
  SelectItemIndicator,
  SelectViewport,
} from "./UI/Select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const SelectQuarter = ({ currentQuarter, setQuarter }) => {
  return (
    <SelectPrimitive.Root
      value={currentQuarter}
      onValueChange={(v) => setQuarter(v)}
    >
      <SelectTrigger aria-label="Quarter">
        <SelectPrimitive.Value placeholder="Select a quarter" />
        <SelectIcon>
          <ChevronDownIcon />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton>
          <ChevronUpIcon />
        </SelectScrollUpButton>
        <SelectViewport>
          <SelectItem value="all">
            <SelectPrimitive.ItemText>All quarters</SelectPrimitive.ItemText>
            <SelectItemIndicator>
              <CheckIcon />
            </SelectItemIndicator>
          </SelectItem>
          <SelectItem value="Q1">
            <SelectPrimitive.ItemText>Q1</SelectPrimitive.ItemText>
            <SelectItemIndicator>
              <CheckIcon />
            </SelectItemIndicator>
          </SelectItem>
          <SelectItem value="Q2">
            <SelectPrimitive.ItemText>Q2</SelectPrimitive.ItemText>
            <SelectItemIndicator>
              <CheckIcon />
            </SelectItemIndicator>
          </SelectItem>
          <SelectItem value="Q3">
            <SelectPrimitive.ItemText>Q3</SelectPrimitive.ItemText>
            <SelectItemIndicator>
              <CheckIcon />
            </SelectItemIndicator>
          </SelectItem>
          <SelectItem value="Q4">
            <SelectPrimitive.ItemText>Q4</SelectPrimitive.ItemText>
            <SelectItemIndicator>
              <CheckIcon />
            </SelectItemIndicator>
          </SelectItem>
        </SelectViewport>
        <SelectScrollDownButton>
          <ChevronDownIcon />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPrimitive.Root>
  );
};

export default SelectQuarter;
