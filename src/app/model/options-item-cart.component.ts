/**
 * Created by christian on 4/03/17.
 */
export class OptionsItemCart {
  optionId:number;
  optionMain:boolean;
  optionName:string;
  optionLineId:number;
  optionLinePriceId:number;
  optionLineName:string;
  priceAdded:number;

  constructor(optionId:number,optionMain:boolean,optionName:string, optionLineId:number, optionLinePriceId:number,  optionLineName:string, priceAdded:number){
    this.optionId=optionId;
    this.optionMain=optionMain;
    this.optionName=optionName;
    this.optionLineId=optionLineId;
    this.optionLinePriceId=optionLinePriceId;
    this.optionLineName=optionLineName;
    this.priceAdded=priceAdded;
  }
}
