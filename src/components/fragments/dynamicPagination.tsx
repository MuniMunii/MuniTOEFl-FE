import { type SetStateAction } from "react"
import { Pagination, PaginationContent, PaginationItem } from "../ui/pagination"
import { Button } from "../ui/button"

/**
 * 
 * @param pageSize
 * @param total
 * state
 * @param currentPage
 * @param setCurrentPage
 */
export default function DynamicPagination({pageSize,total,currentPage,setCurrentPage}:{setCurrentPage:React.Dispatch<SetStateAction<number>>,currentPage:number,pageSize:number,total:number}){
  function handleChangePage(page: number) {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }
    const totalPages = Math.ceil(total / pageSize)
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
            <Button variant="link" onClick={()=>handleChangePage(currentPage-1)} disabled={currentPage===1}>Previous</Button>
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1
          return (
            <PaginationItem key={page}>
              <Button
                variant={page === currentPage ? "default" : "link"}
                onClick={() => handleChangePage(page)}
                className="rounded-xl"
              >
                {page}
              </Button>
            </PaginationItem>
          )
        })}
            <PaginationItem>
            <Button variant="link" onClick={()=>handleChangePage(currentPage-1)} disabled={currentPage === totalPages}>Next</Button>
            </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}