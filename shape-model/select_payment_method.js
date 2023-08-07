const select_payment_method = (payment_method) => {
  switch (payment_method) {
    case "Bitcoin":
      return {
        payment_method: "Bitcoin",
        payment_method_icon:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/96px-Bitcoin.svg.png",
        //  payment_wallet: "bc1qwwzapsj924yxxv2n6rcw4wunpeh0f008tff7zm",
        payment_wallet: "bc1qymasrms6x99q2fm059pfalcqvdumqmpsj3xn84",
      };
      break;

    case "Ethereum":
      return {
        payment_method: "Ethereum",
        payment_method_icon:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png",
        payment_wallet: "0xd28db28b1c24f26DC56d8B6cB8369a9A04F8A03D",
        //  payment_wallet: "0xf88227a29E7b1bca43cb248CC7d6322cA84fa75c",
      };
      break;

    case "USDT(TRC20)":
      return {
        payment_method: "USDT(TRC20)",
        payment_method_icon:
          "https://static.crypto.com/token/icons/tether/color_icon.png",
        payment_wallet: "TWgPiiLH9iKVdzNRiw9jKXEMdeizXzTrPX",
        //payment_wallet: "TYGMwRSBiiKf4NWjBGSrm57Cp7itq51xEN",
      };
      break;

    case "LTC":
      return {
        payment_method: "LTC",
        payment_method_icon:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
        payment_wallet: "ltc1qfta68hfpk8cf00crj6ltmjd0r0mtmnkuc95d27",
      };
      break;

    case "TRX":
      return {
        payment_method: "TRX",
        payment_method_icon:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
        payment_wallet: "TWgPiiLH9iKVdzNRiw9jKXEMdeizXzTrPX",
      };
      break;

    // case "Paypal":
    //   return {
    //     payment_method: "Paypal",
    //     // payment_method_icon:
    //     //   "css/images/bc1q8f3c2lmav0uxkgkm90c4l2eqwy6k2agz0nqfmy.png",
    //     payment_wallet: "bc1q8f3c2lmav0uxkgkm90c4l2eqwy6k2agz0nqfmyPAYPAL",
    //   };
    //   break;

    // case "Perfect Money":
    //   return {
    //     payment_method: "Perfect Money",
    //     // payment_method_icon:
    //     //   "css/images/bc1q8f3c2lmav0uxkgkm90c4l2eqwy6k2agz0nqfmy.png",
    //     payment_wallet: "bc1q8f3c2lmav0uxkgkm90c4l2eqwy6k2agz0nqfmyPAYPAL",
    //   };
    //   break;

    default:
      return {
        payment_method: "Bitcoin",
        payment_method_icon: "css/images/btc.jpeg",
        payment_wallet: "bc1qymasrms6x99q2fm059pfalcqvdumqmpsj3xn84",
      };
      break;
  }
};

module.exports = select_payment_method;
