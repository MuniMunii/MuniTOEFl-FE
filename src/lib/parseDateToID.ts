export function parseDateToID(date:Date){
    return new Date(date).toLocaleDateString('id-ID',{
        day:'numeric',
        month:"long",
        year:"numeric"
    })
}