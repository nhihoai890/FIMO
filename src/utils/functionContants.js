
export const getOjectById = (data,id) => {
     return data?.find(e => e.id == id) ? data?.find(e => e.id == id) : "unknown" ;
}

export const filterById = (data,id,title) => {
      return data.filter(e => e[title]  == id) || []
}