import {Pagination,PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,} from "./ui/pagination";
  type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
  };
  
  const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <Pagination>
        <PaginationContent>
            {/* {to goto Previous page hide Previous button} */}
          {page !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(page - 1)}
              />
            </PaginationItem>
          )}
  
          {pageNumbers.map((number) => (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => onPageChange(number)}
                isActive={page === number}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
            {/* {to goto next page hide next button} */}
          {page !== pageNumbers.length && (
            <PaginationItem>
              <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };
  
  export default PaginationSelector;