
export const getOjectById = (data,id) => {
     return data?.find(e => e.id == id) ? data?.find(e => e.id == id) : "unknown" ;
}