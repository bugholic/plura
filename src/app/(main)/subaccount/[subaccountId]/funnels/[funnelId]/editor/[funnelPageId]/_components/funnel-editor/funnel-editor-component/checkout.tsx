"use client";

import { toast } from "@/components/ui/use-toast";
import { getFunnel, getSubaccountDetails } from "@/lib/queries";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  element: EditorElement;
};

const Checkout = (props: Props) => {
  const { dispatch, state, subaccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [livePrices, setLivePrices] = useState([]);
  const [subAccountConnectAccId, setSubAccountConnectAccId] = useState("");
  const options = useMemo(() => ({ clientSecret }), [clientSecret]);
  useEffect(() => {
    if (!subaccountId) return;
    const fetchData = async () => {
      const subaccountDetails = await getSubaccountDetails(subaccountId);
      if (subaccountDetails) {
        if (!subaccountDetails.connectAccountId) return;
        setSubAccountConnectAccId(subaccountDetails.connectAccountId);
      }
    };
    fetchData();
  }, [subaccountId]);

  useEffect(() => {
    if (funnelId) {
      const fetchData = async () => {
        const funnelData = await getFunnel(funnelId);
        setLivePrices(JSON.parse(funnelData?.liveProducts || "[]"));
      };
      fetchData();
    }
  }, [funnelId]);

  
  useEffect(() => {
    if (livePrices.length && subaccountId && subAccountConnectAccId) {
      const getClientSercet = async () => {
        try {
          const body = JSON.stringify({
            subAccountConnectAccId,
            prices: livePrices,
            subaccountId,
          })
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}api/stripe/create-checkout-session`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body,
            }
          )
          const responseJson = await response.json()
          console.log(responseJson)
          if (!responseJson) throw new Error('something went wrong')
          if (responseJson.error) {
            throw new Error(responseJson.error)
          }
          if (responseJson.clientSecret) {
            setClientSecret(responseJson.clientSecret)
          }
        } catch (error) {
          toast({
            open: true,
            className: 'z-[100000]',
            variant: 'destructive',
            title: 'Oppse!',
            //@ts-ignore
            description: error.message,
          })
        }
      }
      getClientSercet()
    }
  }, [livePrices, subaccountId, subAccountConnectAccId])

  return <div>Checkout</div>;
};

export default Checkout;
