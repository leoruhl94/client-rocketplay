import React, { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";


interface InfoSubmit {
  schemaName: string;
  oldName?: string;
  newName?: string;
}
interface InfoSubmit2 {
  schemaName: string;
  catId?: string;
  status?: string;
}

interface Categories {
  name: string;
  id: number;
}

export const EditCategory: React.FC = () => {
  const [categoryState, setCategoryState] = useState<Categories[]>();
  const [infoSubmit, setInfoSubmit] = useState<InfoSubmit>({
    schemaName: "",
    oldName: "",
    newName: "",
  });
  const [infoSubmit2, setInfoSubmit2] = useState<InfoSubmit2>({
    schemaName: "",
    catId: "",
    status: "",
  });





  return(
    <div></div>
  )
};
