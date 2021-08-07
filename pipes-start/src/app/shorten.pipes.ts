import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'shorten'
})
export class ShortenPipes implements PipeTransform{
    transform(value: any,limit:number){
        //transform always return
        if(value.length > limit)
            return value.substr(0, limit) + ' ...'; //first 10 char
        return value;
        }
}
