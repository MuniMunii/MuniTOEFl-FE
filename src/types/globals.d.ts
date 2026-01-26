interface Meta {
  page?: number;      
  limit?: number;     
  total?: number;     
  [key: string]: any;
}

interface ApiResponse<T = any> {
  success: boolean;  
  message: string;   
  data: T | null;    
  error: any;        
  meta: Meta | null; 
}
//       setChoicesForQuestion:(cursorId,choices)=>
        // set((state)=>{
        //   state.isDirty=false;
        //   state.choicesByCursorId[cursorId] = choices
        // }),