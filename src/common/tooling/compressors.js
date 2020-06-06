import keyBy from "lodash/keyBy";
import Qty from "js-quantities";

// https://arachnoid.com/polysolve/
export const compressorMap = keyBy(
  [
    {
      name: "VIAIR 90C",
      polynomialTerms: [
        8.7645173457357262e-1,
        -5.9887122970216242e-2,
        3.1490256590930195e-3,
        -8.8723405044236484e-5,
        1.297348964083027e-6,
        -9.3049271240531313e-9,
        2.587145977003248e-11,
      ],
    },
    {
      name: "VIAIR 98C",
      polynomialTerms: [
        1.5290962141329794,
        -1.0444408183706086e-1,
        7.4168022321358714e-3,
        -2.6774782437871171e-4,
        5.2041066623268536e-6,
        -5.5844520145620615e-8,
        3.1153255282454044e-10,
        -7.0519447446252718e-13,
      ],
    },
    {
      name: "VIAIR 100C",
      polynomialTerms: [
        1.2699831837167064,
        -1.0510222684149573e-1,
        1.2718200634610849e-2,
        -8.6558295885784083e-4,
        3.5192753602375948e-5,
        -9.0545856386928364e-7,
        1.5137949647972197e-8,
        -1.6407249582723472e-10,
        1.1116305860953271e-12,
        -4.2759755191085514e-15,
        7.1247088649929401e-18,
      ],
    },
    {
      name: "Thomas 215",
      polynomialTerms: [
        9.7147435897435586e-001,
        -1.1098662911161936e-002,
        2.6789529914485079e-005,
        5.0974488474554119e-007,
        -3.4236596736626707e-009
      ]
    },
    {
      name: "AndyMark 1.1 Pump",
      polynomialTerms: [
        1.1000553758298031,
        -1.0218124342727576e-1,
        8.9377010396103421e-3,
        -4.1742350856808071e-4,
        1.1094416662472634e-5,
        -1.7482118449944467e-7,
        1.6146153863887738e-9,
        -8.0610818682159146e-12,
        1.6773769109154779e-14,
      ],
    },
  ].map((c) => ({
    ...c,
    cfmFn: (p) => {
      const pressureScalar = p.to("psi").scalar;
      const scalar = c.polynomialTerms.reduce(
        (prev, curr, i) => prev + curr * Math.pow(pressureScalar, i)
      );
      return Qty(scalar / 60, "ft^3/s");
    },
  })),
  "name"
);
