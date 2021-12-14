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

export const EditCategory: React.FC = () => {
  return(
    <div></div>
  )
};
