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

const countryList = ["DEU", "GRC", "HUN", "IRL", "ISR", "ITA"];

const SelectCountry = ({ currentCountry, setCountry }) => {
  return (
    <SelectPrimitive.Root
      value={currentCountry}
      onValueChange={(v) => setCountry(v)}
    >
      <SelectTrigger aria-label="Country">
        <SelectPrimitive.Value placeholder="Select a country" />
        <SelectIcon>
          <ChevronDownIcon />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton>
          <ChevronUpIcon />
        </SelectScrollUpButton>
        <SelectViewport>
          {countryList.map((country, idx) => (
            <SelectItem key={idx} value={country}>
              <SelectPrimitive.ItemText>{country}</SelectPrimitive.ItemText>
              <SelectItemIndicator>
                <CheckIcon />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectViewport>
        <SelectScrollDownButton>
          <ChevronDownIcon />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPrimitive.Root>
  );
};

export default SelectCountry;
