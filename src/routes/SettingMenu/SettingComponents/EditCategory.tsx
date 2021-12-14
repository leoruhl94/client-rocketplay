import React, { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";

interface InfoSubmit {
  schemaName: string;
  oldName?: string;
  newName?: string;
}

export const EditCategory: React.FC = () => {};
