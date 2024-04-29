import { generatePagination } from "@/lib/utils";
import clsx from "clsx";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  previousPage: () => void;
  nextPage: () => void;
  setPageIndex: (page: number) => void;
  totalOnSinglePage: number;
  totalEntries: number;
}

export default function Pagination({
  totalPages,
  currentPage,
  previousPage,
  nextPage,
  setPageIndex,
  totalOnSinglePage,
  totalEntries,
}: PaginationProps) {
  const allPages = generatePagination(currentPage, totalPages);
  return (
    <>
      <div className="flex justify-between items-center mt-8">
        <p className=" opacity-70">
          {`Showing data ${
            totalOnSinglePage * currentPage + 1 - totalOnSinglePage
          } to ${Math.min(
            totalOnSinglePage * currentPage,
            totalEntries
          )} of ${totalEntries} entries`}
        </p>
        <div className="flex justify-center items-center">
          {allPages.length > 0 && (
            <PaginationArrow
              direction="left"
              onClick={() => previousPage()}
              isDisabled={currentPage <= 1}
            />
          )}

          <div className="flex -space-x-px">
            {allPages.map((page, index) => {
              let position: "first" | "last" | "single" | "middle" | undefined;

              if (index === 0) position = "first";
              if (index === allPages.length - 1) position = "last";
              if (allPages.length === 1) position = "single";
              if (page === "...") position = "middle";

              return (
                <PaginationNumber
                  key={page}
                  onClick={() => setPageIndex(Number(page) - 1)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
          </div>
          {allPages.length > 0 && (
            <PaginationArrow
              direction="right"
              onClick={() => nextPage()}
              isDisabled={currentPage >= totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  onClick,
  isActive,
  position,
}: {
  page: number | string;
  onClick: () => void;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border cursor-pointer",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-primary-light border-white text-white": isActive,
      "hover:text-secondary-1": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <div className={className} onClick={onClick}>
      {page}
    </div>
  );
}

function PaginationArrow({
  onClick,
  direction,
  isDisabled,
}: {
  onClick: () => void;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border cursor-pointer hover:bg-primary-light transition-all",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:text-secondary-1": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <img
        src="/assets/icons/arrow-left.svg"
        alt="previous"
        className="w-[20px] h-[20px]"
      />
    ) : (
      <img
        src="/assets/icons/arrow-right.svg"
        alt="next"
        className="w-[20px] h-[20px]"
      />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <div className={className} onClick={onClick}>
      {icon}
    </div>
  );
}
