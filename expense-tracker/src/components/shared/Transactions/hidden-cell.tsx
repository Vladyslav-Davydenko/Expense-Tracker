import { useState } from "react";

interface HiddenCellProps {
  getValue: () => any;
}

export default function HiddenCell({ getValue }: HiddenCellProps) {
  const id = getValue() as string;
  const hidden = "******************************";
  const [showId, setShowId] = useState(false);

  const handleMouseOver = () => {
    setShowId(true);
  };

  const handleMouseOut = () => {
    setShowId(false);
  };
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ cursor: "pointer" }}
    >
      {showId ? id : hidden}
    </div>
  );
}
