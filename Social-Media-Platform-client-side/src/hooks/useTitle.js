import { useEffect } from "react";
const useTitle = title =>{
     useEffect(() =>{
          document.title = `${title} | Social-Media-PlatFrom`;
     }, [title])
};

export default useTitle;