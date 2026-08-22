"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { parseTables, WaitressForm } from "../components/waitresses/forms/waitress-form";
import { WaitressList } from "../components/waitresses/waitress-list";
import { fetchWaitresses } from "../services/waitress-services";
import { ErrorState } from "@/components/common/ErrorState";
import { WaitressFormValues } from "../components/waitresses/forms/schema";
import { toast } from "react-toastify";

export default function WaitressesView() {
  const {data: responseWaitresses, error: errorWaitresses} = fetchWaitresses();
    if (errorWaitresses) {
      return <ErrorState/>
    }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administration" title="Serveuses" />

      <WaitressForm />

      <WaitressList
        waitresses={responseWaitresses || []}
        onUpdate={()=> {}}
        onRemove={()=>{}}
      />
    </div>
  );
}