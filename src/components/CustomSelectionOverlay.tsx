import { useState } from "react";
import type { Artwork } from "../types/artwork";

interface Props {
  selectedIds: Set<number>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  currentPageData: Artwork[];
}

const CustomSelectionOverlay = ({
  selectedIds,
  setSelectedIds,
  currentPageData,
}: Props) => {
  const [count, setCount] = useState("");

  const handleSelect = () => {
    const num = parseInt(count);

    if (!num || num <= 0) return;

    const newSet = new Set(selectedIds);

    // ONLY select from current page
    const toSelect = currentPageData.slice(0, num);

    toSelect.forEach((row) => newSet.add(row.id));

    setSelectedIds(newSet);
    setCount("");
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="number"
        placeholder="Select N rows (current page)"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <button onClick={handleSelect}>Apply</button>
    </div>
  );
};

export default CustomSelectionOverlay;
