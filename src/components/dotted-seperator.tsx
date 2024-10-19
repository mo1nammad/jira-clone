import React from "react";

import { cn } from "@/lib/utils";

type DottedSeperatorProps = {
   classname?: string;
   color?: string;
   height?: string;
   dotSize?: string;
   gapSize?: string;
   direction?: "horizontal" | "vertical";
};

export const DottedSeperator = ({
   classname,
   color = "#d4d4d8",
   height = "2px",
   dotSize = "2px",
   gapSize = "8px",
   direction = "horizontal",
}: DottedSeperatorProps) => {
   const isHorizontal = direction === "horizontal";
   return (
      <div
         className={cn(
            !isHorizontal
               ? "h-full flex flex-col items-center"
               : "w-full flex items-center",
            classname
         )}
      >
         <div
            className={isHorizontal ? "flex-grow" : "flex-grow-0"}
            style={{
               width: isHorizontal ? "100%" : height,
               height: isHorizontal ? height : "100%",
               background: `radial-gradient(circle, ${color} 25% ,transparent 25%)`,
               backgroundSize: isHorizontal
                  ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
                  : `${height} ${parseInt(gapSize) + parseInt(dotSize)}px`,
               backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
               backgroundPosition: "center",
            }}
         />
      </div>
   );
};