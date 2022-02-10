// Importing useRouter()
import { useRouter } from "next/router";

function slide() {
    // Initializing useRouter()
    const router = useRouter();
    if (router.asPath !== "/[...slide]") {
        console.log(router, router.query.slide[2]);
        router.push({
            pathname: router.query.slide[0],
            query: { slide: router.query.slide[2] },
        });
    }

    return <h1>Path :- {router.asPath} </h1>;
}

export default slide;
