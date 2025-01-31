function ProductDetailPage(props) {



    return (
        <>
            <h1></h1>
            <p></p>
        </>
    )
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;
    return {
        props: {
            productId: productId
        }
    }
}

export default ProductDetailPage