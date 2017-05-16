export class ConfigService {

  private config: Config = {
    serviceUrl: "http://localhost:8080"
    // serviceUrl: "http://192.168.0.21:8080"
    //serviceUrl: "http://dev.mabu.es:8080/backend"
  };

  private url: Url = {
    product: "/public/product",
    productImage: "/public/image/product/",
    restaurant: "/public/restaurant",
    category: "/public/category",
    taxe: "/public/taxe",
    existRestaurantName: "public/restaurant/exist",
    user: '/user',
    employee: '/employee',
    employeeRoles: '/employee/roles',
    order: '/order',
    orderByClient: '/order/client',
    client: '/client',
    clientAddress: '/client/address',
    payOrder: '/order/pay'
  };

  private appData: appData = {
    companyName: "Galipizza",
    stripeKey: "pk_test_rGNUZEgMVB8E47ySm5FHrIux",
    facebookLink: "https://www.facebook.com", //hide
    twitterLink: "https://www.instagram.com", //hide
    instagramLink: "https://www.twitter.com",
    youtubeLink: "https://www.youtube.com",
    emailCompany: "info@galipizza.com",
    telephoneNumber: "900 00 00",
    footerText: "Galipizza"
  };

  private styleApp: styleApp = {
    color1: "teal darken-2", //NAVBAR FOOTER (BACKGROUND)
    color2: "grey lighten-1", //SUB TITLE SECTION (BACKGROUND)
    color3: "teal-text text-darken-2", //LINKS (TEXT)
    color4: "blue",// BUTTON COLOR (BACKGROUND)
    color5: "teal darken-2", //BUTTON SAVE/ACCEPT (BACKGROUND)
    color6: "red",// BUTTON CANCEL (BACKGROUND)
    color7: "teal-text text-darken-2",// BUTTON DELETE ITEM LIST (BACKGROUND)
    color8: "grey lighten-3", //BACKGROUND APP (BACKGROUND)
    color9: "grey lighten-5", //CARDS MAIN PAGE (BACKGROUND)
    color10: "red lighten-1", //BUTTON BOOK MAIN PAGE
    facebookLink: "", //hide
    twitterLink: "", //hide
    instagramLink: "",//hide
    youtubeLink: "",//hide
    emailText: "hide",//hide
    telephoneText: "hide",//hide
  };


  constructor() {
  }

  get(key: string) {
    return this.config[key];
  }

  getUrl(key: string) {
    return this.config['serviceUrl'] + this.url[key];
  }

  getAppData(key: string) {
    return this.appData[key];
  }

  getStyleApp(key: string) {
    return this.styleApp[key];
  }


}

interface Config {
  serviceUrl: string;
  [ index: string ]: string;
}

interface Url {
  [ index: string ]: string;
}

interface appData {
  companyName: string;
  [ index: string ]: string;
}
interface styleApp {
  [ index: string ]: string;
}
