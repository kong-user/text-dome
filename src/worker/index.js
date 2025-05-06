import { mergeData } from "../until";

onmessage = function (e) {
    const [currenRes, liveRatesRes, WalletRes] = e.data;
    const result = mergeData(currenRes, liveRatesRes, WalletRes);
    postMessage(result);
  }