import Table from "common/components/Table";
import Compressor from "common/models/Compressor";
import { setTitle } from "common/tooling/routing";
import Qty from "js-quantities";
import React from "react";

import compressorConfig from "./index";

export default function Compressors() {
  setTitle(compressorConfig.title);

  const data = React.useMemo(
    () =>
      Compressor.getAllCompressors().map((c) => ({
        link: <a href={c.url}>{c.name}</a>,
        weight: c.weight.to("lb").scalar.toFixed(2),
        cfmZero: c.cfmFn(Qty(0, "psi")).to("ft3/min").scalar.toFixed(2),
        cfmFourty: c.cfmFn(Qty(40, "psi")).to("ft3/min").scalar.toFixed(2),
        cfmEighty: c.cfmFn(Qty(80, "psi")).to("ft3/min").scalar.toFixed(2),
        cfmOneTen: c.cfmFn(Qty(110, "psi")).to("ft3/min").scalar.toFixed(2),
      })),
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "link",
      },
      {
        Header: "Weight (lb)",
        accessor: "weight",
      },
      {
        Header: "CFM at 0psi (ft³/min)",
        accessor: "cfmZero",
      },
      {
        Header: "CFM at 40psi (ft³/min)",
        accessor: "cfmFourty",
      },
      {
        Header: "CFM at 80psi (ft³/min)",
        accessor: "cfmEighty",
      },
      {
        Header: "CFM at 110psi (ft³/min)",
        accessor: "cfmOneTen",
      },
    ],
    []
  );

  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
}
