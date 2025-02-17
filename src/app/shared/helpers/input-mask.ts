export function textMaskFormats(inputType:any){
 let formats:any = {
    'datemask':[/[0-3]/, /[0-9]/, '/', /[0-1]/, /[1-9]/, '/', /[2]/, /[0]/, /[2-9]/, /[0-9]/],
    'timemask':[/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/],
    'phonemask':[/[1-9]/, /[1-9]/, '-', /[9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,'-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
 }
 return formats[inputType]
}