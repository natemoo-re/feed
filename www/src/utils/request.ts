const single = new WeakSet();
export function setSinglePost(req: Request) {
    single.add(req);
}
export function isSinglePost(req: Request) {
    return single.has(req);
}
