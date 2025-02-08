export const asyncError=(para)=>{
    return(req, res, next)=>{
        Promise.resolve(para(req, res, next)).catch(next);
    }
}