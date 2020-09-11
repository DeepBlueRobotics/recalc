import Qty from "js-quantities";
import keyBy from "lodash/keyBy";

export default class Compressor {
  constructor(name, data) {
    this.name = name;

    data = data || compressorMap[name];
    this.polynomialTerms = data.polynomialTerms;
    this.cfmFn = data.cfmFn;
    this.weight = data.weight;
  }

  static getAllCompressors() {
    return Object.keys(compressorMap).map((n) => new Compressor(n));
  }
}

// https://arachnoid.com/polysolve/
export const compressorMap = keyBy(
  [
    {
      name: "VIAIR 90C (13.8v)",
      polynomialTerms: [
        1.028775899000915,
        -5.7527883797306306e-2,
        3.6049441268615982e-3,
        -1.1579457725774831e-4,
        2.0024145929042497e-6,
        -1.9127106949542731e-8,
        9.5115238899234617e-11,
        -1.9226989003510868e-13,
      ],
      weight: Qty(2.4, "lb"),
    },
    {
      name: "VIAIR 90C (12v)",
      polynomialTerms: [
        8.8001641245124484e-1,
        -9.2561708953846578e-2,
        9.3363727966984424e-3,
        -5.3475924547875537e-4,
        1.7900877917868134e-5,
        -3.6803453142496926e-7,
        4.7202652228560132e-9,
        -3.6819367698723339e-11,
        1.5971519675914118e-13,
        -2.9523135523161451e-16,
      ],
      weight: Qty(2.4, "lb"),
    },
    {
      name: "VIAIR 98C (13.8v)",
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
      weight: Qty(2.55, "lb"),
    },
    {
      name: "VIAIR 100C (13.8v)",
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
      weight: Qty(3.55, "lb"),
    },
    {
      name: "Thomas 215 (12v)",
      polynomialTerms: [
        9.7201595617973491e-1,
        -1.1502357703902167e-2,
        6.8266386146313709e-5,
        -1.1947785176426372e-6,
        2.93753803650021e-8,
        -2.8965229804550191e-10,
        9.4599243172975252e-13,
      ],
      weight: Qty(3, "lb"),
    },
    {
      name: "AndyMark 1.1 Pump (12v)",
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
      weight: Qty(3.37, "lb"),
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