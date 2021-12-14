import React, { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";
import { discovery_v1 } from "googleapis";

interface InfoSubmit {
  schemaName: string;
  oldName?: string;
  newName?: string;
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

  return(
    <div></div>
  )
};
