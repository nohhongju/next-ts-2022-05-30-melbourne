export function fetchCount(amount: number) {
    return new Promise<{ data: number}>((resolve)=>{
        setTimeout(()=> resolve({ data: amount}), 500)
    });
}