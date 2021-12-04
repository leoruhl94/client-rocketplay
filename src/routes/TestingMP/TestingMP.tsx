import React, { useEffect } from "react";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import axios from "axios";
import { useLocation, useParams } from "react-router";

export const TestingMP: React.FC = () => {
  let id = "";
  const location = useLocation();
  console.log("Location",location.search);
  console.log("approval",location.search.slice(16));
  if(!!location.search){id = location.search.slice(16)}
  const handlePayment = async () => {
    //   let res = await axios.get(`http://localhost:3002/testMp`);
    //   console.log(res.data);
  };
  const handleSomething = async () => {
    let res = await axios.get(`http://localhost:3002/testMp/${id}`);
    console.log(res.data);
  };

  useEffect(() => {
    !!id && handleSomething();
  }, [id]);

  return (
    <SuperButton
      name="pagar"
      text="Dame Click"
      handler={handlePayment}
      externalLink="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380847d70946c017d7d53dc7508a8"
    />
  );
};
